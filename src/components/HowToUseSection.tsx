import React from 'react';
import { Button } from '@/components/ui/button';

const HowToUseSection: React.FC = () => {
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
          How to use nicotine pouches
        </h2>

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
                  <div className="border-2 border-foreground rounded-2xl p-6 md:p-8 mb-4 aspect-square flex items-center justify-center bg-card">
                    <div className="text-center">
                      <p className="text-4xl md:text-6xl mb-2">📍</p>
                      <p className="text-sm text-muted-foreground">Step {step.number} illustration</p>
                    </div>
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
          <Button variant="default" size="lg" className="rounded-full">
            Get started with beginners
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
