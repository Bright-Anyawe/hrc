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
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-hrc-blue mb-6">
                About Us
              </h2>
              <div className="w-24 h-1 bg-hrc-red mb-8"></div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Since <span className="font-bold text-hrc-red">2004</span>, we have been executing our services and projects to achieve outcomes such as Quality Education, Poverty Reduction, Hunger Eradication, Industry and Innovation, Economic Empowerment, and Sustainable Communities.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our commitment to excellence and innovation has positioned us as a leader in resource consulting, helping individuals, businesses, and communities unlock their full potential through comprehensive training, strategic consulting, and sustainable development initiatives.
              </p>

              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-hrc-red">
                  <h3 className="text-xl font-bold text-hrc-blue mb-3">Our Mission</h3>
                  <p className="text-gray-600">
                    To empower individuals and organizations through innovative resource consulting, training, and sustainable development solutions.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-hrc-blue">
                  <h3 className="text-xl font-bold text-hrc-blue mb-3">Our Vision</h3>
                  <p className="text-gray-600">
                    To be the leading catalyst for transformative growth and sustainable development across Africa and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image and Stats */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            {/* Hero Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional team meeting"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hrc-blue/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl p-6 shadow-2xl border-t-4 border-hrc-red">
                <div className="text-center">
                  <div className="text-3xl font-bold text-hrc-blue">15+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
              </div>
            </div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.title}
                  className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 bg-hrc-red text-white rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <achievement.icon size={20} />
                  </div>
                  <h4 className="font-bold text-hrc-blue text-sm mb-2 group-hover:text-hrc-red transition-colors duration-300">
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
        <div className={`mt-20 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-hrc-blue mb-4">Our Core Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and define who we are as an organization
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-hrc-red text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold">E</span>
              </div>
              <h4 className="text-xl font-bold text-hrc-blue mb-2">Excellence</h4>
              <p className="text-gray-600">
                We strive for the highest standards in everything we deliver, ensuring quality outcomes for all our clients.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-hrc-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold">I</span>
              </div>
              <h4 className="text-xl font-bold text-hrc-blue mb-2">Integrity</h4>
              <p className="text-gray-600">
                We conduct our business with honesty, transparency, and ethical practices in all our relationships.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-hrc-red text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold">S</span>
              </div>
              <h4 className="text-xl font-bold text-hrc-blue mb-2">Sustainability</h4>
              <p className="text-gray-600">
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