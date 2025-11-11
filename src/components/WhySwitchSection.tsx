import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle, Leaf, Lock, Heart } from 'lucide-react';

const WhySwitchSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Why make the switch from smoking products?
        </h2>
        
        <p className="text-center text-base md:text-lg text-foreground mb-8 max-w-3xl mx-auto">
          Switching to nicotine pouches isn't just a change. It's a commitment to a healthier, safer lifestyle, that yours lungs will appreciate!
        </p>

        <div className="flex justify-center mb-12">
          <Button 
            variant="ghost" 
            className="gap-2 text-foreground hover:text-primary"
          >
            <PlayCircle className="w-6 h-6" />
            <span className="underline">See how to use</span>
          </Button>
        </div>

        <div className="relative bg-muted rounded-2xl overflow-hidden aspect-[4/3] mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-3">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold">Safer Alternative</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-3">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold">Discreet</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-3">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold">Smokeless</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-2">
            MEGA CANS 200+ POUCHES
          </h3>
        </div>
      </div>
    </section>
  );
};

export default WhySwitchSection;
