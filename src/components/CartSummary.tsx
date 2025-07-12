
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Truck, Shield } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cart, onUpdateQuantity, onRemoveItem }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const freeShipping = total >= 50;
  const shippingCost = freeShipping ? 0 : 4.99;
  const finalTotal = total + shippingCost;

  if (cart.length === 0) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center py-8">
          <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Votre panier est vide</p>
          <Button className="mt-4" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
            Découvrir nos produits
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Panier ({itemCount} article{itemCount > 1 ? 's' : ''})
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="w-6 h-6 p-0"
                >
                  -
                </Button>
                <span className="text-sm w-8 text-center">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 p-0"
                >
                  +
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-destructive hover:text-destructive text-xs"
                >
                  Supprimer
                </Button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{(item.price * item.quantity).toFixed(2)}€</p>
            </div>
          </div>
        ))}
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Sous-total</span>
            <span>{total.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3" />
              Livraison
            </span>
            <span>
              {freeShipping ? (
                <Badge variant="secondary" className="text-xs">GRATUITE</Badge>
              ) : (
                `${shippingCost.toFixed(2)}€`
              )}
            </span>
          </div>
          {!freeShipping && (
            <p className="text-xs text-muted-foreground">
              Livraison gratuite dès 50€ ({(50 - total).toFixed(2)}€ restants)
            </p>
          )}
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{finalTotal.toFixed(2)}€</span>
        </div>
        
        <div className="space-y-2">
          <Button className="w-full bg-primary hover:bg-primary/90">
            Commander maintenant
          </Button>
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Shield className="w-3 h-3" />
            Paiement sécurisé SSL
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
