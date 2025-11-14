import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
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
      {/* Top Bar */}
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Menu Button */}
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Center: Logo/Brand Name */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group">
            <Logo />
            <span className="text-xl font-black text-cyber">
              SNUSPEDIA
            </span>
          </Link>

          {/* Right: Search & Cart Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={onToggleCart}>
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </Badge>}
            </Button>
          </div>
        </div>

        {/* Horizontal Scrolling Navigation */}
        <ScrollArea className="w-full whitespace-nowrap border-t border-border">
          <div className="flex items-center h-12 gap-1">
            {navItems.map(item => <Link key={item.href} to={item.href} className={`inline-flex items-center justify-center px-6 h-full font-medium relative transition-colors ${isActive(item.href) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                {item.label}
                {isActive(item.href) && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
              </Link>)}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && <div className="border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map(item => <Link key={item.href} to={item.href} className={`block py-2 px-4 rounded-lg transition-colors ${isActive(item.href) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-muted'}`} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>)}
          </nav>
        </div>}
    </header>;
};
export default Header;