-- Add detailed product information fields
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS specifications text,
ADD COLUMN IF NOT EXISTS ingredients text,
ADD COLUMN IF NOT EXISTS usage_instructions text;