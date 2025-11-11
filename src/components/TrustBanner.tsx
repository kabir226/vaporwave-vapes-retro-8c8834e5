import React from 'react';
import { Star } from 'lucide-react';

const TrustBanner: React.FC = () => {
  return (
    <div className="w-full bg-card/90 backdrop-blur-sm border-b border-border py-2 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-muted-foreground">Voir nos</span>
          <span className="font-bold text-foreground">329 avis</span>
          <span className="text-muted-foreground">sur</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-bold text-foreground">Trustpilot</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBanner;
