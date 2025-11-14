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
import CategorySection from '@/components/CategorySection';
import BestSellersSection from '@/components/BestSellersSection';
import WhySwitchSection from '@/components/WhySwitchSection';
import BenefitsComparisonSection from '@/components/BenefitsComparisonSection';
import NewInStockSection from '@/components/NewInStockSection';
import CustomerChangeSection from '@/components/CustomerChangeSection';
import HowToUseSection from '@/components/HowToUseSection';
import MixMatchSection from '@/components/MixMatchSection';
import BuySNUSSection from '@/components/BuySNUSSection';
import TrendingProducts from '@/components/TrendingProducts';
import BenefitsSection from '@/components/BenefitsSection';
import { useCart } from '@/hooks/useCart';
import { useAgeVerification } from '@/hooks/useAgeVerification';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
const Index = () => {
  const {
    products,
    loading: loadingProducts
  } = useProducts();
  const {
    categories,
    loading: loadingCategories
  } = useCategories();
  const {
    cart,
    addToCart,
    updateQuantity,
    removeItem
  } = useCart();
  const {
    isAgeVerified,
    showAgeModal,
    confirmAge,
    denyAge
  } = useAgeVerification();
  const [showCart, setShowCart] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  // Trouver la catégorie "Meilleures ventes"
  const bestSellersCategory = categories.find(c => c.slug === 'best-sellers');

  // Transformer les produits pour la compatibilité
  const transformedProducts = products.map(p => ({
    ...p,
    image: p.images?.[0] || '📦',
    inStock: p.in_stock,
    reviews: 0
  }));

  // Filtrer les produits de la catégorie "Meilleures ventes"
  const bestSellersProducts = bestSellersCategory ? transformedProducts.filter(p => p.category_id === bestSellersCategory.id) : transformedProducts.slice(0, 8);
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
  return <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      
      {/* Trust Banner - Very Top */}
      
      
      {/* Header */}
      <Header cart={cart} onToggleCart={() => setShowCart(!showCart)} />

      {/* Promotional Banner */}
      

      {/* Age Warning Banner */}
      <AgeWarningBanner />

      {/* Hero Section - Large Image + Content */}
      <HeroSection onDiscoverProducts={() => document.getElementById('products')?.scrollIntoView({
      behavior: 'smooth'
    })} onToggleCart={() => setShowCart(true)} cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />

      {/* Category Section - Shop by Category */}
      <CategorySection />

      {/* Best Sellers Section */}
      {!loadingProducts && !loadingCategories && <BestSellersSection products={bestSellersProducts} onAddToCart={handleAddToCart} />}

      {/* Trending Products Section */}
      {!loadingProducts && <TrendingProducts products={transformedProducts.slice(0, 8)} onAddToCart={handleAddToCart} />}

      {/* Why Switch Section */}
      <WhySwitchSection />

      {/* Benefits Section */}
      

      {/* Benefits Comparison Section */}
      <BenefitsComparisonSection />

      {/* New In Stock Section */}
      <NewInStockSection />

      {/* Customer Change Section */}
      <CustomerChangeSection />

      {/* How To Use Section */}
      <HowToUseSection />

      {/* Mix & Match Section */}
      <MixMatchSection />

      {/* Buy SNUS Section */}
      <BuySNUSSection />

      {/* Footer */}
      <Footer />

      {/* Modals & Animations */}
      <CartAnimation isVisible={showCartAnimation} onComplete={handleCartAnimationComplete} productName={lastAddedProduct?.name || ''} />

      <CartModal isVisible={showCart} cart={cart} onClose={() => setShowCart(false)} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />
    </div>;
};
export default Index;