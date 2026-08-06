'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { PostMeta } from '@/lib/posts';
import { hasUnseenPost } from '@/lib/blog-nudge';

interface NewBlogBadgeProps {
  post: PostMeta | null;
}

/**
 * Small pulsing "NEW" pill shown next to the Blog links when there's an
 * unread post. Hides itself on the blog page and on the post itself.
 */
const NewBlogBadge = ({ post }: NewBlogBadgeProps) => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!post) {
      setShow(false);
      return;
    }
    const onBlog = pathname === '/blog' || pathname === `/blog/${post.slug}`;
    setShow(!onBlog && hasUnseenPost(post.slug));
  }, [post, pathname]);

  if (!post || !show) return null;

  return (
    <span className="inline-flex items-center ml-2 my-auto px-1.5 py-0.5 rounded-full bg-hrc-red text-white text-[9px] font-bold tracking-wider uppercase animate-pulse">
      New
    </span>
  );
};

export default NewBlogBadge;