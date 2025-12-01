import React from 'react';
import { Star, Shield, Award } from 'lucide-react';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import OptimizedImage from '@/components/ui/optimized-image';

const TrustBanner: React.FC = () => {
  const { getSetting } = useHomepageSettings('trust_banner');
  const settings = getSetting('trust_banner');

  if (!settings) return null;

  return (
    <div className="w-full bg-card/90 backdrop-blur-sm border-b border-border py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {settings.image_url && (
          <div className="mb-6 rounded-2xl overflow-hidden">
            <OptimizedImage 
              src={settings.image_url} 
              alt={settings.title || 'Trust Banner'} 
              className="w-full aspect-[16/9] md:aspect-[21/9]"
              containerClassName="w-full aspect-[16/9] md:aspect-[21/9]"
              objectFit="cover"
            />
          </div>
        )}
        
        <div className="text-center space-y-4">
          {settings.title && (
            <h3 className="text-2xl font-bold text-foreground">{settings.title}</h3>
          )}
          {settings.subtitle && (
            <p className="text-muted-foreground">{settings.subtitle}</p>
          )}
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <span className="text-sm font-medium">Trusted by Thousands</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBanner;