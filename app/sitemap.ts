import type { MetadataRoute } from 'next';
import { getAllPostsMeta } from '@/lib/posts';

const SITE_URL = 'https://www.hrcghana.com';

/**
 * Dynamic sitemap. Static routes are listed explicitly; blog posts are pulled
 * from content/posts so new articles are indexed automatically without anyone
 * having to hand-edit an XML file. Served by Next.js at /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/booking`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projects`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/why-choose-us`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/testimonials`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/scheduling`, changeFrequency: 'monthly', priority: 0.6 },
    {
      url: `${SITE_URL}/resources/guide-professional-development-ghana`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/resources/business-formation-checklist`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
  ].map((route) => ({ ...route, lastModified: now })) as MetadataRoute.Sitemap;

  const postRoutes: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
