import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NewInStockSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8">
          <Button variant="default" size="lg" className="rounded-full">
            Get started
          </Button>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          NEW IN STOCK
        </h2>

        <div className="relative">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-muted rounded-2xl overflow-hidden max-w-md w-full aspect-square flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-lg text-muted-foreground mb-4">Product Image Placeholder</p>
                <p className="text-sm text-muted-foreground">Pablo Blueberry Peach Ice - 50mg</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">
              Pablo Blueberry Peach Ice - 50mg
            </h3>
            <p className="text-2xl font-bold text-primary">
              £4.99 GBP
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <span className="text-sm font-medium">5/5</span>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl font-bold">Excellent 4.9/5</span>
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-2xl text-primary">★</span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              based on 1,149 combined reviews on <span className="underline">Google</span> & <span className="underline">Trust Pilot</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewInStockSection;
