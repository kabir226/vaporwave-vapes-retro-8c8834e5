
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Shield, Info } from 'lucide-react';

const Footer: React.FC = () => {
  const legalLinks = [
    'Mentions légales',
    'Conditions générales',
    'Politique de confidentialité',
    'Conformité Tobacco 21',
    'Contact'
  ];

  const warnings = [
    "La vente de produits du tabac est strictement interdite aux personnes de moins de 21 ans",
    "Nos produits contiennent de la nicotine, une substance hautement addictive",
    "L'utilisation par les non-fumeurs n'est pas recommandée",
    "Les femmes enceintes ou allaitantes doivent éviter toute consommation de nicotine",
    "Consultez un professionnel de santé avant utilisation si vous avez des problèmes médicaux"
  ];

  return (
    <footer className="bg-card/80 backdrop-blur-xl border-t border-border py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Brand Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-16 h-16 retro-gradient rounded-full flex items-center justify-center font-black text-black text-2xl animate-glow">
              NS
            </div>
            <h3 className="text-4xl font-black text-cyber animate-neon-pulse">
              NO-SMOKING
            </h3>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Votre partenaire premium pour une vie sans fumée. 
            <br />
            <span className="text-retro-gold">Qualité, innovation et design rétro-futuriste.</span>
          </p>
        </div>

        <Separator className="mb-12 bg-border" />

        {/* Warning Section */}
        <Card className="bg-destructive/10 border-destructive mb-12">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h4 className="text-xl font-bold text-destructive">
                AVERTISSEMENT IMPORTANT
              </h4>
            </div>
            
            <p className="text-sm mb-4 text-foreground">
              Conforme à la législation Tobacco 21 :
            </p>
            
            <ul className="space-y-2">
              {warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Info className="w-4 h-4 mt-0.5 text-destructive flex-shrink-0" />
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {legalLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline"
            >
              {link}
            </a>
          ))}
        </div>

        <Separator className="mb-8 bg-border" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 No-Smoking. Tous droits réservés.
            <br />
            <span className="text-xs">
              Site réservé aux personnes majeures de 21 ans et plus • Vente interdite aux mineurs
            </span>
          </p>
        </div>

        {/* Compliance Badge */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold text-primary">
              CONFORME TOBACCO 21
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
