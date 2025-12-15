import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrencies } from '@/hooks/useCurrencies';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import OptimizedImage from '@/components/ui/optimized-image';

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
  const [addingProducts, setAddingProducts] = useState<Record<string | number, boolean>>({});

  const handleAddToCart = (product: Product) => {
    setAddingProducts(prev => ({ ...prev, [product.id]: true }));
    onAddToCart(product);
    setTimeout(() => {
      setAddingProducts(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section className="w-full py-12 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {settings?.image_url && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <OptimizedImage 
              src={settings.image_url} 
              alt={settings.title || 'Produits Tendance'} 
              className="w-full aspect-[16/9]"
              containerClassName="w-full aspect-[16/9]"
              objectFit="cover"
            />
          </div>
        )}
        
        {/* Badge Tendances */}
        <div className="flex justify-center mb-6">
          <div className="border-2 border-[#FF8C00] rounded-full px-6 py-2">
            <span className="text-[#FF8C00] font-semibold tracking-wider">Tendances</span>
          </div>
        </div>
        
        {/* Titre avec dégradé */}
        <h2 className="text-4xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-[#FF0000] via-[#FF4500] to-[#FF8C00] bg-clip-text text-transparent tracking-tight">
          {settings?.title || 'PRODUITS TENDANCE'}
        </h2>
        
        <p className="text-center text-gray-400 mb-8 text-lg">
          {settings?.subtitle || 'Les produits les plus populaires du moment'}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const currency = getCurrencyByCode((product as any).currency_code || 'EUR');
            const currencySymbol = currency?.symbol || '€';
            
            return (
            <Card 
              key={product.id} 
              className="group relative overflow-hidden bg-black border border-white/20 hover:border-primary transition-all duration-300 rounded-2xl"
            >
              <CardContent className="p-4">
                {/* Product Display Area */}
                <div 
                  className="relative h-32 mb-3 flex items-center justify-center cursor-pointer"
                  onClick={() => product.slug && navigate(`/product/${product.slug}`)}
                >
                    {typeof product.image === 'string' && product.image.startsWith('http') ? (
                      product.image.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                        <video 
                          src={product.image} 
                          className="w-full h-full object-contain scale-110 group-hover:scale-125 transition-transform duration-300"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <OptimizedImage 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full scale-110 group-hover:scale-125 transition-transform duration-300"
                          containerClassName="w-full h-full"
                          objectFit="contain"
                        />
                      )
                    ) : (
                    <span className="text-5xl scale-110 group-hover:scale-125 transition-transform duration-300">
                      {product.image || '📦'}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="text-center space-y-2">
                  <h3 
                    className="text-white text-sm font-bold leading-tight cursor-pointer"
                    onClick={() => product.slug && navigate(`/product/${product.slug}`)}
                  >
                    {product.name}
                  </h3>
                  
                  <div className="text-xl font-bold text-red-500">
                    {currencySymbol}{product.price.toFixed(2)}
                  </div>

                  {/* Bouton Ajouter au panier avec animation */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    variant="outline"
                    disabled={addingProducts[product.id]}
                    className={`w-full rounded-full border-2 font-semibold py-3 px-4 mt-3 text-sm transition-all duration-300 inline-flex items-center justify-center gap-2 ${
                      addingProducts[product.id]
                        ? 'border-green-500 bg-green-500 text-white scale-105'
                        : 'border-white bg-transparent text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {addingProducts[product.id] ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>Ajouté !</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Ajouter au panier</span>
                      </>
                    )}
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
