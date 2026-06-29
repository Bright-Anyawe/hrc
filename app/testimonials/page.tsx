import type { Metadata } from 'next';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';
import CaseStudiesSection from '@/components/CaseStudiesSection';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'Testimonials & Case Studies | Hedge Resource Centre Ghana',
  description:
    'Read what our clients say about Hedge Resource Centre. Explore detailed case studies showcasing HRC Ghana\'s impact through training, skills development, advisory, research, and assessment services.',
  keywords: [
    'HRC Ghana testimonials',
    'Hedge Resource Centre reviews',
    'HRC case studies',
    'client testimonials Ghana',
    'HRC success stories',
    'training results Ghana',
    'skills development outcomes',
    'consulting case studies Ghana',
    'HRC client feedback',
    'Hedge Resource Centre results',
  ],
  alternates: { canonical: '/testimonials' },
  openGraph: {
    title: 'Testimonials & Case Studies | HRC Ghana',
    description:
      'Real results from real clients. Discover how Hedge Resource Centre has helped businesses, communities, and individuals across Ghana achieve measurable success.',
    url: `${siteUrl}/testimonials`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${siteUrl}/testimonials/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Testimonials', item: `${siteUrl}/testimonials` },
  ],
};

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150',
    bestRating: '5',
    ratingCount: '150',
    itemReviewed: {
      '@type': 'Organization',
      name: 'Hedge Resource Centre',
    },
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Satisfied Client',
      },
      reviewBody: 'Hedge Resource Centre has been instrumental in transforming our business operations. Their expertise, professionalism, and commitment to excellence are unmatched.',
    },
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Corporate Client',
      },
      reviewBody: 'HRC Ghana provided exceptional training services that significantly improved our team performance. Their TVET programmes are industry-leading.',
    },
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Entrepreneur',
      },
      reviewBody: 'The business advisory services at HRC Ghana helped me launch my company successfully. Their guidance on business formation and strategy was invaluable.',
    },
  ],
};

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <AnimatedPage>
        <main className="min-h-screen">
          <PageHero
            title="Testimonials & Case Studies"
            subtitle="Real results from real clients"
            backgroundImage="https://images.pexels.com/photos/3184651/pexels-photo-3184651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <CaseStudiesSection />
        </main>
      </AnimatedPage>
    </>
  );
}
