-- Create currencies table
CREATE TABLE public.currencies (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  symbol text NOT NULL,
  name text NOT NULL,
  exchange_rate numeric NOT NULL DEFAULT 1,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.currencies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Currencies are viewable by everyone"
ON public.currencies
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert currencies"
ON public.currencies
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update currencies"
ON public.currencies
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete currencies"
ON public.currencies
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_currencies_updated_at
BEFORE UPDATE ON public.currencies
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert default currencies
INSERT INTO public.currencies (code, symbol, name, exchange_rate, is_default) VALUES
('EUR', '€', 'Euro', 1, true),
('USD', '$', 'Dollar américain', 1.10, false),
('GBP', '£', 'Livre sterling', 0.85, false),
('CHF', 'CHF', 'Franc suisse', 0.95, false);