import React from 'react';
import { Wind } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    { icon: '🌿', text: 'Utilisation discrète n\'importe où, n\'importe quand' },
    { icon: '💚', text: 'Plus doux pour votre corps par rapport au tabagisme' },
    { icon: '✨', text: 'Sans taches sur les dents' }
  ];

  return (
    <section className="w-full py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 text-center">
              <Wind className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-base md:text-lg text-foreground">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
