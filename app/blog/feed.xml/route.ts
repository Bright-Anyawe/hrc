import { NextResponse } from 'next/server';
import { getAllPostsMeta } from '@/lib/posts';

const SITE_URL = 'https://www.hrcghana.com';

/**
 * GET /blog/feed.xml
 *
 * Generates an RSS 2.0 feed of all blog posts.
 */
export async function GET() {
  const posts = getAllPostsMeta();

  const feedItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      <author>${post.author}</author>
    </item>`,
    )
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HRC Ghana Blog — Professional Development &amp; Consulting Insights</title>
    <link>${SITE_URL}/blog</link>
    <description>Expert insights from Hedge Resource Centre (HRC) Ghana on professional development, training, TVET skills, business consulting, and career growth.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo_page-0001.jpg</url>
      <title>HRC Ghana Blog</title>
      <link>${SITE_URL}/blog</link>
    </image>
    ${feedItems}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
