
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Award, Shield, Heart, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité",
      description: "Tous nos produits respectent les normes les plus strictes"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Qualité Premium",
      description: "Une sélection rigoureuse pour une expérience exceptionnelle"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Bien-être",
      description: "Accompagner votre transition vers une vie sans fumée"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "Les dernières technologies pour votre satisfaction"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header cart={[]} onToggleCart={() => {}} />
      
      <div className="pt-20 px-4">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center py-16">
          <Badge variant="outline" className="mb-6 border-primary text-primary">
            À PROPOS DE NOUS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-cyber mb-6">
            NO-SMOKING
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Pionniers de l'innovation dans l'univers de la vape, nous créons des expériences 
            exceptionnelles pour accompagner votre transition vers une vie sans fumée.
          </p>
        </section>

        {/* Story Section */}
        <section className="max-w-6xl mx-auto py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Notre Histoire
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Fondée par des passionnés de technologie et de design, No-Smoking est née 
                d'une vision simple : révolutionner l'expérience de la vape avec des produits 
                alliant esthétique futuriste et performance exceptionnelle.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Chaque produit de notre gamme est soigneusement sélectionné et testé pour 
                vous offrir une alternative moderne et élégante au tabac traditionnel.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="text-6xl animate-float">🚀</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-6xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Nos Valeurs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="text-primary mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto py-16 text-center">
          <Card className="bg-primary/5 border-primary/20 p-8">
            <CardContent className="p-0">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Notre Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Démocratiser l'accès à des alternatives de qualité au tabac traditionnel, 
                tout en proposant une expérience utilisateur moderne, sûre et respectueuse 
                de l'environnement. Nous croyons en un avenir sans fumée, mais pas sans plaisir.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
