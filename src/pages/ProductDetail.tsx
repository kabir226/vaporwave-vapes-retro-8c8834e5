import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCurrencies } from "@/hooks/useCurrencies";
import CartModal from "@/components/CartModal";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string | null;
  stock: number;
  images: string[];
  features: string[] | null;
  strength: string | null;
  rating: number | null;
  in_stock: boolean;
  slug: string;
}

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getCurrencyByCode } = useCurrencies();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchProduct();
    loadCart();
  }, [slug]);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      // Fetch product by slug
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (productError) throw productError;
      setProduct(productData);

      // Fetch related products from same category
      if (productData.category_id) {
        const { data: relatedData } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', productData.category_id)
          .neq('id', productData.id)
          .limit(4);
        
        setRelatedProducts(relatedData || []);
      }
    } catch (err: any) {
      console.error('Error fetching product:', err);
      toast.error("Produit introuvable");
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = currentCart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(currentCart));
    setCart(currentCart);
    toast.success(`${quantity} × ${product.name} ajouté au panier`);
  };

  const handleUpdateQuantity = (id: number | string, newQuantity: number) => {
    const updatedCart = cart.map((item: any) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ).filter((item: any) => item.quantity > 0);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleRemoveItem = (id: number | string) => {
    const updatedCart = cart.filter((item: any) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    toast.success('Produit retiré du panier');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const mainImage = product.images && product.images.length > 0 
    ? product.images[selectedImage] 
    : '/placeholder.svg';

  const currency = getCurrencyByCode((product as any).currency_code || 'EUR');
  const currencySymbol = currency?.symbol || '€';
  const currencyCode = currency?.code || 'EUR';

  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} onToggleCart={() => setShowCart(!showCart)} />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Product Main Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer"
                 onClick={() => setZoomOpen(true)}>
              <img 
                src={mainImage} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImage === index ? 'border-primary' : 'border-transparent hover:border-muted-foreground/20'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.strength || 'STANDARD'}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-primary">{currencySymbol}{product.price.toFixed(2)} {currencyCode}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Shipping calculated at checkout.
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity ({quantity} in cart)</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full rounded-full"
                size="lg"
                variant="outline"
                onClick={handleAddToCart}
                disabled={!product.in_stock}
              >
                Add to cart
              </Button>
              <Button 
                className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                size="lg"
                onClick={() => {
                  handleAddToCart();
                  navigate('/shop');
                }}
                disabled={!product.in_stock}
              >
                Buy it now
              </Button>
            </div>

            {/* Product Details Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📋</span>
                    <span>Description</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    {product.description || "No description available."}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="specifications">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✅</span>
                    <span>Specifications</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Strength: {product.strength || 'Standard'}</li>
                    <li>• Stock: {product.stock} units available</li>
                    <li>• Rating: {product.rating ? `${product.rating}/5` : 'Not rated'}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ingredients">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌿</span>
                    <span>Ingredients</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {product.features && product.features.length > 0 ? (
                    <ul className="space-y-2 text-muted-foreground">
                      {product.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No ingredients information available.</p>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how-to-use">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">❓</span>
                    <span>How to use nicotine pouches?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-muted-foreground">
                    <p>1. Place the pouch between your gum and upper lip</p>
                    <p>2. Leave it there for 20-30 minutes</p>
                    <p>3. Dispose of the pouch responsibly</p>
                    <p className="text-sm mt-4 text-destructive">
                      Warning: This product contains nicotine. Nicotine is an addictive substance.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Frequently Bought Together */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Frequently bought together</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => {
                const relatedCurrency = getCurrencyByCode((relatedProduct as any).currency_code || 'EUR');
                const relatedCurrencySymbol = relatedCurrency?.symbol || '€';
                
                return (
                <Card 
                  key={relatedProduct.id}
                  className="group cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/product/${relatedProduct.slug}`)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <img 
                          src={relatedProduct.images[0]} 
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <span className="text-4xl">📦</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{relatedProduct.name}</h3>
                    <p className="font-bold text-primary">{relatedCurrencySymbol}{relatedProduct.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Image Zoom Dialog */}
      {/* Image Zoom Dialog */}
      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-4xl w-full">
          <img 
            src={mainImage} 
            alt={product.name}
            className="w-full h-auto"
          />
        </DialogContent>
      </Dialog>

      {/* Cart Modal */}
      <CartModal 
        isVisible={showCart}
        cart={cart}
        onClose={() => setShowCart(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;
