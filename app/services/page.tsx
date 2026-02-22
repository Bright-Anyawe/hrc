import type { Metadata } from 'next';
import ServicesSection from '@/components/ServicesSection';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Our Services | HRC Ghana — Training, Skills Development & Consulting',
  description:
    'Explore HRC Ghana\'s comprehensive services: Staff Training & Tutoring, Skills Development (TVET), Administrative Support, Research, Assessment, and Advisory Services. Professional solutions for individuals and businesses in Ghana.',
  keywords: [
    'training and tutoring Ghana',
    'skills development Ghana',
    'TVET Ghana',
    'staff training Ghana',
    'administrative support Ghana',
    'research services Ghana',
    'assessment services Ghana',
    'advisory services Ghana',
    'business consulting Ghana',
    'CPD Ghana',
    'micro entrepreneurship Ghana',
    'career training Ghana',
    'HRC services',
    'professional services Accra',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'HRC Ghana Services — Training, Skills Development & Consulting',
    description:
      'HRC Ghana offers expert training, TVET skills development, administrative support, research, assessment, and advisory services for individuals, businesses, and communities.',
    url: 'https://www.hrcghana.com/services',
  },
};

export default function ServicesPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <PageHero
          title="Our Services"
          subtitle="What we offer"
          backgroundImage="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <ServicesSection />
      </main>
    </AnimatedPage>
  );
}
