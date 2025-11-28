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

  // Debounce et filtrage en temps réel
  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      setShowResults(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      const results = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results.slice(0, 6)); // Limite à 6 résultats
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
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden z-[100]">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              Recherche en cours...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="max-h-[400px] overflow-y-auto">
              {filteredProducts.map((product) => {
                const currency = getCurrencyByCode(product.currency_code || 'EUR');
                const currencySymbol = currency?.symbol || '€';
                
                return (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.slug)}
                    className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors border-b border-border last:border-b-0"
                  >
                    {/* Image miniature */}
                    <div className="w-12 h-12 flex-shrink-0 bg-muted rounded overflow-hidden">
                      {product.images && product.images[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Search className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Infos produit */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {product.name}
                      </p>
                      {product.strength && (
                        <p className="text-xs text-muted-foreground">
                          {product.strength}
                        </p>
                      )}
                    </div>

                    {/* Prix */}
                    <div className="flex-shrink-0">
                      <span className="text-primary font-bold text-sm">
                        {currencySymbol}{product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
              
              {/* Afficher tous les résultats */}
              {filteredProducts.length > 0 && (
                <button
                  onClick={() => {
                    onSearch(query);
                    setShowResults(false);
                  }}
                  className="w-full p-3 text-center text-sm text-primary hover:bg-accent transition-colors font-medium"
                >
                  Voir tous les résultats ({filteredProducts.length})
                </button>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Aucun produit trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
