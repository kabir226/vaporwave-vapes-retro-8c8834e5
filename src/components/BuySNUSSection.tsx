import React from 'react';
import { Button } from '@/components/ui/button';
const BuySNUSSection: React.FC = () => {
  return <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          

          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Buy SNUS UK
          </h2>

          <p className="text-base md:text-lg text-muted-foreground mb-4">
            Ready to ditch the harmful effects of smoking?
          </p>

          <p className="text-base md:text-lg text-foreground leading-relaxed max-w-3xl mx-auto mb-8">
            MKPodPlug's nicotine pouches offer the smoke-free, healthier alternative that lets you live life to the 
            fullest. Reclaim your stamina, protect your lungs, and experience nicotine in a way that won't hold you back.
          </p>

          <div className="flex justify-center">
            <a 
              href="https://wa.me/message/VU57PC3IDGREF1" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="default" size="lg" className="rounded-full">
                Acheter Nicotine sans fumée
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default BuySNUSSection;