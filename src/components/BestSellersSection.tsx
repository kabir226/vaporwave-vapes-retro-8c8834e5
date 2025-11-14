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
              className="group relative overflow-hidden bg-black border-border hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
              onClick={() => product.slug && navigate(`/product/${product.slug}`)}
            >
              <CardContent className="p-0">
                {/* Product Display Area */}
                <div className="relative h-64 bg-black overflow-hidden flex items-center justify-center">
                  {typeof product.image === 'string' && product.image.startsWith('http') ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                      {product.image || '📦'}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="bg-black p-4 text-center border-t border-border">
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 min-h-[3rem]">
                    {product.name}
                  </h3>
                  
                  {product.rating && (
                    <div className="flex items-center justify-center gap-1 mb-2">
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

                  <div className="text-2xl font-bold text-white mb-4">
                    {currencySymbol}{product.price.toFixed(2)}
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
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
