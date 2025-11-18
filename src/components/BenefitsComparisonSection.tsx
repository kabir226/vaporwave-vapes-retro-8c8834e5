import React, { useState, useEffect } from 'react';
import { BarChart3, Smile, Droplet, Ban, Cigarette, Clock } from 'lucide-react';
import BenefitPreviewDialog from './BenefitPreviewDialog';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';

interface Benefit {
  icon: React.ElementType;
  label: string;
  previewTitle: string;
  previewDescription: string;
  imageUrl?: string;
  id: string;
}

const BenefitsComparisonSection: React.FC = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
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

  const mainSettings = settings.find(s => s.section_name === 'benefits_comparison');

  return (
    <>
      <section className="w-full py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {mainSettings?.title || 'Les avantages des sachets de nicotine par rapport au tabagisme'}
          </h2>

          <div className="mb-12 rounded-2xl overflow-hidden">
            {mainSettings?.image_url ? (
              <img 
                src={mainSettings.image_url} 
                alt={mainSettings.title || 'Benefits'} 
                className="w-full aspect-[16/9] object-cover"
              />
            ) : (
              <div className="bg-muted aspect-[16/9] flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-lg text-muted-foreground">Image placeholder - Nicotine pouches in hand</p>
                </div>
              </div>
            )}
          </div>

          {/* Benefits row with rounded background */}
          <div className="mb-12 flex justify-center">
            <div className="inline-flex items-center gap-4 md:gap-6 px-6 md:px-8 py-6 bg-muted/50 rounded-full">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedBenefit(benefit)}
                    className="group cursor-pointer"
                  >
                    <div className="relative">
                      {/* Sound wave animations */}
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0s' }} />
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.4s' }} />
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.8s' }} />
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.2s' }} />
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.6s' }} />
                      
                      {/* Icon circle with conditional border */}
                      <div className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-background flex items-center justify-center shadow-md transition-all group-hover:scale-110 ${
                        index === 0 ? 'ring-3 ring-primary ring-offset-2 ring-offset-muted/50' : ''
                      }`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Variété de forces et de saveurs
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Disponibles dans une gamme de forces de nicotine et de saveurs, les sachets de nicotine vous permettent de personnaliser votre 
              expérience selon vos préférences. Que vous soyez novice en nicotine ou utilisateur expérimenté, vous pouvez choisir 
              la force qui vous convient. Les options de saveurs comme la menthe, les agrumes et les baies ajoutent une touche agréable à 
              l'expérience.
            </p>
          </div>
        </div>
      </section>

      {/* Preview Dialog */}
      {selectedBenefit && (
        <BenefitPreviewDialog
          isOpen={!!selectedBenefit}
          onClose={() => setSelectedBenefit(null)}
          title={selectedBenefit.previewTitle}
          description={selectedBenefit.previewDescription}
          imageUrl={selectedBenefit.imageUrl}
          imagePlaceholder="Lifestyle image placeholder"
        />
      )}
    </>
  );
};

export default BenefitsComparisonSection;
