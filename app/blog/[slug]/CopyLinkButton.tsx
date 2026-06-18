'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface CopyLinkButtonProps {
  url: string;
}

export default function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
    >
      {copied ? (
        <>
          <Check size={16} className="text-green-500" />
          <span className="text-green-600 font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={16} />
          <span className="text-gray-600 hover:text-hrc-red">Copy link to share</span>
        </>
      )}
    </button>
  );
}
