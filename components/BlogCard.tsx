import Link from 'next/link';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import type { PostMeta } from '@/lib/posts';
import { formatPostDate } from '@/lib/posts';

interface BlogCardProps {
  post: PostMeta;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <article
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 animate-fade-in"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Card Image */}
      <Link href={`/blog/${post.slug}`} className="block relative h-48 sm:h-56 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-hrc-red text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {post.category}
        </span>
      </Link>

      {/* Card Body */}
      <div className="p-5 sm:p-6">
        {/* Date & Reading Time */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatPostDate(post.date)}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-lg sm:text-xl font-bold text-hrc-blue mb-2 leading-snug group-hover:text-hrc-red transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags & Read More */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-hrc-red hover:text-red-800 transition-colors duration-300"
          >
            Read More
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
