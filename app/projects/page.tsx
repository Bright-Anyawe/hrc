import type { Metadata } from 'next';
import ProductsClientsProjects from '@/components/ProductsClientsProjects';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Projects, Products & Clients | Hedge Resource Centre Ghana',
  description:
    'Discover HRC Ghana\'s impactful projects including FITT, Micro Entrepreneurship, CPD For All, Rural CTS, and CDBOKS. Serving over 1000 clients including executives, graduates, entrepreneurs, and corporates across Ghana.',
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
  ],
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'HRC Ghana Projects, Products & Clients',
    description:
      'Explore Hedge Resource Centre\'s impactful projects, diverse product offerings, and the wide range of clients we serve across Ghana and beyond.',
    url: 'https://www.hrcghana.com/projects',
  },
};

export default function ProjectsPage() {
  return (
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
  );
}
