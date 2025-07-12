
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Logo NS stylisé - forme moderne et épurée */}
      <path
        d="M4 24V8L12 16L20 8V24H16V14L12 18L8 14V24H4Z"
        fill="currentColor"
        className="text-primary"
      />
      <path
        d="M22 14C22 18.4183 25.5817 22 30 22V18C27.7909 18 26 16.2091 26 14C26 11.7909 27.7909 10 30 10V6C25.5817 6 22 9.58172 22 14Z"
        fill="currentColor"
        className="text-retro-gold"
      />
      <circle
        cx="28"
        cy="14"
        r="2"
        fill="currentColor"
        className="text-primary"
      />
    </svg>
  );
};

export default Logo;
