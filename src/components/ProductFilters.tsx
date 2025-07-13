
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
  productCount: number;
}

interface FilterState {
  category: string;
  priceRange: string;
  sortBy: string;
}

const ProductFilters: React.FC<FilterProps> = ({ onFilterChange, productCount }) => {
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    category: 'all',
    priceRange: 'all',
    sortBy: 'popular'
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'Tous les produits', count: productCount },
    { id: 'vapes', name: 'Vapes Premium', count: 12 },
    { id: 'eliquids', name: 'E-liquides', count: 24 },
    { id: 'gums', name: 'Gums Nicotinés', count: 8 },
    { id: 'packs', name: 'Packs Découverte', count: 4 }
  ];

  const priceRanges = [
    { id: 'all', name: 'Tous les prix' },
    { id: '0-15', name: 'Moins de 15€' },
    { id: '15-30', name: '15€ - 30€' },
    { id: '30-50', name: '30€ - 50€' },
    { id: '50+', name: 'Plus de 50€' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Plus populaires' },
    { id: 'price-low', name: 'Prix croissant' },
    { id: 'price-high', name: 'Prix décroissant' },
    { id: 'newest', name: 'Plus récents' },
    { id: 'rating', name: 'Mieux notés' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { category: 'all', priceRange: 'all', sortBy: 'popular' };
    setActiveFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = activeFilters.category !== 'all' || activeFilters.priceRange !== 'all';

  return (
    <div className="w-full">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtres & Tri
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Filters */}
      <Card className={`bg-glass border-border ${showFilters || 'hidden md:block'}`}>
        <CardContent className="p-6">
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="categories">Catégories</TabsTrigger>
              <TabsTrigger value="price">Prix</TabsTrigger>
              <TabsTrigger value="sort">Tri</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeFilters.category === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('category', category.id)}
                    className="justify-between"
                  >
                    <span className="truncate">{category.name}</span>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="price" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {priceRanges.map((range) => (
                  <Button
                    key={range.id}
                    variant={activeFilters.priceRange === range.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('priceRange', range.id)}
                  >
                    {range.name}
                  </Button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sort" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {sortOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={activeFilters.sortBy === option.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange('sortBy', option.id)}
                  >
                    {option.name}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Active Filters & Clear */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Filtres actifs:</span>
                {activeFilters.category !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {categories.find(c => c.id === activeFilters.category)?.name}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-destructive" 
                      onClick={() => handleFilterChange('category', 'all')}
                    />
                  </Badge>
                )}
                {activeFilters.priceRange !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {priceRanges.find(p => p.id === activeFilters.priceRange)?.name}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-destructive" 
                      onClick={() => handleFilterChange('priceRange', 'all')}
                    />
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Effacer tout
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductFilters;
