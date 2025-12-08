import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCurrencies } from '@/hooks/useCurrencies';
import { ShoppingCart } from 'lucide-react';
import OptimizedImage from '@/components/ui/optimized-image';
import LazyVideo from '@/components/ui/lazy-video';

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
  const { getCurrencyByCode } = useCurrencies();
  
  const currency = getCurrencyByCode((product as any).currency_code || 'EUR');
  const currencySymbol = currency?.symbol || '€';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onAddToCart(product);
  };

  const productUrl = product.slug ? `/product/${product.slug}` : '#';

  return (
    <Card 
      className="group relative overflow-hidden bg-black/40 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardContent className="p-6 flex flex-col items-center">
        {/* Image ronde avec lien */}
        <Link 
          to={productUrl}
          className="relative w-36 h-36 mb-4 rounded-full overflow-hidden bg-muted flex items-center justify-center"
        >
          {product.images && product.images.length > 0 ? (
            product.images[0].match(/\.(mp4|webm|ogg|mov)$/i) ? (
              <LazyVideo 
                src={product.images[0]} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                autoPlay
                loop
                muted
              />
            ) : (
              <OptimizedImage 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                containerClassName="w-full h-full"
                objectFit="cover"
              />
            )
          ) : (
            <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
              📦
            </span>
          )}
        </Link>
        
        {/* Titre avec lien */}
        <Link 
          to={productUrl}
          className="text-white text-base font-medium text-center mb-2 line-clamp-2 hover:text-primary transition-colors"
        >
          {product.name}
        </Link>
        
        {/* Prix */}
        <div className="text-xl font-bold text-primary mb-4">
          {currencySymbol}{product.price.toFixed(2)}
        </div>

        {/* Bouton Ajouter au panier */}
        <Button
          onClick={handleAddToCart}
          variant="outline"
          className="w-full rounded-full border-2 border-white bg-transparent text-white hover:bg-white hover:text-black font-medium py-2 px-3 text-xs transition-all duration-300 inline-flex items-center justify-center gap-1.5"
        >
          <ShoppingCart className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">Ajouter au panier</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
