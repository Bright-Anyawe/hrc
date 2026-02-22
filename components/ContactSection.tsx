'use client';

import { useState, useEffect } from 'react';
import { Phone, Mail, Globe, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false); // Reset submitted state on new submission attempt

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after success message
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('Form submission failed:', errorData.error || 'Unknown error');
        alert(`Failed to send message: ${errorData.error || 'Please try again.'}`); // Provide user feedback
      }
    } catch (error) {
      console.error('An error occurred during form submission:', error);
      alert('An unexpected error occurred. Please try again later.'); // Provide user feedback
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['0302907115', '0591481815'],
      color: 'bg-green-100 text-green-700'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['info@hrcghana.com'],
      color: 'bg-blue-100 text-blue-700'
    },
    {
      icon: Globe,
      title: 'Website',
      details: ['www.hrcghana.com'],
      color: 'bg-purple-100 text-purple-700'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['Accra, Ghana'],
      color: 'bg-red-100 text-hrc-red'
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-10 sm:mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-hrc-blue mb-3 sm:mb-4">
            Get in Touch
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business? Contact us today and let's discuss how we can help you achieve your goals.
          </p>
          <div className="w-24 h-1 bg-hrc-red mx-auto mt-4 sm:mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Information */}
          <div className={`space-y-5 sm:space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-4 sm:mb-6">Contact Information</h3>

              <div className="grid gap-3 sm:gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    className="flex items-start space-x-3 sm:space-x-4 bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className={`p-2 sm:p-3 rounded-lg ${info.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <info.icon size={20} className="sm:hidden" />
                      <info.icon size={24} className="hidden sm:block" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-hrc-blue mb-1 sm:mb-2 group-hover:text-hrc-red transition-colors duration-300">
                        {info.title}
                      </h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm sm:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-3 sm:mb-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-hrc-red mr-2 sm:mr-3" />
                <h4 className="text-lg sm:text-xl font-bold text-hrc-blue">Business Hours</h4>
              </div>
              <div className="space-y-2 text-sm sm:text-base text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <h4 className="text-lg sm:text-xl font-bold text-hrc-blue mb-3 sm:mb-4">Find Us</h4>
              <div className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={36} className="mx-auto mb-2 sm:hidden" />
                  <MapPin size={48} className="mx-auto mb-2 hidden sm:block" />
                  <p className="text-sm sm:text-base">Interactive Map</p>
                  <p className="text-xs sm:text-sm">Accra, Ghana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-hrc-blue mb-4 sm:mb-6">Send us a Message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-green-600 mb-2">Message Sent Successfully!</h4>
                  <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hrc-red focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hrc-red focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hrc-red focus:border-transparent transition-all duration-300"
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hrc-red focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a service</option>
                        <option value="training">Training & Tutoring</option>
                        <option value="skills">Skills Development</option>
                        <option value="admin">Administrative Support</option>
                        <option value="research">Research Services</option>
                        <option value="assessment">Assessment Services</option>
                        <option value="advisory">Advisory Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hrc-red focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your project or requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-hrc-red hover:bg-red-700 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;