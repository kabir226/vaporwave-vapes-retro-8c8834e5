import React, { useState, useEffect } from 'react';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { videoCache, preloadCriticalVideo } from '@/lib/videoCache';
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

  // Preload all product videos on mount for instant playback
  useEffect(() => {
    if (products.length > 0) {
      const videoUrls = videoCache.extractVideoUrls(products);
      
      // Preload first 2 videos immediately (above-the-fold)
      videoUrls.slice(0, 2).forEach(preloadCriticalVideo);
      
      // Cache all videos in background
      videoCache.preloadVideos(videoUrls);
    }
  }, [products]);

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
  
  // Ne plus bloquer le rendu - le modal sera affiché en overlay
  
  // Données structurées enrichies (Schema.org Organization + Store + LocalBusiness)
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://snuspedia-bf.com/#organization",
        "name": "Snuspedia Ouagadougou",
        "alternateName": ["SNUSPEDIA", "Snuspedia Ouaga", "Snus Ouaga"],
        "url": "https://snuspedia-bf.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://snuspedia-bf.com/og-image.png"
        },
        "description": "Snuspedia est le n°1 de la vente de snus et sachets de nicotine à Ouagadougou, Burkina Faso. Alternative sans fumée aux produits du tabac avec livraison rapide.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ouagadougou",
          "addressLocality": "Ouagadougou",
          "addressRegion": "Centre",
          "addressCountry": "BF"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "telephone": "+22605145905",
          "url": "https://wa.me/message/VU57PC3IDGREF1",
          "availableLanguage": ["French"]
        },
        "sameAs": [
          "https://wa.me/message/VU57PC3IDGREF1"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://snuspedia-bf.com/#localbusiness",
        "name": "Snuspedia Ouagadougou",
        "alternateName": "Snus Ouaga",
        "description": "Boutique de snus et sachets de nicotine à Ouagadougou. Le leader du snus au Burkina Faso avec livraison rapide dans toute la ville.",
        "url": "https://snuspedia-bf.com",
        "telephone": "+22605145905",
        "priceRange": "$$",
        "currenciesAccepted": "XOF",
        "paymentAccepted": ["Cash", "Mobile Money", "Orange Money", "Moov Money"],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ouagadougou",
          "addressLocality": "Ouagadougou",
          "addressRegion": "Centre",
          "postalCode": "01",
          "addressCountry": "BF"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "12.3714",
          "longitude": "-1.5197"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Ouagadougou",
            "containedInPlace": {
              "@type": "Country",
              "name": "Burkina Faso"
            }
          },
          {
            "@type": "Country",
            "name": "Burkina Faso"
          }
        ],
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "08:00",
          "closes": "22:00"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Catalogue Snus et Nicotine",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "Snus Pablo"
            },
            {
              "@type": "OfferCatalog",
              "name": "Snus Velo"
            },
            {
              "@type": "OfferCatalog",
              "name": "Sachets de Nicotine"
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://snuspedia-bf.com/#website",
        "url": "https://snuspedia-bf.com",
        "name": "Snuspedia - Snus Ouagadougou",
        "alternateName": "Snus Ouaga",
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
        "name": "Snuspedia Ouagadougou",
        "description": "Le n°1 du Snus et des sachets de nicotine à Ouagadougou. Livraison rapide au Burkina Faso. Achetez snus ouaga en ligne.",
        "url": "https://snuspedia-bf.com",
        "priceRange": "$$",
        "currenciesAccepted": "XOF",
        "paymentAccepted": "Cash, Mobile Money",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ouagadougou",
          "addressLocality": "Ouagadougou",
          "addressRegion": "Centre",
          "addressCountry": "BF"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "12.3714",
          "longitude": "-1.5197"
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
        title="Snus Ouagadougou - Sachets de Nicotine Burkina Faso | Snuspedia"
        description="Achetez du snus à Ouagadougou ! Snuspedia, le n°1 du snus et sachets de nicotine au Burkina Faso. Pablo, Velo, Zyn. Livraison rapide Ouaga. Alternative sans fumée."
        url="https://snuspedia-bf.com"
        type="website"
        keywords="snus ouaga, snus ouagadougou, nicotine burkina faso, pablo snus, velo nicotine, sachets nicotine ouaga, acheter snus burkina, snus livraison ouagadougou"
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

      {/* Age Verification Modal - Overlay au-dessus du contenu (SEO-friendly) */}
      {(!isAgeVerified || showAgeModal) && (
        <AgeVerificationModal onConfirm={confirmAge} onDeny={denyAge} />
      )}
    </div>
  );
};

export default Index;
