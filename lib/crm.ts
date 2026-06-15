/**
 * Centralized CRM client — HubSpot
 *
 * Syncs contact form submissions, booking intents, and confirmed bookings
 * into HubSpot CRM using their REST API via @hubspot/api-client.
 *
 * Every function is **fire-and-forget**: failures are logged but never
 * thrown, so broken CRM never breaks the user-facing flow.
 *
 * ─── Environment ───
 *   HUBSPOT_ACCESS_TOKEN – Private App access token (create at
 *   https://app.hubspot.com/ > Settings > Integrations > Private Apps)
 *
 *   HUBSPOT_PORTAL_ID   – Optional, used in admin view URLs
 */

import { Client } from '@hubspot/api-client';
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts/models/Filter';
import { AssociationSpecAssociationCategoryEnum } from '@hubspot/api-client/lib/codegen/crm/contacts/models/AssociationSpec';
import type { SimplePublicObject } from '@hubspot/api-client/lib/codegen/crm/contacts/models/SimplePublicObject';

/* ─── Types ─── */

export type CrmSource = 'contact-form' | 'booking-details' | 'booking-confirmed';

export interface CrmPayload {
  source: CrmSource;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  notes?: string;
  /** Extra metadata (e.g. Calendly event URI) */
  meta?: Record<string, string | undefined>;
}

export interface CrmResult {
  success: boolean;
  contactId?: string;
  dealId?: string;
  error?: string;
}

/* ─── Helpers ─── */

const FIRST_LAST_REGEX = /^\s*(\S+)\s*(.*)$/;

function splitName(fullName: string): { firstName: string; lastName: string } {
  const m = FIRST_LAST_REGEX.exec(fullName.trim());
  if (!m) return { firstName: fullName, lastName: '' };
  return { firstName: m[1]!, lastName: m[2]?.trim() ?? '' };
}

function getClient(): Client | null {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    console.warn('[crm] HUBSPOT_ACCESS_TOKEN not set — skipping CRM sync');
    return null;
  }
  return new Client({ accessToken: token });
}

/* ─── Core sync function ─── */

export async function syncToCRM(payload: CrmPayload): Promise<CrmResult> {
  const client = getClient();
  if (!client) return { success: false, error: 'No token configured' };

  const { firstName, lastName } = splitName(payload.name);
  const timestamp = new Date().toISOString();

  try {
    /* ── 1. Upsert contact (by email) ── */
    let contactId: string;

    try {
      const searchRes = await client.crm.contacts.searchApi.doSearch({
        filterGroups: [
          {
            filters: [
              { propertyName: 'email', operator: FilterOperatorEnum.Eq, value: payload.email },
            ],
          },
        ],
        limit: 1,
      });

      if (searchRes.results.length > 0) {
        contactId = searchRes.results[0]!.id;
        // Update existing contact
        await client.crm.contacts.basicApi.update(contactId, {
          properties: {
            firstname: firstName,
            lastname: lastName,
            phone: payload.phone ?? '',
            // Store the source of the latest interaction
            hs_lead_status: 'NEW',
            // Custom note — appended to existing notes if possible
            ...(payload.notes
              ? { notes: `[${payload.source} @ ${timestamp}] ${payload.notes}` }
              : {}),
          },
        });
      } else {
        const created = await client.crm.contacts.basicApi.create({
          properties: {
            firstname: firstName,
            lastname: lastName,
            email: payload.email,
            phone: payload.phone ?? '',
            hs_lead_status: 'NEW',
            ...(payload.notes
              ? { notes: `[${payload.source} @ ${timestamp}] ${payload.notes}` }
              : {}),
          },
        });
        contactId = created.id!;
      }
    } catch (err) {
      console.error('[crm] Contact upsert failed:', err);
      return { success: false, error: String(err) };
    }

    /* ── 2. Create a deal (note) for this interaction ── */
    let dealId: string | undefined;

    try {
      const dealName =
        payload.source === 'contact-form'
          ? `Website Enquiry — ${payload.service || 'General'}`
          : payload.source === 'booking-details'
            ? `Booking Initiated — ${payload.service || 'Consultation'}`
            : `Booking Confirmed — ${payload.service || 'Consultation'}`;

      const deal = await client.crm.deals.basicApi.create({
        properties: {
          dealname: dealName,
          dealstage: 'appointmentscheduled',
          amount: '0',
          description:
            payload.notes ||
            `Source: ${payload.source} | Service: ${payload.service || 'N/A'}`,
          hs_priority: 'MEDIUM',
        },
        associations: [
          {
            to: { id: contactId },
            types: [
              { associationCategory: AssociationSpecAssociationCategoryEnum.HubspotDefined, associationTypeId: 3 },
            ],
          },
        ],
      });
      dealId = deal.id!;
    } catch (err) {
      // Deal creation is optional — don't fail the whole sync
      console.warn('[crm] Deal creation failed (non-fatal):', err);
    }

    return { success: true, contactId, dealId };
  } catch (err) {
    console.error('[crm] Sync failed:', err);
    return { success: false, error: String(err) };
  }
}

/* ─── Batch — fetch recent leads for admin view ─── */

export interface CrmLead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leadStatus: string;
  notes: string;
  createdAt: string;
}

export async function fetchRecentLeads(limit = 50): Promise<CrmLead[]> {
  const client = getClient();
  if (!client) return [];

  try {
    const res = await client.crm.contacts.searchApi.doSearch({
      filterGroups: [],
      sorts: ['-createdate'],
      limit,
      properties: [
        'firstname',
        'lastname',
        'email',
        'phone',
        'hs_lead_status',
        'notes',
        'createdate',
      ],
    });

    return res.results.map((r: SimplePublicObject) => ({
      id: r.id,
      firstName: (r.properties as any)?.firstname ?? '',
      lastName: (r.properties as any)?.lastname ?? '',
      email: (r.properties as any)?.email ?? '',
      phone: (r.properties as any)?.phone ?? '',
      leadStatus: (r.properties as any)?.hs_lead_status ?? '',
      notes: (r.properties as any)?.notes ?? '',
      createdAt: (r.properties as any)?.createdate ?? '',
    }));
  } catch (err) {
    console.error('[crm] Fetch leads failed:', err);
    return [];
  }
}
