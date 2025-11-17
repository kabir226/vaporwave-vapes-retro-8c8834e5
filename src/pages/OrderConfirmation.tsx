import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { trackPurchase } from "@/lib/metaPixel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tracked, setTracked] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const orderId = searchParams.get("orderId");
  const total = searchParams.get("total");
  const email = searchParams.get("email");

  useEffect(() => {
    // Track Purchase event once
    if (!tracked && orderId && total) {
      trackPurchase({
        value: parseFloat(total),
        currency: "EUR",
        orderId: orderId,
        email: email || undefined,
      });
      setTracked(true);
    }
  }, [tracked, orderId, total, email]);

  if (!orderId || !total) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground mb-4">Commande introuvable</p>
          <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cart={[]} onToggleCart={() => setCartVisible(!cartVisible)} />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Commande confirmée !
            </h1>
            <p className="text-muted-foreground text-lg">
              Merci pour votre commande. Vous recevrez un email de confirmation sous peu.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Numéro de commande :</span>
                <span className="font-semibold text-foreground">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant total :</span>
                <span className="font-semibold text-foreground">{parseFloat(total).toFixed(2)} €</span>
              </div>
              {email && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email :</span>
                  <span className="font-semibold text-foreground">{email}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Nous préparons votre commande avec soin. Vous recevrez une notification
              dès qu'elle sera expédiée.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/shop")} variant="outline">
                Continuer mes achats
              </Button>
              <Button onClick={() => navigate("/")}>
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
