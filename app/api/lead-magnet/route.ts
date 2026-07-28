import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { syncToCRM } from '@/lib/crm';

/**
 * POST /api/lead-magnet
 *
 * Called when a visitor submits the LeadMagnetGate form to download a gated
 * resource. It does three things, in order of importance to the visitor:
 *
 *   1. Emails the *visitor* a confirmation with a link back to their resource.
 *      This is the "message" people expect after handing over their details.
 *   2. Emails the team an internal notification of the new lead.
 *   3. Syncs the lead to HubSpot CRM (fire-and-forget).
 *
 * ─── Environment ───
 *   RESEND_API_KEY  — Resend API key (required to send any email)
 *   RESEND_FROM     — Verified sender, e.g. "HRC Ghana <noreply@hrcghana.com>".
 *                     REQUIRED for the visitor email to actually deliver: the
 *                     default onboarding@resend.dev sandbox sender can only
 *                     deliver to your own Resend account address, so real
 *                     visitors will NOT receive anything until this is set to
 *                     an address on a domain you've verified in Resend.
 *   LEAD_NOTIFY_TO  — Internal recipient for lead alerts (default info@hrcghana.com)
 *
 * The response never fails on email trouble — the visitor already has the
 * resource revealed on the page. `emailSent` reports whether the confirmation
 * actually went out so the client can adjust its wording.
 */

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  resource: z.string().trim().min(1).max(160),
  /** The page the resource lives on, so the email can link back to it. */
  resourceUrl: z.string().trim().url().max(500).optional(),
  /** Honeypot — real users leave this empty; bots fill it in. */
  company: z.string().max(0).optional().or(z.literal('')),
});

const DEFAULT_FROM = 'HRC Ghana <onboarding@resend.dev>';
const DEFAULT_NOTIFY_TO = 'info@hrcghana.com';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildVisitorEmail(name: string, resource: string, resourceUrl?: string): string {
  const firstName = escapeHtml(name.split(/\s+/)[0] ?? name);
  const safeResource = escapeHtml(resource);
  const cta = resourceUrl
    ? `<p style="margin:24px 0;">
         <a href="${escapeHtml(resourceUrl)}"
            style="background:#c9a227;color:#0b1f3a;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:8px;display:inline-block;">
           Open your resource
         </a>
       </p>
       <p style="color:#555;font-size:13px;">Or copy this link: ${escapeHtml(resourceUrl)}</p>`
    : '';

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
      <h2 style="color:#0b1f3a;">Thank you, ${firstName}!</h2>
      <p>Your resource — <strong>${safeResource}</strong> — is ready.</p>
      ${cta}
      <p>We've also added you to our mailing list so you'll be the first to hear about
         new guides, training, and professional development insights from Hedge
         Resource Centre. You can unsubscribe at any time.</p>
      <p style="margin-top:32px;">Warm regards,<br/>The HRC Ghana Team</p>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
      <p style="color:#888;font-size:12px;">
        Hedge Resource Centre · Quality Our Priority<br/>
        You received this because you requested a resource at hrcghana.com.
      </p>
    </div>`;
}

/** Sends the confirmation to the visitor and a notification to the team. */
async function sendEmails(
  name: string,
  email: string,
  resource: string,
  resourceUrl: string | undefined,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[lead-magnet] RESEND_API_KEY not set — no email sent to', email);
    return false;
  }

  const from = process.env.RESEND_FROM || DEFAULT_FROM;
  const notifyTo = process.env.LEAD_NOTIFY_TO || DEFAULT_NOTIFY_TO;
  const resend = new Resend(apiKey);

  let visitorEmailSent = false;

  // 1. Confirmation to the visitor — the message they're waiting for.
  try {
    const { error } = await resend.emails.send({
      from,
      to: [email],
      subject: `Your resource is ready: ${resource}`,
      html: buildVisitorEmail(name, resource, resourceUrl),
    });
    if (error) {
      console.error('[lead-magnet] Visitor email rejected:', error);
    } else {
      visitorEmailSent = true;
    }
  } catch (err) {
    console.error('[lead-magnet] Visitor email failed:', err);
  }

  // 2. Internal notification — best-effort, never affects the result.
  try {
    await resend.emails.send({
      from,
      to: [notifyTo],
      subject: `New resource download: ${resource}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p><strong>Resource:</strong> ${escapeHtml(resource)}</p>`,
    });
  } catch (err) {
    console.warn('[lead-magnet] Team notification failed:', err);
  }

  return visitorEmailSent;
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
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  // Honeypot tripped — pretend success, do nothing.
  if (parsed.data.company) {
    return NextResponse.json({ success: true, emailSent: false });
  }

  const { name, email, resource, resourceUrl } = parsed.data;

  syncToCRM({
    source: 'lead-magnet',
    name,
    email,
    service: resource,
    notes: `Downloaded resource: ${resource}`,
  }).catch((err) => console.warn('[lead-magnet] CRM sync error:', err));

  const emailSent = await sendEmails(name, email, resource, resourceUrl);

  return NextResponse.json({ success: true, emailSent });
}
