'use client';

import { useEffect, useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Settings, 
  Search, 
  ClipboardCheck, 
  Users,
  BookOpen,
  Wrench,
  Calculator,
  TrendingUp,
  FileText,
  Target
} from 'lucide-react';

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('services');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: GraduationCap,
      title: 'Training / Tutoring',
      items: [
        'Staff Training',
        'Career Training',
        'Continuing Professional Development',
        'Tutorial Classes'
      ],
      color: 'bg-hrc-blue text-white',
      delay: '0ms'
    },
    {
      icon: Wrench,
      title: 'Skills Development',
      items: [
        'Micro Entrepreneurship Skills',
        'TVET Skills',
        'Critical Technical Skills'
      ],
      color: 'bg-hrc-red text-white',
      delay: '200ms'
    },
    {
      icon: Settings,
      title: 'Administrative Support',
      items: [
        'Planning and Management',
        'Finance and Accounting',
        'Human Resource Management',
        'Internet and Technology',
        'Sales and Marketing'
      ],
      color: 'bg-hrc-blue text-white',
      delay: '400ms'
    },
    {
      icon: Search,
      title: 'Research',
      items: [
        'Academic Research',
        'Industry Analysis',
        'Community Profiling',
        'Technical Writing'
      ],
      color: 'bg-hrc-red text-white',
      delay: '600ms'
    },
    {
      icon: ClipboardCheck,
      title: 'Assessment',
      items: [
        'Educational Assessment',
        'Career Assessment',
        'Community Assessment',
        'Business Assessment'
      ],
      color: 'bg-hrc-blue text-white',
      delay: '800ms'
    },
    {
      icon: Users,
      title: 'Advisory',
      items: [
        'Recruitment and Placement',
        'Business Formation',
        'HR Development',
        'Project Management',
        'Funding Strategies and more...'
      ],
      color: 'bg-hrc-red text-white',
      delay: '1000ms'
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-10 sm:mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="block w-8 h-px bg-hrc-red"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">What We Offer</span>
            <span className="block w-8 h-px bg-hrc-red"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hrc-blue mb-3 sm:mb-4">
            Our Core Services
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Comprehensive solutions designed to empower your growth and success across multiple domains
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className={`relative group bg-white rounded-xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-t-4 border-hrc-red ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{ animationDelay: service.delay }}
              >
                {/* Hexagonal Icon */}
                <div className="relative mb-4 sm:mb-6">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 hexagon ${service.color} flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent size={24} className="sm:hidden" />
                    <IconComponent size={32} className="hidden sm:block" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg sm:text-xl font-bold text-hrc-blue mb-3 sm:mb-4 text-center group-hover:text-hrc-red transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Service Items */}
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
                    >
                      <span className="w-2 h-2 bg-hrc-red rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-hrc-red/5 to-hrc-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-10 sm:mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1200ms' }}>
          <div className="bg-white rounded-xl p-5 sm:p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-3 sm:mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Let us help you achieve your goals with our comprehensive range of professional services.
            </p>
            <button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-hrc-red hover:bg-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;