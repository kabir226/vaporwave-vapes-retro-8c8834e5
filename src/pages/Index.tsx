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
import SEO from '@/components/SEO';
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
  
  // Données structurées enrichies (Schema.org Organization + Store)
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://snuspedia-bf.com/#organization",
        "name": "Snuspedia",
        "alternateName": "SNUSPEDIA",
        "url": "https://snuspedia-bf.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://snuspedia-bf.com/og-image.png"
        },
        "description": "Snuspedia est le leader de la vente de snus et sachets de nicotine au Burkina Faso. Alternative sans fumée aux produits du tabac.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ouagadougou",
          "addressCountry": "BF"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "url": "https://wa.me/message/VU57PC3IDGREF1",
          "availableLanguage": ["French"]
        },
        "sameAs": [
          "https://wa.me/message/VU57PC3IDGREF1"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://snuspedia-bf.com/#website",
        "url": "https://snuspedia-bf.com",
        "name": "Snuspedia",
        "publisher": {
          "@id": "https://snuspedia-bf.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://snuspedia-bf.com/shop?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Store",
        "@id": "https://snuspedia-bf.com/#store",
        "name": "Snuspedia",
        "description": "Le n°1 du Snus et des sachets de nicotine à Ouagadougou. Livraison rapide au Burkina Faso.",
        "url": "https://snuspedia-bf.com",
        "priceRange": "$$",
        "currenciesAccepted": "XOF",
        "paymentAccepted": "Cash, Mobile Money",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ouagadougou",
          "addressCountry": "BF"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Burkina Faso"
        }
      }
    ]
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Snuspedia - Snus & Sachets de Nicotine au Burkina Faso"
        description="Le n°1 du Snus et des sachets de nicotine à Ouagadougou. Livraison rapide. Large gamme de produits premium pour une alternative sans fumée au tabac."
        url="https://snuspedia-bf.com"
        type="website"
        structuredData={homeStructuredData}
      />
      <ParticleBackground />
      
      {/* Header */}
      <Header cart={cart} onToggleCart={() => setShowCart(!showCart)} />

      {/* Age Warning Banner */}
      <AgeWarningBanner />

      {/* Main Content */}
      <main>
        {/* Hero Section - Large Image + Content */}
        <HeroSection 
          onDiscoverProducts={() => document.getElementById('products')?.scrollIntoView({
            behavior: 'smooth'
          })} 
          onToggleCart={() => setShowCart(true)} 
          cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        />

        {/* Category Section - Shop by Category */}
        <CategorySection />

        {/* Best Sellers Section */}
        {!loadingProducts && !loadingCategories && (
          <BestSellersSection products={bestSellersProducts} onAddToCart={handleAddToCart} />
        )}

        {/* Why Switch Section */}
        <WhySwitchSection />

        {/* Benefits Comparison Section */}
        <BenefitsComparisonSection />

        {/* New In Stock Section */}
        <NewInStockSection />

        {/* Customer Change Section */}
        <CustomerChangeSection />

        {/* How To Use Section */}
        <HowToUseSection />

        {/* Buy SNUS Section */}
        <BuySNUSSection />
      </main>

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
