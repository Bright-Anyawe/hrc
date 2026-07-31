'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealVariant = 'up' | 'left' | 'right' | 'zoom';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Direction/style the element eases in from. */
  variant?: RevealVariant;
  /** Stagger delay in milliseconds — useful when mapping over a list. */
  delayMs?: number;
  /** Reveal only the first time it enters view (default), or every time. */
  once?: boolean;
}

/**
 * Wraps content so it eases into view on scroll via IntersectionObserver.
 * The animation itself lives in globals.css (`.reveal` / `.is-visible`) and is
 * neutralised for visitors who prefer reduced motion.
 */
export default function Reveal({
  children,
  className,
  variant = 'up',
  delayMs = 0,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: if IntersectionObserver is unavailable, show content immediately
    // so it can never get stuck in the hidden pre-reveal state.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn('reveal', `reveal-${variant}`, isVisible && 'is-visible', className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
