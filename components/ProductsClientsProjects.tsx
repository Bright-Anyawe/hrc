'use client';

import { useState, useEffect } from 'react';
import { 
  Package, 
  Users, 
  FolderOpen,
  Laptop,
  BookOpen,
  Wrench,
  FileText,
  UserCheck,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Building
} from 'lucide-react';

const ProductsClientsProjects = () => {
  const [activeTab, setActiveTab] = useState('products');
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

    const section = document.getElementById('products');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const tabData = {
    products: {
      title: 'Our Products',
      icon: Package,
      color: 'bg-blue-600',
      items: [
        { name: 'Softwares', icon: Laptop, description: 'Custom software solutions and digital platforms' },
        { name: 'Books', icon: BookOpen, description: 'Educational and professional development publications' },
        { name: 'Equipment', icon: Wrench, description: 'Training and educational equipment' },
        { name: 'Documents', icon: FileText, description: 'Templates, guides, and professional documentation' },
        { name: 'Personnel', icon: UserCheck, description: 'Qualified professionals and consultants' }
      ]
    },
    clients: {
      title: 'Our Clients',
      icon: Users,
      color: 'bg-green-600',
      items: [
        { name: 'Executives', icon: Briefcase, description: 'C-level executives and senior management' },
        { name: 'Graduates', icon: GraduationCap, description: 'Recent graduates entering the workforce' },
        { name: 'Students', icon: BookOpen, description: 'University and professional students' },
        { name: 'Employees', icon: Users, description: 'Corporate employees seeking development' },
        { name: 'Entrepreneurs', icon: TrendingUp, description: 'Business owners and startup founders' },
        { name: 'Professionals', icon: UserCheck, description: 'Working professionals across industries' },
        { name: 'Start-Ups', icon: Building, description: 'Early-stage companies and ventures' },
        { name: 'Unemployed', icon: Users, description: 'Job seekers and career changers' },
        { name: 'Families', icon: Users, description: 'Family units seeking development opportunities' },
        { name: 'Corporates', icon: Building, description: 'Large corporations and enterprises' }
      ]
    },
    projects: {
      title: 'Our Projects',
      icon: FolderOpen,
      color: 'bg-red-600',
      items: [
        { name: 'FITT Project', icon: TrendingUp, description: 'Financial Inclusion Technology and Training initiative' },
        { name: 'Micro Entrepreneurship Project', icon: Briefcase, description: 'Small business development and support program' },
        { name: 'CPD For All Project', icon: GraduationCap, description: 'Continuing Professional Development for everyone' },
        { name: 'Rural CTS Project', icon: Building, description: 'Rural Community Technology and Skills development' },
        { name: 'CDBOKS Project', icon: BookOpen, description: 'Community Development and Knowledge Sharing initiative' }
      ]
    }
  };

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'projects', label: 'Projects', icon: FolderOpen }
  ];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-hrc-blue mb-4">
            Products, Clients & Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive offerings, diverse clientele, and impactful projects
          </p>
          <div className="w-24 h-1 bg-hrc-red mx-auto mt-6"></div>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
          <div className="bg-gray-100 p-2 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-hrc-red text-white shadow-lg'
                    : 'text-gray-600 hover:text-hrc-red hover:bg-white'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
          {Object.entries(tabData).map(([key, data]) => (
            <div
              key={key}
              className={`transition-all duration-500 ${
                activeTab === key ? 'opacity-100 visible' : 'opacity-0 invisible absolute'
              }`}
            >
              {/* Tab Header */}
              <div className="text-center mb-12">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${data.color} text-white rounded-full mb-4`}>
                  <data.icon size={32} />
                </div>
                <h3 className="text-3xl font-bold text-hrc-blue">{data.title}</h3>
              </div>

              {/* Items Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {data.items.map((item, index) => (
                  <div
                    key={item.name}
                    className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-hrc-red/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 ${data.color} text-white rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-hrc-blue mb-2 group-hover:text-hrc-red transition-colors duration-300">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statistics */}
        <div className={`mt-16 bg-gradient-to-r from-hrc-blue to-hrc-red rounded-2xl p-8 text-white ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Products Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg opacity-90">Clients Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-lg opacity-90">Active Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-90">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsClientsProjects;