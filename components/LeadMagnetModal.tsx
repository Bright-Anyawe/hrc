'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, FileText, BookOpen, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const SESSION_DISMISSED_KEY = 'hrc-lead-magnet-dismissed';
const SESSION_SHOWN_KEY = 'hrc-lead-magnet-shown';
const SCROLL_TRIGGER_RATIO = 0.6;
const TIME_TRIGGER_MS = 30_000;
const EXCLUDED_PATH_PREFIXES = ['/booking', '/admin', '/resources'];

const resources = [
  {
    href: '/resources/guide-professional-development-ghana',
    icon: BookOpen,
    title: 'Ultimate Guide to Professional Development in Ghana',
    description: 'CPD, TVET, and career planning — free.',
  },
  {
    href: '/resources/business-formation-checklist',
    icon: FileText,
    title: 'Business Formation Checklist',
    description: 'Everything you need to start a business in Ghana.',
  },
];

/**
 * Soft, non-intrusive lead-capture nudge.
 *
 * Trigger logic (whichever fires first, once per browser session):
 *   - Desktop: exit-intent (mouse leaves toward the top of the viewport)
 *   - Any device: 60% scroll depth OR 30s on page, whichever comes first
 *
 * This just points visitors to the two existing gated resource pages
 * (components/LeadMagnetGate.tsx already handles the real email capture +
 * content reveal there) rather than duplicating that flow or promising a
 * download this component can't actually deliver.
 */
const LeadMagnetModal = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasTriggeredRef = useRef(false);

  const isExcludedPath = EXCLUDED_PATH_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  useEffect(() => {
    if (isExcludedPath) return undefined;

    try {
      if (
        window.sessionStorage.getItem(SESSION_DISMISSED_KEY) ||
        window.sessionStorage.getItem(SESSION_SHOWN_KEY)
      ) {
        return undefined;
      }
    } catch {
      // Storage unavailable — fall through and allow the modal once.
    }

    const triggerOnce = (reason: string) => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setIsOpen(true);
      try {
        window.sessionStorage.setItem(SESSION_SHOWN_KEY, '1');
      } catch {
        // Non-fatal — worst case the modal can reappear this session.
      }
      trackEvent('lead_magnet_shown', { reason });
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) triggerOnce('exit-intent');
    };

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const ratio = window.scrollY / scrollableHeight;
      if (ratio >= SCROLL_TRIGGER_RATIO) triggerOnce('scroll-depth');
    };

    const timeoutId = window.setTimeout(() => triggerOnce('time-on-page'), TIME_TRIGGER_MS);

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, [isExcludedPath]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      window.sessionStorage.setItem(SESSION_DISMISSED_KEY, '1');
    } catch {
      // Non-fatal.
    }
    trackEvent('lead_magnet_dismissed');
  };

  const handleResourceClick = (title: string) => {
    trackEvent('lead_magnet_resource_clicked', { resource: title });
    try {
      window.sessionStorage.setItem(SESSION_DISMISSED_KEY, '1');
    } catch {
      // Non-fatal.
    }
  };

  if (!isOpen || isExcludedPath) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Free resources"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-slide-up"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-hrc-red transition-colors duration-300"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-2 pr-8">
          Before you go — take one of these
        </h3>
        <p className="text-sm text-gray-600 mb-5">
          Two free resources our team put together for people exploring HRC&apos;s services.
        </p>

        <div className="space-y-3">
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              onClick={() => handleResourceClick(resource.title)}
              className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-hrc-red/40 hover:bg-gray-50 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-hrc-red/10 text-hrc-red flex items-center justify-center flex-shrink-0">
                <resource.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-hrc-blue group-hover:text-hrc-red transition-colors duration-300">
                  {resource.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{resource.description}</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-hrc-red group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0 mt-1" />
            </Link>
          ))}
        </div>

        <button
          onClick={handleClose}
          className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-4 transition-colors duration-300"
        >
          No thanks, just browsing
        </button>
      </div>
    </div>
  );
};

export default LeadMagnetModal;
