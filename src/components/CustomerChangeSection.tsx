import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import OptimizedImage from '@/components/ui/optimized-image';

const CustomerChangeSection: React.FC = () => {
  const {
    getSetting,
    loading
  } = useHomepageSettings();
  const settings = getSetting('customer_change');
  if (loading) {
    return null;
  }
  return <section className="w-full py-16 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-foreground">
          {settings?.title || 'Découvrez pourquoi nos clients ont fait le changement'}
        </h2>
        
        <p className="text-center text-lg text-foreground mb-8">
          {settings?.subtitle || 'De vraies personnes, de vrais résultats.'}
        </p>

        <p className="text-center text-base text-muted-foreground mb-8 max-w-3xl mx-auto">
          {settings?.description || "Ne nous croyez pas sur parole, écoutez nos clients qui ont adopté une alternative sans fumée."}
        </p>

        <div className="flex justify-center mb-12">
          
        </div>

        {settings?.image_url && <div className="mb-8 rounded-2xl overflow-hidden">
            
          </div>}

        <Carousel 
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="gap-4">
            {settings?.settings?.testimonials?.map((testimonial: any, index: number) => <CarouselItem key={index} className="basis-[85%] md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col gap-4 h-full">
                  {/* Image Section */}
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-muted flex items-center justify-center">
                    {testimonial.image_url ? (
                      testimonial.image_url.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                        <video
                          src={testimonial.image_url}
                          className="w-full h-full object-cover"
                          controls
                          playsInline
                        />
                      ) : (
                        <OptimizedImage
                          src={testimonial.image_url}
                          alt={`${testimonial.author} testimonial`}
                          className="w-full h-full"
                          containerClassName="w-full h-full"
                          objectFit="cover"
                        />
                      )
                    ) : (
                      <p className="text-sm text-muted-foreground">Photo du client</p>
                    )}
                  </div>
                  
                  {/* Text Section with Speech Bubble Effect */}
                  <div className="relative">
                    {/* Triangle Arrow pointing up */}
                    <div className="absolute -top-3 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-neutral-800"></div>
                    
                    {/* Text Card */}
                    <Card className="bg-neutral-800 border-neutral-700 p-6">
                      <p className="text-sm text-muted-foreground italic mb-4">
                        "{testimonial.text}"
                      </p>
                      <p className="font-semibold text-right text-foreground">{testimonial.author}</p>
                    </Card>
                  </div>
                </div>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>;
};
export default CustomerChangeSection;