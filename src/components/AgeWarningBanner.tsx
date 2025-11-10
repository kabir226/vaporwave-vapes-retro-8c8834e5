
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AgeWarningBanner: React.FC = () => {
  return (
    <div className="w-full bg-destructive/90 backdrop-blur-sm border-b border-destructive py-3 px-4 mt-20">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <AlertTriangle className="w-5 h-5 text-destructive-foreground flex-shrink-0" />
        <p className="text-sm md:text-base text-destructive-foreground font-semibold text-center">
          Ce produit contient de la nicotine, substance hautement addictive. Vente strictement interdite aux personnes de moins de 18 ans.
        </p>
      </div>
    </div>
  );
};

export default AgeWarningBanner;
