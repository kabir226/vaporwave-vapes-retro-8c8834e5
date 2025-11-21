import React from 'react';
import { Button } from '@/components/ui/button';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';

const HowToUseSection: React.FC = () => {
  const { getSetting } = useHomepageSettings('how_to_use');
  const settings = getSetting('how_to_use');
  
  // Get step images from settings
  const stepImages = (settings?.settings as any)?.step_images || [];

  const steps = [
    {
      number: 1,
      title: 'Placer le sachet',
      description: 'Placez le sachet entre votre lèvre supérieure et votre gencive. Utilisez le côté gauche ou droit. Ne mâchez pas et ne sucez pas',
    },
    {
      number: 2,
      title: 'Ressentir l\'effet',
      description: 'Sentez le sachet commencer à agir avec une légère sensation de brûlure et de picotement',
    },
    {
      number: 3,
      title: 'Attendre 10-45 minutes',
      description: 'Après 10 à 45 minutes d\'utilisation, retirez le sachet de votre gencive',
    },
    {
      number: 4,
      title: 'Jeter correctement',
      description: 'Jetez le sachet usagé dans le compartiment du couvercle supérieur',
    },
  ];

  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {settings?.title || 'Comment utiliser les sachets de nicotine'}
        </h2>
        {settings?.subtitle && (
          <p className="text-center text-muted-foreground mb-8">{settings.subtitle}</p>
        )}

        <div className="space-y-8 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-foreground text-background flex items-center justify-center text-xl md:text-2xl font-bold">
                    {step.number}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="border-2 border-foreground rounded-2xl mb-4 aspect-square flex items-center justify-center bg-card overflow-hidden">
                    {stepImages[step.number - 1] ? (
                      <img 
                        src={stepImages[step.number - 1]} 
                        alt={`Step ${step.number}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <p className="text-4xl md:text-6xl mb-2">📍</p>
                        <p className="text-sm text-muted-foreground">Illustration étape {step.number}</p>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-base md:text-lg text-center text-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a 
            href="whatsapp://send?phone=22605145905" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="default" size="lg" className="rounded-full">
              {settings?.button_text || 'Commencer avec les débutants'}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
