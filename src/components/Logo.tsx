
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Logo NS moderne - forme minimaliste inspirée Nike */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" />
        </linearGradient>
      </defs>
      
      {/* Forme principale moderne */}
      <path
        d="M8 32V12L16 20L24 12V32H20V18L16 22L12 18V32H8Z"
        fill="url(#logoGradient)"
        className="drop-shadow-lg"
      />
      <path
        d="M26 18C26 23.5228 30.4772 28 36 28V24C32.6863 24 30 21.3137 30 18C30 14.6863 32.6863 12 36 12V8C30.4772 8 26 12.4772 26 18Z"
        fill="url(#logoGradient)"
        className="drop-shadow-lg"
      />
      <circle
        cx="33"
        cy="18"
        r="3"
        fill="hsl(var(--background))"
        className="drop-shadow-sm"
      />
      <circle
        cx="33"
        cy="18"
        r="1.5"
        fill="url(#logoGradient)"
      />
    </svg>
  );
};

export default Logo;
