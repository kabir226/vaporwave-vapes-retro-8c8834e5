import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface Currency {
  id: string;
  code: string;
  symbol: string;
  name: string;
  exchange_rate: number;
  is_default: boolean;
}

interface CurrencyDialogProps {
  open: boolean;
  currency: Currency | null;
  onClose: (refresh: boolean) => void;
}

const CurrencyDialog = ({ open, currency, onClose }: CurrencyDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    symbol: "",
    name: "",
    exchange_rate: 1,
    is_default: false,
  });

  useEffect(() => {
    if (currency) {
      setFormData({
        code: currency.code,
        symbol: currency.symbol,
        name: currency.name,
        exchange_rate: Number(currency.exchange_rate),
        is_default: currency.is_default,
      });
    } else {
      setFormData({
        code: "",
        symbol: "",
        name: "",
        exchange_rate: 1,
        is_default: false,
      });
    }
  }, [currency]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Si is_default est true, retirer le flag des autres devises
      if (formData.is_default) {
        await supabase
          .from("currencies")
          .update({ is_default: false })
          .neq("id", currency?.id || "");
      }

      if (currency) {
        const { error } = await supabase
          .from("currencies")
          .update(formData)
          .eq("id", currency.id);

        if (error) throw error;

        toast({
          title: "Devise mise à jour",
          description: "La devise a été mise à jour avec succès.",
        });
      } else {
        const { error } = await supabase
          .from("currencies")
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "Devise ajoutée",
          description: "La devise a été ajoutée avec succès.",
        });
      }

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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currency ? "Modifier la devise" : "Ajouter une devise"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Code (ISO)</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="EUR, USD, GBP..."
              maxLength={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="symbol">Symbole</Label>
            <Input
              id="symbol"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              placeholder="€, $, £..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Euro, Dollar américain..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exchange_rate">Taux de change</Label>
            <Input
              id="exchange_rate"
              type="number"
              step="0.01"
              min="0.01"
              value={formData.exchange_rate}
              onChange={(e) => setFormData({ ...formData, exchange_rate: parseFloat(e.target.value) })}
              required
            />
            <p className="text-xs text-muted-foreground">
              Taux par rapport à la devise par défaut (ex: 1.10 = 1 EUR = 1.10 de cette devise)
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_default"
              checked={formData.is_default}
              onCheckedChange={(checked) => setFormData({ ...formData, is_default: checked })}
            />
            <Label htmlFor="is_default">Devise par défaut</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onClose(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {currency ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CurrencyDialog;
