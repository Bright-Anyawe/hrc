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
      <div className="flex items-center gap-1.5 text-green-300 text-[10px] font-medium">
        <CheckCircle size={14} />
        <span>Subscribed!</span>
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
          className="px-2 py-1 bg-white text-gray-800 rounded-l flex-grow md:w-44 text-[10px] focus:outline-none focus:ring-1 focus:ring-hrc-red"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-hrc-red hover:bg-red-700 px-2 sm:px-3 py-1 rounded-r text-[10px] font-semibold transition-colors duration-300 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1"
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              <span className="hidden sm:inline">Subscribing...</span>
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>
      {errorMsg && (
        <p className="mt-0.5 text-red-300 text-[9px]">{errorMsg}</p>
      )}
    </form>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Training & Tutoring', href: '/services' },
    { name: 'Skills Development', href: '/services' },
    { name: 'Admin Support', href: '/services' },
    { name: 'Research', href: '/services' },
    { name: 'Assessment', href: '/services' },
    { name: 'Advisory', href: '/services' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
  ];

  const iconMap: Record<string, React.ElementType> = { Facebook, Twitter, Linkedin, Instagram };
  const socialLinks = SOCIAL_LINKS.map((s) => ({ href: s.url, icon: iconMap[s.icon], label: s.label }));

  return (
    <footer className="bg-hrc-blue text-white">
      {/* Top red accent bar */}
      <div className="h-0.5 bg-hrc-red"></div>

      {/* Main Footer Content - 2 column layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-1.5 mb-1.5">
              <div className="w-6 h-6 bg-hrc-red flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-[10px] tracking-widest">H</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-[11px] font-bold leading-tight tracking-wide">HRC GHANA</h3>
                <p className="text-[8px] tracking-widest uppercase text-hrc-red">Leader in resource consulting</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-300 mb-1.5 leading-snug">
              Since 2004 — Quality Education, Poverty Reduction, Sustainable Communities.
            </p>
            <div className="flex space-x-1.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 bg-hrc-red rounded-full flex items-center justify-center hover:bg-white hover:text-hrc-red transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={11} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[9px] font-semibold tracking-widest uppercase text-gray-400 mb-0.5">Services</h4>
            <div className="w-4 h-px bg-hrc-red mb-1"></div>
            <ul className="space-y-0.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-[10px] text-gray-300 hover:text-white transition-colors duration-300">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[9px] font-semibold tracking-widest uppercase text-gray-400 mb-0.5">Links</h4>
            <div className="w-4 h-px bg-hrc-red mb-1"></div>
            <ul className="space-y-0.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[10px] text-gray-300 hover:text-white transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[9px] font-semibold tracking-widest uppercase text-gray-400 mb-0.5">Contact</h4>
            <div className="w-4 h-px bg-hrc-red mb-1"></div>
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5">
                <Phone className="w-3 h-3 text-hrc-red flex-shrink-0" />
                <p className="text-[10px] text-gray-300">0302907115</p>
              </div>
              <div className="flex items-center space-x-1.5">
                <Phone className="w-3 h-3 text-hrc-red flex-shrink-0" />
                <p className="text-[10px] text-gray-300">0591481815</p>
              </div>
              <div className="flex items-center space-x-1.5">
                <Mail className="w-3 h-3 text-hrc-red flex-shrink-0" />
                <p className="text-[10px] text-gray-300">info@hrcghana.com</p>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3 h-3 text-hrc-red flex-shrink-0" />
                <p className="text-[10px] text-gray-300">Ashiaman, Accra</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter + Bottom Footer - Single Row */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <p className="text-gray-300 text-[9px]">
                © {currentYear} Hedge Resource Centre. All rights reserved.
              </p>
              <span className="text-gray-500 text-[9px]">|</span>
              <span className="text-gray-400 text-[9px]">hrcghana.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-gray-400">Newsletter:</span>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
