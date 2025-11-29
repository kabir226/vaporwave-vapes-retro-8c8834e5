import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import { useCurrencies } from '@/hooks/useCurrencies';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Rechercher des produits..."
}) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const { products, loading } = useProducts();
  const { getCurrencyByCode } = useCurrencies();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce et filtrage intelligent en temps réel
  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      setShowResults(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      // Recherche intelligente : divise la requête en mots-clés
      const searchTerms = query.toLowerCase().trim().split(/\s+/);
      
      const results = products.filter(product => {
        const productTitle = product.name.toLowerCase();
        // Vérifie que CHAQUE mot tapé existe dans le titre du produit
        return searchTerms.every(term => productTitle.includes(term));
      });
      
      setFilteredProducts(results.slice(0, 8)); // Limite à 8 résultats
      setShowResults(true);
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [query, products]);

  // Click away listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowResults(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setShowResults(false);
  };

  const handleProductClick = (slug: string) => {
    navigate(`/product/${slug}`);
    setQuery('');
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="pl-10 pr-10 bg-card/50 border-border focus:border-primary"
            onFocus={() => query && setShowResults(true)}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Dropdown des résultats */}
      {showResults && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover/95 backdrop-blur-sm border border-border rounded-xl shadow-2xl z-50 overflow-hidden max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              Recherche en cours...
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map((product) => {
                const currency = getCurrencyByCode(product.currency_code || 'EUR');
                const currencySymbol = currency?.symbol || '€';
                
                return (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.slug)}
                    className="flex items-center gap-4 p-3 border-b border-border/50 last:border-0 hover:bg-accent/50 cursor-pointer transition-colors duration-200"
                  >
                    {/* Image */}
                    <div className="w-12 h-12 flex-shrink-0 rounded-md bg-secondary/20 overflow-hidden">
                      {product.images && product.images[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Search className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Infos produit */}
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs font-bold text-primary">
                        {currencySymbol}{product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="p-4 text-center text-muted-foreground text-sm">
              Aucun produit trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
