
import React, { useEffect, useState } from 'react';
import { ShoppingCart, Check, Sparkles } from 'lucide-react';

interface CartAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
  productName: string;
}

const CartAnimation: React.FC<CartAnimationProps> = ({ isVisible, onComplete, productName }) => {
  const [stage, setStage] = useState<'adding' | 'success' | 'complete'>('adding');

  useEffect(() => {
    if (isVisible) {
      setStage('adding');
      
      const timer1 = setTimeout(() => setStage('success'), 800);
      const timer2 = setTimeout(() => {
        setStage('complete');
        onComplete();
      }, 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-card border border-primary rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl animate-scale-in">
        <div className="relative mb-6">
          {stage === 'adding' && (
            <div className="animate-spin">
              <ShoppingCart className="w-16 h-16 text-primary mx-auto" />
            </div>
          )}
          
          {stage === 'success' && (
            <div className="relative animate-bounce">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
              <Check className="w-16 h-16 text-green-500 mx-auto relative z-10" />
              <Sparkles className="w-6 h-6 text-retro-gold absolute -top-2 -right-2 animate-pulse" />
              <Sparkles className="w-4 h-4 text-retro-gold absolute -bottom-1 -left-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {stage === 'adding' && (
            <div>
              <h3 className="text-xl font-bold text-primary animate-pulse">
                Ajout en cours...
              </h3>
              <p className="text-sm text-muted-foreground">
                {productName}
              </p>
            </div>
          )}
          
          {stage === 'success' && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-green-500 mb-2">
                ✨ Ajouté avec succès !
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>{productName}</strong> a été ajouté à votre panier
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-retro-gold">
                <Sparkles className="w-4 h-4" />
                <span>Prêt pour la commande</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartAnimation;
