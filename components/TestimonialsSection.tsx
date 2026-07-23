'use client';

import { useEffect, useState } from 'react';
import { Star, Quote, ChevronRight, ChevronDown, BadgeCheck } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { testimonials, type Testimonial } from '@/lib/testimonials';
import { cn } from '@/lib/utils';

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={cn(
        'w-4 h-4 transition-colors duration-200',
        i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'
      )}
    />
  ));

/**
 * A single testimonial card. Long, multi-paragraph stories collapse to their
 * opening paragraph so one detailed account doesn't dwarf the carousel.
 */
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const paragraphs = testimonial.quote.split('\n\n');
  const canCollapse = paragraphs.length > 1;
  const visibleParagraphs = canCollapse && !isExpanded ? paragraphs.slice(0, 1) : paragraphs;

  return (
    <Card className="h-full bg-white/10 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500">
      <CardContent className="p-6 sm:p-8 md:p-10">
        {/* Stars + verification */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
          {testimonial.verified && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-green-300 bg-green-400/10 border border-green-400/20 rounded-full px-2.5 py-1">
              <BadgeCheck size={13} />
              Verified client
            </span>
          )}
        </div>

        {/* Quote */}
        <blockquote className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed mb-4 italic space-y-3 sm:space-y-4">
          {visibleParagraphs.map((paragraph, i) => (
            <p key={i}>
              {i === 0 && <>&ldquo;</>}
              {paragraph}
              {i === visibleParagraphs.length - 1 && (isExpanded || !canCollapse) && <>&rdquo;</>}
            </p>
          ))}
        </blockquote>

        {canCollapse && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-1.5 text-hrc-red hover:text-red-400 text-xs sm:text-sm font-semibold mb-6 sm:mb-8 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-hrc-red focus-visible:ring-offset-2 focus-visible:ring-offset-hrc-blue rounded"
          >
            {isExpanded ? 'Show less' : 'Read the full story'}
            <ChevronDown
              size={15}
              className={cn('transition-transform duration-300', isExpanded && 'rotate-180')}
            />
          </button>
        )}

        {/* Attribution */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-hrc-red to-red-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {testimonial.initials}
          </div>
          <div>
            <div className="text-white font-semibold text-sm sm:text-base">{testimonial.name}</div>
            <div className="text-gray-400 text-xs sm:text-sm">
              {[testimonial.role, testimonial.company].filter(Boolean).join(', ')}
            </div>
            <div className="text-hrc-red text-xs mt-0.5 font-medium">{testimonial.service}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('testimonials');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-hrc-blue relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-hrc-red rounded-full blur-3xl"></div>
      </div>

      {/* Top-right decorative quote icon */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/5">
        <Quote size={120} className="sm:w-[180px] sm:h-[180px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div
          className={`text-center mb-10 sm:mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="block w-8 h-px bg-hrc-red"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Client Feedback
            </span>
            <span className="block w-8 h-px bg-hrc-red"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Trusted by businesses and communities across Ghana — hear directly from those we&apos;ve served
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className={cn(
            isVisible ? 'animate-fade-in' : 'opacity-0'
          )}
          style={{ animationDelay: '200ms' }}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-4/5 lg:basis-3/4">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden sm:block">
              <CarouselPrevious className="text-white border-white/30 hover:bg-white/20 hover:border-white -left-4 lg:-left-12" />
              <CarouselNext className="text-white border-white/30 hover:bg-white/20 hover:border-white -right-4 lg:-right-12" />
            </div>
          </Carousel>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  i === current ? 'bg-hrc-red w-6' : 'bg-white/30 hover:bg-white/50'
                )}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={cn(
            'text-center mt-10 sm:mt-12',
            isVisible ? 'animate-fade-in' : 'opacity-0'
          )}
          style={{ animationDelay: '500ms' }}
        >
          <a
            href="/testimonials"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white border border-white/20 hover:border-white/50 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-white/5 group"
          >
            View All Case Studies
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
