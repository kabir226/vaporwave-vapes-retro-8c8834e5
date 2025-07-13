import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Star } from 'lucide-react';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import ProductCard from '@/components/ProductCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ParticleBackground from '@/components/ParticleBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuickActions from '@/components/QuickActions';
import CartSummary from '@/components/CartSummary';
import HeroSection from '@/components/HeroSection';
import SearchBar from '@/components/SearchBar';
import StockIndicator from '@/components/StockIndicator';
import CategoryCarousel from '@/components/CategoryCarousel';
import TrendingProducts from '@/components/TrendingProducts';
import ProductFilters from '@/components/ProductFilters';
import CartAnimation from '@/components/CartAnimation';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [cart, setCart] = useState([]);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ category: 'all', priceRange: 'all', sortBy: 'popular' });
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Vérification plus stricte de l'âge
    const verified = localStorage.getItem('ageVerified');
    const verificationDate = localStorage.getItem('ageVerificationDate');
    const today = new Date().toDateString();
    
    if (verified === 'true' && verificationDate === today) {
      setIsAgeVerified(true);
      setShowAgeModal(false);
    } else {
      // Réinitialiser si c'est un nouveau jour
      localStorage.removeItem('ageVerified');
      localStorage.removeItem('ageVerificationDate');
      setIsAgeVerified(false);
      setShowAgeModal(true);
    }
  }, []);

  const products = [
    {
      id: 1,
      name: "VAPES PREMIUM",
      description: "Vapes élégantes avec design moderne et performance exceptionnelle. Batterie longue durée et vapeur dense.",
      price: 39.99,
      icon: "💨",
      category: "vapes",
      features: ["Batterie 2000mAh", "Design élégant", "Vapeur dense"],
      stock: 15,
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: "E-LIQUIDES PREMIUM",
      description: "Saveurs artisanales créées par nos experts. Sans diacétyle, qualité pharmaceutique.",
      price: 12.99,
      icon: "💧",
      category: "eliquids",
      features: ["Saveurs naturelles", "Sans diacétyle", "Qualité premium"],
      stock: 28,
      rating: 4.9,
      inStock: true
    },
    {
      id: 3,
      name: "GUMS NICOTINÉS",
      description: "Gums discrets à libération contrôlée. Idéal pour réduire progressivement la consommation.",
      price: 16.99,
      icon: "🍬",
      category: "gums",
      features: ["Libération contrôlée", "Discrets", "Effet progressif"],
      stock: 22,
      rating: 4.7,
      inStock: true
    },
    {
      id: 4,
      name: "PACK DÉCOUVERTE",
      description: "Kit complet pour débuter: vape, 2 e-liquides et gums. Parfait pour commencer en douceur.",
      price: 59.99,
      icon: "📦",
      category: "packs",
      features: ["Kit complet", "Guide inclus", "Prix avantageux"],
      stock: 8,
      rating: 5.0,
      isPopular: true,
      inStock: true
    }
  ];

  const categories = [
    {
      id: 1,
      name: "Vapes Premium",
      description: "Découvrez notre gamme de vapes haut de gamme avec des performances exceptionnelles.",
      image: "💨",
      count: 24,
      featured: true
    },
    {
      id: 2,
      name: "E-Liquides",
      description: "Large sélection de saveurs premium créées par nos maîtres artisans.",
      image: "💧",
      count: 156
    },
    {
      id: 3,
      name: "Kits Débutants",
      description: "Kits complets parfaits pour commencer votre transition en douceur.",
      image: "📦",
      count: 12
    },
    {
      id: 4,
      name: "Gums Nicotinés",
      description: "Alternative discrète et pratique pour gérer votre consommation.",
      image: "🍬",
      count: 18
    },
    {
      id: 5,
      name: "Accessoires",
      description: "Tous les accessoires pour optimiser votre expérience vape.",
      image: "🔧",
      count: 89
    }
  ];

  const trendingProducts = [
    {
      id: 101,
      name: "Vapouriz Premium Blackcurrant E-Liquid 10ml",
      description: "Saveur cassis intense avec finition premium. Ratio PG/VG optimisé.",
      price: 2.50,
      originalPrice: 3.99,
      image: "💜",
      rating: 4.8,
      reviews: 124,
      badge: "OFFRE -37%",
      inStock: true
    },
    {
      id: 102,
      name: "Bar Juice 5000 Triple Mango 10ml",
      description: "Triple concentration de mangue tropicale pour une explosion de saveurs.",
      price: 3.99,
      image: "🥭",
      rating: 4.9,
      reviews: 89,
      inStock: true
    },
    {
      id: 103,
      name: "Pod Kit Starter Premium",
      description: "Kit de démarrage complet avec 2 pods et chargeur rapide inclus.",
      price: 24.99,
      originalPrice: 29.99,
      image: "📱",
      rating: 4.7,
      reviews: 203,
      badge: "NOUVEAU",
      inStock: true
    },
    {
      id: 104,
      name: "Mix & Match 4 E-Liquides",
      description: "Choisissez 4 e-liquides parmi notre sélection premium à prix avantageux.",
      price: 10.00,
      originalPrice: 15.96,
      image: "🌈",
      rating: 4.6,
      reviews: 67,
      badge: "PACK",
      inStock: true
    }
  ];

  const testimonials = [
    {
      content: "Service client exceptionnel et livraison ultra rapide. Les produits sont de qualité premium, je recommande vivement !",
      author: "Marc Lebreton",
      rating: 5,
      location: "Paris",
      verified: true
    },
    {
      content: "Les gums m'ont vraiment aidé à réduire ma consommation progressivement. Approche bienveillante et efficace.",
      author: "Sophie Dubois", 
      rating: 5,
      location: "Lyon",
      verified: true
    },
    {
      content: "Excellent choix de produits avec un design soigné. L'équipe connaît vraiment son domaine.",
      author: "Thomas Petit",
      rating: 5,
      location: "Bordeaux",
      verified: true
    },
    {
      content: "Transition réussie grâce à leurs conseils personnalisés. Site sécurisé et fiable, parfait !",
      author: "Marie Curie",
      rating: 5,
      location: "Marseille",
      verified: true
    }
  ];

  useEffect(() => {
    let filtered = products;

    // Filtrage par recherche
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrage par catégorie
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Filtrage par prix
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
      filtered = filtered.filter(product => {
        if (max === undefined) return product.price >= min;
        return product.price >= min && product.price <= max;
      });
    }

    // Tri
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default: // popular
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, filters]);

  const addToCart = (product) => {
    setLastAddedProduct(product);
    setShowCartAnimation(true);
    
    setTimeout(() => {
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
    }, 800);
  };

  const handleCartAnimationComplete = () => {
    setShowCartAnimation(false);
    if (lastAddedProduct) {
      toast({
        title: "✨ Produit ajouté !",
        description: `${lastAddedProduct.name} est maintenant dans votre panier`,
        duration: 3000,
      });
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      setCart(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre panier",
      });
    } else {
      setCart(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier",
    });
  };

  const confirmAge = () => {
    const today = new Date().toDateString();
    localStorage.setItem('ageVerified', 'true');
    localStorage.setItem('ageVerificationDate', today);
    setIsAgeVerified(true);
    setShowAgeModal(false);
    // Retirer la notification de bienvenue automatique
  };

  const denyAge = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isAgeVerified || showAgeModal) {
    return <AgeVerificationModal onConfirm={confirmAge} onDeny={denyAge} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      
      <Header cart={cart} onToggleCart={() => setShowCart(!showCart)} />

      <HeroSection 
        onDiscoverProducts={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
        onToggleCart={() => setShowCart(true)}
        cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Cart Animation */}
      <CartAnimation 
        isVisible={showCartAnimation}
        onComplete={handleCartAnimationComplete}
        productName={lastAddedProduct?.name || ''}
      />

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative animate-scale-in">
            <button
              onClick={() => setShowCart(false)}
              className="absolute -top-2 -right-2 z-10 bg-background border rounded-full w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
            >
              ✕
            </button>
            <CartSummary 
              cart={cart} 
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          </div>
        </div>
      )}

      {/* Category Carousel */}
      <CategoryCarousel 
        categories={categories}
        title="SHOP BY CATEGORY"
      />

      {/* Trending Products */}
      <TrendingProducts 
        products={trendingProducts}
        onAddToCart={addToCart}
      />

      {/* Search Section */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </section>

      {/* Filters */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <ProductFilters 
            onFilterChange={setFilters}
            productCount={products.length}
          />
        </div>
      </section>

      {/* Products Section */}
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
                  onAddToCart={addToCart}
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

      <QuickActions />

      {/* Testimonials Section */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* Trust indicators */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2 animate-fade-in">
              <div className="text-3xl">🚚</div>
              <h3 className="font-bold">Livraison Express</h3>
              <p className="text-sm text-muted-foreground">24-48h partout en France</p>
            </div>
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl">🔒</div>
              <h3 className="font-bold">Paiement Sécurisé</h3>
              <p className="text-sm text-muted-foreground">SSL & cryptage bancaire</p>
            </div>
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl">💎</div>
              <h3 className="font-bold">Qualité Premium</h3>
              <p className="text-sm text-muted-foreground">Produits certifiés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Age Warning Banner */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <Badge variant="destructive" className="px-4 py-2 text-sm shadow-lg animate-pulse">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Vente interdite aux moins de 18 ans
        </Badge>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
