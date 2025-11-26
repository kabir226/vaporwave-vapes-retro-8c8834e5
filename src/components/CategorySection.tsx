import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useHomepageSettings } from '@/hooks/useHomepageSettings';

const CategorySection: React.FC = () => {
  const { getSetting } = useHomepageSettings('categories');
  const settings = getSetting('categories');
  
  const categories = settings?.settings?.categories || [];

  return (
    <section className="w-full py-12 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {settings?.image_url && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img 
              src={settings.image_url} 
              alt={settings.title || 'Categories'} 
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        )}
        
        <h2 className="text-3xl md:text-4xl font-black text-center text-foreground mb-8">
          {settings?.title || 'ACHETER SNUS PAR CATÉGORIE'}
        </h2>
        {settings?.subtitle && (
          <p className="text-center text-muted-foreground mb-6">{settings.subtitle}</p>
        )}
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-[85%] mx-auto"
          >
            <CarouselContent className="-ml-2">
              {categories.map((category, index) => (
                <CarouselItem key={index} className="pl-2">
                  <Card 
                    className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 rounded-2xl"
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden">
                        {category.image_url ? (
                          <img 
                            src={category.image_url} 
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <span className="text-4xl opacity-50">
                            📦
                          </span>
                        )}
                        {/* Overlay sombre pour lisibilité */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
                        
                        {/* Contenu superposé */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                          {category.description && (
                            <p className="text-xs text-white/90 mb-3 font-medium leading-relaxed">
                              {category.description}
                            </p>
                          )}
                          <h3 className="text-xl font-bold text-white mb-6 leading-tight">
                            {category.name}
                          </h3>
                          {category.link && (
                            <Button 
                              size="lg"
                              className="bg-white text-black hover:bg-white/90 font-bold rounded-lg px-8 shadow-lg"
                              onClick={() => window.location.href = category.link}
                            >
                              ACHETER MAINTENANT
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 rounded-2xl"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden">
                  {category.image_url ? (
                    <img 
                      src={category.image_url} 
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <span className="text-6xl opacity-50">
                      📦
                    </span>
                  )}
                  {/* Overlay sombre pour lisibilité */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
                  
                  {/* Contenu superposé */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
                    {category.description && (
                      <p className="text-sm text-white/90 mb-4 font-medium leading-relaxed max-w-xs">
                        {category.description}
                      </p>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-8 leading-tight">
                      {category.name}
                    </h3>
                    {category.link && (
                      <Button 
                        size="lg"
                        className="bg-white text-black hover:bg-white/90 font-bold rounded-lg px-10 py-6 text-base shadow-lg"
                        onClick={() => window.location.href = category.link}
                      >
                        ACHETER MAINTENANT
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
