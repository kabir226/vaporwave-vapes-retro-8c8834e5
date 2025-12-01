import React, { useState, useEffect } from 'react';
import { BarChart3, Smile, Droplet, Ban, Cigarette, Clock } from 'lucide-react';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import OptimizedImage from '@/components/ui/optimized-image';

interface Benefit {
  icon: React.ElementType;
  label: string;
  previewTitle: string;
  previewDescription: string;
  imageUrl?: string;
  id: string;
}

const BenefitsComparisonSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { settings } = useHomepageSettings();
  const [benefits, setBenefits] = useState<Benefit[]>([]);

  const defaultBenefits: Benefit[] = [
    { 
      id: 'benefits_comparison_variety',
      icon: BarChart3, 
      label: 'Variété de forces',
      previewTitle: 'Variété de forces',
      previewDescription: 'Disponibles dans une gamme de forces de nicotine, les sachets de nicotine vous permettent de personnaliser votre expérience selon vos préférences. Que vous soyez novice en nicotine ou utilisateur expérimenté, vous pouvez choisir la force qui vous convient.'
    },
    { 
      id: 'benefits_comparison_flavours',
      icon: Smile, 
      label: 'Saveurs fraîches',
      previewTitle: 'Saveurs fraîches',
      previewDescription: 'Des options de saveurs comme la menthe, les agrumes, les baies et bien plus encore ajoutent une touche agréable à l\'expérience. Découvrez un monde de goûts rafraîchissants qui rendent votre expérience nicotinique plus agréable.'
    },
    { 
      id: 'benefits_comparison_smoke',
      icon: Droplet, 
      label: 'Sans fumée',
      previewTitle: 'Sans fumée',
      previewDescription: 'Complètement sans fumée, les sachets de nicotine ne produisent ni fumée ni vapeur. Profitez de votre nicotine discrètement sans émissions visibles, ce qui les rend parfaits pour une utilisation dans n\'importe quel environnement.'
    },
    { 
      id: 'benefits_comparison_odor',
      icon: Ban, 
      label: 'Sans odeur',
      previewTitle: 'Sans odeur',
      previewDescription: 'Contrairement au tabagisme traditionnel, les sachets de nicotine ne laissent aucune odeur persistante sur vos vêtements, votre haleine ou votre environnement. Restez frais et sans odeur tout en profitant de votre expérience nicotinique.'
    },
    { 
      id: 'benefits_comparison_tobacco',
      icon: Cigarette, 
      label: 'Sans tabac',
      previewTitle: 'Sans tabac',
      previewDescription: 'Fabriqués sans feuille de tabac, les sachets de nicotine offrent une alternative plus propre. Ils contiennent de la nicotine de qualité pharmaceutique et des fibres naturelles, éliminant les composés nocifs présents dans les produits du tabac.'
    },
    { 
      id: 'benefits_comparison_lasting',
      icon: Clock, 
      label: 'Longue durée',
      previewTitle: 'Longue durée',
      previewDescription: 'Chaque sachet offre une expérience nicotinique cohérente et de longue durée, durant généralement 30 à 60 minutes. Profitez d\'une satisfaction prolongée sans besoin de remplacements fréquents.'
    },
  ];

  useEffect(() => {
    const updatedBenefits = defaultBenefits.map(benefit => {
      const setting = settings.find(s => s.section_name === benefit.id);
      return {
        ...benefit,
        previewTitle: setting?.title || benefit.previewTitle,
        previewDescription: setting?.description || benefit.previewDescription,
        imageUrl: setting?.image_url
      };
    });
    setBenefits(updatedBenefits);
  }, [settings]);

  // Autoplay carousel every 4 seconds (only when not paused)
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [benefits.length, isPaused]);

  const mainSettings = settings.find(s => s.section_name === 'benefits_comparison');
  const activeBenefit = benefits[activeIndex];

  if (benefits.length === 0) return null;

  return (
    <section className="w-full py-16 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {mainSettings?.title || 'Les avantages des sachets de nicotine par rapport au tabagisme'}
        </h2>

        {/* Carousel Card */}
        <div 
          className="bg-muted/30 rounded-3xl overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top: Main Image */}
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            {activeBenefit?.imageUrl ? (
              <OptimizedImage 
                key={activeIndex}
                src={activeBenefit.imageUrl} 
                alt={activeBenefit.previewTitle} 
                className="w-full h-full animate-fade-in"
                containerClassName="w-full h-full"
                objectFit="cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center animate-fade-in">
                <p className="text-muted-foreground text-center px-8">Image placeholder</p>
              </div>
            )}
          </div>

          {/* Middle: Navigation Icons */}
          <div className="py-8 px-4 flex justify-center">
            <div className="inline-flex items-center gap-4 md:gap-6 px-6 md:px-8 py-4 bg-background/50 rounded-full backdrop-blur-sm">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="group cursor-pointer"
                  >
                    <div className="relative">
                      {/* Active indicator with sound waves */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0s' }} />
                          <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.4s' }} />
                          <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.8s' }} />
                        </>
                      )}
                      
                      {/* Icon circle */}
                      <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground scale-110' 
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:scale-105'
                      }`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom: Title and Description */}
          <div className="px-6 md:px-12 pb-12 text-center">
            <h3 
              key={`title-${activeIndex}`}
              className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in"
            >
              {activeBenefit?.previewTitle}
            </h3>
            <p 
              key={`desc-${activeIndex}`}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-fade-in"
            >
              {activeBenefit?.previewDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsComparisonSection;
