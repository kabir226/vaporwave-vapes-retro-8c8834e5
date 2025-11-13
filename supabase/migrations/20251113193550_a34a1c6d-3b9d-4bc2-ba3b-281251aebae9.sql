-- Create homepage_settings table for managing homepage content
CREATE TABLE IF NOT EXISTS public.homepage_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  button_text TEXT,
  button_link TEXT,
  settings JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.homepage_settings ENABLE ROW LEVEL SECURITY;

-- Public can view active homepage settings
CREATE POLICY "Homepage settings are viewable by everyone"
  ON public.homepage_settings
  FOR SELECT
  USING (is_active = true);

-- Admins can manage homepage settings
CREATE POLICY "Admins can insert homepage settings"
  ON public.homepage_settings
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update homepage settings"
  ON public.homepage_settings
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete homepage settings"
  ON public.homepage_settings
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_homepage_settings_updated_at
  BEFORE UPDATE ON public.homepage_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert default homepage sections
INSERT INTO public.homepage_settings (section_name, title, subtitle, description, display_order) VALUES
  ('hero', 'No Smoke, No Odour, No Limits', NULL, 'Profitez de la satisfaction de la nicotine sans les effets nocifs du tabagisme.', 1),
  ('why_switch', 'Why make the switch from smoking products?', NULL, 'Switching to nicotine pouches isn''t just a change. It''s a commitment to a healthier, safer lifestyle, that yours lungs will appreciate!', 2),
  ('benefits', 'The benefits of nicotine pouches over smoking', NULL, NULL, 3)
ON CONFLICT (section_name) DO NOTHING;