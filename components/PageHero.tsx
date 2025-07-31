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
      className="relative h-96 flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <p className="text-lg md:text-xl mt-2">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;
