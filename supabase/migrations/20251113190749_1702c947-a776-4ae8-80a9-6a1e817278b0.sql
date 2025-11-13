-- Add currency_code column to products table
ALTER TABLE public.products ADD COLUMN currency_code text DEFAULT 'EUR';

-- Add foreign key constraint (optional but recommended)
ALTER TABLE public.products 
ADD CONSTRAINT fk_products_currency 
FOREIGN KEY (currency_code) 
REFERENCES public.currencies(code) 
ON DELETE SET NULL;