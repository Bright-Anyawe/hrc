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
      className="relative h-56 sm:h-72 md:h-96 flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">{title}</h1>
        <p className="text-sm sm:text-lg md:text-xl mt-1 sm:mt-2">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;
