
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import ProductCard from '@/components/ProductCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ParticleBackground from '@/components/ParticleBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuickActions from '@/components/QuickActions';
import CartSummary from '@/components/CartSummary';

const Index = () => {
  const [cart, setCart] = useState([]);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(true);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsAgeVerified(true);
      setShowAgeModal(false);
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
      features: ["Batterie 2000mAh", "Design élégant", "Vapeur dense"]
    },
    {
      id: 2,
      name: "E-LIQUIDES PREMIUM",
      description: "Saveurs artisanales créées par nos experts. Sans diacétyle, qualité pharmaceutique.",
      price: 12.99,
      icon: "💧",
      category: "eliquids",
      features: ["Saveurs naturelles", "Sans diacétyle", "Qualité premium"]
    },
    {
      id: 3,
      name: "GUMS NICOTINÉS",
      description: "Gums discrets à libération contrôlée. Idéal pour réduire progressivement la consommation.",
      price: 16.99,
      icon: "🍬",
      category: "gums",
      features: ["Libération contrôlée", "Discrets", "Effet progressif"]
    },
    {
      id: 4,
      name: "PACK DÉCOUVERTE",
      description: "Kit complet pour débuter: vape, 2 e-liquides et gums. Parfait pour commencer en douceur.",
      price: 59.99,
      icon: "📦",
      category: "packs",
      features: ["Kit complet", "Guide inclus", "Prix avantageux"]
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

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const confirmAge = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsAgeVerified(true);
    setShowAgeModal(false);
  };

  const denyAge = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isAgeVerified && showAgeModal) {
    return <AgeVerificationModal onConfirm={confirmAge} onDeny={denyAge} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      
      <Header cart={cart} onToggleCart={() => setShowCart(!showCart)} />

      {/* Hero Section - Simplifié pour mobile */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 pt-20">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            🔞 RÉSERVÉ AUX PLUS DE 18 ANS
          </Badge>
          
          <h1 className="text-4xl md:text-7xl font-black mb-6 text-cyber">
            NO-SMOKING
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Vapes, E-liquides & Gums Premium
            <br />
            <span className="text-retro-gold">Une alternative moderne pour une vie sans fumée</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              DÉCOUVRIR LES PRODUITS
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3"
              onClick={() => setShowCart(true)}
            >
              VOIR LE PANIER ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </Button>
          </div>
        </div>
      </section>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCart(false)}
              className="absolute -top-2 -right-2 z-10 bg-background border"
            >
              ✕
            </Button>
            <CartSummary 
              cart={cart} 
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          </div>
        </div>
      )}

      {/* Products Section */}
      <section id="products" className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-cyber">
              NOS PRODUITS
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une gamme soigneusement sélectionnée pour vous accompagner
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <QuickActions />

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-card/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4 text-cyber">
              AVIS CLIENTS
            </h2>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Age Warning Banner */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <Badge variant="destructive" className="px-3 py-1 text-xs">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Vente interdite aux moins de 18 ans
        </Badge>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
