import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import AnimatedPage from '@/components/AnimatedPage';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ResourcesSection from '@/components/ResourcesSection';
import ContactSection from '@/components/ContactSection';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'HRC Ghana | Hedge Resource Centre — Leader in Resource Consulting Ghana',
  description:
    'What is HRC Ghana? Hedge Resource Centre is Ghana\'s #1 resource consulting firm since 2004. We offer professional training, TVET skills development, business advisory, research, assessment, recruitment, and CPD programmes in Accra. Trusted by 1000+ clients. Call 0302907115.',
  keywords: [
    'HRC Ghana',
    'Hedge Resource Centre',
    'resource consulting Ghana',
    'professional training Ghana',
    'TVET Ghana',
    'TVET services Ghana',
    'TVET training Ghana',
    'TVET programmes Ghana',
    'Ghana TVET services',
    'Ghana TVET headquarters',
    'vocational training Ghana',
    'vocational education Ghana',
    'Technical and Vocational Education and Training Ghana',
    'business advisory Accra',
    'skills development Ghana',
    'CPD Ghana',
    'staff training Ghana',
    'best consulting firm Ghana',
    'top training company Ghana',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'HRC Ghana | Hedge Resource Centre — Resource Consulting Ghana',
    description:
      'What services does HRC Ghana offer? Professional training, TVET skills development, business advisory, research, assessment, and recruitment. Serving 1000+ clients since 2004 in Accra, Ghana. Call 0302907115.',
    url: siteUrl,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${siteUrl}/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${siteUrl}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does HRC Ghana offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HRC Ghana offers six core services: Training & Tutoring (staff training, career training, CPD, tutorial classes), Skills Development (TVET, micro entrepreneurship, critical technical skills), Administrative Support, Research Services, Assessment Services, and Advisory Services (recruitment, business formation, HR development, project management).',
      },
    },
    {
      '@type': 'Question',
      name: 'How long has Hedge Resource Centre been operating?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hedge Resource Centre (HRC Ghana) has been operating since 2004, providing resource consulting, professional training, and skills development services for over 20 years.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is HRC Ghana located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:         'HRC Ghana is located inside the Peretech Business Center, Redemption Street, Community 9, Tema, Ghana. You can reach us at 0302907115 or 0591481815, or email info@hrcghana.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I book a consultation with HRC Ghana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can book a consultation by visiting our booking page at hrcghana.com/booking, calling us at 0302907115, or emailing info@hrcghana.com. We offer flexible scheduling including weekday and Saturday appointments.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is TVET skills development at HRC Ghana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TVET (Technical and Vocational Education and Training) at HRC Ghana provides hands-on, industry-relevant training in sectors like construction, agro-processing, IT, renewable energy, and hospitality. Our programmes bridge the skills gap and prepare graduates for employment.',
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
      name: 'What makes HRC Ghana the best consulting firm in Ghana?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HRC Ghana stands out with 20+ years of experience, 98% client satisfaction, comprehensive service offerings, and a proven track record of delivering results. We combine local expertise with international standards to provide exceptional resource consulting.',
      },
    },
  ],
};

export default function Home() {
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
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TestimonialsSection />
          <WhyChooseUs />
          <ResourcesSection />
          <ContactSection />
        </main>
      </AnimatedPage>
    </>
  );
}
