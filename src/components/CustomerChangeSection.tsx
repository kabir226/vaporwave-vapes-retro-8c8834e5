import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {settings?.settings?.testimonials?.map((testimonial: any, index: number) => <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-6 bg-background h-full">
                  <div className="mb-4 rounded-lg overflow-hidden aspect-[4/3] bg-muted flex items-center justify-center">
                    {testimonial.image_url ? <img src={testimonial.image_url} alt={`${testimonial.author} testimonial`} className="w-full h-full object-cover" /> : <p className="text-sm text-muted-foreground">Photo du client</p>}
                  </div>
                  <p className="text-sm text-muted-foreground italic mb-4">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-right text-foreground">{testimonial.author}</p>
                </Card>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>;
};
export default CustomerChangeSection;