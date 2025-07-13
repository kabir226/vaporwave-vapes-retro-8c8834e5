
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Search, ShoppingCart, Star } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [cart, setCart] = useState([]);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
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

  const testimonials = [
    {
      content: "Excellente qualité et livraison rapide. Le service client est très réactif.",
      author: "Marc L., Paris",
      rating: 5
    },
    {
      content: "Les gums m'ont vraiment aidé à réduire ma consommation. Très satisfaite.",
      author: "Sophie D., Lyon", 
      rating: 5
    },
    {
      content: "Produits de qualité avec un design soigné. Je recommande.",
      author: "Thomas P., Bordeaux",
      rating: 5
    }
  ];

  // Filtrage des produits
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast({
          title: "Produit ajouté",
          description: `${product.name} - Quantité mise à jour`,
        });
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast({
        title: "Produit ajouté au panier",
        description: `${product.name} a été ajouté à votre panier`,
      });
      return [...prev, { ...product, quantity: 1 }];
    });
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

      {/* Cart Modal amélioré */}
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

      {/* Search Section */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </section>

      {/* Products Section améliorée */}
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

      {/* Testimonials Section améliorée */}
      <section className="py-20 px-4 bg-card/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-secondary text-secondary">
              Avis clients
            </Badge>
            <h2 className="text-4xl font-black mb-4 text-cyber">
              ILS NOUS FONT CONFIANCE
            </h2>
            <p className="text-lg text-muted-foreground">
              Plus de 10,000 clients satisfaits
            </p>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

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

      {/* Age Warning Banner fixe */}
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
