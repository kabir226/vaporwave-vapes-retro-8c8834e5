
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
  return (
    <section className="relative w-full py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Image Container */}
        <div className="relative w-full mb-8 md:mb-12 rounded-2xl overflow-hidden">
          <div className="aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-primary/20 via-card to-accent/10 flex items-center justify-center">
            {/* Placeholder pour l'image hero */}
            <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-accent/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-primary/20 rounded-full border-4 border-primary/30 flex items-center justify-center">
                    <span className="text-4xl md:text-6xl text-primary">💨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Below Image */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-cyber leading-tight">
            No Smoke, No Odour, No Limits
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Profitez de la satisfaction de la nicotine sans les effets nocifs du tabagisme.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-base group"
              onClick={onDiscoverProducts}
            >
              Découvrir la collection
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-base font-semibold"
              onClick={onToggleCart}
            >
              Panier ({cartItemsCount})
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
