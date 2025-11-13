import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Currency {
  id: string;
  code: string;
  symbol: string;
  name: string;
  exchange_rate: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [defaultCurrency, setDefaultCurrency] = useState<Currency | null>(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('currencies')
        .select('*')
        .order('is_default', { ascending: false });

      if (error) throw error;
      
      const currencyData = (data || []) as Currency[];
      setCurrencies(currencyData);
      
      const defaultCurr = currencyData.find(c => c.is_default);
      setDefaultCurrency(defaultCurr || null);
    } catch (err: any) {
      console.error('Error fetching currencies:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrencyByCode = (code: string): Currency | undefined => {
    return currencies.find(c => c.code === code);
  };

  return { 
    currencies, 
    loading, 
    defaultCurrency, 
    getCurrencyByCode,
    refetch: fetchCurrencies 
  };
};
