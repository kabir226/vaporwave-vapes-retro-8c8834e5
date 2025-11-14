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
      label: 'Variety of Strengths',
      previewTitle: 'Variety of Strengths',
      previewDescription: 'Available in a range of nicotine strengths, nicotine pouches allow you to customise your experience to suit your preferences. Whether you\'re new to nicotine or an experienced user, you can choose the strength that\'s right for you.'
    },
    { 
      id: 'benefits_comparison_flavours',
      icon: Smile, 
      label: 'Fresh Flavours',
      previewTitle: 'Fresh Flavours',
      previewDescription: 'Flavour options like mint, citrus, berry, and more add an enjoyable twist to the experience. Discover a world of refreshing tastes that make your nicotine experience more pleasant and enjoyable.'
    },
    { 
      id: 'benefits_comparison_smoke',
      icon: Droplet, 
      label: 'No Smoke',
      previewTitle: 'No Smoke',
      previewDescription: 'Completely smokeless, nicotine pouches produce no smoke or vapor. Enjoy your nicotine discreetly without any visible emissions, making them perfect for use in any environment.'
    },
    { 
      id: 'benefits_comparison_odor',
      icon: Ban, 
      label: 'No Odor',
      previewTitle: 'No Odor',
      previewDescription: 'Unlike traditional smoking, nicotine pouches leave no lingering smell on your clothes, breath, or surroundings. Stay fresh and odor-free while enjoying your nicotine experience.'
    },
    { 
      id: 'benefits_comparison_tobacco',
      icon: Cigarette, 
      label: 'Tobacco-Free',
      previewTitle: 'Tobacco-Free',
      previewDescription: 'Made without tobacco leaf, nicotine pouches provide a cleaner alternative. They contain pharmaceutical-grade nicotine and natural fibers, eliminating the harmful compounds found in tobacco products.'
    },
    { 
      id: 'benefits_comparison_lasting',
      icon: Clock, 
      label: 'Long-Lasting',
      previewTitle: 'Long-Lasting',
      previewDescription: 'Each pouch delivers a consistent and long-lasting nicotine experience, typically lasting 30-60 minutes. Enjoy extended satisfaction without the need for frequent replacements.'
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
            {mainSettings?.title || 'The benefits of nicotine pouches over smoking'}
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
              Variety of Strengths and Flavours
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Available in a range of nicotine strengths and flavours, nicotine pouches allow you to customise your 
              experience to suit your preferences. Whether you're new to nicotine or an experienced user, you can choose 
              the strength that's right for you. Flavour options like mint, citrus, and berry add an enjoyable twist to the 
              experience.
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
