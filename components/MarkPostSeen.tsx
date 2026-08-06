'use client';

import { useEffect } from 'react';
import { markSeen } from '@/lib/blog-nudge';

/**
 * Marks the current article as "seen" in the visitor's localStorage so the
 * new-post toast/badge don't nag them while they're already reading the post.
 */
const MarkPostSeen = ({ slug }: { slug: string }) => {
  useEffect(() => {
    markSeen(slug);
  }, [slug]);

  return null;
};

export default MarkPostSeen;