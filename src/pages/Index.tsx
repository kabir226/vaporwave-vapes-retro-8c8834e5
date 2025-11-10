
import React, { useState } from 'react';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import ProductsSection from '@/components/ProductsSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ParticleBackground from '@/components/ParticleBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuickActions from '@/components/QuickActions';
import CartModal from '@/components/CartModal';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import CategoryCarousel from '@/components/CategoryCarousel';
import TrendingProducts from '@/components/TrendingProducts';
import ProductFilters from '@/components/ProductFilters';
import CartAnimation from '@/components/CartAnimation';
import TrustIndicators from '@/components/TrustIndicators';
import AgeWarningBanner from '@/components/AgeWarningBanner';

import { useCart } from '@/hooks/useCart';
import { useAgeVerification } from '@/hooks/useAgeVerification';
import { useProductFilter } from '@/hooks/useProductFilter';

import { products, categories, trendingProducts, testimonials } from '@/data/products';

const Index = () => {
  const { cart, addToCart, updateQuantity, removeItem } = useCart();
  const { isAgeVerified, showAgeModal, confirmAge, denyAge } = useAgeVerification();
  const { searchQuery, setSearchQuery, filteredProducts, setFilters } = useProductFilter(products);
  
  const [showCart, setShowCart] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  const handleAddToCart = (product: any) => {
    setLastAddedProduct(product);
    setShowCartAnimation(true);
    
    setTimeout(() => {
      addToCart(product);
    }, 800);
  };

  const handleCartAnimationComplete = () => {
    setShowCartAnimation(false);
  };

  if (!isAgeVerified || showAgeModal) {
    return <AgeVerificationModal onConfirm={confirmAge} onDeny={denyAge} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      
      <Header cart={cart} onToggleCart={() => setShowCart(!showCart)} />
      
      <AgeWarningBanner />

      <HeroSection
        onDiscoverProducts={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
        onToggleCart={() => setShowCart(true)}
        cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <CartAnimation 
        isVisible={showCartAnimation}
        onComplete={handleCartAnimationComplete}
        productName={lastAddedProduct?.name || ''}
      />

      <CartModal 
        isVisible={showCart}
        cart={cart}
        onClose={() => setShowCart(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <CategoryCarousel 
        categories={categories}
        title="SHOP BY CATEGORY"
      />

      <TrendingProducts 
        products={trendingProducts}
        onAddToCart={handleAddToCart}
      />

      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </section>

      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <ProductFilters 
            onFilterChange={setFilters}
            productCount={products.length}
          />
        </div>
      </section>

      <ProductsSection 
        filteredProducts={filteredProducts}
        searchQuery={searchQuery}
        onAddToCart={handleAddToCart}
      />

      <QuickActions />

      <TestimonialCarousel testimonials={testimonials} />

      <TrustIndicators />

      <Footer />
    </div>
  );
};

export default Index;
