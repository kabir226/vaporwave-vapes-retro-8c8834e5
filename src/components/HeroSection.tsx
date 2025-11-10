
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ArrowRight, Shield, Truck, Award } from 'lucide-react';

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
    <section className="relative bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Image Section - Left */}
          <div className="relative order-2 md:order-1">
            <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/10">
              <div className="absolute inset-0 bg-[url('/lovable-uploads/hero-vape-placeholder.jpg')] bg-cover bg-center opacity-40">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="px-3 py-1 text-sm font-bold shadow-lg">
                  18+ UNIQUEMENT
                </Badge>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Qualité garantie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-retro-gold" />
                    <span className="text-muted-foreground">Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - Right */}
          <div className="order-1 md:order-2 space-y-6">
            <div>
              <Badge variant="outline" className="mb-4 border-primary text-primary px-4 py-1.5">
                Collection Premium 2025
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-cyber leading-tight mb-4">
                NO-SMOKING
              </h1>
              
              <p className="text-xl md:text-2xl text-retro-gold font-semibold mb-6">
                L'élégance sans fumée
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Découvrez notre collection premium de vapes, e-liquides et accessoires. 
                Une expérience moderne et raffinée pour accompagner votre transition vers un mode de vie sans fumée.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-full text-base group shadow-lg"
                onClick={onDiscoverProducts}
              >
                Découvrir la collection
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-border hover:bg-muted px-8 py-6 rounded-full text-base font-semibold"
                onClick={onToggleCart}
              >
                Panier ({cartItemsCount})
              </Button>
            </div>

            {/* Demo Button */}
            <button 
              className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors pt-2"
              onClick={() => {}}
            >
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Play className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">Voir la démo produit</span>
            </button>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Livraison rapide</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Produits certifiés</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
