'use client';

import { useEffect, useState } from 'react';
import { Check, Award, Clock, Lightbulb, Heart, Star } from 'lucide-react';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate items one by one
          const timer = setInterval(() => {
            setAnimatedItems(prev => {
              if (prev.length < reasons.length) {
                return [...prev, prev.length];
              }
              clearInterval(timer);
              return prev;
            });
          }, 200);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('why-choose-us');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      icon: Award,
      title: 'Outstanding Service',
      description: 'Delivering exceptional quality and results that exceed expectations in every project we undertake.'
    },
    {
      icon: Clock,
      title: 'Absolute Reliability',
      description: 'Consistent, dependable service delivery with a track record of meeting deadlines and commitments.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation & Creativity',
      description: 'Cutting-edge solutions and creative approaches to solve complex challenges and drive growth.'
    },
    {
      icon: Heart,
      title: 'Support for Business Ideas',
      description: 'Nurturing and developing your business concepts with expert guidance and strategic support.'
    },
    {
      icon: Star,
      title: 'More than 15 years of Experience',
      description: 'Extensive expertise gained through years of successful project delivery and client satisfaction.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ed1c24' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-hrc-blue mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what sets us apart and makes us the preferred choice for resource consulting
          </p>
          <div className="w-24 h-1 bg-hrc-red mx-auto mt-6"></div>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            const isAnimated = animatedItems.includes(index);
            
            return (
              <div
                key={reason.title}
                className={`group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 hover:border-hrc-red/30 ${
                  isAnimated ? 'animate-slide-up opacity-100' : 'opacity-0'
                }`}
              >
                {/* Animated Check Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-hrc-red text-white rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Check size={28} className="animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-hrc-blue text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <IconComponent size={16} />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-hrc-blue mb-4 group-hover:text-hrc-red transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {reason.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-hrc-red/20 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
          <div className="bg-gradient-to-r from-hrc-blue via-hrc-red to-hrc-blue rounded-3xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-8">Our Track Record Speaks</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  98%
                </div>
                <div className="text-lg opacity-90">Client Satisfaction</div>
              </div>
              
              <div className="group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  1000+
                </div>
                <div className="text-lg opacity-90">Projects Completed</div>
              </div>
              
              <div className="group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  15+
                </div>
                <div className="text-lg opacity-90">Years Experience</div>
              </div>
              
              <div className="group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-lg opacity-90">Support Available</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12">
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-hrc-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Experience the Difference
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Preview */}
        <div className={`mt-16 text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1200ms' }}>
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl text-gray-700 italic mb-6">
              "Hedge Resource Centre has been instrumental in transforming our business operations. Their expertise, professionalism, and commitment to excellence are unmatched."
            </blockquote>
            <div className="text-hrc-blue font-semibold">
              — Satisfied Client
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;