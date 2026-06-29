import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, Phone, Mail } from 'lucide-react';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'Pricing & Packages | HRC Ghana — Transparent Service Packages',
  description:
    'Explore HRC Ghana pricing and service packages. Transparent pricing for training, skills development, business consulting, and advisory services. Starting from GHS 500. Contact us for custom pricing.',
  keywords: [
    'HRC Ghana pricing',
    'HRC Ghana packages',
    'training costs Ghana',
    'consulting fees Ghana',
    'business advisory pricing',
    'TVET training price',
    'professional development Ghana cost',
    'Hedge Resource Centre pricing',
  ],
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'HRC Ghana Pricing — Transparent Service Packages',
    description:
      'View our transparent pricing for training, skills development, and consulting services. Contact us for custom packages.',
    url: `${siteUrl}/pricing`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${siteUrl}/pricing/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${siteUrl}/pricing` },
  ],
};

const packages = [
  {
    name: 'Starter',
    description: 'Perfect for individuals looking for basic training and skill development.',
    price: '500',
    period: 'per session',
    color: 'border-hrc-blue',
    features: [
      'Tutorial classes (per session)',
      'Career assessment',
      'Basic skills development workshop',
      'Email support',
      'Resource materials',
    ],
    cta: 'Get Started',
    ctaLink: '/booking',
  },
  {
    name: 'Professional',
    description: 'Ideal for professionals seeking comprehensive development and CPD compliance.',
    price: '2,500',
    period: 'per programme',
    color: 'border-hrc-red',
    featured: true,
    features: [
      'Continuing Professional Development (CPD)',
      'Staff training (up to 10 participants)',
      'Career assessment & planning',
      'Business advisory consultation',
      'Priority email & phone support',
      'Certificate of completion',
      'Resource materials & guides',
    ],
    cta: 'Book Consultation',
    ctaLink: '/booking',
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for organisations, businesses, and government agencies.',
    price: 'Custom',
    period: 'tailored to your needs',
    color: 'border-hrc-blue',
    features: [
      'Custom training programmes',
      'Organisational development',
      'Research & industry analysis',
      'HR development & recruitment',
      'Project management support',
      'Dedicated account manager',
      'On-site training available',
      'Flexible payment terms',
    ],
    cta: 'Contact Us',
    ctaLink: '/contact',
  },
];

const individualServices = [
  { service: 'Tutorial Classes', price: 'From GHS 200/session' },
  { service: 'Career Assessment', price: 'From GHS 350' },
  { service: 'CPD Programme', price: 'From GHS 800/programme' },
  { service: 'Business Advisory', price: 'From GHS 500/session' },
  { service: 'TVET Skills Training', price: 'From GHS 1,200/course' },
  { service: 'Staff Training', price: 'From GHS 2,500/group' },
  { service: 'Research Services', price: 'Custom quote' },
  { service: 'Recruitment & Placement', price: 'Custom quote' },
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AnimatedPage>
        <main className="min-h-screen">
          <PageHero
            title="Pricing & Packages"
            subtitle="Transparent pricing for every need"
            backgroundImage="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />

          {/* Intro */}
          <section className="py-12 sm:py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="block w-8 h-px bg-hrc-red" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">
                    Our Pricing
                  </span>
                  <span className="block w-8 h-px bg-hrc-red" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hrc-blue mb-4">
                  Choose the Right Package
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Whether you are an individual professional, a growing business, or a large organisation,
                  we have a package that fits your needs and budget.
                </p>
              </div>

              {/* Packages Grid */}
              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                {packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`relative bg-white rounded-2xl shadow-lg border-t-4 ${pkg.color} p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                      pkg.featured ? 'ring-2 ring-hrc-red scale-105' : ''
                    }`}
                  >
                    {pkg.featured && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-hrc-red text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                        Most Popular
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2">{pkg.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{pkg.description}</p>
                      <div className="mb-2">
                        <span className="text-3xl sm:text-4xl font-bold text-hrc-blue">
                          {pkg.price === 'Custom' ? '' : 'GHS '}
                          {pkg.price}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{pkg.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check size={18} className="text-hrc-red mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={pkg.ctaLink}
                      className={`block w-full text-center py-3 rounded-full font-semibold transition-all duration-300 ${
                        pkg.featured
                          ? 'bg-hrc-red hover:bg-red-700 text-white hover:shadow-lg'
                          : 'border-2 border-hrc-blue text-hrc-blue hover:bg-hrc-blue hover:text-white'
                      }`}
                    >
                      {pkg.cta}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Individual Services Price List */}
          <section className="py-12 sm:py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="block w-8 h-px bg-hrc-red" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">
                      Individual Services
                    </span>
                    <span className="block w-8 h-px bg-hrc-red" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-hrc-blue mb-4">
                    Service Price Guide
                  </h2>
                  <p className="text-base text-gray-600 max-w-2xl mx-auto">
                    Starting prices for our individual services. Contact us for detailed quotes and custom packages.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
                  <div className="grid grid-cols-2 bg-hrc-blue text-white text-xs font-semibold tracking-wider uppercase px-6 py-3">
                    <span>Service</span>
                    <span className="text-right">Starting Price</span>
                  </div>
                  {individualServices.map((item, index) => (
                    <div
                      key={item.service}
                      className={`grid grid-cols-2 px-6 py-4 items-center ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-hrc-red/5 transition-colors duration-200`}
                    >
                      <span className="text-sm font-medium text-gray-800">{item.service}</span>
                      <span className="text-sm font-semibold text-hrc-blue text-right">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-hrc-blue mb-4">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      q: 'Do you offer payment plans?',
                      a: 'Yes, we offer flexible payment terms for enterprise clients and longer programmes. Contact us to discuss your needs.',
                    },
                    {
                      q: 'Are there discounts for group bookings?',
                      a: 'Absolutely. We offer special rates for organisations enrolling multiple participants. Get in touch for a custom quote.',
                    },
                    {
                      q: 'What is included in the consultation?',
                      a: 'Your initial consultation includes a needs assessment, service recommendations, and a detailed proposal tailored to your goals.',
                    },
                    {
                      q: 'Can I upgrade my package later?',
                      a: 'Yes, you can upgrade at any time. We will prorate the difference based on your current package.',
                    },
                  ].map((faq) => (
                    <div key={faq.q} className="bg-white rounded-xl p-5 sm:p-6 shadow-md">
                      <h4 className="font-bold text-hrc-blue mb-2">{faq.q}</h4>
                      <p className="text-sm text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-12 sm:py-16 bg-gradient-to-br from-hrc-blue to-hrc-blue/95 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                We understand every organisation is unique. Let us design a package that perfectly fits your goals and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/booking"
                  className="bg-hrc-red hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Book a Consultation
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="tel:0302907115"
                  className="border-2 border-white text-white hover:bg-white hover:text-hrc-blue px-8 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Call 0302907115
                </a>
              </div>
            </div>
          </section>
        </main>
      </AnimatedPage>
    </>
  );
}
