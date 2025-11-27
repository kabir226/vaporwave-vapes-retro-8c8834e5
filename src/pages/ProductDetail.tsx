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
import { trackPurchase } from "@/lib/metaPixel";

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
  specifications?: string | null;
  ingredients?: string | null;
  usage_instructions?: string | null;
  pricing_tiers?: Array<{ quantity: number; price: number; label?: string }> | null;
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
  const [selectedTierIndex, setSelectedTierIndex] = useState<number | null>(null);

  // Currency info - moved here to use in handleBuyNow
  const currency = getCurrencyByCode((product as any)?.currency_code || 'EUR');
  const currencySymbol = currency?.symbol || '€';
  const currencyCode = currency?.code || 'EUR';

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
      
      // Cast pricing_tiers to the correct type
      const typedProduct: Product = {
        ...productData,
        pricing_tiers: productData.pricing_tiers as Array<{ quantity: number; price: number; label?: string }> | null,
      };
      
      setProduct(typedProduct);

      // Fetch related products from same category
      if (productData.category_id) {
        const { data: relatedData } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', productData.category_id)
          .neq('id', productData.id)
          .limit(4);
        
        if (relatedData) {
          const typedRelatedProducts: Product[] = relatedData.map(p => ({
            ...p,
            pricing_tiers: p.pricing_tiers as Array<{ quantity: number; price: number; label?: string }> | null,
          }));
          setRelatedProducts(typedRelatedProducts);
        }
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

  const handleBuyNow = () => {
    if (!product) return;
    
    // Vérification du stock
    if (!product.in_stock) {
      toast.error("Rupture de stock", {
        description: "Ce produit est momentanément indisponible. Réessayez plus tard !",
      });
      return;
    }
    
    // Calculer le prix basé sur le palier sélectionné ou le prix par défaut
    let finalPrice = product.price * quantity;
    let finalQuantity = quantity;
    
    if (selectedTierIndex !== null && product.pricing_tiers && product.pricing_tiers[selectedTierIndex]) {
      const tier = product.pricing_tiers[selectedTierIndex];
      finalPrice = tier.price;
      finalQuantity = tier.quantity;
    }
    
    // 1. Création ID unique
    const eventId = `wa-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // 2. Envoi Tracking (Pixel + Serveur)
    trackPurchase({
      value: finalPrice,
      currency: currencyCode || 'XOF',
      orderId: eventId
    });

    // 3. Ouverture WhatsApp
    const message = `Bonjour, je suis intéressé par ${product.name} en quantité de ${finalQuantity} au prix de ${currencySymbol}${finalPrice.toFixed(2)}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `whatsapp://send?phone=22605145905&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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

  return (
    <div className="min-h-screen bg-background">
      <Header cart={cart} onToggleCart={() => setShowCart(!showCart)} />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Product Main Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div
              className="relative bg-muted rounded-lg overflow-hidden group cursor-pointer flex items-center justify-center h-[420px]"
              onClick={() => setZoomOpen(true)}
            >
              <img
                src={mainImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
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
                    className={`bg-muted rounded-lg overflow-hidden cursor-pointer border-2 transition-all flex items-center justify-center h-24 ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-muted-foreground/20'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
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
                Frais de livraison calculés lors du paiement.
              </p>
            </div>

            {/* Quantity Selector */}
            {product.pricing_tiers && product.pricing_tiers.length > 0 ? (
              <div className="space-y-3">
                <label className="text-sm font-medium">Sélectionnez une quantité</label>
                <div className="space-y-2">
                  {product.pricing_tiers.map((tier, index) => {
                    const unitPrice = tier.price / tier.quantity;
                    const isSelected = selectedTierIndex === index;
                    
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedTierIndex(index);
                          setQuantity(tier.quantity);
                        }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected ? 'border-primary' : 'border-border'
                              }`}
                            >
                              {isSelected && (
                                <div className="w-3 h-3 rounded-full bg-primary" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">
                                {tier.quantity} {tier.quantity === 1 ? 'unité' : 'unités'}
                                {tier.label && (
                                  <span className="ml-2 text-sm text-muted-foreground">
                                    {tier.label}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {currencySymbol}{unitPrice.toFixed(2)}/unité
                              </div>
                            </div>
                          </div>
                          <div className="text-xl font-bold text-primary">
                            {currencySymbol}{tier.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantité ({quantity} au panier)</label>
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
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full rounded-full"
                size="lg"
                variant="outline"
                onClick={handleAddToCart}
                disabled={!product.in_stock}
              >
                Ajouter au panier
              </Button>
              <Button 
                className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
                size="lg"
                onClick={handleBuyNow}
                variant={product.in_stock ? undefined : "secondary"}
              >
                {product.in_stock ? "Acheter maintenant" : "RUPTURE DE STOCK"}
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
                    {product.description || "Aucune description disponible."}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="specifications">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✅</span>
                    <span>Spécifications</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {product.specifications ? (
                    <div className="text-muted-foreground whitespace-pre-line">
                      {product.specifications}
                    </div>
                  ) : (
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Force : {product.strength || 'Standard'}</li>
                      <li>• Stock : {product.stock} unités disponibles</li>
                      <li>• Note : {product.rating ? `${product.rating}/5` : 'Non noté'}</li>
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ingredients">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌿</span>
                    <span>Ingrédients</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {product.ingredients ? (
                    <div className="text-muted-foreground whitespace-pre-line">
                      {product.ingredients}
                    </div>
                  ) : product.features && product.features.length > 0 ? (
                    <ul className="space-y-2 text-muted-foreground">
                      {product.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Aucune information sur les ingrédients disponible.</p>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how-to-use">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">❓</span>
                    <span>Comment utiliser les sachets de nicotine ?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {product.usage_instructions ? (
                    <div className="text-muted-foreground whitespace-pre-line">
                      {product.usage_instructions}
                    </div>
                  ) : (
                    <div className="space-y-2 text-muted-foreground">
                      <p>1. Placez le sachet entre votre gencive et votre lèvre supérieure</p>
                      <p>2. Laissez-le là pendant 20-30 minutes</p>
                      <p>3. Jetez le sachet de manière responsable</p>
                      <p className="text-sm mt-4 text-destructive">
                        Attention : Ce produit contient de la nicotine. La nicotine est une substance addictive.
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Frequently Bought Together */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Fréquemment achetés ensemble</h2>
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
                    <div className="bg-muted rounded-lg mb-3 overflow-hidden flex items-center justify-center h-32">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <img 
                          src={relatedProduct.images[0]} 
                          alt={relatedProduct.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
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
