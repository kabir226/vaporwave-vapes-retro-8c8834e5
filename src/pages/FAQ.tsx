import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { HelpCircle, Truck, Shield, CreditCard, Package } from 'lucide-react';

const FAQ = () => {
  const faqCategories = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Produits & Snus",
      questions: [
        {
          q: "Qu'est-ce que le snus et les sachets de nicotine ?",
          a: "Le snus et les sachets de nicotine sont des alternatives sans fumée au tabac traditionnel. Les sachets de nicotine ne contiennent pas de tabac, uniquement de la nicotine, des arômes et des fibres végétales. Ils se placent sous la lèvre supérieure et libèrent la nicotine progressivement."
        },
        {
          q: "Quelle est la différence entre snus et sachets de nicotine ?",
          a: "Le snus traditionnel contient du tabac moulu, tandis que les sachets de nicotine (comme Pablo, Velo, Zyn) ne contiennent pas de tabac. Les sachets de nicotine sont donc une option plus propre, sans taches sur les dents et sans odeur de tabac."
        },
        {
          q: "Comment choisir la force de nicotine adaptée ?",
          a: "Pour les débutants, nous recommandons de commencer avec des sachets de force légère (6-12mg). Les fumeurs réguliers peuvent opter pour une force moyenne (12-20mg). Les utilisateurs expérimentés peuvent choisir des forces plus élevées (20mg+). Notre catégorie 'Débutant' vous guidera."
        },
        {
          q: "Combien de temps dure l'effet d'un sachet ?",
          a: "Un sachet de nicotine libère son contenu pendant 20 à 60 minutes selon la marque et la force. Vous pouvez le garder sous la lèvre aussi longtemps que vous le souhaitez, jusqu'à ce que le goût s'estompe."
        },
        {
          q: "Les produits sont-ils légaux au Burkina Faso ?",
          a: "Oui, les sachets de nicotine sans tabac sont légaux au Burkina Faso. Cependant, ils sont strictement réservés aux personnes majeures (18 ans et plus) et déconseillés aux non-fumeurs."
        }
      ]
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Livraison à Ouagadougou",
      questions: [
        {
          q: "Livrez-vous à Ouagadougou et au Burkina Faso ?",
          a: "Oui ! Snuspedia livre dans tout Ouagadougou et les principales villes du Burkina Faso. La livraison à Ouaga est généralement effectuée le jour même ou sous 24h."
        },
        {
          q: "Quels sont les délais de livraison à Ouaga ?",
          a: "À Ouagadougou : livraison le jour même pour les commandes passées avant 14h, sinon sous 24h. Pour les autres villes du Burkina : 2-4 jours ouvrés selon la localité."
        },
        {
          q: "Combien coûte la livraison ?",
          a: "La livraison à Ouagadougou est offerte pour toute commande. Pour les autres villes, les frais varient selon la distance. Contactez-nous sur WhatsApp pour un devis précis."
        },
        {
          q: "Comment suivre ma commande ?",
          a: "Après votre commande via WhatsApp, vous recevrez des mises à jour en temps réel sur l'état de votre livraison directement sur WhatsApp."
        }
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Paiement & Commande",
      questions: [
        {
          q: "Comment passer commande ?",
          a: "C'est simple ! Choisissez vos produits sur notre site, puis cliquez sur 'Acheter sur WhatsApp'. Vous serez redirigé vers WhatsApp pour finaliser votre commande avec notre équipe."
        },
        {
          q: "Quels modes de paiement acceptez-vous ?",
          a: "Nous acceptons le paiement en espèces à la livraison, Orange Money, et les virements bancaires. Le paiement s'effectue après réception de votre commande à Ouagadougou."
        },
        {
          q: "Puis-je annuler ou modifier ma commande ?",
          a: "Oui, contactez-nous sur WhatsApp dès que possible. Tant que la commande n'est pas expédiée, nous pouvons la modifier ou l'annuler sans frais."
        }
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Santé & Sécurité",
      questions: [
        {
          q: "Les sachets de nicotine sont-ils plus sûrs que les cigarettes ?",
          a: "Les sachets de nicotine éliminent les risques liés à la combustion du tabac (goudron, monoxyde de carbone). Cependant, ils contiennent de la nicotine, une substance addictive. Ils sont destinés aux fumeurs adultes cherchant une alternative."
        },
        {
          q: "Y a-t-il des effets secondaires ?",
          a: "Les nouveaux utilisateurs peuvent ressentir des picotements dans la bouche, ce qui est normal. Un hoquet ou de légers vertiges peuvent survenir si la force est trop élevée. Dans ce cas, retirez le sachet et optez pour une force plus légère."
        },
        {
          q: "Peut-on avaler le sachet ou la salive ?",
          a: "Vous pouvez avaler votre salive normalement. Le sachet lui-même ne doit pas être avalé. Après utilisation, jetez-le dans une poubelle. Certains produits incluent un compartiment pour les sachets usagés."
        }
      ]
    }
  ];

  // Données structurées FAQPage pour Google
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(cat => 
      cat.questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.a
        }
      }))
    )
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="FAQ Snus Ouagadougou - Questions Fréquentes | Snuspedia"
        description="Toutes les réponses sur le snus à Ouagadougou : livraison, paiement, utilisation des sachets de nicotine au Burkina Faso. FAQ complète Snuspedia."
        url="https://snuspedia-bf.com/faq"
        keywords="faq snus ouagadougou, questions snus burkina, livraison snus ouaga, comment utiliser snus, sachets nicotine faq"
        structuredData={faqStructuredData}
        breadcrumbs={[
          { name: "Accueil", url: "https://snuspedia-bf.com/" },
          { name: "FAQ", url: "https://snuspedia-bf.com/faq" }
        ]}
      />
      <Header cart={[]} onToggleCart={() => {}} />
      
      <main className="pt-20 px-4 max-w-4xl mx-auto pb-16">
        {/* Hero Section */}
        <header className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Questions Fréquentes
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur le snus et les sachets de nicotine à Ouagadougou. 
            Vous ne trouvez pas votre réponse ? <Link to="https://wa.me/message/VU57PC3IDGREF1" className="text-primary hover:underline">Contactez-nous sur WhatsApp</Link>
          </p>
        </header>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, catIndex) => (
            <section key={catIndex} className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold text-foreground">{category.title}</h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((item, qIndex) => (
                  <AccordionItem 
                    key={qIndex} 
                    value={`${catIndex}-${qIndex}`}
                    className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/50"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium text-foreground">{item.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-12 text-center bg-primary/5 rounded-xl p-8 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Vous avez d'autres questions ?
          </h2>
          <p className="text-muted-foreground mb-6">
            Notre équipe est disponible sur WhatsApp pour répondre à toutes vos questions.
          </p>
          <a 
            href="https://wa.me/message/VU57PC3IDGREF1"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-full transition-colors"
          >
            Contactez-nous sur WhatsApp
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;