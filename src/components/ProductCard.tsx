
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: string;
  features: string[];
  stock?: number;
  rating?: number;
  isPopular?: boolean;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  delay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, delay = 0 }) => {
  return (
    <Card 
      className="group bg-glass border-border hover:border-primary transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hologram-effect overflow-hidden"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardContent className="p-6 relative z-10">
        {/* Popular Badge */}
        {product.isPopular && (
          <Badge className="absolute top-4 right-4 bg-retro-gold text-black font-bold animate-pulse">
            POPULAIRE
          </Badge>
        )}

        {/* Product Icon */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-float group-hover:scale-110 transition-transform duration-300">
            {product.icon}
          </div>
          <Badge variant="outline" className="border-primary text-primary text-xs">
            {product.category.toUpperCase()}
          </Badge>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-center text-primary group-hover:text-retro-gold transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          <div className="space-y-2">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Star className="w-3 h-3 text-retro-gold" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex justify-center items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                {product.rating}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="text-center">
            <div className="text-3xl font-black text-primary animate-neon-pulse">
              {product.price.toFixed(2)}€
            </div>
          </div>

          {/* Add to Cart Button avec animation */}
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full retro-gradient text-black font-bold py-3 hover:scale-105 active:scale-95 transition-all duration-300 group-hover:shadow-lg transform hover:animate-bounce"
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4 mr-2 animate-pulse" />
            {product.inStock ? 'AJOUTER AU PANIER' : 'RUPTURE DE STOCK'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
