
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

const AgeWarningBanner: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <Badge variant="destructive" className="px-4 py-2 text-sm shadow-lg animate-pulse">
        <AlertTriangle className="w-4 h-4 mr-2" />
        Vente interdite aux moins de 18 ans
      </Badge>
    </div>
  );
};

export default AgeWarningBanner;
