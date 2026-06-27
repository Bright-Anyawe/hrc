import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import AnimatedPage from '@/components/AnimatedPage';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Hedge Resource Centre (HRC) | Leader in Resource Consulting Ghana',
  description:
    'HRC Ghana (Hedge Resource Centre) — Ghana\'s #1 resource consulting firm since 2004. Expert training, TVET skills development, business advisory, research, assessment & recruitment in Accra. Trusted by 1000+ clients. Call 0302907115.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Hedge Resource Centre (HRC) | Resource Consulting Ghana',
    description:
      'HRC Ghana is the leader in resource consulting — training, TVET, advisory, research, and more. Serving 1000+ clients since 2004. Based in Accra, Ghana. Call 0302907115.',
    url: 'https://www.hrcghana.com',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://www.hrcghana.com/#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hrcghana.com' },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AnimatedPage>
        <main className="min-h-screen">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TestimonialsSection />
          <WhyChooseUs />
          <ContactSection />
        </main>
      </AnimatedPage>
    </>
  );
}
