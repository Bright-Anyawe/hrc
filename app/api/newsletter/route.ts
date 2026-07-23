import { NextResponse } from 'next/server';
import { z } from 'zod';
import { syncToCRM } from '@/lib/crm';

/**
 * POST /api/newsletter
 *
 * Captures an email for the mailing list.
 * Expects: { email: string, name?: string }
 *
 * The request is written to every configured sink and succeeds if *any* of
 * them accepts it, so a missing key on one provider never loses a lead:
 *
 *   1. Brevo (Sendinblue) — the actual marketing list.
 *      BREVO_API_KEY, BREVO_LIST_ID
 *   2. HubSpot CRM — fallback capture so the contact is still reachable.
 *      HUBSPOT_ACCESS_TOKEN
 *
 * Only when *both* are unavailable does this return an error, because at that
 * point the address genuinely went nowhere and telling the user "subscribed"
 * would be a lie.
 *
 * The `subscribed` field in the response says whether the address reached the
 * Brevo list specifically — callers can use it to soften their wording.
 */

const schema = z.object({
  email: z.string().trim().email().max(254),
  name: z.string().trim().max(120).optional(),
});

const BREVO_CONTACTS_ENDPOINT = 'https://api.brevo.com/v3/contacts';

/** Brevo returns this when the address is already on the list — not a failure. */
const BREVO_DUPLICATE_CODE = 'duplicate_parameter';

interface NameAttributes {
  FIRSTNAME?: string;
  LASTNAME?: string;
}

function splitNameAttributes(name: string | undefined): NameAttributes {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (parts.length === 0) return {};
  if (parts.length === 1) return { FIRSTNAME: parts[0] };
  return { FIRSTNAME: parts[0], LASTNAME: parts.slice(1).join(' ') };
}

/** Adds the contact to the Brevo list. Returns false (and logs) on any failure. */
async function subscribeToBrevo(email: string, name: string | undefined): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!apiKey || !process.env.BREVO_LIST_ID) {
    console.warn('[newsletter] BREVO_API_KEY / BREVO_LIST_ID not set — falling back to CRM');
    return false;
  }

  if (!Number.isInteger(listId)) {
    console.warn('[newsletter] BREVO_LIST_ID is not a valid integer — falling back to CRM');
    return false;
  }

  try {
    const response = await fetch(BREVO_CONTACTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: splitNameAttributes(name),
        listIds: [listId],
        emailBlacklisted: false,
        updateEnabled: true,
      }),
    });

    if (response.ok) return true;

    const body = await response.text();
    if (body.includes(BREVO_DUPLICATE_CODE)) return true;

    console.error('[newsletter] Brevo API error:', response.status, body);
    return false;
  } catch (err) {
    console.error('[newsletter] Brevo request failed:', err);
    return false;
  }
}

/** Fallback capture so the address is still reachable if Brevo is unavailable. */
async function captureInCRM(email: string, name: string | undefined): Promise<boolean> {
  const result = await syncToCRM({
    source: 'newsletter',
    name: name?.trim() || email,
    email,
    notes: 'Newsletter signup via website',
  });

  if (!result.success) {
    console.warn('[newsletter] CRM fallback failed:', result.error);
  }
  return result.success;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  const { email, name } = parsed.data;

  const [isSubscribed, isCaptured] = await Promise.all([
    subscribeToBrevo(email, name),
    captureInCRM(email, name),
  ]);

  if (!isSubscribed && !isCaptured) {
    console.error('[newsletter] Every sink failed — lead not captured for', email);
    return NextResponse.json(
      { error: 'We could not save your details right now. Please email info@hrcghana.com.' },
      { status: 503 },
    );
  }

  return NextResponse.json({ success: true, subscribed: isSubscribed });
}
