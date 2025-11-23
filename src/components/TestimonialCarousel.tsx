
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, User } from 'lucide-react';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Testimonial {
  content: string;
  author: string;
  rating: number;
  location?: string;
  verified?: boolean;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const { getSetting } = useHomepageSettings('testimonials');
  const settings = getSetting('testimonials');

  return (
    <section className="py-20 px-4 bg-card/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        {settings?.image_url && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img 
              src={settings.image_url} 
              alt={settings.title || 'Testimonials'} 
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        )}
        
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-secondary text-secondary">
            Témoignages clients
          </Badge>
          <h2 className="text-4xl font-black mb-4 text-cyber">
            {settings?.title || 'ILS NOUS FONT CONFIANCE'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {settings?.subtitle || 'Plus de 10,000 clients satisfaits à travers la France'}
          </p>
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
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="bg-glass border-primary/20 hover:border-primary transition-all duration-300 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-8 h-8 text-primary opacity-50" />
                      {testimonial.verified && (
                        <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                          ✓ Vérifié
                        </Badge>
                      )}
                    </div>
                    
                    <blockquote className="text-foreground mb-6 flex-grow leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-retro-gold fill-current" />
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <cite className="text-primary font-semibold text-sm block">
                          {testimonial.author}
                        </cite>
                        {testimonial.location && (
                          <span className="text-xs text-muted-foreground">
                            {testimonial.location}
                          </span>
                        )}
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

export default TestimonialCarousel;
