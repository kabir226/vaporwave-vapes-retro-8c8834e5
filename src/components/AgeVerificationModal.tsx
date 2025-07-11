
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield } from 'lucide-react';

interface AgeVerificationModalProps {
  onConfirm: () => void;
  onDeny: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onConfirm, onDeny }) => {
  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[9999] p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-yellow-900/20" />
      
      <Card className="relative max-w-md w-full bg-glass border-primary cyber-border animate-glow">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Shield className="w-16 h-16 text-primary animate-neon-pulse" />
              <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                21+
              </div>
            </div>
          </div>
          
          <CardTitle className="text-2xl font-black text-cyber">
            VÉRIFICATION D'ÂGE
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ce site contient des produits destinés uniquement aux adultes de <strong className="text-primary">21 ans et plus</strong>. 
              Les produits vendus peuvent contenir de la nicotine, une substance hautement addictive.
            </p>
            
            <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="text-lg font-bold text-destructive">AVEZ-VOUS 21 ANS OU PLUS ?</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={onConfirm}
              className="flex-1 retro-gradient text-black font-bold py-3 hover:scale-105 transition-transform"
            >
              OUI, J'AI 21 ANS+
            </Button>
            <Button 
              onClick={onDeny}
              variant="outline"
              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground py-3"
            >
              NON
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center italic">
            Conforme à la législation Tobacco 21 - La vente de produits du tabac aux mineurs est strictement interdite
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgeVerificationModal;
