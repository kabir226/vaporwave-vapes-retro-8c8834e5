import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
        {settings?.image_url && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img 
              src={settings.image_url} 
              alt={settings.title || 'Trending'} 
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        )}
        
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
                  className="group relative overflow-hidden bg-black border border-white/20 hover:border-primary transition-all duration-300 cursor-pointer rounded-2xl"
                  onClick={() => product.slug && navigate(`/product/${product.slug}`)}
                >
                  <CardContent className="p-4">
                    <div className="relative h-32 mb-3 flex items-center justify-center">
                      {typeof product.image === 'string' && product.image.startsWith('http') ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain scale-110 group-hover:scale-125 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-5xl scale-110 group-hover:scale-125 transition-transform duration-300">
                          {product.image || '📦'}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-center space-y-1">
                      <h3 className="text-white text-sm font-bold leading-tight">
                        {product.name}
                      </h3>
                      
                      <div className="text-xl font-bold text-red-500">
                        {currencySymbol}{product.price.toFixed(2)}
                      </div>
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
