-- Add pricing_tiers column to products table
ALTER TABLE products ADD COLUMN pricing_tiers JSONB DEFAULT NULL;

COMMENT ON COLUMN products.pricing_tiers IS 'Bulk pricing tiers: array of {quantity: number, price: number, label: string}';