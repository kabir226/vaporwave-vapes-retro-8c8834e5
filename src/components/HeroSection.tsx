
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ArrowRight } from 'lucide-react';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media Container - inspiré par Nike */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-gradient-to-br from-primary/20 via-background to-accent/10">
          {/* Placeholder pour vidéo/gif de vape élégante */}
          <div className="absolute inset-0 bg-[url('/lovable-uploads/hero-vape-placeholder.jpg')] bg-cover bg-center opacity-30">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
          
          {/* Motif géométrique moderne */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-primary/20 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 border border-accent/20 rounded-full animate-pulse delay-1000" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-20">
        <Badge variant="outline" className="mb-6 border-primary text-primary text-sm px-4 py-2">
          🔞 RÉSERVÉ AUX PLUS DE 18 ANS
        </Badge>
        
        <h1 className="text-5xl md:text-8xl font-black mb-6 text-cyber leading-tight">
          NO-SMOKING
          <span className="block text-2xl md:text-4xl font-normal text-retro-gold mt-2">
            L'élégance sans fumée
          </span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Découvrez notre collection premium de vapes, e-liquides et accessoires. 
          <br />
          <span className="text-primary font-semibold">Une expérience moderne et raffinée.</span>
        </p>

        {/* Boutons d'action - style Apple/Nike */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full text-base group"
            onClick={onDiscoverProducts}
          >
            Découvrir la collection
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-full text-base font-semibold"
            onClick={onToggleCart}
          >
            Panier ({cartItemsCount})
          </Button>
        </div>

        {/* Video/Demo Button - inspiré par les sites premium */}
        <div className="flex justify-center">
          <button className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
            <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Play className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium">Voir la démo produit</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
