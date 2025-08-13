
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import StockIndicator from '@/components/StockIndicator';

interface ProductsSectionProps {
  filteredProducts: any[];
  searchQuery: string;
  onAddToCart: (product: any) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  filteredProducts,
  searchQuery,
  onAddToCart
}) => {
  return (
    <section id="products" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Collection Premium
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-cyber">
            NOS PRODUITS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une gamme soigneusement sélectionnée pour vous accompagner dans votre transition
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="group">
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart}
                delay={index * 0.1}
              />
              <div className="mt-2 flex justify-between items-center">
                <StockIndicator stock={product.stock} />
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-muted-foreground">{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Aucun produit trouvé pour "{searchQuery}"
            </p>
          </div>
        )}
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Vous ne trouvez pas ce que vous cherchez ?
          </p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-bold transition-all hover:scale-105 animate-pulse">
            Voir toute la collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
