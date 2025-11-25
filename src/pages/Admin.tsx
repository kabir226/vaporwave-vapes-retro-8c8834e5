import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, LayoutDashboard, Package, FolderTree, Home as HomeIcon, DollarSign, ExternalLink, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ProductList from "@/components/admin/ProductList";
import CategoryList from "@/components/admin/CategoryList";
import CurrencyList from "@/components/admin/CurrencyList";
import HomepageSettingsList from "@/components/admin/HomepageSettingsList";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useCurrencies } from "@/hooks/useCurrencies";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold">Dashboard Admin</h1>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel>VUE D'ENSEMBLE</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab('dashboard')}
                    isActive={activeTab === 'dashboard'}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>CATALOGUE</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab('products')}
                    isActive={activeTab === 'products'}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    <span>Produits</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab('categories')}
                    isActive={activeTab === 'categories'}
                  >
                    <FolderTree className="mr-2 h-4 w-4" />
                    <span>Catégories</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>CONTENU DU SITE</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab('homepage')}
                    isActive={activeTab === 'homepage'}
                  >
                    <HomeIcon className="mr-2 h-4 w-4" />
                    <span>Page d'accueil</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab('benefits')}
                    isActive={activeTab === 'benefits'}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    <span>Benefits</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab('benefits-comparison')}
                    isActive={activeTab === 'benefits-comparison'}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    <span>Benefits Comparison</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab('why-switch')}
                    isActive={activeTab === 'why-switch'}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    <span>Why Switch</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>CONFIGURATION</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab('currencies')}
                    isActive={activeTab === 'currencies'}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    <span>Devises</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate('/')}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>Retour au site</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h2 className="text-lg font-semibold">
                  {activeTab === 'dashboard' && 'Vue d\'ensemble'}
                  {activeTab === 'products' && 'Gestion des Produits'}
                  {activeTab === 'categories' && 'Gestion des Catégories'}
                  {activeTab === 'homepage' && 'Contenu de la Page d\'accueil'}
                  {activeTab === 'benefits' && 'Gestion des Benefits'}
                  {activeTab === 'benefits-comparison' && 'Gestion des Benefits Comparison'}
                  {activeTab === 'why-switch' && 'Gestion de Why Switch'}
                  {activeTab === 'currencies' && 'Gestion des Devises'}
                </h2>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </header>

          <div className="p-6">
            {activeTab === 'dashboard' && <DashboardView setActiveTab={setActiveTab} />}
            {activeTab === 'products' && <ProductList />}
            {activeTab === 'categories' && <CategoryList />}
            {activeTab === 'homepage' && <HomepageSettingsList />}
            {activeTab === 'benefits' && <HomepageSettingsList sectionPrefix="benefits" />}
            {activeTab === 'benefits-comparison' && <HomepageSettingsList sectionPrefix="benefits_comparison" />}
            {activeTab === 'why-switch' && <HomepageSettingsList sectionPrefix="why_switch" />}
            {activeTab === 'currencies' && <CurrencyList />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

// Dashboard Overview Component
const DashboardView = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const { currencies } = useCurrencies();

  const inStockProducts = products?.filter(p => p.in_stock && (p.stock || 0) > 0).length || 0;
  const totalProducts = products?.length || 0;
  const totalCategories = categories?.length || 0;
  const activeCurrencies = currencies?.length || 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits en Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStockProducts}</div>
            <p className="text-xs text-muted-foreground">sur {totalProducts} produits au total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Catégories Actives</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">catégories configurées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devises</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCurrencies}</div>
            <p className="text-xs text-muted-foreground">devises disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Produits</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">dans le catalogue</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button 
            className="h-auto flex-col items-start p-4" 
            variant="outline"
            onClick={() => setActiveTab('products')}
          >
            <Plus className="h-5 w-5 mb-2" />
            <span className="font-semibold">Ajouter un produit</span>
            <span className="text-xs text-muted-foreground">Créer un nouveau produit</span>
          </Button>
          <Button 
            className="h-auto flex-col items-start p-4" 
            variant="outline"
            onClick={() => setActiveTab('categories')}
          >
            <FolderTree className="h-5 w-5 mb-2" />
            <span className="font-semibold">Gérer les catégories</span>
            <span className="text-xs text-muted-foreground">Organiser le catalogue</span>
          </Button>
          <Button 
            className="h-auto flex-col items-start p-4" 
            variant="outline"
            onClick={() => setActiveTab('homepage')}
          >
            <HomeIcon className="h-5 w-5 mb-2" />
            <span className="font-semibold">Modifier la page d'accueil</span>
            <span className="text-xs text-muted-foreground">Personnaliser le contenu</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
