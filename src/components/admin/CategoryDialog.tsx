import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Category } from "./CategoryList";
import { categorySchema } from "@/lib/validations/product";

interface CategoryDialogProps {
  open: boolean;
  category: Category | null;
  onClose: (refresh: boolean) => void;
}

const CategoryDialog = ({ open, category, onClose }: CategoryDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    display_order: "0",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        slug: category.slug,
        display_order: category.display_order.toString(),
      });
    } else {
      setFormData({
        name: "",
        description: "",
        slug: "",
        display_order: "0",
      });
    }
  }, [category]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = formData.slug || generateSlug(formData.name);
      
      // Validate input data
      const validatedData = categorySchema.parse({
        name: formData.name,
        description: formData.description || undefined,
        slug,
        display_order: parseInt(formData.display_order) || 0,
      });
      
      const dataToSave = {
        name: validatedData.name,
        slug: validatedData.slug,
        description: validatedData.description || null,
        display_order: validatedData.display_order || 0,
      };

      if (category) {
        const { error } = await supabase
          .from("categories")
          .update(dataToSave)
          .eq("id", category.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("categories").insert([dataToSave]);
        if (error) throw error;
      }

      toast({
        title: "Succès",
        description: `Catégorie ${category ? "modifiée" : "créée"} avec succès`,
      });
      onClose(true);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Modifier" : "Ajouter"} une catégorie</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de la catégorie *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="Généré automatiquement si vide"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order">Ordre d'affichage</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onClose(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {category ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
