
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrencies } from '@/hooks/useCurrencies';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TrendingProduct {
  id: string | number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
  slug?: string;
}

interface TrendingProductsProps {
  products: TrendingProduct[];
  onAddToCart: (product: TrendingProduct) => void;
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({ products, onAddToCart }) => {
  const navigate = useNavigate();
  const { getCurrencyByCode } = useCurrencies();
  const { getSetting } = useHomepageSettings('trending');
  const settings = getSetting('trending');

  return (
    <section className="py-16 px-4 bg-card/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-secondary text-secondary">
            Tendances
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-cyber">
            {settings?.title || 'PRODUITS TENDANCE'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {settings?.subtitle || 'Les produits les plus populaires du moment'}
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => {
              const currency = getCurrencyByCode((product as any).currency_code || 'EUR');
              const currencySymbol = currency?.symbol || '€';
              
              return (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Card 
                  className="group bg-glass border-border hover:border-primary transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden cursor-pointer"
                  onClick={() => product.slug && navigate(`/product/${product.slug}`)}
                >
                  <CardContent className="p-0 relative">
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 z-10 bg-destructive text-destructive-foreground font-bold">
                        {product.badge}
                      </Badge>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                      {typeof product.image === 'string' && product.image.startsWith('http') ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-6xl animate-float group-hover:scale-110 transition-transform duration-300">
                          {product.image || '📦'}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 text-primary group-hover:text-retro-gold transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>
                      
                      {/* Prix */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-black text-primary">
                          {currencySymbol}{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {currencySymbol}{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="w-full retro-gradient text-black font-bold group-hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'AJOUTER' : 'RUPTURE'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default TrendingProducts;
