import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useCurrencies } from '@/hooks/useCurrencies';

interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  features: string[];
  stock?: number;
  rating?: number;
  isPopular?: boolean;
  inStock?: boolean;
  slug?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  delay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, delay = 0 }) => {
  const navigate = useNavigate();
  const { getCurrencyByCode } = useCurrencies();
  
  const currency = getCurrencyByCode((product as any).currency_code || 'EUR');
  const currencySymbol = currency?.symbol || '€';

  return (
    <Card 
      className="group relative overflow-hidden bg-black border border-white/20 hover:border-primary transition-all duration-300 cursor-pointer rounded-2xl"
      style={{ animationDelay: `${delay}s` }}
      onClick={() => product.slug && navigate(`/product/${product.slug}`)}
    >
      <CardContent className="p-4">
        <div className="relative h-32 mb-3 flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-contain scale-110 group-hover:scale-125 transition-transform duration-300"
            />
          ) : (
            <span className="text-5xl scale-110 group-hover:scale-125 transition-transform duration-300">
              📦
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
  );
};

export default ProductCard;
