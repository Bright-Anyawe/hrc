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
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#0369a1" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle cx="60" cy="60" r="54" fill="none" stroke="#d1d5db" strokeWidth="3" />

      {/* Gear-style teeth (simplified) */}
      <g fill="#9ca3af">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = 60 + Math.cos(a) * 66;
          const y = 60 + Math.sin(a) * 66;
          return <rect key={i} x={x - 3} y={y - 3} width={6} height={6} transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`} />;
        })}
      </g>

      {/* Inner filled circle with gradient */}
      <circle cx="60" cy="60" r="42" fill="url(#g)" stroke="#ef4444" strokeWidth="3" />

      {/* Divide into three segments */}
      <path d="M60 18 L60 60 L102 60 Z" fill="rgba(255,255,255,0.06)" />
      <path d="M60 18 L18 60 L60 60 Z" fill="rgba(255,255,255,0.03)" />

      {/* Letters H R C */}
      <text x="36" y="70" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="18" fill="#fef3c7">H</text>
      <text x="57" y="44" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="18" fill={primary}>R</text>
      <text x="78" y="70" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="18" fill={accent}>C</text>

      {/* Small year badge to make it unique */}
      <rect x="38" y="78" width="44" height="12" rx="6" fill="#ffffff" opacity="0.85" />
      <text x="60" y="87" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="10" fill="#111827" textAnchor="middle">2004</text>
    </svg>
  );
};

export default Logo;
