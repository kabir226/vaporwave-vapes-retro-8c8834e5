import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Award, Shield, Heart, Zap } from 'lucide-react';
const About = () => {
  const values = [{
    icon: <Shield className="w-8 h-8" />,
    title: "Sécurité",
    description: "Tous nos produits respectent les normes les plus strictes"
  }, {
    icon: <Award className="w-8 h-8" />,
    title: "Qualité Premium",
    description: "Une sélection rigoureuse pour une expérience exceptionnelle"
  }, {
    icon: <Heart className="w-8 h-8" />,
    title: "Bien-être",
    description: "Accompagner votre transition vers une vie sans fumée"
  }, {
    icon: <Zap className="w-8 h-8" />,
    title: "Innovation",
    description: "Les dernières avancées pour votre satisfaction"
  }];
  return <div className="min-h-screen bg-background">
      <Header cart={[]} onToggleCart={() => {}} />
      
      <div className="pt-20 px-4">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center py-16">
          <Badge variant="outline" className="mb-6 border-primary text-primary">
            À PROPOS DE NOUS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-cyber mb-6">Pourquoi nous sommes ICI ?  </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Notre mission est claire : être à l'avant-garde de la création d'un avenir sans fumée. Le tabagisme a des conséquences néfastes sur la santé de millions de personnes dans le monde. Nous avons tous constaté ou entendu parler des effets dévastateurs du tabagisme, la perte d'êtres chers, des problèmes de santé chroniques et une qualité de vie détériorée. Chez SNUSPEDIA, nous pensons qu'il est temps de changer.
          </p>
        </section>

        {/* Story Section */}
        <section className="max-w-6xl mx-auto py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Notre slogan : « Ne laissez pas les mauvaises habitudes gâcher les bons moments »
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Cela reflète parfaitement notre vision : aider les gens à se libérer des contraintes que le tabagisme impose à leur vie. Nous ne voulons pas seulement les aider à arrêter de fumer ; nous voulons les accompagner vers un mode de vie plus sain et plus épanouissant, sans compromis. Nous ne nous contentons pas d’aider à arrêter, nous les aidons à changer.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Grâce à notre gamme de produits sans fumée, comme les sachets de nicotine, nous offrons une alternative plus saine qui permet aux gens de prendre le contrôle de leur santé.
              </p>
            </div>
            <div className="relative">
              
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-6xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Nos Valeurs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto py-16 text-center">
          <Card className="bg-primary/5 border-primary/20 p-8">
            <CardContent className="p-0">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Notre vision : Un avenir sans limites
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre vision ultime est un monde où chacun peut vivre pleinement sa vie, libéré des contraintes des produits du tabac traditionnels. Nous envisageons une transition vers un mode de vie plus sain. Snuspedia , une source fiable d'information et de conseils, au service de millions de fumeurs.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>;
};
export default About;