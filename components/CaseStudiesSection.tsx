'use client';

import { useEffect, useState } from 'react';
import { Star, ArrowUpRight, Clock, Building2, Briefcase } from 'lucide-react';
import { caseStudies } from '@/lib/testimonials';
import { cn } from '@/lib/utils';

const CaseStudiesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    const section = document.getElementById('case-studies');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'w-3.5 h-3.5 sm:w-4 sm:h-4',
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'
        )}
      />
    ));
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="case-studies" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-10 sm:mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="block w-8 h-px bg-hrc-red"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">
              Success Stories
            </span>
            <span className="block w-8 h-px bg-hrc-red"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hrc-blue mb-3 sm:mb-4">
            Detailed Case Studies
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Explore how we&apos;ve delivered measurable results for our clients — from challenge to solution to impact
          </p>
        </div>

        {/* Case Studies List */}
        <div className="space-y-8 sm:space-y-10">
          {caseStudies.map((cs, index) => {
            const isExpanded = expandedId === cs.id;

            return (
              <article
                key={cs.id}
                id={cs.id}
                className={cn(
                  'bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100',
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                )}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-hrc-blue to-hrc-blue/90 px-6 sm:px-8 py-5 sm:py-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {cs.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-300">
                        <span className="flex items-center gap-1.5">
                          <Building2 size={14} />
                          {cs.client}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={14} />
                          {cs.industry}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {cs.duration}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 bg-hrc-red text-white text-xs font-semibold rounded-full whitespace-nowrap">
                      {cs.service}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {cs.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="text-center bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100 hover:border-hrc-red/30 transition-colors duration-300"
                      >
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-hrc-red">
                          {metric.value}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 mt-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Challenge & Solution (truncated when collapsed) */}
                  <div className={cn('space-y-4 sm:space-y-6', !isExpanded && 'line-clamp-4 sm:line-clamp-3')}>
                    <div>
                      <h4 className="text-sm font-bold text-hrc-blue uppercase tracking-wider mb-2">The Challenge</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-hrc-blue uppercase tracking-wider mb-2">Our Solution</h4>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>

                  {/* Expand / Collapse */}
                  <button
                    onClick={() => toggleExpand(cs.id)}
                    className="flex items-center gap-2 text-hrc-red text-sm font-semibold mt-3 hover:text-red-700 transition-colors"
                  >
                    {isExpanded ? 'Show Less' : 'Read Full Case Study'}
                    <ArrowUpRight
                      size={14}
                      className={cn(
                        'transition-transform duration-300',
                        isExpanded && 'rotate-90'
                      )}
                    />
                  </button>

                  {/* Expanded: Results & Testimonial */}
                  {isExpanded && (
                    <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8 border-t border-gray-100 pt-6 sm:pt-8">
                      {/* Results */}
                      <div>
                        <h4 className="text-sm font-bold text-hrc-blue uppercase tracking-wider mb-4">
                          Measurable Results
                        </h4>
                        <ul className="space-y-3">
                          {cs.results.map((result, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-600">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Client Testimonial */}
                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 sm:p-8 border border-gray-100">
                        <div className="flex items-center gap-1 mb-3 sm:mb-4">
                          {renderStars(cs.testimonial.rating)}
                        </div>
                        <blockquote className="text-sm sm:text-base text-gray-700 italic mb-4 sm:mb-6 leading-relaxed">
                          &ldquo;{cs.testimonial.quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hrc-red to-red-700 flex items-center justify-center text-white font-bold text-xs">
                            {cs.testimonial.initials}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-hrc-blue">
                              {cs.testimonial.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {cs.testimonial.role}, {cs.testimonial.company}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={cn(
            'text-center mt-10 sm:mt-16',
            isVisible ? 'animate-fade-in' : 'opacity-0'
          )}
          style={{ animationDelay: '500ms' }}
        >
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg max-w-3xl mx-auto border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-3">
              Want to Be Our Next Success Story?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
              Partner with HRC Ghana and experience the difference that expert consulting, training, and skills development can make.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-hrc-red hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Get in Touch
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
