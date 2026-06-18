'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Phone, Mail, Globe, MapPin, Facebook, Twitter, Linkedin, Instagram, CheckCircle, Loader2 } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

/* ─── Newsletter signup form ─── */
function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        setStatus('success');
        trackEvent('newsletter_signup');
        setTimeout(() => {
          setStatus('idle');
          setEmail('');
        }, 4000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Subscription failed. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-300 text-sm font-medium">
        <CheckCircle size={18} />
        <span>Subscribed successfully!</span>
      </div>
    );
  }

  return (
    <form className="flex flex-col w-full md:w-auto relative" onSubmit={handleSubmit}>
      <div className="flex w-full">
        <label htmlFor="footer-email" className="sr-only">Email address for newsletter</label>
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
          placeholder="Enter your email"
          autoComplete="email"
          className="px-3 sm:px-4 py-2 bg-white text-gray-800 rounded-l-lg flex-grow md:w-64 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-hrc-red"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-hrc-red hover:bg-red-700 px-4 sm:px-6 py-2 rounded-r-lg text-sm sm:text-base font-semibold transition-colors duration-300 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>
      {errorMsg && (
        <p className="mt-1.5 text-red-300 text-xs">{errorMsg}</p>
      )}
    </form>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Training & Tutoring', href: '/services' },
    { name: 'Skills Development', href: '/services' },
    { name: 'Administrative Support', href: '/services' },
    { name: 'Research Services', href: '/services' },
    { name: 'Assessment Services', href: '/services' },
    { name: 'Advisory Services', href: '/services' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Projects', href: '/projects' },
    { name: 'Book Appointment', href: '/booking' },
    { name: 'Contact', href: '/contact' }
  ];

  const iconMap: Record<string, React.ElementType> = { Facebook, Twitter, Linkedin, Instagram };
  const socialLinks = SOCIAL_LINKS.map((s) => ({ href: s.url, icon: iconMap[s.icon], label: s.label }));

  return (
    <footer className="bg-hrc-blue text-white">
      {/* Top red accent bar */}
      <div className="h-1 bg-hrc-red"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-hrc-red flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-base sm:text-lg tracking-widest">H</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold leading-tight tracking-wide">HEDGE RESOURCE CENTRE</h3>
                <p className="text-xs tracking-widest uppercase text-hrc-red mt-0.5">Leader in resource consulting</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Since 2004, we have been executing our services and projects to achieve Quality Education, Poverty Reduction, and Sustainable Communities.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-hrc-red rounded-full flex items-center justify-center hover:bg-white hover:text-hrc-red transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={16} className="sm:hidden" />
                  <social.icon size={18} className="hidden sm:block" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">Our Services</h4>
            <div className="w-8 h-px bg-hrc-red mb-4 sm:mb-6"></div>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">Quick Links</h4>
            <div className="w-8 h-px bg-hrc-red mb-4 sm:mb-6"></div>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">Contact Info</h4>
            <div className="w-8 h-px bg-hrc-red mb-4 sm:mb-6"></div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-hrc-red mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm sm:text-base text-gray-300">0302907115</p>
                  <p className="text-sm sm:text-base text-gray-300">0591481815</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-hrc-red mt-1 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-300 break-all">info@hrcghana.com</p>
              </div>

              <div className="flex items-start space-x-3">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-hrc-red mt-1 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-300">www.hrcghana.com</p>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-hrc-red mt-1 flex-shrink-0" />
                <p className="text-sm sm:text-base text-gray-300">Ashiaman, Greater Accra</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Stay Updated</h4>
              <p className="text-sm sm:text-base text-gray-300">Subscribe to our newsletter for latest updates and insights</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <p className="text-gray-300 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} Hedge Resource Centre. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              <span className="text-gray-400 text-xs sm:text-sm">hrcghana.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;