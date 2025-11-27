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
        {/* Logo stylisé - peut être remplacé par votre logo */}
        <div className="flex justify-center mb-12">
          <span className="text-[#c4ff0e] font-black text-5xl tracking-wider italic">
            BLIP
          </span>
        </div>

        {/* Question principale */}
        <h2 className="text-white text-2xl font-normal mb-12">
          are you over the age of 18?
        </h2>

        {/* Boutons horizontaux */}
        <div className="flex gap-4 justify-center items-center max-w-md mx-auto">
          <Button 
            onClick={onConfirm}
            className="flex-1 bg-[#c4ff0e] hover:bg-[#b3ef00] text-black font-medium text-base py-7 rounded-full shadow-lg shadow-[#c4ff0e]/20 transition-all hover:shadow-[#c4ff0e]/40"
          >
            yes, I am ✓
          </Button>
          <Button 
            onClick={onDeny}
            variant="outline"
            className="flex-1 bg-black border-2 border-white/80 hover:border-white text-white hover:bg-white/5 font-medium text-base py-7 rounded-full transition-all"
          >
            no, I'm not ✗
          </Button>
        </div>

        {/* Disclaimer discret */}
        <p className="text-gray-700 text-xs mt-16">
          Vente interdite aux mineurs - Produits pouvant contenir de la nicotine
        </p>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
