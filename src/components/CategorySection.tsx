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

interface CategorySectionProps {
  categories: Array<{
    id: string | number;
    name: string;
    description: string;
    image: string;
    count?: number;
  }>;
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  const { getSetting } = useHomepageSettings('categories');
  const settings = getSetting('categories');

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
              {categories.slice(0, 3).map((category) => (
                <CarouselItem key={category.id} className="pl-2">
                  <Card 
                    className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-primary"
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <span className="text-4xl opacity-50 group-hover:scale-110 transition-transform">
                          {category.image}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                          <p className="text-xs text-muted-foreground mb-1">
                            {category.description.split(' ').slice(0, 4).join(' ')}...
                          </p>
                          <h3 className="text-lg font-bold text-foreground mb-2">
                            {category.name}
                          </h3>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-background hover:bg-primary hover:text-primary-foreground border-2"
                          >
                            ACHETER MAINTENANT
                          </Button>
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
          {categories.slice(0, 3).map((category) => (
            <Card 
              key={category.id} 
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-primary"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform">
                    {category.image}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      {category.description.split(' ').slice(0, 4).join(' ')}...
                    </p>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {category.name}
                    </h3>
                    <Button 
                      variant="outline" 
                      className="bg-background hover:bg-primary hover:text-primary-foreground border-2"
                    >
                      ACHETER MAINTENANT
                    </Button>
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
