import React from 'react';
import { Button } from '@/components/ui/button';

interface AgeVerificationModalProps {
  onConfirm: () => void;
  onDeny: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onConfirm, onDeny }) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[9999] p-4">
      <div className="bg-black border-none shadow-none text-center max-w-[400px] w-full px-6 py-12 space-y-8">
        {/* Cercle 18+ rouge distinctif */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-red-600 flex items-center justify-center">
            <span className="text-red-600 font-black text-3xl">18+</span>
          </div>
        </div>

        {/* Titre et texte */}
        <div className="space-y-4">
          <h2 className="text-white font-bold text-2xl uppercase tracking-wider">
            Vérification d'âge
          </h2>
          <p className="text-gray-400 text-base">
            Vous devez avoir 18 ans ou plus pour entrer sur ce site. Les produits vendus peuvent contenir de la nicotine.
          </p>
        </div>

        {/* Boutons verticaux */}
        <div className="space-y-3">
          <Button 
            onClick={onConfirm}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase py-6 rounded-md transition-colors"
          >
            J'ai 18 ans ou plus
          </Button>
          <Button 
            onClick={onDeny}
            variant="ghost"
            className="w-full text-gray-500 hover:text-white hover:bg-transparent uppercase py-6 rounded-md transition-colors"
          >
            J'ai moins de 18 ans
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-gray-600 text-xs mt-6">
          Vente interdite aux mineurs - Produits pouvant contenir de la nicotine
        </p>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
