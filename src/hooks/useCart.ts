
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  icon?: string;
  category?: string;
  description?: string;
  features?: string[];
  stock?: number;
  rating?: number;
  isPopular?: boolean;
  inStock?: boolean;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

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

    toast({
      title: "✨ Produit ajouté !",
      description: `${product.name} est maintenant dans votre panier`,
      duration: 3000,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCart(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre panier",
      });
    } else {
      setCart(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier",
    });
  };

  return {
    cart,
    addToCart,
    updateQuantity,
    removeItem
  };
};
