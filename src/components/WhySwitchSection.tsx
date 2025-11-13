import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle, Leaf, Lock, Heart } from 'lucide-react';
import BenefitPreviewDialog from './BenefitPreviewDialog';
import whySwitchBg from '@/assets/why-switch-background.jpg';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  previewTitle: string;
  previewDescription: string;
}

const WhySwitchSection: React.FC = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const { getSetting } = useHomepageSettings('why_switch');
  const settings = getSetting('why_switch');

  const benefits: Benefit[] = [
    {
      icon: <Leaf className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
      title: 'Safer Alternative',
      previewTitle: 'Safer Alternative',
      previewDescription: 'Nicotine pouches offer a safer alternative to traditional smoking. With no combustion, no tar, and no smoke, you can enjoy nicotine without exposing yourself to the harmful chemicals found in cigarettes. Your lungs will thank you for making the switch to a cleaner option.'
    },
    {
      icon: <Lock className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
      title: 'Discreet',
      previewTitle: 'Subtle and hidden',
      previewDescription: 'With nicotine pouches, you can use nicotine discreetly, wherever you are, even in places where smoking isn\'t allowed, like on a plane or at work. The pouches are small, invisible, and discreet, allowing you to satisfy your cravings privately, without drawing attention.'
    },
    {
      icon: <Heart className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
      title: 'Smokeless',
      previewTitle: 'Smokeless',
      previewDescription: 'Enjoy nicotine without any smoke, odor, or ash. Nicotine pouches are completely smokeless, making them perfect for use anywhere, anytime. No need to step outside or worry about disturbing others with smoke or smell. It\'s a clean, modern way to consume nicotine.'
    }
  ];

  return (
    <>
      <section className="w-full py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            {settings?.title || 'Why make the switch from smoking products?'}
          </h2>
          
          <p className="text-center text-base md:text-lg text-foreground mb-8 max-w-3xl mx-auto">
            {settings?.subtitle || "Switching to nicotine pouches isn't just a change. It's a commitment to a healthier, safer lifestyle, that yours lungs will appreciate!"}
          </p>

          <div className="flex justify-center mb-12">
            <Button variant="ghost" className="gap-2 text-foreground hover:text-primary">
              <PlayCircle className="w-6 h-6" />
              <span className="underline">See how to use</span>
            </Button>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-8">
            {/* Background Image */}
            <img 
              src={settings?.image_url || whySwitchBg} 
              alt="Why Switch Background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Safer Alternative - Top Left */}
            <button
              onClick={() => setSelectedBenefit(benefits[0])}
              className="absolute top-8 left-8 md:top-16 md:left-16 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative">
                {/* Sound wave animations */}
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.4s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.8s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.2s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.6s' }} />
                
                {/* Icon circle */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  {benefits[0].icon}
                </div>
              </div>
              
              {/* Benefit title */}
              <p className="mt-2 font-bold text-xs md:text-sm text-white drop-shadow-lg">
                {benefits[0].title}
              </p>
            </button>

            {/* Discreet - Top Right */}
            <button
              onClick={() => setSelectedBenefit(benefits[1])}
              className="absolute top-8 right-8 md:top-16 md:right-16 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative">
                {/* Sound wave animations */}
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.4s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.8s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.2s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.6s' }} />
                
                {/* Icon circle */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  {benefits[1].icon}
                </div>
              </div>
              
              {/* Benefit title */}
              <p className="mt-2 font-bold text-xs md:text-sm text-white drop-shadow-lg">
                {benefits[1].title}
              </p>
            </button>

            {/* Smokeless - Bottom Right */}
            <button
              onClick={() => setSelectedBenefit(benefits[2])}
              className="absolute bottom-8 right-8 md:bottom-16 md:right-16 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative">
                {/* Sound wave animations */}
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.4s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.8s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.2s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.6s' }} />
                
                {/* Icon circle */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  {benefits[2].icon}
                </div>
              </div>
              
              {/* Benefit title */}
              <p className="mt-2 font-bold text-xs md:text-sm text-white drop-shadow-lg">
                {benefits[2].title}
              </p>
            </button>
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

export default WhySwitchSection;