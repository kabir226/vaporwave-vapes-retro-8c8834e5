import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrencies } from '@/hooks/useCurrencies';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';

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
  slug?: string;
}

interface BestSellersSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const BestSellersSection: React.FC<BestSellersSectionProps> = ({ products, onAddToCart }) => {
  const navigate = useNavigate();
  const { getCurrencyByCode } = useCurrencies();
  const { getSetting } = useHomepageSettings('bestsellers');
  const settings = getSetting('bestsellers');

  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-8">
          {settings?.title || 'MEILLEURES VENTES'}
        </h2>
        {settings?.subtitle && (
          <p className="text-center text-muted-foreground mb-6">{settings.subtitle}</p>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const currency = getCurrencyByCode((product as any).currency_code || 'EUR');
            const currencySymbol = currency?.symbol || '€';
            
            return (
            <Card 
              key={product.id} 
              className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 cursor-pointer rounded-2xl"
              onClick={() => product.slug && navigate(`/product/${product.slug}`)}
            >
              <CardContent className="p-6">
                {/* Product Display Area */}
                <div className="relative h-48 mb-4 flex items-center justify-center">
                  {typeof product.image === 'string' && product.image.startsWith('http') ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-7xl group-hover:scale-105 transition-transform duration-300">
                      {product.image || '📦'}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-card-foreground text-lg font-bold leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="text-2xl font-bold text-secondary">
                    {currencySymbol}{product.price.toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
