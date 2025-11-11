import React, { useState } from 'react';
import { BarChart3, Smile, Droplet, Ban, Cigarette, Clock } from 'lucide-react';
import BenefitPreviewDialog from './BenefitPreviewDialog';

interface Benefit {
  icon: React.ElementType;
  label: string;
  previewTitle: string;
  previewDescription: string;
}

const BenefitsComparisonSection: React.FC = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  const benefits: Benefit[] = [
    { 
      icon: BarChart3, 
      label: 'Variety of Strengths',
      previewTitle: 'Variety of Strengths',
      previewDescription: 'Available in a range of nicotine strengths, nicotine pouches allow you to customise your experience to suit your preferences. Whether you\'re new to nicotine or an experienced user, you can choose the strength that\'s right for you.'
    },
    { 
      icon: Smile, 
      label: 'Fresh Flavours',
      previewTitle: 'Fresh Flavours',
      previewDescription: 'Flavour options like mint, citrus, berry, and more add an enjoyable twist to the experience. Discover a world of refreshing tastes that make your nicotine experience more pleasant and enjoyable.'
    },
    { 
      icon: Droplet, 
      label: 'No Smoke',
      previewTitle: 'No Smoke',
      previewDescription: 'Completely smokeless, nicotine pouches produce no smoke or vapor. Enjoy your nicotine discreetly without any visible emissions, making them perfect for use in any environment.'
    },
    { 
      icon: Ban, 
      label: 'No Odor',
      previewTitle: 'No Odor',
      previewDescription: 'Unlike traditional smoking, nicotine pouches leave no lingering smell on your clothes, breath, or surroundings. Stay fresh and odor-free while enjoying your nicotine experience.'
    },
    { 
      icon: Cigarette, 
      label: 'Tobacco-Free',
      previewTitle: 'Tobacco-Free',
      previewDescription: 'Made without tobacco leaf, nicotine pouches provide a cleaner alternative. They contain pharmaceutical-grade nicotine and natural fibers, eliminating the harmful compounds found in tobacco products.'
    },
    { 
      icon: Clock, 
      label: 'Long-Lasting',
      previewTitle: 'Long-Lasting',
      previewDescription: 'Each pouch delivers a consistent and long-lasting nicotine experience, typically lasting 30-60 minutes. Enjoy extended satisfaction without the need for frequent replacements.'
    },
  ];

  return (
    <>
      <section className="w-full py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            The benefits of nicotine pouches over smoking
          </h2>

          <div className="mb-12 rounded-2xl overflow-hidden">
            <div className="bg-muted aspect-[16/9] flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-lg text-muted-foreground">Image placeholder - Nicotine pouches in hand</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedBenefit(benefit)}
                  className="flex flex-col items-center justify-center group cursor-pointer"
                >
                  <div className="relative mb-3">
                    {/* Sound wave animations */}
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0s' }} />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.4s' }} />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.8s' }} />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.2s' }} />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.6s' }} />
                    
                    {/* Icon circle */}
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-background flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 border-2 border-primary/20">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                  </div>
                  
                  {/* Benefit label */}
                  <span className="text-xs md:text-sm text-center font-medium text-foreground">
                    {benefit.label}
                  </span>
                </button>
              );
            })}
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
          imagePlaceholder="Lifestyle image placeholder"
        />
      )}
    </>
  );
};

export default BenefitsComparisonSection;
