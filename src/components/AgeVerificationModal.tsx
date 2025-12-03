import React from 'react';
import { Button } from '@/components/ui/button';

interface AgeVerificationModalProps {
  onConfirm: () => void;
  onDeny: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onConfirm, onDeny }) => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] p-4">
      <div className="text-center max-w-lg w-full space-y-8">
        {/* Logo SNUSPEDIA */}
        <div className="flex justify-center mb-12">
          <span className="text-primary font-black text-5xl tracking-wider italic">
            SNUSPEDIA
          </span>
        </div>

        {/* Question principale */}
        <h2 className="text-white text-2xl font-normal mb-12">
          avez-vous plus de 18 ans ?
        </h2>

        {/* Boutons horizontaux */}
        <div className="flex gap-4 justify-center items-center max-w-md mx-auto">
          <Button 
            onClick={onConfirm}
            className="flex-1 bg-[#cc0029] hover:bg-[#b30024] text-white font-bold text-base py-7 rounded-full shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
          >
            oui, j'ai 18+ ✓
          </Button>
          <Button 
            onClick={onDeny}
            variant="outline"
            className="flex-1 bg-black border-2 border-white/80 hover:border-white text-white hover:bg-white/5 font-medium text-base py-7 rounded-full transition-all"
          >
            non, moins de 18 ✗
          </Button>
        </div>

        {/* Disclaimer discret */}
        <p className="text-gray-400 text-xs mt-16">
          Vente interdite aux mineurs - Produits pouvant contenir de la nicotine
        </p>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
