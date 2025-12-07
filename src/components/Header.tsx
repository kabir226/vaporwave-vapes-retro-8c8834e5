import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import { useCategories } from '@/hooks/useCategories';

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

  const { categories } = useCategories();
  
  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;
  return <>
    <header className="sticky top-0 w-full z-50 bg-background/95 backdrop-blur-xl border-b border-border" role="banner">
      <div className="container mx-auto px-4 max-w-full">
        <div className="h-16 flex items-center justify-between max-w-full">
          {/* Left: Menu Button */}
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>

          {/* Center: Logo/Brand Name */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group whitespace-nowrap">
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
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Rechercher des produits..." 
            />
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
        <nav className="flex flex-col gap-2 mt-6" role="navigation" aria-label="Menu principal">
          <Link 
            to="/" 
            className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
              isActive('/') ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-muted'
            }`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          <Link 
            to="/shop" 
            className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
              isActive('/shop') ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-muted'
            }`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Shop All
          </Link>

          {/* Accordéon pour les catégories */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="categories" className="border-none">
              <AccordionTrigger className="py-3 px-4 hover:bg-muted rounded-lg text-base font-medium hover:no-underline">
                Shop By Brand
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="flex flex-col gap-1 pl-4">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/shop/${category.slug}`}
                      className="block py-2 px-4 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link 
            to="/about" 
            className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
              isActive('/about') ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-muted'
            }`} 
            onClick={() => setIsMenuOpen(false)}
          >
            À propos
          </Link>
          
          <Link 
            to="/faq" 
            className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
              isActive('/faq') ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-muted'
            }`} 
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  </>;
};
export default Header;