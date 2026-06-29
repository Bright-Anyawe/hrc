'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Download, BookOpen, ClipboardCheck, ArrowRight } from 'lucide-react';

const resources = [
  {
    title: 'Ultimate Guide to Professional Development in Ghana',
    description:
      'CPD requirements, career planning framework, TVET pathways, personal branding strategies, and actionable next steps for Ghanaian professionals.',
    icon: BookOpen,
    href: '/resources/guide-professional-development-ghana',
    label: 'Download Free Guide',
  },
  {
    title: 'Business Formation Checklist for Ghana',
    description:
      'A complete step-by-step checklist covering pre-registration, incorporation, licences, financial setup, and launch — tailored for entrepreneurs in Ghana.',
    icon: ClipboardCheck,
    href: '/resources/business-formation-checklist',
    label: 'Download Free Checklist',
  },
];

export default function ResourcesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    resources.map(() => false),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index,
            );
            if (!isNaN(index)) {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 },
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    if (cards) {
      cards.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="block w-8 h-px bg-hrc-red" />
            <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">
              Free Resources
            </span>
            <span className="block w-8 h-px bg-hrc-red" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hrc-blue mb-3 sm:mb-4">
            Download Our Free Guides
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Get instant access to our comprehensive resources — no email required to browse, just enter your details to download.
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {resources.map((resource, i) => (
            <div
              key={resource.title}
              data-index={i}
              className={`rounded-2xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-700 hover:shadow-xl group ${
                visibleCards[i]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Card Top — gradient accent */}
              <div className="bg-gradient-to-r from-hrc-blue to-hrc-blue/95 px-6 sm:px-8 py-5 sm:py-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-hrc-red rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                  <resource.icon size={24} className="sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                  {resource.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8">
                <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                  {resource.description}
                </p>

                <Link
                  href={resource.href}
                  className="inline-flex items-center gap-2 bg-hrc-red hover:bg-red-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 group/link"
                >
                  <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                  {resource.label}
                  <ArrowRight
                    size={14}
                    className="sm:w-4 sm:h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-14">
          <p className="text-gray-500 text-sm mb-4">
            Want personalised guidance? Our experts are here to help.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 border-2 border-hrc-blue text-hrc-blue hover:bg-hrc-blue hover:text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg"
          >
            Book a Free Consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
