'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Counter from './Counter';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      title: "LET'S MAKE YOUR IDEAS GROW",
      subtitle: "Leader in resource consulting",
      description: "Empowering businesses and individuals through comprehensive training, skills development, and strategic consulting services.",
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "PROFESSIONAL DEVELOPMENT",
      subtitle: "Excellence in Education & Training",
      description: "Transform your career with our comprehensive professional development programs designed for success.",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "BUSINESS EMPOWERMENT",
      subtitle: "Strategic Consulting Solutions",
      description: "Drive your business forward with our expert consulting services and innovative solutions.",
      image: "https://images.pexels.com/photos/3184450/pexels-photo-3184450.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 gradient-overlay" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className={`text-white space-y-6 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="space-y-4">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="block w-8 h-px bg-hrc-red flex-shrink-0"></span>
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-300">
                  Hedge Resource Centre
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                {slides[currentSlide].title}
              </h1>
              {/* Red accent rule */}
              <div className="w-16 h-1 bg-hrc-red"></div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-300 tracking-wide">
                {slides[currentSlide].subtitle}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl leading-relaxed">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={() => scrollToSection('#services')}
                className="bg-hrc-red hover:bg-red-800 text-white px-6 sm:px-8 py-3 rounded-none text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:shadow-xl flex items-center justify-center"
              >
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => scrollToSection('#contact')}
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-hrc-blue px-6 sm:px-8 py-3 rounded-none text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center"
              >
                Contact Us
                <PlayCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  <Counter target={15} />+
                </div>
                <div className="text-xs tracking-widest uppercase text-gray-400 mt-1">Years</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  <Counter target={1000} />+
                </div>
                <div className="text-xs tracking-widest uppercase text-gray-400 mt-1">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  <Counter target={50} />+
                </div>
                <div className="text-xs tracking-widest uppercase text-gray-400 mt-1">Projects</div>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className={`flex justify-center lg:justify-end overflow-hidden ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative p-6">
              <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 sm:border-8 border-white shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Professional African businesswoman"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-hrc-red rounded-full opacity-80 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;