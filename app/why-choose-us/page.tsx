import type { Metadata } from 'next';
import WhyChooseUs from '@/components/WhyChooseUs';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Why Choose HRC Ghana | Outstanding Service & 15+ Years Experience',
  description:
    'Discover why Hedge Resource Centre is Ghana\'s preferred resource consulting firm. Outstanding service, absolute reliability, innovation, and over 15 years of proven expertise. 98% client satisfaction rate.',
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
  ],
  alternates: { canonical: '/why-choose-us' },
  openGraph: {
    title: 'Why Choose Hedge Resource Centre | Ghana\'s Trusted Consulting Partner',
    description:
      'With 15+ years of experience, 98% client satisfaction, and a proven track record, HRC Ghana is the trusted partner for professional development and consulting.',
    url: 'https://www.hrcghana.com/why-choose-us',
  },
};

export default function WhyChooseUsPage() {
  return (
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
  );
}
