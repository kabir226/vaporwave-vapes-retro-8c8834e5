import React from 'react';
import { BarChart3, Smile, Droplet, Ban, Cigarette, Clock } from 'lucide-react';

const BenefitsComparisonSection: React.FC = () => {
  const benefits = [
    { icon: BarChart3, label: 'Variety of Strengths' },
    { icon: Smile, label: 'Fresh Flavours' },
    { icon: Droplet, label: 'No Smoke' },
    { icon: Ban, label: 'No Odor' },
    { icon: Cigarette, label: 'Tobacco-Free' },
    { icon: Clock, label: 'Long-Lasting' },
  ];

  return (
    <section className="w-full py-16 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          The benefits of nicotine pouches over smoking
        </h2>

        <div className="mb-12 rounded-2xl overflow-hidden">
          <div className="bg-muted aspect-[16/9] flex items-center justify-center">
            <div className="text-center p-8">
              <p className="text-lg text-muted-foreground">Image placeholder - Nicotine pouches in hand</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-background rounded-full aspect-square hover:bg-primary/10 transition-colors"
              >
                <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary mb-2" />
                <span className="text-xs md:text-sm text-center font-medium">
                  {benefit.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            Variety of Strengths and Flavours
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Available in a range of nicotine strengths and flavours, nicotine pouches allow you to customise your 
            experience to suit your preferences. Whether you're new to nicotine or an experienced user, you can choose 
            the strength that's right for you. Flavour options like mint, citrus, and berry add an enjoyable twist to the 
            experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsComparisonSection;
