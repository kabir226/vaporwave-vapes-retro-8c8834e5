
import React from 'react';
import { Badge } from '@/components/ui/badge';
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
            }) as any,
          ]}
          className="w-full"
          onMouseEnter={() => {
            (api?.plugins()?.autoplay as any)?.stop?.();
          }}
          onMouseLeave={() => {
            (api?.plugins()?.autoplay as any)?.play?.();
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category) => (
              <CarouselItem key={category.id} className="basis-1/3 md:basis-1/4 lg:basis-1/6 pl-2 md:pl-4">
                <div className="group flex flex-col items-center gap-3 md:gap-4 cursor-pointer">
                  {/* Conteneur rond pour l'image */}
                  <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-primary/50 bg-secondary/20 flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:scale-110 overflow-hidden">
                    {category.featured && (
                      <Badge className="absolute -top-1 -right-1 z-10 bg-retro-gold text-black font-bold text-[10px] px-1.5 py-0.5 animate-pulse">
                        TOP
                      </Badge>
                    )}
                    
                    {/* Image ou emoji de catégorie */}
                    <div className="text-3xl md:text-5xl transition-transform duration-300">
                      {category.image}
                    </div>
                  </div>
                  
                  {/* Nom de la catégorie */}
                  <h3 className="text-xs md:text-sm font-semibold text-center text-foreground group-hover:text-primary transition-colors leading-tight max-w-full px-1">
                    {category.name}
                  </h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryCarousel;
