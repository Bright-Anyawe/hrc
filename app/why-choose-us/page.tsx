import type { Metadata } from 'next';
import WhyChooseUs from '@/components/WhyChooseUs';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'Why Choose HRC Ghana | Outstanding Service & 15+ Years Experience',
  description:
    'Discover why HRC Ghana (Hedge Resource Centre) is Ghana\'s preferred resource consulting firm. Outstanding service, absolute reliability, innovation, 15+ years proven expertise, and 98% client satisfaction. Call 0302907115.',
  keywords: [
    'why choose HRC Ghana',
    'best consulting firm Ghana',
    'reliable consulting Ghana',
    'experienced consultants Ghana',
    'professional consulting Accra',
    'HRC track record',
    'trusted resource consulting Ghana',
    '15 years experience Ghana consulting',
    'HRC client satisfaction',
    'HRC why choose us',
    'Hedge Resource Centre advantages',
    'top consulting firm Ghana',
    'HRC Ghana reliability',
  ],
  alternates: { canonical: '/why-choose-us' },
  openGraph: {
    title: 'Why Choose Hedge Resource Centre | Ghana\'s Trusted Consulting Partner',
    description:
      'With 15+ years of experience, 98% client satisfaction, and a proven track record, HRC Ghana is the trusted partner for professional development and consulting.',
    url: `${siteUrl}/why-choose-us`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${siteUrl}/why-choose-us/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Why Choose Us', item: `${siteUrl}/why-choose-us` },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${siteUrl}/why-choose-us/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why choose HRC Ghana for resource consulting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HRC Ghana (Hedge Resource Centre) has over 15 years of experience, a 98% client satisfaction rate, and a proven track record of delivering outstanding service, reliability, innovation, and strategic support for businesses and individuals across Ghana.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Hedge Resource Centre different from other consulting firms in Ghana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HRC stands out for its absolute reliability, innovative and creative solutions, strong support for business ideas, and over 15 years of hands-on experience in resource consulting, professional training, and skills development in Ghana.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many clients has HRC Ghana served?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hedge Resource Centre has served over 1,000 clients including executives, graduates, entrepreneurs, SMEs, corporations, students, and government institutions across Ghana.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is HRC Ghana\'s client satisfaction rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HRC Ghana maintains a 98% client satisfaction rate, reflecting our commitment to quality service delivery and exceptional results.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is HRC Ghana a reliable consulting firm in Accra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Hedge Resource Centre (HRC) is one of the most reliable consulting firms based in Accra, Ghana, with a consistent track record of meeting deadlines and commitments since 2004.',
      },
    },
  ],
};

export default function WhyChooseUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AnimatedPage>
        <main className="min-h-screen">
          <PageHero
            title="Why Choose Us"
            subtitle="Discover the advantages of working with us"
            backgroundImage="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <WhyChooseUs />
        </main>
      </AnimatedPage>
    </>
  );
}
