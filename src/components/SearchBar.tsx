import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import OptimizedImage from '@/components/ui/optimized-image';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const SEARCH_HISTORY_KEY = 'search_history';
const MAX_HISTORY_ITEMS = 5;

// Highlight matching terms in text
const highlightTerms = (text: string, terms: string[]): string => {
  if (!terms.length) return text;
  
  let result = text;
  terms.forEach(term => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');
    result = result.replace(regex, '<mark class="bg-primary/30 text-foreground rounded px-0.5">$1</mark>');
  });
  return result;
};

// Get search history from localStorage
const getSearchHistory = (): string[] => {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

// Save search to history
const saveToHistory = (query: string) => {
  if (!query.trim()) return;
  
  const history = getSearchHistory();
  const filtered = history.filter(item => item.toLowerCase() !== query.toLowerCase());
  const newHistory = [query, ...filtered].slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
};

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Rechercher un produit...",
  autoFocus = false
}) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { products = [] } = useProducts();

  // Load search history on mount
  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  // Focus input when autoFocus changes
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Debounced search with extended matching (name + description + category)
  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      setShowResults(false);
      setSelectedIndex(-1);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
      
      const results = products.filter((product: any) => {
        // Extended search: name + description + category
        const searchableText = `${product.name || ''} ${product.description || ''} ${product.category?.name || ''}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
      
      setFilteredProducts(results.slice(0, 8));
      setShowResults(true);
      setIsLoading(false);
      setSelectedIndex(-1);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, products]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const items = query.trim() ? filteredProducts : searchHistory;
    const maxIndex = items.length - 1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < maxIndex ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
        break;
      case 'Enter':
        e.preventDefault();
        if (query.trim() && selectedIndex >= 0 && filteredProducts[selectedIndex]) {
          handleProductClick(filteredProducts[selectedIndex].slug);
        } else if (!query.trim() && selectedIndex >= 0 && searchHistory[selectedIndex]) {
          setQuery(searchHistory[selectedIndex]);
          setShowHistory(false);
        } else if (query.trim()) {
          handleSubmit(e as any);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setShowHistory(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [query, filteredProducts, searchHistory, selectedIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveToHistory(query.trim());
      setSearchHistory(getSearchHistory());
      onSearch(query);
      setShowResults(false);
      setShowHistory(false);
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowHistory(false);
  };

  const handleInputFocus = () => {
    if (!query.trim() && searchHistory.length > 0) {
      setShowHistory(true);
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setShowResults(false);
    setShowHistory(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleProductClick = (slug: string) => {
    saveToHistory(query.trim());
    setSearchHistory(getSearchHistory());
    navigate(`/product/${slug}`);
    setQuery('');
    setShowResults(false);
    setShowHistory(false);
  };

  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem);
    setShowHistory(false);
    onSearch(historyItem);
    navigate(`/shop?search=${encodeURIComponent(historyItem)}`);
  };

  const clearHistory = () => {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    setSearchHistory([]);
    setShowHistory(false);
  };

  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const showDropdown = showResults || showHistory;

  return (
    <div ref={searchRef} className="relative z-50 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2.5 bg-secondary/50 border border-border/50 rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        
        {/* Keyboard shortcut hint */}
        <div className="hidden sm:flex absolute right-12 top-1/2 -translate-y-1/2 items-center gap-1 text-xs text-muted-foreground pointer-events-none">
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">⌘K</kbd>
        </div>
      </form>

      {/* Dropdown: History or Results */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl z-[9999] overflow-hidden max-h-[70vh] overflow-y-auto">
          
          {/* Search History */}
          {showHistory && searchHistory.length > 0 && (
            <div className="p-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Recherches récentes
                </span>
                <button
                  onClick={clearHistory}
                  className="text-xs text-primary hover:underline"
                >
                  Effacer
                </button>
              </div>
              {searchHistory.map((item, index) => (
                <button
                  key={item}
                  onClick={() => handleHistoryClick(item)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                    selectedIndex === index ? 'bg-primary/10' : 'hover:bg-muted'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{item}</span>
                </button>
              ))}
            </div>
          )}

          {/* Loading state */}
          {isLoading && query.trim() && (
            <div className="p-4 text-center">
              <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full mx-auto" />
            </div>
          )}

          {/* Search Results */}
          {!isLoading && showResults && filteredProducts.length > 0 && (
            <div className="p-2">
              <span className="px-3 py-1 text-xs text-muted-foreground">
                {filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''}
              </span>
              {filteredProducts.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.slug)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors text-left ${
                    selectedIndex === index ? 'bg-primary/10' : 'hover:bg-muted'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                    {product.images?.[0] ? (
                      <OptimizedImage
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-lg">
                        📦
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p 
                      className="text-sm font-medium text-foreground truncate"
                      dangerouslySetInnerHTML={{ __html: highlightTerms(product.name, searchTerms) }}
                    />
                    {product.category?.name && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-secondary text-xs text-muted-foreground rounded-full">
                        {product.category.name}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-primary whitespace-nowrap">
                    {product.price?.toLocaleString()} FCFA
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {!isLoading && showResults && query.trim() && filteredProducts.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-muted-foreground text-sm">Aucun produit trouvé pour "{query}"</p>
              <p className="text-xs text-muted-foreground mt-1">Essayez avec d'autres termes</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
