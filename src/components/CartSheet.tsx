
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import OptimizedImage from '@/components/ui/optimized-image';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug?: string;
}

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const FREE_SHIPPING_THRESHOLD = 50000;

const CartSheet: React.FC<CartSheetProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const navigate = useNavigate();
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 2000;
  const total = subtotal + shippingCost;
  const progressToFreeShipping = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleWhatsAppOrder = () => {
    const itemsList = cart.map(item => 
      `• ${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} FCFA`
    ).join('\n');

    const message = `🛒 *Nouvelle commande Snuspedia*\n\n${itemsList}\n\n📦 Sous-total: ${subtotal.toLocaleString()} FCFA\n🚚 Livraison: ${shippingCost === 0 ? 'GRATUITE' : `${shippingCost.toLocaleString()} FCFA`}\n💰 *Total: ${total.toLocaleString()} FCFA*`;

    window.open(`whatsapp://send?phone=22670000000&text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleProductClick = (slug?: string) => {
    if (slug) {
      navigate(`/product/${slug}`);
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <ShoppingBag className="w-5 h-5" />
            Mon Panier ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">Votre panier est vide</p>
            <p className="text-sm text-muted-foreground mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
            <Button onClick={() => { navigate('/shop'); onClose(); }} className="rounded-full">
              Voir les produits
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <>
            {/* Progress to free shipping */}
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <div className="px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">
                    Plus que <span className="font-semibold text-primary">{amountToFreeShipping.toLocaleString()} FCFA</span> pour la livraison gratuite
                  </span>
                  <span className="text-primary font-medium">{Math.round(progressToFreeShipping)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}

            {subtotal >= FREE_SHIPPING_THRESHOLD && (
              <div className="px-4 py-3 bg-green-500/10 border-b border-green-500/20">
                <p className="text-sm text-green-600 font-medium text-center">
                  🎉 Livraison gratuite débloquée !
                </p>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-secondary/30 rounded-xl">
                  {/* Product Image */}
                  <button 
                    onClick={() => handleProductClick(item.slug)}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0 hover:opacity-80 transition-opacity"
                  >
                    {item.image ? (
                      <OptimizedImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        📦
                      </div>
                    )}
                  </button>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <button 
                      onClick={() => handleProductClick(item.slug)}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left truncate block w-full"
                    >
                      {item.name}
                    </button>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.price.toLocaleString()} FCFA / unité
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {(item.price * item.quantity).toLocaleString()} FCFA
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-border p-4 space-y-4 bg-card">
              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="text-foreground">{subtotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-medium" : "text-foreground"}>
                    {shippingCost === 0 ? 'GRATUITE' : `${shippingCost.toLocaleString()} FCFA`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">{total.toLocaleString()} FCFA</span>
                </div>
              </div>

              {/* Order Button */}
              <Button
                onClick={handleWhatsAppOrder}
                className="w-full h-12 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Commander sur WhatsApp
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Paiement à la livraison disponible
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
