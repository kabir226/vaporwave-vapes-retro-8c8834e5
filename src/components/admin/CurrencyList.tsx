import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CurrencyDialog from "./CurrencyDialog";
import CurrencyTable from "./CurrencyTable";

interface Currency {
  id: string;
  code: string;
  symbol: string;
  name: string;
  exchange_rate: number;
  is_default: boolean;
}

const CurrencyList = () => {
  const { toast } = useToast();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const { data, error } = await supabase
        .from("currencies")
        .select("*")
        .order("is_default", { ascending: false })
        .order("code");

      if (error) throw error;
      setCurrencies(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les devises.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (currency: Currency) => {
    setSelectedCurrency(currency);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette devise ?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("currencies")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Devise supprimée",
        description: "La devise a été supprimée avec succès.",
      });
      fetchCurrencies();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCloseDialog = (refresh: boolean) => {
    setDialogOpen(false);
    setSelectedCurrency(null);
    if (refresh) {
      fetchCurrencies();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des devises</h2>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une devise
        </Button>
      </div>

      <CurrencyTable
        currencies={currencies}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CurrencyDialog
        open={dialogOpen}
        currency={selectedCurrency}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default CurrencyList;
