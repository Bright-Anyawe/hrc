import type { Metadata } from 'next';
import Link from 'next/link';
import { Rss, ArrowRight } from 'lucide-react';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';
import BlogCard from '@/components/BlogCard';
import { getAllPostsMeta } from '@/lib/posts';
import type { PostMeta } from '@/lib/posts';

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  title: 'Blog | Hedge Resource Centre Ghana — Insights & Expert Advice',
  description:
    'Read expert insights from HRC Ghana on professional development, training, TVET skills, business consulting, career growth, and more. Stay informed with practical advice for individuals and businesses in Ghana.',
  keywords: [
    'HRC Ghana blog',
    'Hedge Resource Centre blog',
    'professional development Ghana',
    'career advice Ghana',
    'business consulting blog',
    'TVET insights Ghana',
    'CPD articles Ghana',
    'Ghana training blog',
    'HRC insights',
    'resource consulting blog',
    'Ghana career tips',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'HRC Ghana Blog — Professional Development & Consulting Insights',
    description:
      'Expert articles on training, career growth, business consulting, TVET skills, and professional development in Ghana from Hedge Resource Centre.',
    url: `${siteUrl}/blog`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${siteUrl}/blog/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
  ],
};

// Group posts by category
function groupByCategory(posts: PostMeta[]): Record<string, PostMeta[]> {
  const groups: Record<string, PostMeta[]> = {};
  for (const post of posts) {
    const cat = post.category || 'Uncategorized';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(post);
  }
  return groups;
}

export default function BlogPage({
  searchParams,
}: {
  searchParams?: { cat?: string };
}) {
  const allPosts = getAllPostsMeta();
  const activeCategory = searchParams?.cat || null;

  // Filter by category if specified
  const filteredPosts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  const featured = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remaining = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];
  const categories = groupByCategory(allPosts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': `${siteUrl}/blog/#blog`,
          name: 'HRC Ghana Blog',
          description: 'Expert insights on professional development, training, and business consulting in Ghana.',
          url: `${siteUrl}/blog`,
          publisher: { '@id': `${siteUrl}/#organization` },
        }) }}
      />
      <AnimatedPage>
        <main className="min-h-screen">
          <PageHero
            title="Our Blog"
            subtitle="Insights & expert advice"
            backgroundImage="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />

          {filteredPosts.length === 0 ? (
            /* ── Empty state ── */
            <section className="py-16 sm:py-20 bg-gray-50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-md mx-auto bg-white rounded-2xl p-10 shadow-lg">
                  <div className="w-16 h-16 bg-hrc-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rss size={32} className="text-hrc-red" />
                  </div>
                  <h2 className="text-2xl font-bold text-hrc-blue mb-2">Coming Soon</h2>
                  <p className="text-gray-500 mb-6">
                    We are working on our first articles. Check back soon for expert insights on professional
                    development, training, and business consulting in Ghana.
                  </p>
                  <Link
                    href="/"
                    className="bg-hrc-red hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Back to Home
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            <>
              {/* ── Featured Post ── */}
              {featured && (
                <section className="py-12 sm:py-16 bg-gray-50">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="section-header">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="block w-8 h-px bg-hrc-red" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">
                          Latest Article
                        </span>
                        <span className="block w-8 h-px bg-hrc-red" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hrc-blue mb-3 sm:mb-4">
                        Featured Post
                      </h2>
                    </div>

                    {/* Featured Card — takes full width */}
                    <div className="max-w-4xl mx-auto">
                      <BlogCard post={featured} index={0} />
                    </div>
                  </div>
                </section>
              )}

              {/* ── All Posts Grid ── */}
              {remaining.length > 0 && (
                <section className="py-12 sm:py-16 bg-white">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="section-header">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="block w-8 h-px bg-hrc-red" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">
                          All Articles
                        </span>
                        <span className="block w-8 h-px bg-hrc-red" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hrc-blue mb-3 sm:mb-4">
                        More Insights
                      </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {remaining.map((post, i) => (
                        <BlogCard key={post.slug} post={post} index={i} />
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ── Browse by Category ── */}
              <section className="py-12 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="section-header">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className="block w-8 h-px bg-hrc-red" />
                      <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">
                        Categories
                      </span>
                      <span className="block w-8 h-px bg-hrc-red" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hrc-blue mb-3 sm:mb-4">
                      Browse by Topic
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {Object.entries(categories).map(([category, catPosts]) => (
                      <Link
                        key={category}
                        href={`/blog?cat=${encodeURIComponent(category)}`}
                        className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 text-center"
                      >
                        <div className="w-12 h-12 bg-hrc-red text-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-lg font-bold">{category.charAt(0)}</span>
                        </div>
                        <h3 className="font-bold text-hrc-blue group-hover:text-hrc-red transition-colors duration-300">
                          {category}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {catPosts.length} {catPosts.length === 1 ? 'article' : 'articles'}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── RSS Subscribe CTA ── */}
              <section className="py-12 bg-hrc-blue text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <Rss size={32} className="mx-auto mb-4 text-yellow-300" />
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">Stay Updated</h3>
                  <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                    Subscribe to our RSS feed to get notified when we publish new articles.
                  </p>
                  <a
                    href="/blog/feed.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-hrc-blue px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                  >
                    <Rss size={18} />
                    Subscribe to RSS
                  </a>
                </div>
              </section>
            </>
          )}
        </main>
      </AnimatedPage>
    </>
  );
}
