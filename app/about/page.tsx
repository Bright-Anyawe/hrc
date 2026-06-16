import type { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'About Us | Hedge Resource Centre Ghana — Since 2004',
  description:
    'Learn about HRC Ghana (Hedge Resource Centre) — Since 2004, a leader in resource consulting, professional training, and skills development. Our mission is Quality Education, Poverty Reduction, Industry Innovation & Sustainable Communities in Ghana.',
  keywords: [
    'about HRC Ghana',
    'about Hedge Resource Centre',
    'HRC history since 2004',
    'resource consulting company Ghana',
    'consulting firm Accra',
    'HRC mission vision values',
    'professional development company Ghana',
    'HRC Ghana about us',
    'Hedge Resource Centre team',
    'resource centre Ghana history',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Hedge Resource Centre | HRC Ghana Since 2004',
    description:
      'Since 2004, Hedge Resource Centre has delivered quality consulting, training, and skills development across Ghana. Discover our mission, vision, and core values.',
    url: `${siteUrl}/about`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${siteUrl}/about/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${siteUrl}/about` },
  ],
};

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${siteUrl}/about/#aboutpage`,
  name: 'About Hedge Resource Centre Ghana',
  description: 'Learn about HRC Ghana\'s history, mission, vision, and core values since 2004.',
  mainEntity: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
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
    </>
  );
}
