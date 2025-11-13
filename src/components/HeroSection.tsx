
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';

interface HeroSectionProps {
  onDiscoverProducts: () => void;
  onToggleCart: () => void;
  cartItemsCount: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onDiscoverProducts, 
  onToggleCart, 
  cartItemsCount 
}) => {
  const { getSetting, loading } = useHomepageSettings('hero');
  const heroSettings = getSetting('hero');

  return (
    <section className="relative w-full px-4 pt-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Image - Full Width at Top */}
        <div className="relative w-full mb-6 rounded-2xl overflow-hidden">
          <div className="aspect-[4/3] md:aspect-[16/9] bg-gradient-to-br from-primary/20 via-card to-accent/10 flex items-center justify-center">
            {heroSettings?.image_url ? (
              <img 
                src={heroSettings.image_url} 
                alt={heroSettings.title || "Hero"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-accent/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-primary/20 rounded-full border-4 border-primary/30 flex items-center justify-center">
                      <span className="text-4xl md:text-6xl text-primary">💨</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Below Image */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
            {heroSettings?.title || "No Smoke, No Odour, No Limits"}
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {heroSettings?.subtitle || "Profitez de la satisfaction de la nicotine sans les effets nocifs du tabagisme."}
          </p>

          {/* Primary CTA Button */}
          <div className="pt-2">
            <Button 
              size="lg" 
              className="bg-foreground hover:bg-foreground/90 text-background font-bold px-12 py-6 text-base group rounded-full w-full md:w-auto"
              onClick={onDiscoverProducts}
            >
              {heroSettings?.button_text || "ACHETER NICOTINE SANS FUMÉE"}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
