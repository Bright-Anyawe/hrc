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
    'TVET Ghana',
    'TVET training results Ghana',
    'vocational training testimonials',
  ],
  alternates: { canonical: '/testimonials' },
  openGraph: {
    title: 'Testimonials & Case Studies | HRC Ghana',
    description:
      'See the kind of outcomes Hedge Resource Centre engagements are designed to deliver for businesses, communities, and individuals across Ghana.',
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

// NOTE: A fabricated `Review`/`AggregateRating` schema block used to live here
// (invented names like "Satisfied Client" / "Corporate Client" with a made-up
// 4.8 rating from 150 reviews). It has been removed. Google treats review
// structured data as a factual, verifiable claim — publishing invented
// reviews violates Google's structured data guidelines and consumer
// protection norms, and risks a manual action against the whole domain.
//
// To reinstate this safely: collect real reviews (Google Business Profile is
// the simplest source), then either hardcode the real names/quotes/ratings
// here, or better, fetch them live from the Google Business Profile API /
// your review platform so the numbers can never go stale or drift from
// reality.

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AnimatedPage>
        <main className="min-h-screen">
          <PageHero
            title="Testimonials & Case Studies"
            subtitle="What our engagements are designed to deliver"
            backgroundImage="https://images.pexels.com/photos/3184651/pexels-photo-3184651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <div className="bg-amber-50 border-y border-amber-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
              <p className="text-xs sm:text-sm text-amber-800">
                The case studies below are illustrative examples of typical engagement outcomes, not
                verified client quotes. Ask us for references from current clients at{' '}
                <a href="tel:0302907115" className="font-semibold underline">
                  0302907115
                </a>
                .
              </p>
            </div>
          </div>
          <CaseStudiesSection />
        </main>
      </AnimatedPage>
    </>
  );
}
