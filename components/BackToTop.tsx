'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { usePathname } from 'next/navigation';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isBookingPage = pathname === '/booking' || pathname.startsWith('/booking/');

  useEffect(() => {
    if (isBookingPage) return;
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isBookingPage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-hrc-red hover:bg-red-700 text-white p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg animate-bounce"
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
};

export default BackToTop;