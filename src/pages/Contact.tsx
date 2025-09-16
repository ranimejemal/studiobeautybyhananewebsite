import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import emailjs from "@emailjs/browser";
import React, { useState } from "react";


const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const safeString = (value: any) => (value ? value.toString() : "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name: `${safeString(formData.firstName)} ${safeString(formData.lastName)}`,
      time: new Date().toLocaleString(),
      message: safeString(formData.message),
      client_email: safeString(formData.email), 
      client_phone: safeString(formData.phone), 
      subject: safeString(formData.subject), 
    };

    try {
      const response = await emailjs.send(
        "service_uty1bp6", 
        "template_a04215t",
        templateParams,
        "Wvb_KoiVDKfzb33fT"
      );

      console.log("EmailJS response:", response);
      if (response.status === 200) {
        alert("Message envoyé avec succès !");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur EmailJS:", error);
      alert("Impossible d’envoyer le message. Vérifiez la configuration EmailJS.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#f3e1e3]">
      {/* En-tête */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contactez <span className="hero-text">Nous</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Contactez notre équipe. Nous sommes là pour vous aider à être et à vous sentir au mieux de votre forme.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de Contact */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Entrer en Contact</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Nous serions ravis d’avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 treatment-card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
                    <p className="text-muted-foreground">
                      1 Rue des Carrières <br />
                      68300 Saint-Louis<br />
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 treatment-card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
                    <p className="text-muted-foreground">+33 6 45 84 32 06</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 treatment-card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground">contact@beautycenter.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 treatment-card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Horaires d'Ouverture</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Lundi - Vendredi : 9h00 - 11h00  / 13h00 - 19h00</p>
                      <p>Samedi : 11h00 - 19h00</p>
                      
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Formulaire de Contact */}
          <div>
            <Card className="p-8 glass-card">
              <h2 className="text-2xl font-bold text-foreground mb-6">Envoyez-nous un Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nom *</Label>
                    <Input id="firstName" placeholder="Votre nom" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Prénom *</Label>
                    <Input id="lastName" placeholder="Votre prénom" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse Email *</Label>
                  <Input id="email" type="email" placeholder="votre.email@example.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input id="phone" type="tel" placeholder="+33 1 23 45 67 89" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet *</Label>
                  <Input id="subject" placeholder="Sujet de votre message" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Dites-nous comment nous pouvons vous aider..."
                    rows={5}
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full gold-shimmer">
                  Envoyer le Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
