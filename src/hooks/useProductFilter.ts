
import { useState, useEffect } from 'react';

interface FilterState {
  category: string;
  priceRange: string;
  sortBy: string;
}

export const useProductFilter = (products: any[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState<FilterState>({ 
    category: 'all', 
    priceRange: 'all', 
    sortBy: 'popular' 
  });

  useEffect(() => {
    let filtered = products;

    // Filtrage par recherche
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrage par catégorie
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Filtrage par prix
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
      filtered = filtered.filter(product => {
        if (max === undefined) return product.price >= min;
        return product.price >= min && product.price <= max;
      });
    }

    // Tri
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default: // popular
        filtered.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, filters, products]);

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    filters,
    setFilters
  };
};
