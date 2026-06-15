import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Phone, Mail, Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { fetchRecentLeads } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Leads Dashboard | HRC Ghana (Admin)',
  robots: { index: false, follow: false },
};

/**
 * Simple admin view — protected by a shared ADMIN_SECRET env variable.
 * Access: /admin/leads?secret=YOUR_ADMIN_SECRET
 */
export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: { secret?: string; limit?: string };
}) {
  const expected = process.env.ADMIN_SECRET;
  const provided = searchParams.secret;

  // No admin secret configured — tell the user how to set it up
  if (!expected) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
            <h1 className="text-2xl font-bold text-amber-800 mb-3">Admin Secret Not Configured</h1>
            <p className="text-amber-700 mb-4">
              To enable this dashboard, set the <code className="bg-amber-100 px-2 py-0.5 rounded text-sm">ADMIN_SECRET</code> environment variable.
            </p>
            <div className="bg-white rounded-lg p-4 text-left text-sm text-gray-600 space-y-2 font-mono">
              <p># In Vercel dashboard or .env.local:</p>
              <p className="text-hrc-blue">ADMIN_SECRET=your-secure-random-string</p>
              <p className="mt-2 text-gray-400">Then visit: /admin/leads?secret=your-secure-random-string</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Wrong or missing secret — 404 to avoid leaking the endpoint
  if (provided !== expected) {
    redirect('/404');
  }

  const limit = Math.min(Math.max(parseInt(searchParams.limit ?? '50', 10) || 50, 1), 200);
  const leads = await fetchRecentLeads(limit);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-hrc-blue text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white text-sm mb-2 transition-colors"
              >
                <ArrowLeft size={14} /> Back to site
              </Link>
              <h1 className="text-2xl font-bold">Leads Dashboard</h1>
              <p className="text-gray-300 text-sm mt-1">
                Recent CRM contacts from HubSpot — showing {leads.length} lead{leads.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-right text-xs text-gray-400">
              HubSpot CRM
            </div>
          </div>
        </div>
      </div>

      {/* Leads table */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Phone</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Notes</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                      <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No leads found in HubSpot yet.</p>
                      <p className="text-xs mt-1">Leads will appear here once submissions start coming in.</p>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {lead.firstName} {lead.lastName}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-hrc-red hover:underline inline-flex items-center gap-1"
                        >
                          <Mail size={12} />
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {lead.phone ? (
                          <a href={`tel:${lead.phone}`} className="hover:text-hrc-red inline-flex items-center gap-1">
                            <Phone size={12} />
                            {lead.phone}
                          </a>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {lead.leadStatus || 'NEW'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate" title={lead.notes}>
                        {lead.notes || '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={11} />
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : '—'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          This is a lightweight admin view. For full CRM functionality, visit{' '}
          <a
            href="https://app.hubspot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-hrc-red hover:underline"
          >
            app.hubspot.com
          </a>
        </p>
      </div>
    </main>
  );
}
