import React from 'react';
import { Button } from '@/components/ui/button';
const BuySNUSSection: React.FC = () => {
  return <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          

          <h2 className="text-3xl md:text-4xl font-bold mb-8">Acheter SNUS</h2>

          <p className="text-base md:text-lg text-muted-foreground mb-4">
            Prêt à abandonner les effets nocifs du tabagisme ?
          </p>

          <p className="text-base md:text-lg text-foreground leading-relaxed max-w-3xl mx-auto mb-8">Les snus sans tabac de Snuspedia offrent l'alternative sans fumée et plus saine qui vous permet de vivre pleinement. Retrouvez votre endurance, protégez vos poumons et consommez la nicotine d'une manière qui ne vous retiendra pas.</p>

          <div className="flex justify-center">
            <a href="whatsapp://send?phone=22605145905" target="_blank" rel="noopener noreferrer">
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