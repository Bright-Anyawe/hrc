'use client';

import { useEffect, useState } from 'react';
import { Award, Target, Globe, Heart } from 'lucide-react';

const AboutSection = () => {
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

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const achievements = [
    {
      icon: Award,
      title: 'Quality Education',
      description: 'Providing exceptional educational services and training programs'
    },
    {
      icon: Target,
      title: 'Poverty Reduction',
      description: 'Creating opportunities for economic empowerment and growth'
    },
    {
      icon: Globe,
      title: 'Industry Innovation',
      description: 'Driving innovation and technological advancement in various sectors'
    },
    {
      icon: Heart,
      title: 'Sustainable Communities',
      description: 'Building resilient and sustainable communities for the future'
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className={`space-y-6 sm:space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-3">
                <span className="block w-8 h-px bg-hrc-red flex-shrink-0"></span>
                <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">Who We Are</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hrc-blue mb-1 sm:mb-2">
                About Us
              </h2>
              <div className="w-16 h-1 bg-hrc-red mb-6 sm:mb-8"></div>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                Since <span className="font-bold text-hrc-red">2004</span>, we have been executing our services and projects to achieve outcomes such as Quality Education, Poverty Reduction, Hunger Eradication, Industry and Innovation, Economic Empowerment, and Sustainable Communities.
              </p>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
                Our commitment to excellence and innovation has positioned us as a leader in resource consulting, helping individuals, businesses, and communities unlock their full potential through comprehensive training, strategic consulting, and sustainable development initiatives.
              </p>

              {/* Mission & Vision */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-t-4 border-hrc-red">
                  <h3 className="text-lg sm:text-xl font-bold text-hrc-blue mb-2 sm:mb-3">Our Mission</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    To empower individuals and organizations through innovative resource consulting, training, and sustainable development solutions.
                  </p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-t-4 border-hrc-blue">
                  <h3 className="text-lg sm:text-xl font-bold text-hrc-blue mb-2 sm:mb-3">Our Vision</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    To be the leading catalyst for transformative growth and sustainable development across Africa and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image and Stats */}
          <div className={`space-y-6 sm:space-y-8 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            {/* Hero Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional team meeting"
                  className="w-full h-56 sm:h-72 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hrc-blue/20 to-transparent"></div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-white rounded-xl p-3 sm:p-6 shadow-2xl border-t-4 border-hrc-red">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-hrc-blue">15+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Years of Excellence</div>
                </div>
              </div>
            </div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-6 sm:pt-8">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.title}
                  className="bg-white p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-hrc-red text-white rounded-lg mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <achievement.icon size={16} className="sm:hidden" />
                    <achievement.icon size={20} className="hidden sm:block" />
                  </div>
                  <h4 className="font-bold text-hrc-blue text-xs sm:text-sm mb-1 sm:mb-2 group-hover:text-hrc-red transition-colors duration-300">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className={`mt-12 sm:mt-16 md:mt-20 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="block w-8 h-px bg-hrc-red"></span>
              <span className="text-xs font-semibold tracking-widest uppercase text-hrc-red">Our Foundation</span>
              <span className="block w-8 h-px bg-hrc-red"></span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-hrc-blue mb-3 sm:mb-4">Our Core Values</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and define who we are as an organization
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-hrc-red text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl sm:text-2xl font-bold">E</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-hrc-blue mb-2">Excellence</h4>
              <p className="text-sm sm:text-base text-gray-600">
                We strive for the highest standards in everything we deliver, ensuring quality outcomes for all our clients.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-hrc-blue text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl sm:text-2xl font-bold">I</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-hrc-blue mb-2">Integrity</h4>
              <p className="text-sm sm:text-base text-gray-600">
                We conduct our business with honesty, transparency, and ethical practices in all our relationships.
              </p>
            </div>

            <div className="text-center group sm:col-span-2 md:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-hrc-red text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl sm:text-2xl font-bold">S</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-hrc-blue mb-2">Sustainability</h4>
              <p className="text-sm sm:text-base text-gray-600">
                We create lasting positive impact through sustainable solutions that benefit communities and the environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
