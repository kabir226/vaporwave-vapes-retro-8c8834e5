
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug?: string;
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
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const { toast } = useToast();

  const addToCart = useCallback((product: any) => {
    // Stock verification
    if (product.in_stock === false) {
      toast({
        title: "Rupture de stock",
        description: `${product.name} n'est plus disponible`,
        variant: "destructive",
      });
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      let newCart;
      
      if (existing) {
        newCart = prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Store image and slug for cart display
        const cartItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images?.[0] || product.icon,
          slug: product.slug,
          category: product.category?.name || product.category,
          inStock: product.in_stock,
        };
        newCart = [...prev, cartItem];
      }
      
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });

    toast({
      title: "Ajouté au panier",
      description: product.name,
      duration: 2000,
    });
  }, [toast]);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity === 0) {
      setCart(prev => {
        const newCart = prev.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre panier",
        duration: 2000,
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
  }, [toast]);

  const removeItem = useCallback((id: number) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier",
      duration: 2000,
    });
  }, [toast]);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('cart');
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    cartTotal,
    cartCount,
  };
};
