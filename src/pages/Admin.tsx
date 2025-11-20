import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut } from "lucide-react";
import ProductList from "@/components/admin/ProductList";
import CategoryList from "@/components/admin/CategoryList";
import CurrencyList from "@/components/admin/CurrencyList";
import HomepageSettingsList from "@/components/admin/HomepageSettingsList";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      // Check for expired or missing session
      if (sessionError || !session || (session.expires_at && session.expires_at * 1000 <= Date.now())) {
        // Clear expired session
        await supabase.auth.signOut();
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (roleError || !roleData) {
        console.error("Role check error:", roleError);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Auth check error:", error);
      await supabase.auth.signOut();
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-destructive">Accès refusé</h1>
            <p className="text-muted-foreground">
              Vous n'avez pas les permissions d'administrateur.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button onClick={handleSignOut} variant="default" size="lg">
              <LogOut className="mr-2 h-4 w-4" />
              Se déconnecter et changer de compte
            </Button>
            <Button onClick={() => navigate("/")} variant="outline">
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="currencies">Devises</TabsTrigger>
            <TabsTrigger value="homepage">Page d'accueil</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="benefits-comparison">Benefits Comparison</TabsTrigger>
            <TabsTrigger value="why-switch">Why Switch</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <ProductList />
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <CategoryList />
          </TabsContent>

          <TabsContent value="currencies" className="mt-6">
            <CurrencyList />
          </TabsContent>

          <TabsContent value="homepage" className="mt-6">
            <HomepageSettingsList />
          </TabsContent>

          <TabsContent value="benefits" className="mt-6">
            <HomepageSettingsList sectionPrefix="benefits" />
          </TabsContent>

          <TabsContent value="benefits-comparison" className="mt-6">
            <HomepageSettingsList sectionPrefix="benefits_comparison" />
          </TabsContent>

          <TabsContent value="why-switch" className="mt-6">
            <HomepageSettingsList sectionPrefix="why_switch" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
