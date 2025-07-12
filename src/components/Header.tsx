
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Menu, X } from 'lucide-react';

interface HeaderProps {
  cart: any[];
  onToggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cart, onToggleCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { href: '#vapes', label: 'Vapes' },
    { href: '#eliquids', label: 'E-liquides' },
    { href: '#gums', label: 'Gums' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 retro-gradient rounded-full flex items-center justify-center font-black text-black animate-glow">
              NS
            </div>
            <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs px-1.5">
              18+
            </Badge>
          </div>
          <span className="text-2xl font-black text-cyber animate-neon-pulse">
            NO-SMOKING
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors font-medium relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            size="sm"
            className="cyber-border relative"
            onClick={onToggleCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Panier
            {cartItemsCount > 0 && (
              <Badge variant="destructive" className="ml-2 animate-pulse">
                {cartItemsCount}
              </Badge>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 px-4 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
