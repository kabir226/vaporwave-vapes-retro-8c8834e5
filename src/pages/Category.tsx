import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SEO from '@/components/SEO';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { ChevronLeft } from 'lucide-react';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products: dbProducts, loading: productsLoading } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Find the current category
  const category = categories.find(cat => cat.slug === slug);
  
  // Filter products by category
  const categoryProducts = dbProducts.filter(p => {
    if (!category) return false;
    return p.category_id === category.id;
  }).map(p => ({
    ...p,
    icon: p.images?.[0] || '📦',
    category: p.category_id || '',
  }));

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const loading = productsLoading || categoriesLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header cart={cart} onToggleCart={() => setShowCart(!showCart)} />
        <main className="pt-20 px-4 max-w-7xl mx-auto text-center py-16">
          <h1 className="text-3xl font-bold text-foreground mb-4">Catégorie non trouvée</h1>
          <p className="text-muted-foreground mb-8">Cette catégorie n'existe pas.</p>
          <Link to="/shop" className="text-primary hover:underline">
            Retour à la boutique
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // SEO optimized title and description based on category
  const getCategoryMeta = () => {
    const name = category.name;
    const slug = category.slug;
    
    // Custom meta for known brands
    const brandMeta: Record<string, { title: string; description: string; keywords: string }> = {
      'pablo': {
        title: `Pablo Snus Ouagadougou - Acheter Pablo Nicotine Burkina | Snuspedia`,
        description: `Achetez Pablo snus à Ouagadougou ! Sachets nicotine Pablo Ice Cold, Pablo XXL. Livraison rapide Burkina Faso. Prix imbattables.`,
        keywords: `pablo snus ouaga, pablo ice cold, pablo xxl burkina, acheter pablo ouagadougou, pablo nicotine`
      },
      'velo': {
        title: `Velo Nicotine Ouagadougou - Sachets Velo Burkina | Snuspedia`,
        description: `Velo nicotine pouches à Ouagadougou. Large gamme Velo mint, berry au Burkina Faso. Livraison rapide Ouaga.`,
        keywords: `velo nicotine ouaga, velo snus burkina, acheter velo ouagadougou, velo pouches`
      },
      'zyn': {
        title: `Zyn Nicotine Ouagadougou - Acheter Zyn Burkina | Snuspedia`,
        description: `Zyn nicotine pouches à Ouagadougou. Sachets Zyn cool mint, citrus au Burkina Faso. Livraison Ouaga.`,
        keywords: `zyn nicotine ouaga, zyn snus burkina, acheter zyn ouagadougou, zyn pouches`
      }
    };

    if (brandMeta[slug.toLowerCase()]) {
      return brandMeta[slug.toLowerCase()];
    }

    return {
      title: `${name} - Snus Ouagadougou | Snuspedia`,
      description: `${name} : découvrez notre sélection de sachets nicotine ${name} à Ouagadougou. Livraison rapide Burkina Faso.`,
      keywords: `${name.toLowerCase()} snus ouaga, ${name.toLowerCase()} nicotine burkina, acheter ${name.toLowerCase()} ouagadougou`
    };
  };

  const meta = getCategoryMeta();

  // Structured data for category page
  const categoryStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} - Snus Ouagadougou`,
    "description": meta.description,
    "url": `https://snuspedia-bf.com/shop/${category.slug}`,
    "about": {
      "@type": "Thing",
      "name": category.name,
      "description": category.description || `Sachets de nicotine ${category.name}`
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": categoryProducts.length,
      "itemListElement": categoryProducts.slice(0, 10).map((product, index) => ({
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
        title={meta.title}
        description={meta.description}
        url={`https://snuspedia-bf.com/shop/${category.slug}`}
        keywords={meta.keywords}
        structuredData={categoryStructuredData}
        breadcrumbs={[
          { name: "Accueil", url: "https://snuspedia-bf.com/" },
          { name: "Boutique", url: "https://snuspedia-bf.com/shop" },
          { name: category.name, url: `https://snuspedia-bf.com/shop/${category.slug}` }
        ]}
      />
      <Header cart={cart} onToggleCart={() => setShowCart(!showCart)} />
      
      <main className="pt-20 px-4 max-w-7xl mx-auto pb-16">
        {/* Breadcrumb */}
        <nav className="py-4" aria-label="Fil d'ariane">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour à la boutique
          </Link>
        </nav>

        {/* Category Header */}
        <header className="text-center py-8">
          {category.image_url && (
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/50">
              <img 
                src={category.image_url} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-4">
            {categoryProducts.length} produit{categoryProducts.length > 1 ? 's' : ''} disponible{categoryProducts.length > 1 ? 's' : ''}
          </p>
        </header>

        {/* Products Grid */}
        <section aria-label={`Produits ${category.name}`}>
          {categoryProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun produit dans cette catégorie</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categoryProducts.map((product, index) => (
                <article key={product.id}>
                  <ProductCard 
                    product={product} 
                    onAddToCart={addToCart}
                    delay={index * 0.05}
                  />
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Related Categories */}
        {categories.filter(c => c.id !== category.id).length > 0 && (
          <section className="mt-16" aria-label="Autres catégories">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Autres catégories
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.filter(c => c.id !== category.id).slice(0, 5).map(cat => (
                <Link
                  key={cat.id}
                  to={`/shop/${cat.slug}`}
                  className="px-6 py-3 bg-card border border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Category;