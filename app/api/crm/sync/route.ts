import { NextRequest, NextResponse } from 'next/server';
import { syncToCRM } from '@/lib/crm';

/**
 * POST /api/crm/sync
 *
 * Fire-and-forget CRM sync endpoint, used by client-side components
 * (BookingWidget) that cannot call the server-side syncToCRM directly.
 *
 * Request body: { source, name, email, phone?, service?, notes?, meta? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { source, name, email, phone, service, notes, meta } = body;

    if (!source || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: source, name, email' },
        { status: 400 },
      );
    }

    // Fire the CRM sync — we return immediately and let it complete
    // asynchronously so the client isn't blocked.
    const result = await syncToCRM({ source, name, email, phone, service, notes, meta });

    if (result.success) {
      return NextResponse.json({ success: true, contactId: result.contactId });
    }

    // Log but still return 200 to the client — CRM failure shouldn't
    // break the user experience.
    console.warn('[crm-sync-api] Sync failed:', result.error);
    return NextResponse.json({ success: false, error: result.error });
  } catch (err) {
    console.error('[crm-sync-api] Unexpected error:', err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}
