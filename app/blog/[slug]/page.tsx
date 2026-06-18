import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, Tag, ArrowLeft, Share2, Rss } from 'lucide-react';
import AnimatedPage from '@/components/AnimatedPage';
import CopyLinkButton from './CopyLinkButton';
import BlogPostBody from '@/components/BlogPostBody';
import { getPostBySlug, getAllSlugs, formatPostDate, getAllPostsMeta } from '@/lib/posts';

const siteUrl = 'https://www.hrcghana.com';

interface Props {
  params: { slug: string };
}

// ── Dynamic metadata ──
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found | HRC Ghana' };

  return {
    title: `${post.title} | HRC Ghana Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | HRC Ghana Blog`,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image, width: 800, height: 450, alt: post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | HRC Ghana Blog`,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
    keywords: post.tags,
  };
}

// ── Static paths for ISR ──
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ── Page ──
export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // Related posts (same category, excluding current)
  const allPosts = getAllPostsMeta();
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteUrl}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: siteUrl,
    },
    publisher: { '@id': `${siteUrl}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${siteUrl}/blog/${post.slug}/#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <AnimatedPage>
        <main className="min-h-screen">
          {/* ── Back to Blog ── */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-hrc-red transition-colors duration-200"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </div>
          </div>

          {/* ── Article Header ── */}
          <div className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div className="max-w-3xl mx-auto">
                {/* Category */}
                <span className="inline-block bg-hrc-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  {post.category}
                </span>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hrc-blue leading-tight mb-4">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-hrc-red" />
                    {formatPostDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={16} className="text-hrc-red" />
                    {post.author}
                  </span>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Article Body ── */}
          <section className="py-8 sm:py-12 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                {/* Featured Image */}
                {post.image && (
                  <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
                  <BlogPostBody content={post.content} />

                  {/* Share / Subscribe */}
                  <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <CopyLinkButton url={`${siteUrl}/blog/${post.slug}`} />
                    <a
                      href="/blog/feed.xml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-hrc-red transition-colors"
                    >
                      <Rss size={16} />
                      Subscribe to RSS
                    </a>
                  </div>
                </div>

                {/* ── CTA ── */}
                <div className="mt-8 bg-gradient-to-r from-hrc-blue to-hrc-red rounded-2xl p-6 sm:p-8 text-white text-center shadow-xl">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Ready to Take the Next Step?
                  </h3>
                  <p className="text-gray-200 mb-4 max-w-lg mx-auto">
                    Let us help you achieve your professional goals with our training and consulting services.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/booking"
                      className="bg-white text-hrc-blue px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                    >
                      Book a Consultation
                    </Link>
                    <Link
                      href="/services"
                      className="border-2 border-white text-white px-6 py-2.5 rounded-full font-semibold hover:bg-white hover:text-hrc-blue transition-all duration-300"
                    >
                      Explore Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Related Posts ── */}
          {related.length > 0 && (
            <section className="py-12 sm:py-16 bg-white">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="section-header">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="block w-8 h-px bg-hrc-red" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">
                      Related
                    </span>
                    <span className="block w-8 h-px bg-hrc-red" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-hrc-blue">
                    More in {post.category}
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
                    >
                      <div
                        className="h-40 bg-cover bg-center"
                        style={{ backgroundImage: `url(${p.image})` }}
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-hrc-blue group-hover:text-hrc-red transition-colors duration-300 line-clamp-2">
                          {p.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{formatPostDate(p.date)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </AnimatedPage>
    </>
  );
}
