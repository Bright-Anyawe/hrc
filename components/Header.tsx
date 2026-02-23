'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, Clock } from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Contact', href: '/contact' },
  ];

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
            {/* Left: contact details */}
            <div className="flex items-center divide-x divide-white/10">
              <a
                href="tel:0302907115"
                className="flex items-center gap-1.5 pr-4 hover:text-white transition-colors duration-200"
              >
                <Phone size={11} className="text-hrc-red" />
                0302907115
              </a>
              <a
                href="tel:0591481815"
                className="flex items-center gap-1.5 px-4 hover:text-white transition-colors duration-200"
              >
                <Phone size={11} className="text-hrc-red" />
                0591481815
              </a>
              <a
                href="mailto:info@hrcghana.com"
                className="flex items-center gap-1.5 pl-4 hover:text-white transition-colors duration-200"
              >
                <Mail size={11} className="text-hrc-red" />
                info@hrcghana.com
              </a>
            </div>
            {/* Right: business hours */}
            <div className="flex items-center gap-1.5">
              <Clock size={11} className="text-hrc-red" />
              <span>Mon – Fri: 8AM – 6PM &nbsp;|&nbsp; Sat: 9AM – 4PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <div
        className={`transition-all duration-300 ${
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
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Logo className="w-10 h-10 md:w-12 md:h-12" isScrolled={isScrolled} />
                  <div className="hidden sm:block">
                    <h1
                      className={`text-base md:text-lg font-bold tracking-wide ${
                        isScrolled ? 'text-hrc-blue' : 'text-white'
                      }`}
                    >
                      HEDGE RESOURCE CENTRE
                    </h1>
                    <p
                      className={`text-xs tracking-widest uppercase ${
                        isScrolled ? 'text-hrc-red' : 'text-gray-300'
                      }`}
                    >
                      Leader in resource consulting
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-colors duration-200 hover:text-hrc-red ${
                      isScrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <Link href="/contact" className="ml-4">
                <Button className="bg-hrc-red hover:bg-red-800 text-white text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-none transition-all duration-300 hover:shadow-lg">
                  Get In Touch
                </Button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${isScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
              {/* Mobile contact strip */}
              <div className="bg-hrc-blue px-4 py-2 flex flex-col gap-1 text-xs text-gray-300">
                <a href="tel:0302907115" className="flex items-center gap-2">
                  <Phone size={11} className="text-hrc-red" /> 0302907115
                </a>
                <a href="mailto:info@hrcghana.com" className="flex items-center gap-2">
                  <Mail size={11} className="text-hrc-red" /> info@hrcghana.com
                </a>
              </div>
              <div className="px-2 pt-2 pb-4 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-gray-700 hover:text-hrc-red hover:bg-gray-50 transition-colors duration-200 w-full text-left border-b border-gray-50"
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                <Link href="/contact">
                  <Button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full mt-3 bg-hrc-red hover:bg-red-800 text-white text-xs font-semibold tracking-widest uppercase rounded-none"
                  >
                    Get In Touch
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
