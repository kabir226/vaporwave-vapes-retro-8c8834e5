import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  inStock?: boolean;
}

interface BestSellersSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const BestSellersSection: React.FC<BestSellersSectionProps> = ({ products, onAddToCart }) => {
  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-8">
          MEILLEURES VENTES
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border hover:border-primary"
            >
              <CardContent className="p-4">
                {/* Product Image */}
                <div className="relative aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  <span className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">
                    {product.image}
                  </span>
                  {product.badge && (
                    <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                      {product.badge}
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm md:text-base text-foreground line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(product.rating!) ? 'fill-primary text-primary' : 'text-muted'}`} 
                          />
                        ))}
                      </div>
                      {product.reviews && (
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">
                      €{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        €{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Button 
                    className="w-full bg-foreground hover:bg-foreground/90 text-background font-semibold"
                    onClick={() => onAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
