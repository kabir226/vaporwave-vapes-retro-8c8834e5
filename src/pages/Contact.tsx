
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Ici vous pouvez ajouter la logique d'envoi
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Téléphone",
      content: "01 23 45 67 89",
      subtitle: "Lun-Ven 9h-18h"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      content: "contact@no-smoking.fr",
      subtitle: "Réponse sous 24h"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Adresse",
      content: "123 Rue de la Vape",
      subtitle: "75001 Paris, France"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Horaires",
      content: "Lun-Ven 9h-18h",
      subtitle: "Sam 10h-16h"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header cart={[]} onToggleCart={() => {}} />
      
      <div className="pt-20 px-4">
        {/* Header */}
        <section className="max-w-4xl mx-auto text-center py-16">
          <Badge variant="outline" className="mb-6 border-primary text-primary">
            CONTACTEZ-NOUS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-cyber mb-6">
            Nous Sommes Là Pour Vous
          </h1>
          <p className="text-xl text-muted-foreground">
            Une question ? Un conseil ? Notre équipe d'experts est à votre disposition.
          </p>
        </section>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  Envoyez-nous un message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Sujet *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Choisissez un sujet</option>
                      <option value="product">Question produit</option>
                      <option value="order">Commande</option>
                      <option value="support">Support technique</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Décrivez votre demande..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full py-3 text-base font-semibold">
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="grid gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <div className="text-primary mt-1">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <p className="text-primary font-medium">{info.content}</p>
                          <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* FAQ Quick Links */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-bold text-primary mb-4">
                    Questions fréquentes
                  </h3>
                  <div className="space-y-2">
                    <button className="block w-full text-left p-2 hover:bg-primary/10 rounded text-sm">
                      Comment choisir ma première vape ?
                    </button>
                    <button className="block w-full text-left p-2 hover:bg-primary/10 rounded text-sm">
                      Quels sont les délais de livraison ?
                    </button>
                    <button className="block w-full text-left p-2 hover:bg-primary/10 rounded text-sm">
                      Comment entretenir ma vape ?
                    </button>
                    <button className="block w-full text-left p-2 hover:bg-primary/10 rounded text-sm">
                      Politique de retour
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
