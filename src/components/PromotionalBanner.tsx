import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import OptimizedImage from '@/components/ui/optimized-image';

const PromotionalBanner: React.FC = () => {
  const { getSetting } = useHomepageSettings('promotional_banner');
  const settings = getSetting('promotional_banner');

  if (!settings) return null;

  return (
    <div className="w-full bg-muted/50 border-b border-border py-3 px-4">
      <div className="max-w-7xl mx-auto">
        {settings.image_url ? (
          <div className="rounded-xl overflow-hidden mb-3">
            <OptimizedImage 
              src={settings.image_url} 
              alt={settings.title || 'Promotion'} 
              className="w-full aspect-[21/9]"
              containerClassName="w-full aspect-[21/9]"
              objectFit="cover"
            />
          </div>
        ) : null}
        
        <div className="flex items-center justify-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            {settings.title && (
              <p className="text-sm md:text-base font-medium text-foreground">
                {settings.title}
              </p>
            )}
            {settings.subtitle && (
              <p className="text-xs text-muted-foreground">{settings.subtitle}</p>
            )}
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
