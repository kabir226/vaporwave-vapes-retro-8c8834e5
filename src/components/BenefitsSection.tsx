import React, { useState } from 'react';
import { Leaf, Lock, Heart } from 'lucide-react';
import BenefitPreviewDialog from './BenefitPreviewDialog';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  position: string;
  previewTitle: string;
  previewDescription: string;
}

const BenefitsSection: React.FC = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const { getSetting } = useHomepageSettings('benefits');
  const settings = getSetting('benefits');

  const benefits: Benefit[] = [
    {
      icon: <Leaf className="w-8 h-8 text-foreground" />,
      title: 'Safer Alternative',
      position: 'top-12 left-8 md:top-20 md:left-16',
      previewTitle: 'Safer Alternative',
      previewDescription: 'Nicotine pouches offer a safer alternative to traditional smoking. With no combustion, no tar, and no smoke, you can enjoy nicotine without exposing yourself to the harmful chemicals found in cigarettes. Your lungs will thank you for making the switch to a cleaner option.'
    },
    {
      icon: <Lock className="w-8 h-8 text-foreground" />,
      title: 'Discreet',
      position: 'top-12 right-8 md:top-20 md:right-16',
      previewTitle: 'Subtle and hidden',
      previewDescription: 'With nicotine pouches, you can use nicotine discreetly, wherever you are, even in places where smoking isn\'t allowed, like on a plane or at work. The pouches are small, invisible, and discreet, allowing you to satisfy your cravings privately, without drawing attention.'
    },
    {
      icon: <Heart className="w-8 h-8 text-foreground" />,
      title: 'Smokeless',
      position: 'bottom-12 right-8 md:bottom-20 md:right-16',
      previewTitle: 'Smokeless',
      previewDescription: 'Enjoy nicotine without any smoke, odor, or ash. Nicotine pouches are completely smokeless, making them perfect for use anywhere, anytime. No need to step outside or worry about disturbing others with smoke or smell. It\'s a clean, modern way to consume nicotine.'
    }
  ];

  return (
    <>
      <section className="w-full py-8 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/9]">
            {/* Background image */}
            {settings?.image_url ? (
              <img 
                src={settings.image_url} 
                alt={settings.title || 'Benefits'} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted to-card" />
            )}
            
            {/* Benefits positioned on the image */}
            {benefits.map((benefit, index) => (
              <button
                key={index}
                onClick={() => setSelectedBenefit(benefit)}
                className={`absolute ${benefit.position} group cursor-pointer`}
              >
                {/* Sound wave animations */}
                <div className="relative flex flex-col items-center">
                  <div className="relative">
                    {/* Multiple wave layers for continuous effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0s' }} />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.4s' }} />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.8s' }} />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.2s' }} />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.6s' }} />
                    
                    {/* Icon circle */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      {benefit.icon}
                    </div>
                  </div>
                  
                  {/* Benefit title */}
                  <p className="mt-3 font-bold text-sm md:text-base text-foreground drop-shadow-lg bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    {benefit.title}
                  </p>
                </div>
              </button>
            ))}
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

export default BenefitsSection;
