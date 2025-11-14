
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
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const { toast } = useToast();

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });

    toast({
      title: "✨ Produit ajouté !",
      description: `${product.name} est maintenant dans votre panier`,
      duration: 3000,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCart(prev => {
        const newCart = prev.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre panier",
      });
    } else {
      setCart(prev => {
        const newCart = prev.map(item => 
          item.id === id ? { ...item, quantity } : item
        );
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  const removeItem = (id: number) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
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
