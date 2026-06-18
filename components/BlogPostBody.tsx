'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface BlogPostBodyProps {
  content: string;
}

/**
 * Custom markdown renderers that apply HRC-branded styles.
 */
const markdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl sm:text-4xl font-bold text-hrc-blue mt-8 mb-4 leading-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl sm:text-3xl font-bold text-hrc-blue mt-10 mb-3 leading-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl sm:text-2xl font-bold text-hrc-blue mt-8 mb-3 leading-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-lg sm:text-xl font-bold text-hrc-blue mt-6 mb-2" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 mb-4 space-y-1.5 text-base sm:text-lg text-gray-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-base sm:text-lg text-gray-700" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-base sm:text-lg text-gray-700 leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-hrc-red bg-red-50 pl-4 sm:pl-6 py-3 pr-4 my-6 rounded-r-lg italic text-gray-700 text-base sm:text-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-hrc-red font-medium hover:text-red-800 underline underline-offset-2 transition-colors duration-200"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-hrc-blue" {...props}>
      {children}
    </strong>
  ),
  hr: (props) => <hr className="my-8 border-gray-200" {...props} />,
  img: ({ src, alt, ...props }) => (
    <div className="my-6 rounded-xl overflow-hidden shadow-lg">
      <img
        src={src}
        alt={alt ?? ''}
        className="w-full h-auto object-cover"
        loading="lazy"
        {...props}
      />
    </div>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-lg shadow-sm border border-gray-200">
      <table className="w-full text-sm sm:text-base" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="bg-hrc-blue text-white font-semibold px-4 py-3 text-left" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 border-t border-gray-100 text-gray-700" {...props}>
      {children}
    </td>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-gray-100 text-hrc-red px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 sm:p-6 overflow-x-auto my-6 text-sm" {...props}>
      {children}
    </pre>
  ),
};

export default function BlogPostBody({ content }: BlogPostBodyProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
