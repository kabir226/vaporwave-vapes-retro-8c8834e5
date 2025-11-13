import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';

const MixMatchSection: React.FC = () => {
  const { getSetting } = useHomepageSettings('mix_match');
  const settings = getSetting('mix_match');

  return (
    <section className="w-full py-16 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <Button variant="outline" className="rounded-full border-2 border-primary">
            <Star className="w-4 h-4 mr-2 fill-primary text-primary" />
            Review us on Trustpilot
          </Button>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          {settings?.title || 'MIX & MATCH'}
        </h2>

        <div className="mb-12 rounded-2xl overflow-hidden">
          {settings?.image_url ? (
            <img 
              src={settings.image_url} 
              alt={settings.title || 'Mix & Match'} 
              className="w-full h-full object-cover aspect-[4/3]"
            />
          ) : (
            <div className="bg-muted aspect-[4/3] flex items-center justify-center">
              <p className="text-lg text-muted-foreground">Mixed pouches image placeholder</p>
            </div>
          )}
        </div>

        <p className="text-center text-base md:text-lg text-muted-foreground mb-8">
          {settings?.description || 'Mix and match any five or ten pouches of you choice and save big!'}
        </p>

        <div className="space-y-4 mb-12">
          <Button variant="default" size="lg" className="w-full rounded-full text-lg py-6">
            Choose 5 for £20
          </Button>
          
          <Button variant="default" size="lg" className="w-full rounded-full text-lg py-6">
            Choose 10 for £40
          </Button>
        </div>

        <div className="border-t-2 border-border pt-8">
          
        </div>
      </div>
    </section>
  );
};
export default MixMatchSection;