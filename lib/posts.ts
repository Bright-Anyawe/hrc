import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
}

/**
 * Parse a single markdown file into a Post object.
 */
function parsePostFile(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, '');
  const filePath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? '',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    author: data.author ?? 'HRC Ghana Team',
    category: data.category ?? 'Uncategorized',
    image: data.image ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
  };
}

/**
 * Get all posts sorted by date (newest first).
 */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

  return files
    .map(parsePostFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single post by its slug.
 */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parsePostFile(`${slug}.md`);
}

/**
 * Get all slugs (for generateStaticParams).
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

/**
 * Get post metadata only (lighter than loading full content).
 */
export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt ?? '',
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        author: data.author ?? 'HRC Ghana Team',
        category: data.category ?? 'Uncategorized',
        image: data.image ?? '',
        tags: Array.isArray(data.tags) ? data.tags : [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Format a date string for display (e.g., "18 June 2026").
 */
export function formatPostDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
