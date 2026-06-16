import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'Contact HRC Ghana | Hedge Resource Centre — Call 0302907115',
  description:
    'Contact HRC Ghana (Hedge Resource Centre) today. Call 0302907115 or 0591481815, email info@hrcghana.com. Office in Accra, Ghana serving individuals, businesses & communities. Open Mon-Fri 8AM-6PM, Sat 9AM-4PM.',
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
    'HRC Ghana email',
    'Hedge Resource Centre Accra location',
    'HRC customer service Ghana',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Hedge Resource Centre | HRC Ghana',
    description:
      'Get in touch with HRC Ghana. Call 0302907115 or email info@hrcghana.com. We\'re based in Accra and ready to help you achieve your professional and business goals.',
    url: `${siteUrl}/contact`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${siteUrl}/contact/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
    </>
  );
}
