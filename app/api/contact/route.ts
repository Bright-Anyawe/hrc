import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { syncToCRM } from '@/lib/crm';

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── 1. Send notification email (existing flow) ──
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'HRC Contact Form <onboarding@resend.dev>',
      to: ['info@hrcghana.com'],
      subject: `New Enquiry: ${subject || 'Contact Form'} — from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // ── 2. Sync to HubSpot CRM (fire-and-forget — never blocks the response) ──
    const serviceLabels: Record<string, string> = {
      training: 'Training / Tutoring',
      skills: 'Skills Development',
      admin: 'Administrative Support',
      research: 'Research Services',
      assessment: 'Assessment Services',
      advisory: 'Advisory Services',
      other: 'Other Enquiry',
    };

    syncToCRM({
      source: 'contact-form',
      name,
      email,
      phone,
      service: serviceLabels[subject ?? ''] ?? subject ?? 'General Enquiry',
      notes: message,
    }).catch((err) => console.warn('[contact-route] CRM sync error:', err));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
