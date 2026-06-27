import type { Metadata } from 'next';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';
import LeadMagnetGate from '@/components/LeadMagnetGate';
import { ClipboardCheck } from 'lucide-react';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'Free Checklist: Business Formation Checklist for Ghana | HRC Ghana',
  description:
    'Download our free step-by-step business formation checklist for Ghana. Register your company, get your TIN, open a bank account, and more.',
  alternates: { canonical: '/resources/business-formation-checklist' },
  openGraph: {
    title: 'Free Checklist: Business Formation in Ghana',
    description:
      'Download HRC Ghana\'s free business formation checklist — a step-by-step guide to registering and launching your business in Ghana.',
    url: `${siteUrl}/resources/business-formation-checklist`,
  },
};

export default function BusinessFormationChecklistPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <PageHero
          title="Business Formation Checklist"
          subtitle="Free step-by-step guide for entrepreneurs in Ghana"
          backgroundImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />

        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <LeadMagnetGate
                resourceTitle="Business Formation Checklist — Start Your Business in Ghana"
                resourceDescription="Enter your details below to get instant access to our complete step-by-step checklist for registering and launching a business in Ghana."
                icon={<ClipboardCheck size={28} className="sm:w-9 sm:h-9 text-white" />}
              >
                {/* ── GATED CONTENT ── */}
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl sm:text-3xl font-bold text-hrc-blue mb-4">
                    Business Formation Checklist
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Starting a business in Ghana involves several regulatory steps. This checklist walks you through everything you need to do, in the right order.
                  </p>

                  <hr className="my-6 border-gray-200" />

                  {/* Phase 1 */}
                  <h3 className="text-xl font-bold text-hrc-blue mt-8 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-hrc-red text-white rounded-lg flex items-center justify-center text-sm">1</span>
                    Pre-Registration Preparation
                  </h3>
                  <div className="space-y-3 mb-8">
                    {[
                      { task: 'Define your business idea and value proposition', done: false },
                      { task: 'Conduct market research to validate demand', done: false },
                      { task: 'Choose your business name (check availability at Registrar General\'s Department)', done: false },
                      { task: 'Decide on business structure: Sole Proprietorship, Partnership, or Limited Liability Company', done: false },
                      { task: 'Prepare a basic business plan outlining goals, target market, and financial projections', done: false },
                      { task: 'Identify initial capital requirements and funding sources', done: false },
                    ].map((item, i) => (
                      <label key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-hrc-red focus:ring-hrc-red accent-hrc-red" />
                        <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900">{item.task}</span>
                      </label>
                    ))}
                  </div>

                  {/* Phase 2 */}
                  <h3 className="text-xl font-bold text-hrc-blue mt-8 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-hrc-red text-white rounded-lg flex items-center justify-center text-sm">2</span>
                    Business Registration
                  </h3>
                  <div className="space-y-3 mb-8">
                    {[
                      { task: 'Reserve your business name at the Registrar General\'s Department (RGD)' },
                      { task: 'Prepare and submit incorporation documents (for Limited Liability Companies)' },
                      { task: 'Obtain your Certificate of Incorporation from the RGD' },
                      { task: 'Register for Tax Identification Number (TIN) at GRA' },
                      { task: 'Register for VAT if annual turnover exceeds GHS 200,000' },
                      { task: 'Register with SSNIT for employee social security contributions' },
                    ].map((item, i) => (
                      <label key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-hrc-red focus:ring-hrc-red accent-hrc-red" />
                        <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900">{item.task}</span>
                      </label>
                    ))}
                  </div>

                  {/* Phase 3 */}
                  <h3 className="text-xl font-bold text-hrc-blue mt-8 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-hrc-red text-white rounded-lg flex items-center justify-center text-sm">3</span>
                    Licences, Permits & Compliance
                  </h3>
                  <div className="space-y-3 mb-8">
                    {[
                      { task: 'Obtain industry-specific licences (e.g., FDA clearance for food businesses, EPA permit for manufacturing)' },
                      { task: 'Register with the appropriate regulatory body for your sector' },
                      { task: 'Apply for zoning and building permits if operating from a physical location' },
                      { task: 'Secure trademark or intellectual property protection if needed' },
                      { task: 'Set up compliant record-keeping and accounting systems' },
                    ].map((item, i) => (
                      <label key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-hrc-red focus:ring-hrc-red accent-hrc-red" />
                        <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900">{item.task}</span>
                      </label>
                    ))}
                  </div>

                  {/* Phase 4 */}
                  <h3 className="text-xl font-bold text-hrc-blue mt-8 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-hrc-red text-white rounded-lg flex items-center justify-center text-sm">4</span>
                    Financial Setup
                  </h3>
                  <div className="space-y-3 mb-8">
                    {[
                      { task: 'Open a dedicated business bank account' },
                      { task: 'Set up accounting software or engage a bookkeeper' },
                      { task: 'Establish a system for invoicing and expense tracking' },
                      { task: 'Register for mobile money merchant account (if accepting MoMo payments)' },
                      { task: 'Set up a payment gateway for online transactions (if applicable)' },
                    ].map((item, i) => (
                      <label key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-hrc-red focus:ring-hrc-red accent-hrc-red" />
                        <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900">{item.task}</span>
                      </label>
                    ))}
                  </div>

                  {/* Phase 5 */}
                  <h3 className="text-xl font-bold text-hrc-blue mt-8 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-hrc-red text-white rounded-lg flex items-center justify-center text-sm">5</span>
                    Launch & Grow
                  </h3>
                  <div className="space-y-3 mb-8">
                    {[
                      { task: 'Develop your brand identity — logo, website, business cards' },
                      { task: 'Create a marketing plan and set up social media profiles' },
                      { task: 'Hire and register employees (if applicable)' },
                      { task: 'Secure business insurance coverage' },
                      { task: 'Establish your customer acquisition channels' },
                      { task: 'Set up a system for tracking key performance indicators (KPIs)' },
                    ].map((item, i) => (
                      <label key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-hrc-red focus:ring-hrc-red accent-hrc-red" />
                        <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900">{item.task}</span>
                      </label>
                    ))}
                  </div>

                  <hr className="my-8 border-gray-200" />

                  {/* Pro Tip Box */}
                  <div className="bg-gradient-to-r from-hrc-blue/5 to-hrc-red/5 rounded-xl p-5 sm:p-6 border border-hrc-blue/10 mb-6">
                    <h4 className="font-bold text-hrc-blue mb-2">💡 Pro Tip</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Many entrepreneurs find the registration process overwhelming. HRC Ghana&apos;s Advisory Services team can guide you through every step — from business formation to funding strategy. We have helped over 1,000 clients start and grow their businesses since 2004.
                    </p>
                  </div>

                  <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm mb-4">
                      Ready to turn your business idea into reality?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="/booking"
                        className="inline-flex items-center gap-2 bg-hrc-red hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        Book a Business Advisory Session
                      </a>
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 border-2 border-hrc-blue text-hrc-blue hover:bg-hrc-blue hover:text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
                      >
                        Contact Us for Help
                      </a>
                    </div>
                  </div>
                </div>
              </LeadMagnetGate>
            </div>
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
}
