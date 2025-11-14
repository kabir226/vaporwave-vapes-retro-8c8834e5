
import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Logo Pingouin moderne - minimaliste */}
      <defs>
        <linearGradient id="penguinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
      
      {/* Corps du pingouin */}
      <ellipse cx="30" cy="45" rx="20" ry="28" fill="#000000" />
      
      {/* Ventre blanc */}
      <ellipse cx="30" cy="48" rx="12" ry="20" fill="#FFFFFF" />
      
      {/* Tête */}
      <circle cx="30" cy="20" r="15" fill="#000000" />
      
      {/* Œil gauche */}
      <circle cx="26" cy="18" r="4" fill="#FFFFFF" />
      <circle cx="27" cy="17" r="2" fill="#000000" />
      
      {/* Œil droit */}
      <circle cx="34" cy="18" r="4" fill="#FFFFFF" />
      <circle cx="35" cy="17" r="2" fill="#000000" />
      
      {/* Bec avec gradient rouge */}
      <path
        d="M30 22 L38 24 L30 26 Z"
        fill="url(#penguinGradient)"
      />
      
      {/* Aile gauche */}
      <ellipse cx="12" cy="45" rx="6" ry="20" fill="#000000" transform="rotate(-20 12 45)" />
      
      {/* Aile droite */}
      <ellipse cx="48" cy="45" rx="6" ry="20" fill="#000000" transform="rotate(20 48 45)" />
      
      {/* Pieds avec accent orange */}
      <ellipse cx="22" cy="72" rx="6" ry="4" fill="hsl(var(--secondary))" />
      <ellipse cx="38" cy="72" rx="6" ry="4" fill="hsl(var(--secondary))" />
    </svg>
  );
};

export default Logo;
