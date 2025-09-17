import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Check, ArrowLeft, ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";

// Full treatment categories
const treatmentCategories = [
  {
    id: "face",
    title: "Visage",
    treatments: [
      { name: "HydraFacial", description: "Nettoyage en profondeur, exfoliation et hydratation intense pour une peau éclatante.", price: 70, duration: "60 min", image: "/Hydrafacial treatment (2).jpg" },
      { name: "Microblading", description: "Technique semi-permanente qui redessine et comble les sourcils pour un résultat naturel.", price: 150, duration: "120 min", image: "/Le microblading, nouvelle méthode pour des sourcils de rêve.jpg" },
      { name: "Microshading", description: "Effet poudré semi-permanent pour des sourcils plus définis et élégants.", price: 150, duration: "75 min", image: "/annyko_com.jpg" },
      { name: "Répulpeur des lèvres", description: "Soin pour redonner volume, douceur et éclat aux lèvres.", price: 180, duration: "75 min", image: "/download - 2025-09-12T193255.044.jpg" },
      { name: "Microneedling", description: "Technique qui stimule le collagène et améliore la texture de la peau.", price: 60, duration: "75 min", image: "/Nano-Needling_ The Science and Benefits of This Non-Invasive Skin Treatment.jpg" },
      { name: "Candy lips", description: "Pigmentation semi-permanente pour des lèvres colorées et naturelles.", price: 150, duration: "75 min", image: "/Перманентный макияж губ (5).jpg" },
      { name: "Retouche (3 à 4 semaines)", description: "Correction légère après une prestation pour un résultat parfait.", price: 50, duration: "75 min", image: "/Benefits of Retinol. - 2025-09-12T103916.191.png" },
      { name: "Blanchiment Dentaire", description: "Éclaircissement des dents en douceur pour un sourire éclatant.", price: 70, duration: "75 min", image: "/Tired of living with a yellow smile_ At Cosmetic Dental Texas, we have got you covered! https___cosmeticdentaltexas_com_houston-services_teeth-whitening_.jpg" },
      { name: "Morpheus8", description: "Traitement anti-âge innovant combinant radiofréquence et microneedling pour raffermir la peau.", price: "À partir de 100", duration: "75 min", image: "/morph.jpg" },
      { name: "Skin Booster Soin", description: "Injection hydratante qui améliore la qualité de la peau et ravive son éclat.", price: "À partir de 120", duration: "75 min", image: "/Skinvive by Juvéderm Treatment in Raleigh, NC _ Beauty CO.jpg" },
      { name: "Botox", description: "Injections de toxine botulique pour lisser les rides d’expression et rajeunir le visage.", price: "À partir de 150", duration: "30-45 min", image: "/botox.jpg" },
      { name: "Détatouage", description: "Suppression progressive et sécurisée des tatouages ou maquillage permanent.", price: 70, duration: "75 min", image: "/Curs Cursuri de Estetica - Start Academy.jpg" },
      { name: "Bb Glow", description: "Soin perfecteur qui unifie le teint et donne un effet peau de bébé.", price: 70, duration: "75 min", image: "/BB Glow (1).jpg" },
      { name: "Rehaussement des Cils", description: "Courbure naturelle et durable des cils pour un regard intense.", price: 35, duration: "75 min", image: "/Lash lifting  Cílios.jpg" },
      { name: "Rehaussement des Cils avec Teinture", description: "Courbure et coloration des cils pour un effet mascara longue durée.", price: 40, duration: "75 min", image: "/Wimper Lift.jpg" },
      { name: "Peeling Zina", description: "Exfoliation douce qui élimine les impuretés et ravive l’éclat du teint.", price: 70, duration: "75 min", image: "/download - 2025-09-12T190126.859.jpg" },
      { name: "Peeling Carbon", description: "Soin au laser avec masque carbone pour resserrer les pores et purifier la peau.", price: 70, duration: "75 min", image: "/Rejuvenate Your Skin with Carbon Laser Treatment at Estatico Facialbar.jpg" },
      { name: "Brûlage de Graisse double menton KYBELLA", description: "Injections ciblées pour dissoudre les graisses localisées.", price: "À partir de 120 (selon les zones)", duration: "60 min", image: "/How Dermal Fillers Can Change The Jawline_ Before and After.jpg" },
      { name: "Hyaluronidase", description: "Enzyme utilisée pour corriger ou dissoudre l’acide hyaluronique injecté.", price: 120, duration: "60 min", image: "/Révolutionnez votre routine beauté avec l'Hyaluron Pen.jpg" },
      { name: "Épilation Laser Diode Visage Complet (lèvres, cou, menton)", description: "Élimination durable des poils du visage avec la technologie laser diode.", price: 60, duration: "60 min", image: "/Лазерная эпиляция эстетика.jpg" },
    ],
  },
  {
    id: "body",
    title: "Corps",
    treatments: [
      { name: "Lemon Bottle selon les parties", description: "Injections ciblées pour dissoudre les graisses localisées.", price: "À partir de 100", duration: "60 min", image: "/download - 2025-09-12T215228.350.jpg" },
      { name: "Nuque", description: "Injections ciblées pour dissoudre les graisses localisées.", price: 40, duration: "60 min", image: "/Benefits of Retinol. - 2025-09-12T224837.361.png" },
      { name: "Aisselles", description: "Injections ciblées pour dissoudre les graisses localisées.", price: 60, duration: "60 min", image: "/download - 2025-09-12T223842.759.jpg" },
      { name: "Demi-bras", description: "Injections ciblées pour dissoudre les graisses localisées.", price: 70, duration: "60 min", image: "/Laser hair removal on the hand on a light background hair removal depilation _ Premium Photo.jpg" },
      { name: "3 zones au choix", description: "Injections ciblées pour dissoudre les graisses localisées.", price: 99, duration: "60 min", image: "/APRENDA A FAZER DEPILAÇÃO A LASER.jpg" },
      { name: "5 zones au choix", description: "Injections ciblées pour dissoudre les graisses localisées.", price: 130, duration: "60 min", image: "/APRENDA A FAZER DEPILAÇÃO A LASER.jpg" },
      { name: "Corps Complet", description: "Injections ciblées pour dissoudre les graisses localisées.", price: 150, duration: "60 min", image: "/download - 2025-09-12T224050.429.jpg" },
    ],
  },
];

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Flatten all treatments for easy mapping
  const allTreatments = treatmentCategories.flatMap(cat => cat.treatments.map((t, index) => ({ ...t, id: `${cat.id}-${index}` })));

  useEffect(() => {
    if (location.state?.treatment) {
      setSelectedTreatment(location.state.treatment);
      setCurrentStep(2);
    }
  }, [location.state]);

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
const weekDays = getWeekDays(startDate, 14); // ← 14 jours = 2 semaines

  // Horaires disponibles
  const getavailableTimes = (day: Date) => {
    const dayOfWeek = day.getDay();
    if (dayOfWeek === 6) {
      // samedi → commence à 11h
      return ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
    }
    // autres jours → commence à 9h
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

  const formatPrice = (price: string | number) => typeof price === "number" ? `${price}€` : price;

  const handleSubmit = async () => {
    if (!selectedTreatment || !selectedDate || !selectedTime || !clientInfo.name || !clientInfo.email || !clientInfo.phone) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const templateParams = {
      treatment_name: selectedTreatment.name,
      treatment_duration: selectedTreatment.duration,
      treatment_price: formatPrice(selectedTreatment.price),
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
        navigate("/confirmation", { state: { treatment: selectedTreatment, date: selectedDate, time: selectedTime, clientInfo } });
      } else {
        alert("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
      }
    } catch (error) {
      console.error(error);
      alert("Impossible d’envoyer l’email. Vérifiez votre connexion ou la configuration EmailJS.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3e1e3] py-6">
  <div className="container mx-auto px-3">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Réservez votre <span className="hero-text">Rendez-vous</span>
        </h1>
        <p className="text-xs text-black">
          Suivez ces étapes simples pour planifier votre soin de beauté
        </p>
      </div>

      <Card className="p-5 glass-card">
        {/* Step 1: Treatment */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-1">Sélectionnez un soin</h2>
              <p className="text-sm text-muted-foreground">
                Choisissez le service souhaité
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {allTreatments.map((treatment) => (
                <Card
                  key={treatment.id}
                  className={`p-3 cursor-pointer border-2 transition-all ${
                    selectedTreatment?.id === treatment.id
                      ? "border-[#b2525c] bg-[#b2525c]/5"
                      : "border-border"
                  }`}
                  onClick={() => setSelectedTreatment(treatment)}
                >
                  <h3 className="font-semibold text-sm">{treatment.name}</h3>
                  <p className="text-xs">{treatment.description}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {treatment.duration}
                  </Badge>
                  <p className="text-lg font-bold text-[#b2525c] mt-1">
                    {formatPrice(treatment.price)}
                  </p>
                </Card>
              ))}
            </div>
            <div className="flex">
              <Button
                onClick={nextStep}
                disabled={!selectedTreatment}
                className="bg-[#b2525c] text-white w-full"
              >
                Étape suivante <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-1">
                Sélectionnez la date et l’heure
              </h2>
              <p className="text-sm text-muted-foreground">
                Choisissez votre créneau de rendez-vous préféré
              </p>
            </div>
            <div className="overflow-x-auto flex gap-3 pb-2">
              {weekDays.map((day) => (
                <div key={day.toISOString()} className="min-w-[120px]">
                  <div className="text-center font-semibold mb-1 text-xs">
                    {formatDate(day)}
                  </div>
                  <div className="space-y-1">
                    {getavailableTimes(day).map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedDate(day.toISOString().split("T")[0]);
                          setSelectedTime(slot);
                        }}
                        className={`w-full py-1.5 rounded text-xs ${
                          selectedDate === day.toISOString().split("T")[0] &&
                          selectedTime === slot
                            ? "bg-[#b2525c] text-white"
                            : "bg-gray-100 hover:bg-pink-200"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={prevStep} className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" /> Retour
              </Button>
              <Button
                onClick={nextStep}
                disabled={!selectedDate || !selectedTime}
                className="bg-[#b2525c] text-white w-full"
              >
                Étape suivante <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}


            {/* Step 3: Personal Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Informations personnelles</h2>
                  <p className="text-muted-foreground">Veuillez fournir vos coordonnées</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input id="name" value={clientInfo.name} onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })} placeholder="Entrez votre nom complet" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email *</Label>
                    <Input id="email" type="email" value={clientInfo.email} onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })} placeholder="Entrez votre email" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Numéro de téléphone *</Label>
                    <Input id="phone" type="tel" value={clientInfo.phone} onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })} placeholder="Entrez votre numéro de téléphone" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Notes supplémentaires (optionnel)</Label>
                    <Textarea id="notes" value={clientInfo.notes} onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })} placeholder="Demandes spéciales ou notes pour votre rendez-vous" rows={3} />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}><ArrowLeft className="w-4 h-4 mr-2" /> Retour</Button>
                  <Button onClick={nextStep} disabled={!clientInfo.name || !clientInfo.email || !clientInfo.phone} className="bg-[#b2525c] text-white">Vérifier la réservation <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Confirmez votre réservation</h2>
                  <p className="text-muted-foreground">Veuillez vérifier les détails de votre rendez-vous</p>
                </div>
                <Card className="p-6 bg-secondary/10 border border-secondary/20">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-border">
                      <h3 className="text-lg font-semibold text-foreground">Résumé du rendez-vous</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Soin</h4>
                        <p className="text-muted-foreground">{selectedTreatment?.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedTreatment?.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Prix</h4>
                        <p className="text-xl font-bold text-primary">{formatPrice(selectedTreatment?.price)}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Date & Heure</h4>
                        <p className="text-muted-foreground">{new Date(selectedDate).toLocaleDateString("fr-FR", { weekday: "long", month: "long", day: "numeric" })}</p>
                        <p className="text-muted-foreground">{selectedTime}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Contact</h4>
                        <p className="text-muted-foreground">{clientInfo.name}</p>
                        <p className="text-muted-foreground">{clientInfo.email}</p>
                        <p className="text-muted-foreground">{clientInfo.phone}</p>
                      </div>
                    </div>
                    {clientInfo.notes && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Notes</h4>
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
    </div>
  );
};

export default Booking;
