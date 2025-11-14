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
      title: 'Place the pouch',
      description: 'Place the pouch between your upper lip and gum. Use the left or right side. Do not chew or suck',
    },
    {
      number: 2,
      title: 'Feel the effect',
      description: 'Feel the pouch start to work with a slight burn and tingling sensation',
    },
    {
      number: 3,
      title: 'Wait 10-45 minutes',
      description: 'After 10-45 minutes of use, remove the pouch from your gum',
    },
    {
      number: 4,
      title: 'Dispose properly',
      description: 'Dispose of the used pouch at the top lid compartment',
    },
  ];

  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {settings?.title || 'How to use nicotine pouches'}
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
                        <p className="text-sm text-muted-foreground">Step {step.number} illustration</p>
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
            href="https://wa.me/message/VU57PC3IDGREF1" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="default" size="lg" className="rounded-full">
              {settings?.button_text || 'Get started with beginners'}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
