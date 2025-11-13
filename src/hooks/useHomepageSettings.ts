import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HomepageSetting {
  id: string;
  section_name: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  video_url?: string;
  button_text?: string;
  button_link?: string;
  is_active: boolean;
  display_order: number;
}

export const useHomepageSettings = (sectionName?: string) => {
  const [settings, setSettings] = useState<HomepageSetting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, [sectionName]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      let query = (supabase as any)
        .from('homepage_settings')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (sectionName) {
        query = query.eq('section_name', sectionName);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching homepage settings:', error);
        setSettings([]);
        return;
      }
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching homepage settings:', error);
      setSettings([]);
    } finally {
      setLoading(false);
    }
  };

  const getSetting = (name: string) => {
    return settings.find(s => s.section_name === name);
  };

  return { settings, loading, getSetting, refetch: fetchSettings };
};
