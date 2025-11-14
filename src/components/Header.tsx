import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
interface HeaderProps {
  cart: any[];
  onToggleCart: () => void;
}
const Header: React.FC<HeaderProps> = ({
  cart,
  onToggleCart
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const navItems = [{
    href: '/',
    label: 'Accueil'
  }, {
    href: '/shop',
    label: 'Boutique'
  }, {
    href: '/about',
    label: 'À propos'
  }, {
    href: '/contact',
    label: 'Contact'
  }];
  const isActive = (path: string) => location.pathname === path;
  return <header className="sticky top-0 w-full z-50 bg-background/95 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl h-16 md:h-20 flex items-center justify-between py-0 px-0 mx-0 my-0">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          
          <span className="text-xl font-black text-cyber">
            SNUSPEDIA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => <Link key={item.href} to={item.href} className={`font-medium relative group transition-colors ${isActive(item.href) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>)}
        </nav>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="cyber-border relative" onClick={onToggleCart}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Panier
            {cartItemsCount > 0 && <Badge variant="destructive" className="ml-2 animate-pulse">
                {cartItemsCount}
              </Badge>}
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map(item => <Link key={item.href} to={item.href} className={`block py-2 px-4 rounded-lg transition-colors ${isActive(item.href) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'}`} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>)}
          </nav>
        </div>}
    </header>;
};
export default Header;