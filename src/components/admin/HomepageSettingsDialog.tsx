import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';
import { useCategories } from '@/hooks/useCategories';

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
  const [testimonials, setTestimonials] = useState<Array<{ image_url: string; text: string; author: string }>>([
    { image_url: '', text: '', author: '' },
    { image_url: '', text: '', author: '' },
    { image_url: '', text: '', author: '' }
  ]);
  const [products, setProducts] = useState<Array<{ image_url: string; name: string; price: string }>>([
    { image_url: '', name: '', price: '' },
    { image_url: '', name: '', price: '' },
    { image_url: '', name: '', price: '' }
  ]);
  const [categories, setCategories] = useState<Array<{ 
    image_url: string; 
    name: string; 
    description: string; 
    link: string;
    link_type?: 'custom' | 'category';
    category_id?: string;
  }>>([
    { image_url: '', name: '', description: '', link: '', link_type: 'custom' },
    { image_url: '', name: '', description: '', link: '', link_type: 'custom' },
    { image_url: '', name: '', description: '', link: '', link_type: 'custom' }
  ]);
  
  const [heroSlides, setHeroSlides] = useState<Array<{
    image_url: string;
    buttons: Array<{ text: string; link: string; color: string }>;
  }>>([
    { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
    { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
    { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
    { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
    { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] }
  ]);
  
  const { categories: dbCategories } = useCategories();

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
      
      // Load testimonials if section is customer_change
      if (setting.section_name === 'customer_change' && setting.settings) {
        const settingsData = setting.settings as any;
        setTestimonials(settingsData.testimonials || [
          { image_url: '', text: '', author: '' },
          { image_url: '', text: '', author: '' },
          { image_url: '', text: '', author: '' }
        ]);
      }
      
      // Load products if section is new_in_stock
      if (setting.section_name === 'new_in_stock' && setting.settings) {
        const settingsData = setting.settings as any;
        setProducts(settingsData.products || [
          { image_url: '', name: '', price: '' },
          { image_url: '', name: '', price: '' },
          { image_url: '', name: '', price: '' }
        ]);
      }
      
      // Load categories if section is categories
      if (setting.section_name === 'categories' && setting.settings) {
        const settingsData = setting.settings as any;
        setCategories(settingsData.categories || [
          { image_url: '', name: '', description: '', link: '' },
          { image_url: '', name: '', description: '', link: '' },
          { image_url: '', name: '', description: '', link: '' }
        ]);
      }
      
      // Load hero slides if section is hero
      if (setting.section_name === 'hero' && setting.settings) {
        const settingsData = setting.settings as any;
        setHeroSlides(settingsData.slides || [
          { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
          { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
          { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
          { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
          { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] }
        ]);
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
      setTestimonials([
        { image_url: '', text: '', author: '' },
        { image_url: '', text: '', author: '' },
        { image_url: '', text: '', author: '' }
      ]);
      setProducts([
        { image_url: '', name: '', price: '' },
        { image_url: '', name: '', price: '' },
        { image_url: '', name: '', price: '' }
      ]);
      setCategories([
        { image_url: '', name: '', description: '', link: '' },
        { image_url: '', name: '', description: '', link: '' },
        { image_url: '', name: '', description: '', link: '' }
      ]);
      setHeroSlides([
        { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
        { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
        { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
        { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] },
        { image_url: '', buttons: [{ text: '', link: '', color: '#DC2626' }] }
      ]);
    }
  }, [setting, isOpen]);

  const handleSave = async () => {
    try {
      // Prepare settings data
      let settingsData = {};
      if (formData.section_name === 'how_to_use' && stepImages.length > 0) {
        settingsData = { step_images: stepImages };
      }
      if (formData.section_name === 'customer_change') {
        settingsData = { testimonials };
      }
      if (formData.section_name === 'new_in_stock') {
        settingsData = { products };
      }
      if (formData.section_name === 'categories') {
        settingsData = { categories };
      }
      if (formData.section_name === 'hero') {
        settingsData = { slides: heroSlides };
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

          {formData.section_name === 'customer_change' && (
            <div className="space-y-6 border rounded-lg p-4 bg-muted/30">
              <Label className="text-lg font-semibold">Témoignages clients (3)</Label>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="space-y-3 border rounded-lg p-4 bg-background">
                  <Label className="font-semibold">Témoignage {index + 1}</Label>
                  
                  <div>
                    <Label>Image du client</Label>
                    <ImageUpload
                      images={testimonial.image_url ? [testimonial.image_url] : []}
                      onImagesChange={(images) => {
                        const updated = [...testimonials];
                        updated[index].image_url = images[0] || '';
                        setTestimonials(updated);
                      }}
                      productId={`homepage/testimonial-${index}`}
                    />
                  </div>
                  
                  <div>
                    <Label>Texte du témoignage</Label>
                    <Textarea
                      value={testimonial.text}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[index].text = e.target.value;
                        setTestimonials(updated);
                      }}
                      rows={3}
                      placeholder="Le témoignage du client..."
                    />
                  </div>
                  
                  <div>
                    <Label>Nom du client</Label>
                    <Input
                      value={testimonial.author}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[index].author = e.target.value;
                        setTestimonials(updated);
                      }}
                      placeholder="Ex: Hussein F"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {formData.section_name === 'new_in_stock' && (
            <div className="space-y-6 border rounded-lg p-4 bg-muted/30">
              <Label className="text-lg font-semibold">Produits nouveaux en stock (3)</Label>
              {products.map((product, index) => (
                <div key={index} className="space-y-3 border rounded-lg p-4 bg-background">
                  <Label className="font-semibold">Produit {index + 1}</Label>
                  
                  <div>
                    <Label>Image du produit</Label>
                    <ImageUpload
                      images={product.image_url ? [product.image_url] : []}
                      onImagesChange={(images) => {
                        const updated = [...products];
                        updated[index].image_url = images[0] || '';
                        setProducts(updated);
                      }}
                      productId={`homepage/new-stock-${index}`}
                    />
                  </div>
                  
                  <div>
                    <Label>Nom du produit</Label>
                    <Input
                      value={product.name}
                      onChange={(e) => {
                        const updated = [...products];
                        updated[index].name = e.target.value;
                        setProducts(updated);
                      }}
                      placeholder="Ex: Pablo Blueberry Peach Ice - 50mg"
                    />
                  </div>
                  
                  <div>
                    <Label>Prix</Label>
                    <Input
                      value={product.price}
                      onChange={(e) => {
                        const updated = [...products];
                        updated[index].price = e.target.value;
                        setProducts(updated);
                      }}
                      placeholder="Ex: £4.99 GBP"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {formData.section_name === 'categories' && (
            <div className="space-y-6 border rounded-lg p-4 bg-muted/30">
              <Label className="text-lg font-semibold">Catégories (3)</Label>
              {categories.map((category, index) => (
                <div key={index} className="space-y-3 border rounded-lg p-4 bg-background">
                  <Label className="font-semibold">Catégorie {index + 1}</Label>
                  
                  <div>
                    <Label>Image de la catégorie</Label>
                    <ImageUpload
                      images={category.image_url ? [category.image_url] : []}
                      onImagesChange={(images) => {
                        const updated = [...categories];
                        updated[index].image_url = images[0] || '';
                        setCategories(updated);
                      }}
                      productId={`homepage/category-${index}`}
                    />
                  </div>
                  
                  <div>
                    <Label>Nom de la catégorie</Label>
                    <Input
                      value={category.name}
                      onChange={(e) => {
                        const updated = [...categories];
                        updated[index].name = e.target.value;
                        setCategories(updated);
                      }}
                      placeholder="Ex: SNUS Nicotine Forte"
                    />
                  </div>
                  
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={category.description}
                      onChange={(e) => {
                        const updated = [...categories];
                        updated[index].description = e.target.value;
                        setCategories(updated);
                      }}
                      rows={2}
                      placeholder="Ex: Pour une expérience intense"
                    />
                  </div>
                  
                  <div>
                    <Label>Type de lien</Label>
                    <Select
                      value={category.link_type || 'custom'}
                      onValueChange={(value: 'custom' | 'category') => {
                        const updated = [...categories];
                        updated[index].link_type = value;
                        if (value === 'category') {
                          updated[index].link = '';
                        }
                        setCategories(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">URL personnalisée</SelectItem>
                        <SelectItem value="category">Catégorie existante</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {category.link_type === 'custom' ? (
                    <div>
                      <Label>Lien personnalisé</Label>
                      <Input
                        value={category.link}
                        onChange={(e) => {
                          const updated = [...categories];
                          updated[index].link = e.target.value;
                          setCategories(updated);
                        }}
                        placeholder="Ex: /shop?category=forte ou https://..."
                      />
                    </div>
                  ) : (
                    <div>
                      <Label>Sélectionner une catégorie</Label>
                      <Select
                        value={category.category_id || ''}
                        onValueChange={(value) => {
                          const updated = [...categories];
                          updated[index].category_id = value;
                          const selectedCat = dbCategories.find(c => c.id === value);
                          if (selectedCat) {
                            updated[index].link = `/shop?category=${selectedCat.slug}`;
                          }
                          setCategories(updated);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {dbCategories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {formData.section_name === 'hero' && (
            <div className="space-y-6 border rounded-lg p-4 bg-muted/30">
              <Label className="text-lg font-semibold">Carrousel Hero (5 slides)</Label>
              {heroSlides.map((slide, slideIndex) => (
                <div key={slideIndex} className="space-y-4 border rounded-lg p-4 bg-background">
                  <Label className="font-semibold">Slide {slideIndex + 1}</Label>
                  
                  <div>
                    <Label>Image du slide</Label>
                    <ImageUpload
                      images={slide.image_url ? [slide.image_url] : []}
                      onImagesChange={(images) => {
                        const updated = [...heroSlides];
                        updated[slideIndex].image_url = images[0] || '';
                        setHeroSlides(updated);
                      }}
                      productId={`homepage/hero-slide-${slideIndex}`}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="font-semibold">Boutons</Label>
                    {slide.buttons.map((button, buttonIndex) => (
                      <div key={buttonIndex} className="space-y-2 border rounded-lg p-3 bg-muted/20">
                        <Label className="text-sm">Bouton {buttonIndex + 1}</Label>
                        
                        <div>
                          <Label className="text-xs">Texte du bouton</Label>
                          <Input
                            value={button.text}
                            onChange={(e) => {
                              const updated = [...heroSlides];
                              updated[slideIndex].buttons[buttonIndex].text = e.target.value;
                              setHeroSlides(updated);
                            }}
                            placeholder="Ex: Découvrir"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs">Lien</Label>
                          <Input
                            value={button.link}
                            onChange={(e) => {
                              const updated = [...heroSlides];
                              updated[slideIndex].buttons[buttonIndex].link = e.target.value;
                              setHeroSlides(updated);
                            }}
                            placeholder="Ex: /shop ou https://..."
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs">Couleur</Label>
                          <Input
                            type="color"
                            value={button.color}
                            onChange={(e) => {
                              const updated = [...heroSlides];
                              updated[slideIndex].buttons[buttonIndex].color = e.target.value;
                              setHeroSlides(updated);
                            }}
                          />
                        </div>
                        
                        {slide.buttons.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updated = [...heroSlides];
                              updated[slideIndex].buttons = updated[slideIndex].buttons.filter((_, i) => i !== buttonIndex);
                              setHeroSlides(updated);
                            }}
                          >
                            Supprimer ce bouton
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const updated = [...heroSlides];
                        updated[slideIndex].buttons.push({ text: '', link: '', color: '#DC2626' });
                        setHeroSlides(updated);
                      }}
                    >
                      + Ajouter un bouton
                    </Button>
                  </div>
                </div>
              ))}
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
