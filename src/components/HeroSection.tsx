import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import useEmblaCarousel from 'embla-carousel-react';

interface HeroSectionProps {
  onDiscoverProducts: () => void;
  onToggleCart: () => void;
  cartItemsCount: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onDiscoverProducts, 
  onToggleCart, 
  cartItemsCount 
}) => {
  const { getSetting, loading } = useHomepageSettings('hero');
  const heroSettings = getSetting('hero');
  const slides = heroSettings?.settings?.slides || [];
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Fallback si pas de slides configurés
  const hasSlides = slides.length > 0 && slides.some((s: any) => s.image_url);

  return (
    <section className="relative w-full px-4 pt-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Carousel */}
        {hasSlides ? (
          <div className="relative">
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
              <div className="flex">
                {slides.map((slide: any, index: number) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="relative aspect-[4/3] md:aspect-[16/9]">
                      <img 
                        src={slide.image_url} 
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {slide.buttons && slide.buttons.length > 0 && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 flex-wrap justify-center">
                          {slide.buttons.map((button: any, btnIndex: number) => (
                            <a 
                              key={btnIndex}
                              href={button.link}
                              target={button.link.startsWith('http') ? '_blank' : undefined}
                              rel={button.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                              <Button 
                                size="lg" 
                                className="rounded-full font-bold px-8"
                                style={{ 
                                  backgroundColor: button.color,
                                  color: '#FFFFFF'
                                }}
                              >
                                {button.text}
                                <ArrowRight className="w-5 h-5 ml-2" />
                              </Button>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="relative w-full mb-6 rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] md:aspect-[16/9] bg-gradient-to-br from-primary/20 via-card to-accent/10 flex items-center justify-center">
              {heroSettings?.image_url ? (
                <img 
                  src={heroSettings.image_url} 
                  alt={heroSettings.title || "Hero"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-accent/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <div className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-primary/20 rounded-full border-4 border-primary/30 flex items-center justify-center">
                        <span className="text-4xl md:text-6xl text-primary">💨</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Below Image/Carousel */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mt-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
            {heroSettings?.title || "No Smoke, No Odour, No Limits"}
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {heroSettings?.subtitle || "Profitez de la satisfaction de la nicotine sans les effets nocifs du tabagisme."}
          </p>

          {/* Primary CTA Button */}
          {!hasSlides && (
            <div className="pt-2">
              <a 
                href="https://wa.me/message/VU57PC3IDGREF1" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="bg-foreground hover:bg-foreground/90 text-background font-bold px-12 py-6 text-base group rounded-full w-full md:w-auto"
                >
                  {heroSettings?.button_text || "ACHETER NICOTINE SANS FUMÉE"}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
