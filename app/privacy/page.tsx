import type { Metadata } from 'next';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

// NOTE: This is a plain-language starting-point privacy policy, not legal
// advice. Have a lawyer review it before relying on it — in particular the
// Ghana Data Protection Act, 2012 (Act 843) requires registration with the
// Data Protection Commission for organisations that process personal data,
// which is a step no template can complete for you.

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'Privacy Policy | Hedge Resource Centre Ghana',
  description:
    'How Hedge Resource Centre (HRC) Ghana collects, uses, and protects your personal information, including cookies and marketing.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <PageHero
          title="Privacy Policy"
          subtitle="How we handle your information"
          backgroundImage="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />

        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p className="text-xs sm:text-sm text-gray-400">
                Last updated: {new Date().toISOString().slice(0, 10)}
              </p>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2">1. Who we are</h2>
                <p>
                  Hedge Resource Centre (&quot;HRC&quot;, &quot;we&quot;, &quot;us&quot;) is a resource consulting,
                  training, and advisory firm                   based in Tema, Greater Accra, Ghana. This policy explains what
                  information we collect through {siteUrl.replace('https://', '')}, why, and the choices you have.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2">2. Information we collect</h2>
                <p className="mb-2">We collect information in three ways:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-hrc-blue">Information you give us directly</strong> — name, email,
                    phone number, and message content when you use our contact form, booking form, or newsletter
                    signup.
                  </li>
                  <li>
                    <strong className="text-hrc-blue">Automatic analytics</strong> — anonymised, aggregate usage
                    data (pages viewed, general location, device type) via Google Analytics, used to understand
                    how the site is used.
                  </li>
                  <li>
                    <strong className="text-hrc-blue">Marketing cookies (only with your consent)</strong> — if you
                    accept the cookie banner, we use Meta Pixel and Google Ads to understand ad performance and
                    show you relevant HRC ads on other sites. These do not load until you click
                    &quot;Accept&quot;.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2">3. How we use your information</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>To respond to enquiries and manage bookings/consultations</li>
                  <li>To send the newsletter or requested resources, if you opt in</li>
                  <li>To manage our client relationships via our CRM (HubSpot)</li>
                  <li>To improve the website and measure marketing effectiveness</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2">4. Who we share it with</h2>
                <p className="mb-2">
                  We share personal data with the following service providers, solely to operate the site and our
                  business:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong className="text-hrc-blue">HubSpot</strong> — CRM for managing enquiries and client relationships</li>
                  <li><strong className="text-hrc-blue">Resend</strong> — transactional email delivery</li>
                  <li><strong className="text-hrc-blue">Calendly</strong> — appointment scheduling</li>
                  <li><strong className="text-hrc-blue">Google (Analytics, Ads)</strong> and <strong className="text-hrc-blue">Meta</strong> — only after marketing cookie consent</li>
                </ul>
                <p className="mt-2">We do not sell personal data to third parties.</p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2">5. Your choices</h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>You can accept or reject marketing cookies at any time via the cookie banner (clearing your browser storage will show it again).</li>
                  <li>You can unsubscribe from the newsletter using the link in any email.</li>
                  <li>You can request access to, correction of, or deletion of your personal data by contacting us below.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2">6. Data retention</h2>
                <p>
                  We keep contact and enquiry records for as long as needed to manage our relationship with you
                  and for legitimate business record-keeping, after which they are deleted or anonymised.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2">7. Contact us</h2>
                <p>
                  Questions about this policy or a request regarding your personal data can be sent to{' '}
                  <a href="mailto:info@hrcghana.com" className="text-hrc-red underline">info@hrcghana.com</a> or
                  by calling{' '}
                  <a href="tel:0302907115" className="text-hrc-red underline">0302907115</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
}
