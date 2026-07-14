'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, Clock, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface NavItem {
  name: string;
  href: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Company',
    items: [
      { name: 'About', href: '/about' },
      { name: 'Projects', href: '/projects' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Why Choose Us', href: '/why-choose-us' },
    ],
  },
  {
    label: 'Services',
    items: [
      { name: 'All Services', href: '/services' },
      { name: 'Pricing', href: '/pricing' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { name: 'Blog', href: '/blog' },
      { name: 'Guides', href: '/resources/guide-professional-development-ghana' },
    ],
  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const textColor = isScrolled ? 'text-gray-700' : 'text-white';

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Top Info Bar ── */}
      <div
        className={`hidden md:block transition-all duration-300 ${
          isScrolled ? 'bg-hrc-blue h-0 overflow-hidden opacity-0' : 'bg-hrc-blue opacity-100'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-xs text-gray-300">
            <div className="flex items-center divide-x divide-white/10">
              <a
                href="tel:0302907115"
                className="flex items-center gap-1.5 pr-4 hover:text-white transition-colors duration-200"
                onClick={() => trackEvent('phone_clicked', { phone_number: '0302907115', location: 'top-bar' })}
              >
                <Phone size={11} className="text-hrc-red" />
                0302907115
              </a>
              <a
                href="tel:0591481815"
                className="flex items-center gap-1.5 px-4 hover:text-white transition-colors duration-200"
                onClick={() => trackEvent('phone_clicked', { phone_number: '0591481815', location: 'top-bar' })}
              >
                <Phone size={11} className="text-hrc-red" />
                0591481815
              </a>
              <a
                href="mailto:info@hrcghana.com"
                className="flex items-center gap-1.5 pl-4 hover:text-white transition-colors duration-200"
                onClick={() => trackEvent('email_clicked', { location: 'top-bar' })}
              >
                <Mail size={11} className="text-hrc-red" />
                info@hrcghana.com
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} className="text-hrc-red" />
              <span>Mon – Fri: 8AM – 6PM &nbsp;|&nbsp; Sat: 9AM – 4PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <div
        className={`transition-[background-color,box-shadow] duration-300 ${
          isScrolled
            ? 'bg-white/97 backdrop-blur-md shadow-md border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center gap-3 cursor-pointer">
                  <Logo className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0" isScrolled={isScrolled} />
                  <div className="hidden sm:flex sm:flex-col sm:justify-center sm:leading-none">
                    <span
                      className={`block whitespace-nowrap text-sm md:text-base lg:text-lg font-bold leading-tight tracking-wide transition-colors duration-300 ${
                        isScrolled ? 'text-hrc-blue' : 'text-white'
                      }`}
                    >
                      HEDGE RESOURCE CENTRE
                    </span>
                    <span
                      className={`block whitespace-nowrap text-[10px] md:text-xs leading-tight tracking-widest uppercase mt-1 transition-colors duration-300 ${
                        isScrolled ? 'text-hrc-red' : 'text-gray-300'
                      }`}
                    >
                      Leader in resource consulting
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {/* Home - standalone */}
              <Link href="/">
                <span
                  className={`px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 hover:text-hrc-red ${textColor}`}
                >
                  Home
                </span>
              </Link>

              {/* Dropdown groups */}
              {navGroups.map((group) => (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 hover:text-hrc-red ${textColor}`}
                  >
                    {group.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        openDropdown === group.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown menu */}
                  <div
                    className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                      openDropdown === group.label
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[180px]">
                      {group.items.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <span
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-gray-700 hover:text-hrc-red hover:bg-gray-50 transition-colors duration-200"
                          >
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Book Appointment - standalone */}
              <Link href="/booking">
                <span
                  className={`px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 hover:text-hrc-red ${textColor}`}
                >
                  Book
                </span>
              </Link>

              {/* CTA Button */}
              <Link href="/contact" className="ml-2">
                <Button className="bg-hrc-red hover:bg-red-800 text-white text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-none transition-all duration-300 hover:shadow-lg">
                  Contact
                </Button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`transition-colors duration-300 ${textColor}`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
              <div className="bg-hrc-blue px-4 py-2 flex flex-col gap-1 text-xs text-gray-300">
                <a href="tel:0302907115" className="flex items-center gap-2" onClick={() => trackEvent('phone_clicked', { phone_number: '0302907115', location: 'mobile-menu' })}>
                  <Phone size={11} className="text-hrc-red" /> 0302907115
                </a>
                <a href="mailto:info@hrcghana.com" className="flex items-center gap-2" onClick={() => trackEvent('email_clicked', { location: 'mobile-menu' })}>
                  <Mail size={11} className="text-hrc-red" /> info@hrcghana.com
                </a>
              </div>
              <div className="px-2 pt-2 pb-4 space-y-1">
                {/* Home */}
                <Link href="/">
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-gray-700 hover:text-hrc-red hover:bg-gray-50 transition-colors duration-200 w-full text-left border-b border-gray-50"
                  >
                    Home
                  </span>
                </Link>

                {/* Grouped items with section headers */}
                {navGroups.map((group) => (
                  <div key={group.label}>
                    <div className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-hrc-red">
                      {group.label}
                    </div>
                    {group.items.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <span
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-gray-700 hover:text-hrc-red hover:bg-gray-50 transition-colors duration-200 w-full text-left border-b border-gray-50"
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                ))}

                {/* Book */}
                <Link href="/booking">
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-gray-700 hover:text-hrc-red hover:bg-gray-50 transition-colors duration-200 w-full text-left border-b border-gray-50"
                  >
                    Book Appointment
                  </span>
                </Link>

                <Link href="/contact">
                  <Button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full mt-3 bg-hrc-red hover:bg-red-800 text-white text-xs font-semibold tracking-widest uppercase rounded-none"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
