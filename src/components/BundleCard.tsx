import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrencies } from '@/hooks/useCurrencies';

interface BundleProduct {
  image: string;
  position?: string;
  rotation?: string;
  scale?: string;
}

interface BundleCardProps {
  id: string | number;
  name: string;
  products: BundleProduct[];
  price: number;
  originalPrice: number;
  discount?: string;
  onAddToCart: (bundle: any) => void;
  slug?: string;
}

const BundleCard: React.FC<BundleCardProps> = ({
  id,
  name,
  products,
  price,
  originalPrice,
  discount,
  onAddToCart,
  slug
}) => {
  const navigate = useNavigate();
  const { getCurrencyByCode } = useCurrencies();
  const currency = getCurrencyByCode('EUR');
  const currencySymbol = currency?.symbol || '€';

  return (
    <Card 
      className="group relative overflow-hidden bg-black border-border hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
      onClick={() => slug && navigate(`/product/${slug}`)}
    >
      <CardContent className="p-0">
        {/* Discount Badge */}
        {discount && (
          <Badge className="absolute top-4 left-4 z-10 bg-destructive text-destructive-foreground font-bold rounded-full px-3 py-1">
            {discount}
          </Badge>
        )}

        {/* Products Display Area */}
        <div className="relative h-80 bg-black overflow-hidden">
          {products.map((product, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                top: product.position?.split(' ')[0] || '50%',
                left: product.position?.split(' ')[1] || '50%',
                transform: `translate(-50%, -50%) rotate(${product.rotation || '0deg'}) scale(${product.scale || '1'})`,
                transition: 'transform 0.3s ease'
              }}
            >
              <img 
                src={product.image} 
                alt={`Product ${index + 1}`}
                className="w-32 h-32 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Bundle Info */}
        <div className="bg-black p-6 text-center border-t border-border">
          <h3 className="text-2xl font-bold text-white mb-3">
            {name}
          </h3>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl font-bold text-destructive">
              {currencySymbol}{price.toFixed(2)}
            </span>
            <span className="text-xl text-muted-foreground line-through">
              {currencySymbol}{originalPrice.toFixed(2)}
            </span>
          </div>

          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart({ id, name, price, originalPrice });
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Ajouter au panier
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BundleCard;
