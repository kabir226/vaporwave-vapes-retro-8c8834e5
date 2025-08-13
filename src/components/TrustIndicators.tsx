
import React from 'react';

const TrustIndicators: React.FC = () => {
  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2 animate-fade-in">
            <div className="text-3xl">🚚</div>
            <h3 className="font-bold">Livraison Express</h3>
            <p className="text-sm text-muted-foreground">24-48h partout en France</p>
          </div>
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl">🔒</div>
            <h3 className="font-bold">Paiement Sécurisé</h3>
            <p className="text-sm text-muted-foreground">SSL & cryptage bancaire</p>
          </div>
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl">💎</div>
            <h3 className="font-bold">Qualité Premium</h3>
            <p className="text-sm text-muted-foreground">Produits certifiés</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
