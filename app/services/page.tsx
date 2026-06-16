import type { Metadata } from 'next';
import ServicesSection from '@/components/ServicesSection';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'Our Services | HRC Ghana — Training, Skills Development & Consulting',
  description:
    'HRC Ghana services: Staff Training & Tutoring, TVET Skills Development, Administrative Support, Research, Assessment & Advisory. Professional business consulting in Accra, Ghana since 2004. Call 0302907115.',
  keywords: [
    'HRC Ghana services',
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
    'HRC training programs',
    'HRC consulting services Ghana',
    'Hedge Resource Centre services',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'HRC Ghana Services — Training, Skills Development & Consulting',
    description:
      'HRC Ghana offers expert training, TVET skills development, administrative support, research, assessment, and advisory services for individuals, businesses, and communities across Ghana.',
    url: `${siteUrl}/services`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${siteUrl}/services/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
  ],
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${siteUrl}/services/#services`,
  name: 'HRC Ghana Services',
  description: 'Comprehensive professional services offered by Hedge Resource Centre Ghana',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Training & Tutoring',
        description: 'Staff training, career training, continuing professional development (CPD), and tutorial classes.',
        provider: { '@id': `${siteUrl}/#organization` },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Skills Development',
        description: 'Micro entrepreneurship skills, TVET skills, and critical technical skills development.',
        provider: { '@id': `${siteUrl}/#organization` },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Administrative Support',
        description: 'Planning and management, finance and accounting, HR management, IT services, and sales and marketing support.',
        provider: { '@id': `${siteUrl}/#organization` },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Research Services',
        description: 'Academic research, industry analysis, community profiling, and technical writing services.',
        provider: { '@id': `${siteUrl}/#organization` },
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Service',
        name: 'Assessment Services',
        description: 'Educational assessment, career assessment, community assessment, and business assessment services.',
        provider: { '@id': `${siteUrl}/#organization` },
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'Service',
        name: 'Advisory Services',
        description: 'Recruitment and placement, business formation, HR development, project management, and funding strategies.',
        provider: { '@id': `${siteUrl}/#organization` },
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
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
    </>
  );
}
