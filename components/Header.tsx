'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-10 h-10 bg-hrc-red rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className={`text-xl font-bold ${isScrolled ? 'text-hrc-blue' : 'text-white'}`}>
                    HEDGE RESOURCE CENTRE
                  </h1>
                  <p className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>
                    Leader in resource consulting
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`text-sm font-medium transition-colors duration-200 hover:text-hrc-red ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button
                className="bg-hrc-red hover:bg-red-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg"
              >
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
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-hrc-red hover:bg-gray-50 rounded-md transition-colors duration-200 w-full text-left"
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <Button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full mt-4 bg-hrc-red hover:bg-red-700 text-white"
                >
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;