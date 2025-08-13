
import React from 'react';
import CartSummary from '@/components/CartSummary';

interface CartModalProps {
  isVisible: boolean;
  cart: any[];
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ 
  isVisible, 
  cart, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 bg-background border rounded-full w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
        >
          ✕
        </button>
        <CartSummary 
          cart={cart} 
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
        />
      </div>
    </div>
  );
};

export default CartModal;
