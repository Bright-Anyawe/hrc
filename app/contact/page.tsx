import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Contact Us | Hedge Resource Centre Ghana — Call 0302907115',
  description:
    'Contact Hedge Resource Centre (HRC Ghana) today. Call 0302907115 or 0591481815, email info@hrcghana.com. Office in Accra, Ghana. Open Monday–Friday 8AM–6PM, Saturday 9AM–4PM.',
  keywords: [
    'contact HRC Ghana',
    'HRC Ghana phone number',
    'Hedge Resource Centre contact',
    'HRC Accra address',
    'resource consulting contact Ghana',
    'info@hrcghana.com',
    '0302907115',
    '0591481815',
    'consult HRC Ghana',
    'HRC business hours',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Hedge Resource Centre | HRC Ghana',
    description:
      'Get in touch with HRC Ghana. Call 0302907115 or email info@hrcghana.com. We\'re based in Accra and ready to help you achieve your professional and business goals.',
    url: 'https://www.hrcghana.com/contact',
  },
};

export default function ContactPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <PageHero
          title="Contact Us"
          subtitle="Get in touch with us"
          backgroundImage="https://images.pexels.com/photos/5673488/pexels-photo-5673488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <ContactSection />
      </main>
    </AnimatedPage>
  );
}
