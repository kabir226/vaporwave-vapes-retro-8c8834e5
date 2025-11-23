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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-black/40 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
      onClick={() => product.slug && navigate(`/product/${product.slug}`)}
    >
      <CardContent className="p-6 flex flex-col items-center">
        {/* Image ronde */}
        <div className="relative w-36 h-36 mb-4 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
            product.images[0].match(/\.(mp4|webm|ogg|mov)$/i) ? (
              <video 
                src={product.images[0]} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            )
          ) : (
            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
              📦
            </span>
          )}
        </div>
        
        {/* Titre */}
        <h3 className="text-white text-base font-medium text-center mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Prix */}
        <div className="text-xl font-bold text-primary">
          {currencySymbol}{product.price.toFixed(2)}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
