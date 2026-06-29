import type { Metadata } from 'next';
import { Phone } from 'lucide-react';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';
import BookingWidget from '@/components/BookingWidget';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'Book an Appointment | Hedge Resource Centre Ghana',
  description:
    'Schedule a consultation with HRC Ghana (Hedge Resource Centre). Choose from expert services — Training, Skills Development (TVET), Research, Assessment, Advisory & more. Book online instantly or call 0302907115.',
  keywords: [
    'book appointment HRC Ghana',
    'schedule consultation Ghana',
    'HRC Ghana booking',
    'Hedge Resource Centre appointment',
    'book training consultation',
    'business consulting appointment Accra',
    'HRC schedule meeting',
    'professional development booking Ghana',
    'HRC consultation booking',
    'HRC Ghana appointment',
    'resource consulting booking Accra',
  ],
  alternates: { canonical: '/booking' },
  openGraph: {
    title: 'Book an Appointment | Hedge Resource Centre Ghana',
    description:
      'Schedule your consultation with HRC Ghana. Select a service, choose your preferred date and time, and we will take care of the rest.',
    url: `${siteUrl}/booking`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${siteUrl}/booking/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Book Appointment', item: `${siteUrl}/booking` },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${siteUrl}/booking/#howto`,
  name: 'How to Book a Consultation with HRC Ghana',
  description: 'Follow these simple steps to book a consultation with Hedge Resource Centre Ghana for training, skills development, or business advisory services.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select a Service',
      text: 'Choose from our range of services including Training & Tutoring, Skills Development, Administrative Support, Research, Assessment, or Advisory Services.',
      url: `${siteUrl}/services`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter Your Details',
      text: 'Provide your contact information including your name, email address, phone number, and any notes about your specific needs.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Pick a Date & Time',
      text: 'Select a convenient date and time for your consultation using our online scheduling calendar. We offer weekday and Saturday appointments.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Confirm Your Booking',
      text: 'Review your booking details and confirm. You will receive a confirmation email with all the information you need for your consultation.',
    },
  ],
  totalTime: 'PT10M',
  tool: [
    {
      '@type': 'HowToTool',
      name: 'Internet-connected device',
    },
  ],
};

export default function BookingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <AnimatedPage>
        <main className="min-h-screen">
          <PageHero
            title="Book an Appointment"
            subtitle="Schedule your consultation"
            backgroundImage="https://images.pexels.com/photos/5673488/pexels-photo-5673488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />

          {/* Booking Section */}
          <section className="py-10 sm:py-12 md:py-14 bg-gray-50 overflow-visible">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section header */}
              <div className="text-center mb-10 sm:mb-16">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="block w-8 h-px bg-hrc-red" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">
                    Book Now
                  </span>
                  <span className="block w-8 h-px bg-hrc-red" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hrc-blue mb-3 sm:mb-4">
                  Let&apos;s Get Started
                </h2>
                <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
                  Select a service, tell us a bit about yourself, and pick a time that works for you.
                </p>
              </div>

              {/* Widget */}
              <BookingWidget />
            </div>
          </section>

          {/* Info strip */}
          <section className="py-8 bg-hrc-blue text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div>
                  <h3 className="text-lg font-bold mb-1">Need help scheduling?</h3>
                  <p className="text-sm text-gray-300">
                    Call us anytime during business hours and we will be happy to assist.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:0302907115"
                    className="bg-white text-hrc-blue px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 text-sm"
                  >
                    <Phone size={16} /> 0302907115
                  </a>
                  <a
                    href="tel:0591481815"
                    className="border-2 border-white text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-hrc-blue transition-colors inline-flex items-center justify-center gap-2 text-sm"
                  >
                    <Phone size={16} /> 0591481815
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </AnimatedPage>
    </>
  );
}
