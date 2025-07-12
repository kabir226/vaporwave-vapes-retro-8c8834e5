
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
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-yellow-900/10" />
      
      <Card className="relative max-w-md w-full bg-card/90 border-primary backdrop-blur-md">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Shield className="w-12 h-12 text-primary" />
              <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                18+
              </div>
            </div>
          </div>
          
          <CardTitle className="text-xl font-black text-primary">
            VÉRIFICATION D'ÂGE
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Ce site contient des produits destinés uniquement aux adultes de <strong className="text-primary">18 ans et plus</strong>. 
              Les produits vendus peuvent contenir de la nicotine.
            </p>
            
            <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-bold text-destructive">AVEZ-VOUS 18 ANS OU PLUS ?</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={onConfirm}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2"
            >
              OUI, J'AI 18 ANS+
            </Button>
            <Button 
              onClick={onDeny}
              variant="outline"
              className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground py-2"
            >
              NON
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            Vente interdite aux mineurs - Produits pouvant contenir de la nicotine
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgeVerificationModal;
