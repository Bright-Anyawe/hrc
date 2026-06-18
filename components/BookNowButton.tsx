'use client';

import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

const BookNowButton = () => {
  const pathname = usePathname();
  if (pathname === '/booking' || pathname.startsWith('/booking/')) return null;

  return (
    <Link
      href="/booking"
      onClick={() => trackEvent('booking_started', { service: 'cta-button' })}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-hrc-red hover:bg-red-700 text-white pl-5 pr-6 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 text-sm font-semibold tracking-wide"
      aria-label="Book an appointment"
    >
      <Calendar size={18} />
      Book Now
    </Link>
  );
};

export default BookNowButton;
