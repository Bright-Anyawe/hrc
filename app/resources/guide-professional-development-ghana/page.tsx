import type { Metadata } from 'next';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';
import LeadMagnetGate from '@/components/LeadMagnetGate';
import { BookOpen } from 'lucide-react';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'Free Guide: The Ultimate Guide to Professional Development in Ghana | HRC Ghana',
  description:
    'Download our free comprehensive guide to professional development in Ghana. Learn about CPD requirements, TVET opportunities, career planning, and more.',
  alternates: { canonical: '/resources/guide-professional-development-ghana' },
  openGraph: {
    title: 'Free Guide: Professional Development in Ghana',
    description:
      'Download HRC Ghana\'s free guide covering CPD, TVET, career planning, and professional growth strategies for Ghanaian professionals.',
    url: `${siteUrl}/resources/guide-professional-development-ghana`,
  },
};

export default function ProfessionalDevelopmentGuidePage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <PageHero
          title="Ultimate Guide to Professional Development in Ghana"
          subtitle="Free downloadable resource"
          backgroundImage="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />

        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <LeadMagnetGate
                resourceTitle="The Ultimate Guide to Professional Development in Ghana"
                resourceDescription="Enter your details below to get instant access to our comprehensive guide — packed with actionable strategies for career growth in Ghana."
                icon={<BookOpen size={28} className="sm:w-9 sm:h-9 text-white" />}
              >
                {/* ── GATED CONTENT ── */}
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl sm:text-3xl font-bold text-hrc-blue mb-4">
                    The Ultimate Guide to Professional Development in Ghana
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Welcome to your comprehensive guide. This resource covers everything you need to know to advance your career in Ghana&apos;s dynamic professional landscape.
                  </p>

                  <hr className="my-6 border-gray-200" />

                  <h3 className="text-xl font-bold text-hrc-blue mt-6 mb-3">1. Understanding CPD Requirements</h3>
                  <p className="text-gray-600 mb-3">
                    Continuing Professional Development (CPD) is mandatory for many professions in Ghana. Here is a quick reference:
                  </p>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-hrc-blue text-white">
                          <th className="px-4 py-2 text-left">Profession</th>
                          <th className="px-4 py-2 text-left">Body</th>
                          <th className="px-4 py-2 text-left">Annual Requirement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100"><td className="px-4 py-2">Accountants</td><td className="px-4 py-2">ICAG</td><td className="px-4 py-2">40–50 hours</td></tr>
                        <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-2">Engineers</td><td className="px-4 py-2">GhIE</td><td className="px-4 py-2">30 points</td></tr>
                        <tr className="border-b border-gray-100"><td className="px-4 py-2">Lawyers</td><td className="px-4 py-2">GBA</td><td className="px-4 py-2">12 credits</td></tr>
                        <tr className="border-b border-gray-100 bg-gray-50"><td className="px-4 py-2">Medical Doctors</td><td className="px-4 py-2">MDC</td><td className="px-4 py-2">40 credits</td></tr>
                        <tr className="border-b border-gray-100"><td className="px-4 py-2">Nurses</td><td className="px-4 py-2">NMC</td><td className="px-4 py-2">30 hours</td></tr>
                        <tr className="bg-gray-50"><td className="px-4 py-2">Pharmacists</td><td className="px-4 py-2">Pharmacy Council</td><td className="px-4 py-2">30 points</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-xl font-bold text-hrc-blue mt-8 mb-3">2. TVET & Skills Development Pathways</h3>
                  <p className="text-gray-600 mb-3">
                    Technical and Vocational Education and Training (TVET) offers practical pathways to employment and entrepreneurship. Key high-demand areas include:
                  </p>
                  <ul className="list-disc pl-6 space-y-1.5 text-gray-600 mb-6">
                    <li><strong>Construction Trades:</strong> Masonry, plumbing, electrical, welding</li>
                    <li><strong>Information Technology:</strong> Software, networking, cybersecurity</li>
                    <li><strong>Agro-Processing:</strong> Food preservation, packaging, value addition</li>
                    <li><strong>Renewable Energy:</strong> Solar installation, maintenance</li>
                    <li><strong>Digital Skills:</strong> Digital marketing, e-commerce, graphic design</li>
                  </ul>

                  <h3 className="text-xl font-bold text-hrc-blue mt-8 mb-3">3. Career Planning Framework</h3>
                  <p className="text-gray-600 mb-3">
                    Use this five-step framework to plan your professional development:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-600 mb-6">
                    <li><strong>Self-Assessment:</strong> Evaluate your current skills, strengths, and gaps using professional assessments</li>
                    <li><strong>Goal Setting:</strong> Define clear 1-year, 3-year, and 5-year career objectives</li>
                    <li><strong>Learning Path:</strong> Identify the CPD courses, certifications, and training needed</li>
                    <li><strong>Network Building:</strong> Connect with mentors, join professional associations, attend industry events</li>
                    <li><strong>Review & Adjust:</strong> Regularly review progress and adapt your plan as your career evolves</li>
                  </ol>

                  <h3 className="text-xl font-bold text-hrc-blue mt-8 mb-3">4. Building Your Personal Brand</h3>
                  <p className="text-gray-600 mb-3">
                    In Ghana&apos;s competitive job market, a strong personal brand sets you apart:
                  </p>
                  <ul className="list-disc pl-6 space-y-1.5 text-gray-600 mb-6">
                    <li>Optimise your LinkedIn profile with keywords relevant to your field</li>
                    <li>Publish articles and insights to demonstrate thought leadership</li>
                    <li>Seek speaking opportunities at professional events</li>
                    <li>Collect testimonials and recommendations from clients and supervisors</li>
                    <li>Maintain an updated portfolio of your work and achievements</li>
                  </ul>

                  <h3 className="text-xl font-bold text-hrc-blue mt-8 mb-3">5. Taking Action</h3>
                  <p className="text-gray-600 mb-6">
                    Your professional development journey starts today. Here are three actions you can take right now:
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200 mb-6">
                    <ol className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-hrc-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                        <span><strong>Book a Career Assessment</strong> with HRC Ghana to identify your strengths and growth areas</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-hrc-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                        <span><strong>Enrol in a CPD Programme</strong> that aligns with your professional body&apos;s requirements</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-hrc-red text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                        <span><strong>Connect with us</strong> on social media and subscribe to our newsletter for ongoing insights</span>
                      </li>
                    </ol>
                  </div>

                  <hr className="my-6 border-gray-200" />

                  <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm mb-4">
                      Ready to take the next step in your professional journey?
                    </p>
                    <a
                      href="/booking"
                      className="inline-flex items-center gap-2 bg-hrc-red hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      Book a Career Consultation
                    </a>
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
