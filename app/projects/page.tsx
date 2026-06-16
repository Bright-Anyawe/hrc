import type { Metadata } from 'next';
import ProductsClientsProjects from '@/components/ProductsClientsProjects';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'Projects, Products & Clients | Hedge Resource Centre Ghana',
  description:
    'Explore HRC Ghana\'s impactful projects: FITT, Micro Entrepreneurship, CPD For All, Rural CTS, CDBOKS. Serving 1000+ clients across Ghana including executives, graduates, SMEs, entrepreneurs and corporates. Over 50 products delivered since 2004.',
  keywords: [
    'HRC projects Ghana',
    'FITT project Ghana',
    'micro entrepreneurship project Ghana',
    'CPD for all project',
    'rural CTS project Ghana',
    'CDBOKS project Ghana',
    'HRC clients Ghana',
    'HRC products Ghana',
    'consulting projects Ghana',
    'community development Ghana',
    'Hedge Resource Centre projects',
    'HRC Ghana portfolio',
    'HRC past projects',
    'HRC successful projects Ghana',
  ],
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'HRC Ghana Projects, Products & Clients',
    description:
      'Explore Hedge Resource Centre\'s impactful projects, diverse product offerings, and the wide range of clients we serve across Ghana and beyond.',
    url: `${siteUrl}/projects`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${siteUrl}/projects/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/projects` },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AnimatedPage>
        <main className="min-h-screen">
          <PageHero
            title="Our Projects"
            subtitle="A showcase of our work"
            backgroundImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <ProductsClientsProjects />
        </main>
      </AnimatedPage>
    </>
  );
}
