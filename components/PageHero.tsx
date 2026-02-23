'use client';

import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <section
      className="relative h-56 sm:h-72 md:h-80 flex items-center justify-center text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark gradient overlay — deeper at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/70"></div>

      {/* Left red accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-hrc-red"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="block w-6 h-px bg-hrc-red"></span>
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-300">
            Hedge Resource Centre
          </span>
          <span className="block w-6 h-px bg-hrc-red"></span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
        <div className="w-12 h-1 bg-hrc-red mx-auto mt-3 mb-2 sm:mt-4 sm:mb-3"></div>
        <p className="text-xs sm:text-base md:text-lg text-gray-300 tracking-wide">{subtitle}</p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent"></div>
    </section>
  );
};

export default PageHero;
