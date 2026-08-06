'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, ArrowRight, Newspaper } from 'lucide-react';
import type { PostMeta } from '@/lib/posts';
import { hasUnseenPost, markSeen } from '@/lib/blog-nudge';

function formatPrettyDate(dateStr: string): string {
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

interface NewBlogToastProps {
  post: PostMeta | null;
}

/**
 * Floating toast announcing the newest blog post to returning visitors.
 * Shows once per new post (tracked in localStorage), then disappears.
 */
const NewBlogToast = ({ post }: NewBlogToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!post) return;
    if (!hasUnseenPost(post.slug)) return;

    // Small delay so it doesn't compete with the hero section.
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, [post]);

  if (!post || !visible) return null;

  const handleDismiss = () => {
    markSeen(post.slug);
    setVisible(false);
  };

  const handleOpen = () => {
    markSeen(post.slug);
    setVisible(false);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-[70] w-[calc(100vw-2rem)] max-w-sm animate-slide-up"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">
        {/* Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-hrc-red via-[#e6a700] to-hrc-blue" />

        <div className="flex items-center justify-between px-4 pt-4">
          <span className="inline-flex items-center gap-1.5 bg-hrc-red/10 text-hrc-red text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
            <Newspaper size={12} />
            New Article
          </span>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss new article notice"
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-start gap-3 px-4 py-3">
          {post.image && (
            <div className="hidden sm:block w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="min-w-0">
            <Link
              href={`/blog/${post.slug}`}
              onClick={handleOpen}
              className="block font-bold text-sm text-hrc-blue hover:text-hrc-red transition-colors duration-200 leading-snug line-clamp-2"
            >
              {post.title}
            </Link>
            <p className="text-[11px] text-gray-500 mt-1">
              {formatPrettyDate(post.date)} &middot; {post.category}
            </p>
          </div>
        </div>

        <div className="px-4 pb-4">
          <Link
            href={`/blog/${post.slug}`}
            onClick={handleOpen}
            className="inline-flex items-center gap-1.5 bg-hrc-red hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
          >
            Read Now
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewBlogToast;
