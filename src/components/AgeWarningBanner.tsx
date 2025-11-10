
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AgeWarningBanner: React.FC = () => {
  return (
    <div className="w-full bg-card border-b-2 border-primary/30">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 text-center">
          <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0" />
          <p className="text-sm md:text-base font-semibold text-foreground">
            <span className="text-primary">AVERTISSEMENT :</span> Ce produit contient de la nicotine. 
            La nicotine crée une forte dépendance. <span className="text-primary font-bold">18+ UNIQUEMENT</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeWarningBanner;
