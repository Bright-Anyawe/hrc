import { NextResponse } from 'next/server';
import { getPdfResource } from '@/lib/resource-contents';
import { buildPdfBuffer } from '@/lib/pdf';

/**
 * GET /api/download/[resource]
 *
 * Streams a real PDF of the requested gated resource (e.g.
 * /api/download/guide-professional-development) as a browser download.
 * Unknown slugs return 404.
 */
export async function GET(
  _request: Request,
  { params }: { params: { resource: string } },
) {
  const resource = getPdfResource(params.resource);
  if (!resource) {
    return new NextResponse('Resource not found', { status: 404 });
  }

  const buffer = await buildPdfBuffer(resource);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${resource.filename}.pdf"`,
      'Content-Length': String(buffer.byteLength),
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
