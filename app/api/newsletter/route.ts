import { NextResponse } from 'next/server';

/**
 * POST /api/newsletter
 *
 * Subscribes an email to the Brevo (Sendinblue) marketing list.
 * Expects: { email: string, name?: string }
 *
 * Environment:
 *   BREVO_API_KEY  — Brevo v3 API key
 *   BREVO_LIST_ID  — Numeric ID of the Brevo list to subscribe to
 */
export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      console.warn('[newsletter] BREVO_API_KEY or BREVO_LIST_ID not configured');
      // Don't expose internal config to the client
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 },
      );
    }

    const listIds = [Number(listId)];
    if (isNaN(listIds[0]!)) {
      console.warn('[newsletter] BREVO_LIST_ID is not a valid number');
      return NextResponse.json(
        { error: 'Newsletter service misconfigured' },
        { status: 500 },
      );
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: {
          ...(name ? { FIRSTNAME: name.trim().split(/\s+/)[0] } : {}),
          ...(name?.trim().includes(' ')
            ? { LASTNAME: name.trim().split(/\s+/).slice(1).join(' ') }
            : {}),
        },
        listIds,
        emailBlacklisted: false,
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error('[newsletter] Brevo API error:', response.status, body);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[newsletter] Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 },
    );
  }
}
