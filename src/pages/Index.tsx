
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star, Shield, Zap, Sparkles, AlertTriangle, X, Check } from 'lucide-react';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import ProductCard from '@/components/ProductCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ParticleBackground from '@/components/ParticleBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const [cart, setCart] = useState([]);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(true);

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
      name: "VAPES PREMIUM CYBER",
      description: "Nos vapes premium allient design rétro-futuriste et performance exceptionnelle. Rechargeable avec écran LED intégré.",
      price: 39.99,
      icon: "💨",
      category: "vapes",
      features: ["Écran OLED", "Batterie 3000mAh", "Design Cyberpunk"]
    },
    {
      id: 2,
      name: "E-LIQUIDES NEON",
      description: "Saveurs uniques créées par nos mixologues. Formule sans diacétyle avec arômes premium inspirés des années 80.",
      price: 12.99,
      icon: "💧",
      category: "eliquids",
      features: ["6 saveurs rétro", "Sans diacétyle", "Qualité premium"]
    },
    {
      id: 3,
      name: "GUMS ELECTRIC",
      description: "Gums à la nicotine avec libération contrôlée. Packaging rétro-futuriste pour une discrétion maximale.",
      price: 16.99,
      icon: "🍬",
      category: "gums",
      features: ["Libération contrôlée", "Saveurs uniques", "Design discret"]
    },
    {
      id: 4,
      name: "PACK STARTER RETRO",
      description: "Kit complet pour débuter: vape premium, 3 e-liquides et gums. Parfait pour découvrir l'univers No-Smoking.",
      price: 59.99,
      icon: "📦",
      category: "packs",
      features: ["Kit complet", "Guide inclus", "Économie -30%"]
    }
  ];

  const features = [
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Technologie Rétro-Future",
      description: "Innovation des années 2020 avec l'esthétique cyberpunk des 80s"
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Qualité Premium",
      description: "Composants de qualité supérieure, testés et certifiés"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Sécurité Maximale",
      description: "Conformité aux normes européennes les plus strictes"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Design Exclusif",
      description: "Créations uniques inspirées de l'esthétique cyberpunk"
    }
  ];

  const testimonials = [
    {
      content: "No-smoking a révolutionné ma relation avec la nicotine. Le design rétro-futuriste est absolument magnifique et la qualité est exceptionnelle.",
      author: "Marc L., Paris",
      rating: 5
    },
    {
      content: "Après 15 ans de tabagisme, les produits No-smoking m'ont aidé à franchir le pas. L'esthétique cyberpunk est un vrai plus!",
      author: "Sophie D., Lyon", 
      rating: 5
    },
    {
      content: "Le pack starter retro est parfait pour débuter. Les saveurs des e-liquides neon sont d'une complexité rare.",
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      
      <Header cart={cart} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-yellow-900/20 pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-float">
          <Badge variant="outline" className="mb-6 border-primary text-primary animate-glow">
            🔞 RÉSERVÉ AUX PLUS DE 21 ANS
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-cyber animate-neon-pulse">
            NO-SMOKING
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Vapes, E-liquides & Gums Premium
            <br />
            <span className="text-retro-gold">Une alternative rétro-futuriste pour une vie sans fumée</span>
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="retro-gradient text-black font-bold px-8 py-4 text-lg hover:scale-105 transition-transform"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              DÉCOUVRIR LES PRODUITS
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg cyber-border"
            >
              NOTRE HISTOIRE
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-cyber animate-neon-pulse">
              NOS PRODUITS CYBER
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une gamme exclusive de produits premium avec un design rétro-futuriste unique
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-retro-gold">
              POURQUOI NOUS CHOISIR
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-glass border-border hover:border-primary transition-all duration-300 hover:scale-105 hologram-effect">
                <CardContent className="p-6 text-center">
                  <div className="text-primary mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-primary">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-cyber">
              ILS NOUS FONT CONFIANCE
            </h2>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Age Warning Banner */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <Badge variant="destructive" className="animate-glow px-4 py-2">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Vente interdite aux moins de 21 ans
        </Badge>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
