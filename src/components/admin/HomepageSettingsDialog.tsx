import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

interface HomepageSetting {
  id?: string;
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
  settings?: any;
}

interface HomepageSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  setting: HomepageSetting | null;
  onSave: () => void;
}

const HomepageSettingsDialog: React.FC<HomepageSettingsDialogProps> = ({
  isOpen,
  onClose,
  setting,
  onSave
}) => {
  const [formData, setFormData] = useState<HomepageSetting>({
    section_name: '',
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    video_url: '',
    button_text: '',
    button_link: '',
    is_active: true,
    display_order: 0
  });
  
  const [stepImages, setStepImages] = useState<string[]>([]);

  useEffect(() => {
    if (setting) {
      setFormData({
        ...setting,
        title: setting.title || '',
        subtitle: setting.subtitle || '',
        description: setting.description || '',
        image_url: setting.image_url || '',
        video_url: setting.video_url || '',
        button_text: setting.button_text || '',
        button_link: setting.button_link || ''
      });
      
      // Load step images if section is how_to_use
      if (setting.section_name === 'how_to_use' && setting.settings) {
        const settingsData = setting.settings as any;
        setStepImages(settingsData.step_images || []);
      }
    } else {
      setFormData({
        section_name: '',
        title: '',
        subtitle: '',
        description: '',
        image_url: '',
        video_url: '',
        button_text: '',
        button_link: '',
        is_active: true,
        display_order: 0
      });
      setStepImages([]);
    }
  }, [setting, isOpen]);

  const handleSave = async () => {
    try {
      // Prepare settings data
      let settingsData = {};
      if (formData.section_name === 'how_to_use' && stepImages.length > 0) {
        settingsData = { step_images: stepImages };
      }
      
      const dataToSave = {
        section_name: formData.section_name,
        title: formData.title || null,
        subtitle: formData.subtitle || null,
        description: formData.description || null,
        image_url: formData.image_url || null,
        video_url: formData.video_url || null,
        button_text: formData.button_text || null,
        button_link: formData.button_link || null,
        is_active: formData.is_active,
        display_order: formData.display_order,
        settings: Object.keys(settingsData).length > 0 ? settingsData : null
      };

      if (setting?.id) {
        const { error } = await (supabase as any)
          .from('homepage_settings')
          .update(dataToSave)
          .eq('id', setting.id);

        if (error) throw error;
        toast.success('Paramètres mis à jour avec succès');
      } else {
        const { error } = await (supabase as any)
          .from('homepage_settings')
          .insert([dataToSave]);

        if (error) throw error;
        toast.success('Paramètres créés avec succès');
      }

      onSave();
      onClose();
    } catch (error: any) {
      console.error('Error saving homepage settings:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {setting ? 'Modifier la section' : 'Nouvelle section'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="section_name">Nom de la section *</Label>
            <Input
              id="section_name"
              value={formData.section_name}
              onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
              placeholder="hero, why_switch, benefits..."
              disabled={!!setting}
            />
          </div>

          <div>
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Sous-titre</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label>Image de fond</Label>
            <ImageUpload
              images={formData.image_url ? [formData.image_url] : []}
              onImagesChange={(images) => setFormData({ ...formData, image_url: images[0] || '' })}
              productId="homepage"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Une seule image sera utilisée comme fond de la section
            </p>
          </div>

          {formData.section_name === 'how_to_use' && (
            <div>
              <Label>Images des étapes (4 max)</Label>
              <ImageUpload
                images={stepImages}
                onImagesChange={setStepImages}
                productId="homepage/steps"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Uploadez jusqu'à 4 images pour illustrer chaque étape d'utilisation
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="video_url">URL de la vidéo (optionnel)</Label>
            <Input
              id="video_url"
              value={formData.video_url}
              onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              placeholder="https://youtube.com/... ou URL Supabase Storage"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Vous pouvez héberger des vidéos dans Supabase Storage ou utiliser YouTube/Vimeo
            </p>
          </div>

          <div>
            <Label htmlFor="button_text">Texte du bouton</Label>
            <Input
              id="button_text"
              value={formData.button_text}
              onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="button_link">Lien du bouton</Label>
            <Input
              id="button_link"
              value={formData.button_link}
              onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
              placeholder="/shop, #products, https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="display_order">Ordre d'affichage</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Actif</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              Enregistrer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HomepageSettingsDialog;
