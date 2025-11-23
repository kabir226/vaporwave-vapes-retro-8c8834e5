import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import useEmblaCarousel from 'embla-carousel-react';
import VideoPreviewDialog from '@/components/VideoPreviewDialog';

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
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);

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

          {/* Primary CTA Buttons */}
          {!hasSlides && (
            <>
              <div className="pt-2 flex flex-col md:flex-row items-center justify-center gap-4">
                <a href="/shop">
                  <Button 
                    size="lg" 
                    className="bg-foreground hover:bg-foreground/90 text-background font-bold px-12 py-6 text-base group rounded-full w-full md:w-auto"
                  >
                    {heroSettings?.button_text || "ACHETER NICOTINE SANS FUMÉE"}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => setIsVideoDialogOpen(true)}
                  className="border-2 border-foreground/80 text-foreground hover:bg-foreground/10 hover:border-foreground font-bold px-8 py-6 text-base group rounded-full w-full md:w-auto"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Comment ça marche ?
                </Button>
              </div>

              {/* Feature Benefits */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 pt-6 text-sm md:text-base">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 18.5l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>
                    </svg>
                  </div>
                  <span>Utilisation discrète, n'importe où, n'importe quand</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                  </div>
                  <span>Plus doux pour votre corps comparé au tabagisme</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                  <span>Sans taches sur les dents</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Video Dialog */}
      <VideoPreviewDialog
        isOpen={isVideoDialogOpen}
        onClose={() => setIsVideoDialogOpen(false)}
        videoUrl="/videos/snuspedia-explainer.mp4"
        title="Comment ça marche ?"
      />
    </section>
  );
};

export default HeroSection;
