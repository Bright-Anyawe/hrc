import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import AnimatedPage from '@/components/AnimatedPage';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Hedge Resource Centre (HRC) | Leader in Resource Consulting Ghana',
  description:
    'Hedge Resource Centre (HRC Ghana) — Over 15 years empowering businesses and individuals through expert training, skills development, research, and consulting services in Accra, Ghana. Call 0302907115.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Hedge Resource Centre (HRC) | Resource Consulting Ghana',
    description:
      'HRC Ghana is the leader in resource consulting — training, TVET, advisory, research, and more. Serving 1000+ clients since 2004. Based in Accra, Ghana.',
    url: 'https://www.hrcghana.com',
  },
};

export default function Home() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUs />
        <ContactSection />
      </main>
    </AnimatedPage>
  );
}
