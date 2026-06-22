import React from 'react';
import Image from 'next/image';

type LogoProps = {
  className?: string;
  isScrolled?: boolean;
};

const Logo: React.FC<LogoProps> = ({ className = 'w-12 h-12', isScrolled = false }) => {
  return (
    <Image
      src="/HRC-logo.png"
      alt="Hedge Resource Centre logo"
      width={48}
      height={48}
      className={className}
      priority
    />
  );
};

export default Logo;
