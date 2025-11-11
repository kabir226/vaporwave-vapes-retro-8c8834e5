import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PromotionalBanner: React.FC = () => {
  return (
    <div className="w-full bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <p className="text-sm md:text-base font-medium text-foreground text-center">
            Mix & Match n'importe quelle saveur pour une pochette ! Aucun coût supplémentaire
          </p>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
