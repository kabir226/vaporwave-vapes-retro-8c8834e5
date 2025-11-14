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

          <p className="text-base md:text-lg text-foreground leading-relaxed max-w-3xl mx-auto">
            MKPodPlug's nicotine pouches offer the smoke-free, healthier alternative that lets you live life to the 
            fullest. Reclaim your stamina, protect your lungs, and experience nicotine in a way that won't hold you back.
          </p>
        </div>

        

        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Frequently Asked Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Button variant="outline" className="h-auto py-6 text-base font-semibold rounded-xl">
              Nicotine Pouches
            </Button>
            
            <Button variant="outline" className="h-auto py-6 text-base font-semibold rounded-xl">
              Shipping
            </Button>
            
            <Button variant="outline" className="h-auto py-6 text-base font-semibold rounded-xl md:col-span-2">
              Customer Support
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default BuySNUSSection;