import React from 'react';

type LogoProps = {
  className?: string;
  isScrolled?: boolean;
};

const Logo: React.FC<LogoProps> = ({ className = 'w-12 h-12', isScrolled = false }) => {
  const primary = isScrolled ? '#0f172a' : '#ffffff';
  const accent = '#e11d48';

  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Hedge Resource Centre logo"
      className={className}
    >
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#001a4d"/>
          <stop offset="100%" stopColor="#002366"/>
        </linearGradient>
      </defs>

      {/* Outer ring - HRC blue */}
      <circle cx="60" cy="60" r="54" fill="none" stroke="#002366" strokeWidth="3" />

      {/* Gear-style teeth (simplified) - HRC red */}
      <g fill="#ed1c24" opacity="0.6">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = 60 + Math.cos(a) * 66;
          const y = 60 + Math.sin(a) * 66;
          return <rect key={i} x={x - 3} y={y - 3} width={6} height={6} transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`} />;
        })}
      </g>

      {/* Inner filled circle - HRC dark blue gradient */}
      <circle cx="60" cy="60" r="42" fill="url(#bgGrad)" stroke="#ed1c24" strokeWidth="3" />

      {/* Letters H R C */}
      <text x="36" y="78" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="22" fill="#ffffff">H</text>
      <text x="57" y="48" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="22" fill={primary}>R</text>
      <text x="78" y="78" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="22" fill={accent}>C</text>

      {/* Small year badge */}
      <rect x="38" y="90" width="44" height="12" rx="6" fill="#ed1c24" opacity="0.9" />
      <text x="60" y="99" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="10" fill="#ffffff" textAnchor="middle">2004</text>
    </svg>
  );
};

export default Logo;
