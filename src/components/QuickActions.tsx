
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';

const QuickActions = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-primary">
          Service Client
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center bg-card/50 hover:bg-card/70 transition-colors">
            <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Contactez-nous</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Lun-Ven 9h-18h
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Appeler
            </Button>
          </Card>

          <Card className="p-4 text-center bg-card/50 hover:bg-card/70 transition-colors">
            <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Livraison</h3>
            <p className="text-sm text-muted-foreground mb-2">
              24-48h gratuite dès 50€
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Suivre
            </Button>
          </Card>

          <Card className="p-4 text-center bg-card/50 hover:bg-card/70 transition-colors">
            <MessageCircle className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Chat Live</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Assistance immédiate
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Discuter
            </Button>
          </Card>

          <Card className="p-4 text-center bg-card/50 hover:bg-card/70 transition-colors">
            <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Retours</h3>
            <p className="text-sm text-muted-foreground mb-2">
              30 jours satisfait/remboursé
            </p>
            <Button size="sm" variant="outline" className="w-full">
              Retourner
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
