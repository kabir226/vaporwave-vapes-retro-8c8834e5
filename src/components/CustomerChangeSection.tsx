import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';

const CustomerChangeSection: React.FC = () => {
  const { getSetting } = useHomepageSettings('customer_change');
  const settings = getSetting('customer_change');

  return (
    <section className="w-full py-16 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        {settings?.image_url && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img 
              src={settings.image_url} 
              alt={settings.title || 'Customer testimonials'} 
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        )}
        
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-foreground">
          {settings?.title || 'See why our customers made the change'}
        </h2>
        
        <p className="text-center text-lg text-foreground mb-8">
          {settings?.subtitle || 'Real people, real results.'}
        </p>

        <p className="text-center text-base text-muted-foreground mb-8 max-w-3xl mx-auto">
          {settings?.description || "Don't take it from us, take it from our customers who have made the switch to a smokeless alternative."}
        </p>

        <div className="flex justify-center mb-12">
          <Button variant="default" size="lg" className="rounded-full">
            {settings?.button_text || 'See more'}
          </Button>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex gap-4 pb-4">
              <Card className="min-w-[300px] md:min-w-[400px] p-6 bg-background">
                <div className="mb-4 rounded-lg overflow-hidden aspect-[4/3] bg-muted flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Customer photo</p>
                </div>
                <p className="text-sm text-muted-foreground italic mb-4">
                  "Was recommended by a friend to try out snus for the first time, as I have been trying to quit vaping 
                  for a while. Was easy to find the best snus for me through the..."
                </p>
                <p className="font-semibold text-right text-foreground">Hussein F</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerChangeSection;
