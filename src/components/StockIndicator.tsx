
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Check } from 'lucide-react';

interface StockIndicatorProps {
  stock: number;
  showText?: boolean;
}

const StockIndicator: React.FC<StockIndicatorProps> = ({ stock, showText = true }) => {
  const getStockStatus = () => {
    if (stock === 0) return { status: 'out', color: 'destructive', text: 'Rupture de stock' };
    if (stock <= 5) return { status: 'low', color: 'secondary', text: `Plus que ${stock} en stock` };
    return { status: 'available', color: 'default', text: 'En stock' };
  };

  const { status, color, text } = getStockStatus();

  if (!showText) {
    return (
      <div className={`w-3 h-3 rounded-full ${
        status === 'out' ? 'bg-destructive' : 
        status === 'low' ? 'bg-secondary' : 'bg-green-500'
      }`} />
    );
  }

  return (
    <Badge variant={color as any} className="text-xs">
      {status === 'out' ? (
        <AlertTriangle className="w-3 h-3 mr-1" />
      ) : (
        <Check className="w-3 h-3 mr-1" />
      )}
      {text}
    </Badge>
  );
};

export default StockIndicator;
