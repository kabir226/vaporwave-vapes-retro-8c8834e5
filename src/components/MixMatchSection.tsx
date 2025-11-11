import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const MixMatchSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <Button 
            variant="outline" 
            className="rounded-full border-2 border-primary"
          >
            <Star className="w-4 h-4 mr-2 fill-primary text-primary" />
            Review us on Trustpilot
          </Button>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          MIX & MATCH
        </h2>

        <div className="mb-12 rounded-2xl overflow-hidden">
          <div className="bg-muted aspect-[4/3] flex items-center justify-center">
            <p className="text-lg text-muted-foreground">Mixed pouches image placeholder</p>
          </div>
        </div>

        <p className="text-center text-base md:text-lg text-muted-foreground mb-8">
          Mix and match any five or ten pouches of you choice and save big!
        </p>

        <div className="space-y-4 mb-12">
          <Button 
            variant="default" 
            size="lg" 
            className="w-full rounded-full text-lg py-6"
          >
            Choose 5 for £20
          </Button>
          
          <Button 
            variant="default" 
            size="lg" 
            className="w-full rounded-full text-lg py-6"
          >
            Choose 10 for £40
          </Button>
        </div>

        <div className="border-t-2 border-border pt-8">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
            SHOP BY FLAVOUR
          </h3>
        </div>
      </div>
    </section>
  );
};

export default MixMatchSection;
