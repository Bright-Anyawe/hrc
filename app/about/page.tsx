import type { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'About Us | Hedge Resource Centre Ghana',
  description:
    'Hedge Resource Centre (HRC Ghana) has been a leader in resource consulting since 2004. Learn about our mission, vision, core values, and commitment to Quality Education, Poverty Reduction, and Sustainable Communities in Ghana.',
  keywords: [
    'about HRC Ghana',
    'about Hedge Resource Centre',
    'HRC history since 2004',
    'resource consulting company Ghana',
    'consulting firm Accra',
    'HRC mission vision values',
    'professional development company Ghana',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Hedge Resource Centre | HRC Ghana Since 2004',
    description:
      'Since 2004, Hedge Resource Centre has delivered quality consulting, training, and skills development across Ghana. Discover our mission, vision, and core values.',
    url: 'https://www.hrcghana.com/about',
  },
};

export default function AboutPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <PageHero
          title="About Us"
          subtitle="Learn more about our company"
          backgroundImage="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <AboutSection />
      </main>
    </AnimatedPage>
  );
}
