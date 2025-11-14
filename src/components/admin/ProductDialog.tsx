import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Product } from "./ProductList";
import ImageUpload from "./ImageUpload";

interface ProductDialogProps {
  open: boolean;
  product: Product | null;
  onClose: (refresh: boolean) => void;
}

const ProductDialog = ({ open, product, onClose }: ProductDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    strength: "",
    category_id: "",
    currency_code: "EUR",
    slug: "",
    images: [] as string[],
    specifications: "",
    ingredients: "",
    usage_instructions: "",
  });

  useEffect(() => {
    fetchCategories();
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price.toString(),
        stock: product.stock.toString(),
        strength: product.strength || "",
        category_id: product.category_id || "",
        currency_code: (product as any).currency_code || "EUR",
        slug: product.slug,
        images: product.images || [],
        specifications: (product as any).specifications || "",
        ingredients: (product as any).ingredients || "",
        usage_instructions: (product as any).usage_instructions || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        strength: "",
        category_id: "",
        currency_code: "EUR",
        slug: "",
        images: [],
        specifications: "",
        ingredients: "",
        usage_instructions: "",
      });
    }
  }, [product]);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
  };

  const fetchCurrencies = async () => {
    const { data } = await (supabase as any).from("currencies").select("*").order("is_default", { ascending: false });
    setCurrencies(data || []);
  };

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
      const dataToSave: any = {
        name: formData.name,
        description: formData.description || null,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        slug,
        in_stock: parseInt(formData.stock) > 0,
        strength: formData.strength || null,
        category_id: formData.category_id || null,
        currency_code: formData.currency_code,
        images: formData.images,
        specifications: formData.specifications || null,
        ingredients: formData.ingredients || null,
        usage_instructions: formData.usage_instructions || null,
      };

      if (product) {
        const { error } = await supabase
          .from("products")
          .update(dataToSave)
          .eq("id", product.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(dataToSave);
        if (error) throw error;
      }

      toast({
        title: "Succès",
        description: `Produit ${product ? "modifié" : "créé"} avec succès`,
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Modifier" : "Ajouter"} un produit</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du produit *</Label>
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
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specifications">Spécifications</Label>
            <Textarea
              id="specifications"
              value={formData.specifications}
              onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
              rows={4}
              placeholder="Ex: Strength: Strong, Weight: 20g, Nicotine: 8mg/pouch"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingrédients</Label>
            <Textarea
              id="ingredients"
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              rows={4}
              placeholder="Liste des ingrédients du produit"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="usage_instructions">Instructions d'utilisation</Label>
            <Textarea
              id="usage_instructions"
              value={formData.usage_instructions}
              onChange={(e) => setFormData({ ...formData, usage_instructions: e.target.value })}
              rows={4}
              placeholder="Comment utiliser ce produit"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Devise *</Label>
              <Select value={formData.currency_code} onValueChange={(value) => setFormData({ ...formData, currency_code: value })}>
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="strength">Force</Label>
              <Select value={formData.strength} onValueChange={(value) => setFormData({ ...formData, strength: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="strong">Strong</SelectItem>
                  <SelectItem value="extra_strong">Extra Strong</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
            <Label>Images du produit</Label>
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => setFormData({ ...formData, images })}
              productId={product?.id}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onClose(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {product ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
