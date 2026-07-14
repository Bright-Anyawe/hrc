import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { syncToCRM } from '@/lib/crm';

// POST /api/lead-magnet
// NOTE: not wired into the UI yet. LeadMagnetModal.tsx links to the two
// existing gated resource pages instead (LeadMagnetGate.tsx + /api/crm/sync)
// since those already capture leads and reveal real content. Kept as
// scaffolding for a future direct "email me this resource" lead magnet.

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  resource: z.string().trim().min(1).max(120),
  company: z.string().max(0).optional().or(z.literal('')),
});

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

  if (parsed.data.company) {
    return NextResponse.json({ success: true });
  }

  const { name, email, resource } = parsed.data;

  syncToCRM({
    source: 'lead-magnet',
    name,
    email,
    service: resource,
    notes: 'Requested lead magnet: ' + resource,
  }).catch((err) => console.warn('[lead-magnet] CRM sync error:', err));

  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'HRC Website <onboarding@resend.dev>',
        to: ['info@hrcghana.com'],
        subject: 'New lead magnet request: ' + resource,
        html: '<p>Name: ' + name + '</p><p>Email: ' + email + '</p><p>Resource: ' + resource + '</p>',
      });
    }
  } catch (err) {
    console.warn('[lead-magnet] Notification email failed:', err);
  }

  return NextResponse.json({ success: true });
}
