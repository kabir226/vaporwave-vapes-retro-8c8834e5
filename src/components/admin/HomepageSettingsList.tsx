import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import HomepageSettingsDialog from './HomepageSettingsDialog';
import HomepageSettingsTable from './HomepageSettingsTable';

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

const HomepageSettingsList: React.FC = () => {
  const [settings, setSettings] = useState<HomepageSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<HomepageSetting | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('homepage_settings')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching homepage settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (setting: HomepageSetting) => {
    setSelectedSetting(setting);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedSetting(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette section ?')) return;

    try {
      const { error } = await (supabase as any)
        .from('homepage_settings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchSettings();
    } catch (error) {
      console.error('Error deleting homepage setting:', error);
    }
  };

  const handleReorder = async (reorderedSettings: HomepageSetting[]) => {
    try {
      setSettings(reorderedSettings);

      const updates = reorderedSettings.map((setting) => ({
        id: setting.id,
        display_order: setting.display_order,
      }));

      for (const update of updates) {
        const { error } = await (supabase as any)
          .from('homepage_settings')
          .update({ display_order: update.display_order })
          .eq('id', update.id);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error reordering homepage settings:', error);
      fetchSettings();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Paramètres de la page d'accueil</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle section
        </Button>
      </div>

      <HomepageSettingsTable
        settings={settings}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
      />

      <HomepageSettingsDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedSetting(null);
        }}
        setting={selectedSetting}
        onSave={fetchSettings}
      />
    </div>
  );
};

export default HomepageSettingsList;
