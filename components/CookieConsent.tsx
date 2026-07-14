'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStoredConsent, setStoredConsent } from '@/lib/consent';

/**
 * Cookie / marketing consent banner.
 *
 * Shown once until the visitor makes a choice. Gates MarketingPixels.tsx —
 * nothing in that component fires until `hasMarketingConsent()` is true.
 */
const CookieConsent = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(getStoredConsent() === null);
  }, []);

  const handleChoice = (choice: 'accepted' | 'rejected') => {
    setStoredConsent(choice);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] animate-slide-up"
    >
      <div className="mx-auto max-w-4xl m-3 sm:m-4 rounded-2xl bg-white shadow-2xl border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-lg bg-hrc-red/10 text-hrc-red flex-shrink-0">
              <Cookie size={20} />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We use cookies for site analytics and, if you agree, to show you relevant ads on
              other sites (Meta and Google). You can change your mind anytime.{' '}
              <Link href="/privacy" className="underline hover:text-hrc-red">
                Privacy policy
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0 justify-end">
            <Button
              onClick={() => handleChoice('rejected')}
              variant="outline"
              className="rounded-full text-xs sm:text-sm px-4 sm:px-5"
            >
              Reject
            </Button>
            <Button
              onClick={() => handleChoice('accepted')}
              className="bg-hrc-red hover:bg-red-700 text-white rounded-full text-xs sm:text-sm px-4 sm:px-5"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
