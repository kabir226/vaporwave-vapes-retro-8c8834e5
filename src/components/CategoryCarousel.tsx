
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  count: number;
  featured?: boolean;
}

interface CategoryCarouselProps {
  categories: Category[];
  title: string;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories, title }) => {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-cyber">
            {title}
          </h2>
        </div>
        
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnMouseEnter: true,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
          onMouseEnter={() => {
            api?.plugins()?.autoplay?.stop();
          }}
          onMouseLeave={() => {
            api?.plugins()?.autoplay?.play();
          }}
        >
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="group bg-glass border-border hover:border-primary transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden cursor-pointer">
                  <CardContent className="p-0 relative">
                    {category.featured && (
                      <Badge className="absolute top-4 right-4 z-10 bg-retro-gold text-black font-bold animate-pulse">
                        POPULAIRE
                      </Badge>
                    )}
                    
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <div className="text-6xl animate-float group-hover:scale-110 transition-transform duration-300">
                        {category.image}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-retro-gold transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {category.count} produits
                        </Badge>
                        <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Découvrir
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryCarousel;
