import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';

interface HeaderProps {
  cart: any[];
  onToggleCart: () => void;
}
const Header: React.FC<HeaderProps> = ({
  cart,
  onToggleCart
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };
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
  }, {
    href: '/auth',
    label: 'Admin'
  }];
  const isActive = (path: string) => location.pathname === path;
  return <>
    <header className="sticky top-0 w-full z-50 bg-background/95 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Menu Button */}
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>

          {/* Center: Logo/Brand Name */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group">
            
            <span className="text-xl font-black text-cyber">
              SNUSPEDIA
            </span>
          </Link>

          {/* Right: Search & Cart Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={onToggleCart}>
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </Badge>}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4 animate-in slide-in-from-top">
            <SearchBar onSearch={handleSearch} placeholder="Rechercher des produits..." />
          </div>
        )}
      </div>
    </header>

    {/* Sidebar Menu */}
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-6">
          {navItems.map(item => <Link key={item.href} to={item.href} className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${isActive(item.href) ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-muted'}`} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>)}
        </nav>
      </SheetContent>
    </Sheet>
  </>;
};
export default Header;