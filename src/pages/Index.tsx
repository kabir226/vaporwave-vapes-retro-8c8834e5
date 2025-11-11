
import React, { useState } from 'react';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import ParticleBackground from '@/components/ParticleBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartModal from '@/components/CartModal';
import HeroSection from '@/components/HeroSection';
import CartAnimation from '@/components/CartAnimation';
import AgeWarningBanner from '@/components/AgeWarningBanner';
import TrustBanner from '@/components/TrustBanner';
import PromotionalBanner from '@/components/PromotionalBanner';
import BenefitsSection from '@/components/BenefitsSection';
import CategorySection from '@/components/CategorySection';
import BestSellersSection from '@/components/BestSellersSection';
import SearchBar from '@/components/SearchBar';
import ProductFilters from '@/components/ProductFilters';
import ProductsSection from '@/components/ProductsSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import TrustIndicators from '@/components/TrustIndicators';

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
      
      {/* Trust Banner - Very Top */}
      <TrustBanner />
      
      {/* Header */}
      <Header cart={cart} onToggleCart={() => setShowCart(!showCart)} />

      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Age Warning Banner */}
      <AgeWarningBanner />

      {/* Hero Section - Large Image + Content */}
      <HeroSection 
        onDiscoverProducts={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
        onToggleCart={() => setShowCart(true)}
        cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Category Section - Shop by Category */}
      <CategorySection categories={categories} />

      {/* Best Sellers Section */}
      <BestSellersSection 
        products={trendingProducts}
        onAddToCart={handleAddToCart}
      />

      {/* Search & Filters */}
      <section className="py-8 px-4" id="products">
        <div className="max-w-2xl mx-auto mb-6">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <div className="max-w-7xl mx-auto">
          <ProductFilters 
            onFilterChange={setFilters}
            productCount={products.length}
          />
        </div>
      </section>

      {/* All Products */}
      <ProductsSection 
        filteredProducts={filteredProducts}
        searchQuery={searchQuery}
        onAddToCart={handleAddToCart}
      />

      {/* Testimonials */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Footer */}
      <Footer />

      {/* Modals & Animations */}
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
    </div>
  );
};

export default Index;
