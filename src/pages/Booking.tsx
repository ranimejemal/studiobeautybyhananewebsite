import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Calendar, Clock, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";



const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 👉 Pré-remplissage si on vient d'un "Réserver ce soin"
  useEffect(() => {
  if (location.state?.treatment) {
    setSelectedTreatment(location.state.treatment); // ✅ corriger ici
  }
}, [location.state]);


  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const safeString = (value: any) => (value ? value.toString() : "");

  const treatments = [
    { id: 1, name: "HydraFacial", description: "Nettoyage en profondeur, exfoliation et hydratation intense pour une peau éclatante.", price: 70, duration: "60 min", image: "/Hydrafacial treatment (2).jpg" },
    { id: 2, name: "Microblading", description: "Technique semi-permanente qui redessine et comble les sourcils pour un résultat naturel.", price: 150, duration: "120 min", image: "/Le microblading, nouvelle méthode pour des sourcils de rêve.jpg" },
    { id: 3, name: "Microshading", description: "Effet poudré semi-permanent pour des sourcils plus définis et élégants.", price: 150, duration: "75 min", image: "/annyko_com.jpg" },
    { id: 4, name: "Répulpeur des lèvres", description: "Soin pour redonner volume, douceur et éclat aux lèvres.", price: 180, duration: "75 min", image: "/download - 2025-09-12T193255.044.jpg" },
    { id: 5, name: "Microneedling", description: "Technique qui stimule le collagène et améliore la texture de la peau.", price: 60, duration: "75 min", image: "/Nano-Needling_ The Science and Benefits of This Non-Invasive Skin Treatment.jpg" },
    { id: 6, name: "Candy lips", description: "Pigmentation semi-permanente pour des lèvres colorées et naturelles.", price: 150, duration: "75 min", image: "/Перманентный макияж губ (5).jpg" },
    { id: 7, name: "Retouche (3 à 4 semaines)", description: "Correction légère après une prestation pour un résultat parfait.", price: 50, duration: "75 min", image: "/Benefits of Retinol. - 2025-09-12T103916.191.png" },
    { id: 8, name: "Blanchiment Dentaire", description: "Éclaircissement des dents en douceur pour un sourire éclatant.", price: 70, duration: "75 min", image: "/Tired of living with a yellow smile_ At Cosmetic Dental Texas, we have got you covered! https___cosmeticdentaltexas_com_houston-services_teeth-whitening_.jpg" },
    { id: 9, name: "Morpheus8", description: "Traitement anti-âge innovant combinant radiofréquence et microneedling pour raffermir la peau.", price: "À partir de 100", duration: "75 min", image: "/morph.jpg" },
    { id: 10, name: "Skin Booster Soin", description: "Injection hydratante qui améliore la qualité de la peau et ravive son éclat.", price: "À partir de 120", duration: "75 min", image: "/Skinvive by Juvéderm Treatment in Raleigh, NC _ Beauty CO.jpg" },
    { id: 11, name: "Détatouage", description: "Suppression progressive et sécurisée des tatouages ou maquillage permanent.", price: 70, duration: "75 min", image: "/Curs Cursuri de Estetica - Start Academy.jpg" },
    { id: 12, name: "Bb Glow", description: "Soin perfecteur qui unifie le teint et donne un effet peau de bébé.", price: 70, duration: "75 min", image: "/BB Glow (1).jpg" },
    { id: 13, name: "Rehaussement des Cils", description: "Courbure naturelle et durable des cils pour un regard intense.", price: 35, duration: "75 min", image: "/Lash lifting  Cílios.jpg" },
    { id: 14, name: "Rehaussement des Cils avec Teinture", description: "Courbure et coloration des cils pour un effet mascara longue durée.", price: 40, duration: "75 min", image: "/Wimper Lift.jpg" },
    { id: 15, name: "Peeling Zina", description: "Exfoliation douce qui élimine les impuretés et ravive l’éclat du teint.", price: 70, duration: "75 min", image: "/download - 2025-09-12T190126.859.jpg" },
    { id: 27, name: "Lifting Naturel", description: "Injections ciblées pour lisser les rides et détendre les muscles du visage.", price: 250, duration: "75 min", image: "/Rejuvenate Your Skin with Carbon Laser Treatment at Estatico Facialbar.jpg" },
    { id: 16, name: "Peeling Carbon", description: "Soin au laser avec masque carbone pour resserrer les pores et purifier la peau.", price: 70, duration: "60 min", image: "/botox.jpg" },
    { id: 17, name: "Brûlage de Graisse double menton KYBELLA", description: "Injections ciblées pour dissoudre les graisses localisées.", price: "À partir de 120 (selon les zones)", duration: "60 min", image: "/How Dermal Fillers Can Change The Jawline_ Before and After.jpg" },
    { id: 18, name: "Hyaluronidase", description: "Injections ciblées pour dissoudre les graisses localisées.", price: 120, duration: "60 min", image: "/Révolutionnez votre routine beauté avec l'Hyaluron Pen.jpg" },
    { id: 19, name: "Epilation Laser Diode Visage Complet (lèvres, cou, menton)", description: "Épilation laser efficace et durable pour un visage net.", price: 60, duration: "60 min", image: "/Лазерная эпиляция эстетика.jpg" },
    { id: 20, name: "Lemon Bottle selon les parties", description: "Injections ciblées pour dissoudre les graisses localisées.", price: "À partir de 100", duration: "60 min", image: "/download - 2025-09-12T215228.350.jpg" },
    { id: 21, name: "Nuque", description: "Injections ciblées pour dissoudre les graisses localisées.", price: 40, duration: "60 min", image: "/Benefits of Retinol. - 2025-09-12T224837.361.png" },
    { id: 22, name: "Aisselles", description: "Injections ciblées pour dissoudre les graisses localisées.", price: 60, duration: "60 min", image: "/download - 2025-09-12T223842.759.jpg" },
    { id: 23, name: "Demi-bras", description: "Injections ciblées pour dissoudre les graisses localisées.", price: 70, duration: "60 min", image: "/Laser hair removal on the hand on a light background hair removal depilation _ Premium Photo.jpg" },
    { id: 24, name: "3 zones au choix", description: "Forfait pour traiter 3 zones différentes.", price: 99, duration: "60 min", image: "/APRENDA A FAZER DEPILAÇÃO A LASER.jpg" },
    { id: 25, name: "5 zones au choix", description: "Forfait pour traiter 5 zones différentes.", price: 130, duration: "60 min", image: "/APRENDA A FAZER DEPILAÇÃO A LASER.jpg" },
    { id: 26, name: "Corps Complet", description: "Traitement global sur l’ensemble du corps.", price: 150, duration: "60 min", image: "/download - 2025-09-12T224050.429.jpg" }
  ];

  

   // Générer les 7 prochains jours (inclus samedi et dimanche)
  const getWeekDays = (start: Date, numberOfDays = 14) => {
  const days = [];
  const current = new Date(start);
  for (let i = 0; i < numberOfDays; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return days;
};

const [startDate] = useState(new Date());
const weekDays = getWeekDays(startDate, 14);
  // Horaires disponibles
  const getAvailableTimes = (day: Date) => {
  const dayOfWeek = day.getDay();
  if (dayOfWeek === 6) {
    // samedi
    return ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
  }
  // dimanche ou autre jour
  return ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
};


  const formatDate = (date: Date) =>
    date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });

  const nextStep = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  // Soumission EmailJS
  const handleSubmit = async () => {
    if (!selectedTreatment || !selectedDate || !selectedTime || !clientInfo.name || !clientInfo.email || !clientInfo.phone) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const templateParams = {
      treatment_name: selectedTreatment?.name,
      treatment_duration: selectedTreatment?.duration,
      treatment_price: selectedTreatment?.price,
      date: new Date(selectedDate).toLocaleDateString("fr-FR", { weekday: "long", month: "long", day: "numeric" }),
      time: selectedTime,
      client_name: clientInfo.name,
      client_email: clientInfo.email,
      client_phone: clientInfo.phone,
      client_notes: clientInfo.notes,
    };

    try {
      const response = await emailjs.send(
        "service_uty1bp6",
        "template_ewy0mvk",
        templateParams,
        "Wvb_KoiVDKfzb33fT"
      );

      if (response.status === 200) {
        navigate("/confirmation", {
          state: { treatment: selectedTreatment, date: selectedDate, time: selectedTime, clientInfo },
        });
      } else {
        alert("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
      }
    } catch (error) {
      console.error(error);
      alert("Impossible d’envoyer l’email. Vérifiez votre connexion.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3e1e3] py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Réservez votre <span className="hero-text">Rendez-vous</span>
          </h1>
          <p className="text-sm text-black">Suivez ces étapes simples pour planifier votre soin de beauté</p>
        </div>

        <Card className="p-6 sm:p-8 glass-card">

          {/* Step 1: Treatment */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-2">Sélectionnez un soin</h2>
              <p className="text-center text-muted-foreground text-sm mb-4">Choisissez le service souhaité</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {treatments.map((treatment) => (
                  <Card
                    key={treatment.id}
                    className={`p-4 cursor-pointer border-2 transition-all ${selectedTreatment?.id === treatment.id ? "border-[#b2525c] bg-[#b2525c]/5" : "border-border"}`}
                    onClick={() => setSelectedTreatment(treatment)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{treatment.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{treatment.duration}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-[#b2525c]">{treatment.price}€</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end">
                <Button onClick={nextStep} disabled={!selectedTreatment} className="bg-[#b2525c] text-white">
                  Étape suivante <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-2">Sélectionnez la date et l’heure</h2>
              <p className="text-center text-muted-foreground text-sm mb-4">Choisissez votre créneau préféré</p>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {weekDays.map((day) =>
                    day.getDay() === 0 ? null : (
                      <div key={day.toISOString()} className="flex flex-col">
                        <div className="text-center font-semibold mb-2">{formatDate(day)}</div>
                        <div className="space-y-2">
                          {getAvailableTimes(day).map((slot) => (
                            <button
  key={slot}
  onClick={() => {
    const isoDate = day.toISOString().split("T")[0];
    setSelectedDate(isoDate);
    setSelectedTime(slot);
  }}
  className={`w-full py-2 rounded transition ${
    selectedDate === day.toISOString().split("T")[0] && selectedTime === slot
      ? "bg-[#b2525c] text-white"
      : "bg-gray-100 hover:bg-pink-200"
  }`}
>
  {slot}
</button>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}><ArrowLeft className="w-4 h-4 mr-2" /> Retour</Button>
                <Button onClick={nextStep} disabled={!selectedDate || !selectedTime} className="bg-[#b2525c] text-white">
                  Étape suivante <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-2">Informations personnelles</h2>
              <p className="text-center text-muted-foreground text-sm mb-4">Veuillez fournir vos coordonnées</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input id="name" value={clientInfo.name} onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })} placeholder="Entrez votre nom complet" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email *</Label>
                  <Input id="email" type="email" value={clientInfo.email} onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })} placeholder="Entrez votre email" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone">Numéro de téléphone *</Label>
                  <Input id="phone" type="tel" value={clientInfo.phone} onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })} placeholder="Entrez votre numéro de téléphone" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Notes supplémentaires (optionnel)</Label>
                  <Textarea id="notes" value={clientInfo.notes} onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })} placeholder="Demandes spéciales ou notes pour votre rendez-vous" rows={3} />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}><ArrowLeft className="w-4 h-4 mr-2" /> Retour</Button>
                <Button onClick={nextStep} disabled={!clientInfo.name || !clientInfo.email || !clientInfo.phone} className="bg-[#b2525c] text-white">
                  Vérifier la réservation <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center mb-2">Confirmez votre réservation</h2>
              <p className="text-center text-muted-foreground text-sm mb-4">Veuillez vérifier les détails de votre rendez-vous</p>
              <Card className="p-6 bg-secondary/10 border border-secondary/20">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Résumé du rendez-vous</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Soin</h4>
                      <p className="text-muted-foreground">{selectedTreatment?.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedTreatment?.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Prix</h4>
                      <p className="text-xl font-bold text-primary">{selectedTreatment?.price}€</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Date & Heure</h4>
                      <p className="text-muted-foreground">{new Date(selectedDate).toLocaleDateString("fr-FR", { weekday: "long", month: "long", day: "numeric" })}</p>
                      <p className="text-muted-foreground">{selectedTime}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Contact</h4>
                      <p className="text-muted-foreground">{clientInfo.name}</p>
                      <p className="text-muted-foreground">{clientInfo.email}</p>
                      <p className="text-muted-foreground">{clientInfo.phone}</p>
                    </div>
                  </div>
                  {clientInfo.notes && (
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Notes</h4>
                      <p className="text-muted-foreground">{clientInfo.notes}</p>
                    </div>
                  )}
                </div>
              </Card>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}><ArrowLeft className="w-4 h-4 mr-2" /> Retour</Button>
                <Button onClick={handleSubmit} className="bg-[#b2525c] text-white"><Check className="w-4 h-4 mr-2" /> Confirmer la réservation</Button>
              </div>
            </div>
          )}

        </Card>
      </div>
    </div>
  );
};

export default Booking;
