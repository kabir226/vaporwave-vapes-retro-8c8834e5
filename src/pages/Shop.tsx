import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CartSummary from '@/components/CartSummary';
import SEO from '@/components/SEO';
import { Filter, Grid, List } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useCart } from '@/hooks/useCart';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const { products: dbProducts, loading } = useProducts();
  const { categories: dbCategories } = useCategories();
  const { cart, addToCart, updateQuantity, removeItem } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const searchQuery = searchParams.get('search') || '';

  // Gérer le paramètre de catégorie dans l'URL
  useEffect(() => {
    const categorySlug = searchParams.get('category');
    if (categorySlug && dbCategories.length > 0) {
      const category = dbCategories.find(cat => cat.slug === categorySlug);
      if (category) {
        setSelectedCategory(category.id);
      }
    }
  }, [searchParams, dbCategories]);

  // Transformer les catégories pour inclure le comptage
  const categories = [
    { id: 'all', name: 'Tous les produits', count: dbProducts.length },
    ...dbCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      count: dbProducts.filter(p => p.category_id === cat.id).length
    }))
  ];

  // Transformer les produits pour la compatibilité avec ProductCard
  const products = dbProducts.map(p => ({
    ...p,
    icon: p.images?.[0] || '📦',
    category: p.category_id || '',
  }));

  // Filtrer par catégorie ET par recherche
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category_id === selectedCategory;
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });


  // Données structurées pour la boutique
  const shopStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Boutique Snus Ouagadougou - Sachets de Nicotine Burkina Faso",
    "description": "Achetez du snus à Ouagadougou. Large gamme de sachets de nicotine Pablo, Velo, Zyn. Livraison rapide au Burkina Faso.",
    "url": "https://snuspedia-bf.com/shop",
    "about": {
      "@type": "Thing",
      "name": "Snus et Sachets de Nicotine",
      "description": "Alternative sans fumée au tabac disponible à Ouagadougou"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredProducts.length,
      "itemListElement": filteredProducts.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "url": `https://snuspedia-bf.com/product/${product.slug}`
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Acheter Snus Ouagadougou - Boutique Nicotine Burkina | Snuspedia"
        description="Achetez du snus à Ouagadougou ! Large gamme de sachets nicotine Pablo, Velo, Zyn au Burkina Faso. Livraison rapide Ouaga. Prix compétitifs."
        url="https://snuspedia-bf.com/shop"
        type="website"
        keywords="acheter snus ouagadougou, boutique snus ouaga, nicotine burkina faso, pablo snus ouaga, velo nicotine burkina, snus livraison ouaga"
        structuredData={shopStructuredData}
        breadcrumbs={[
          { name: "Accueil", url: "https://snuspedia-bf.com/" },
          { name: "Boutique", url: "https://snuspedia-bf.com/shop" }
        ]}
      />
      <Header cart={cart} onToggleCart={() => setShowCart(!showCart)} />
      
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Page Title - H1 pour SEO */}
        <header className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-black text-cyber mb-2">
            Notre Boutique
          </h1>
          <p className="text-muted-foreground">
            Découvrez notre sélection de produits
          </p>
        </header>

        {/* Toolbar */}
        <div className="flex justify-between items-center py-6 mb-8">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Ouvrir les filtres"
          >
            <Filter className="w-4 h-4" />
            <span>Filtrer et trier</span>
          </button>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        <section aria-label="Liste des produits">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Chargement des produits...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun produit trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-12">
              {filteredProducts.map((product, index) => (
                <article key={product.id}>
                  <ProductCard 
                    product={product} 
                    onAddToCart={addToCart}
                    delay={index * 0.1}
                  />
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Filter Sheet */}
      {showFilters && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" 
          onClick={() => setShowFilters(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Filtres de produits"
        >
          <aside 
            className="fixed inset-y-0 left-0 w-80 bg-background border-r border-border shadow-lg" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Filtres</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  aria-label="Fermer les filtres"
                >
                  ✕
                </Button>
              </div>
              
              <nav className="space-y-4" aria-label="Filtres par catégorie">
                <div>
                  <h4 className="font-semibold mb-3">Catégories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setShowFilters(false);
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors flex justify-between items-center ${
                          selectedCategory === category.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`}
                        aria-pressed={selectedCategory === category.id}
                      >
                        <span className="text-sm">{category.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </aside>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Panier"
        >
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCart(false)}
              className="absolute -top-2 -right-2 z-10 bg-background border"
              aria-label="Fermer le panier"
            >
              ✕
            </Button>
            <CartSummary 
              cart={cart} 
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Shop;
