import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Shield, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
  const legalLinks = ['Mentions légales', 'Conditions générales', 'Politique de confidentialité', 'Conformité Tobacco 18', 'Contact'];
  const warnings = ["Les substituts nicotiniques sont strictement interdits aux personnes de moins de 18 ans", "Nos produits contiennent de la nicotine, une substance hautement addictive", "L'utilisation de ces produits par les non-fumeurs n'est pas recommandée."];
  return <footer className="bg-card/80 backdrop-blur-xl border-t border-border py-16 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        {/* Brand Section */}
        

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
            
            
            <ul className="space-y-2">
              {warnings.map((warning, index) => <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Info className="w-4 h-4 mt-0.5 text-destructive flex-shrink-0" />
                  <span>{warning}</span>
                </li>)}
            </ul>
          </CardContent>
        </Card>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {legalLinks.map((link, index) => <a key={index} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">
              {link}
            </a>)}
        </div>

        <Separator className="mb-8 bg-border" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 SNUSPEDIA. Tous droits réservés.<br />
            <span className="text-xs">
              Site réservé aux personnes majeures de 18 ans et plus • Vente interdite aux mineurs
            </span>
            <span className="text-xs opacity-30 ml-4">
              <Link to="/auth" className="hover:opacity-100 transition-opacity">·</Link>
            </span>
          </p>
        </div>

        {/* Compliance Badge */}
        <div className="flex justify-center mt-8">
          
        </div>
      </div>
    </footer>;
};
export default Footer;