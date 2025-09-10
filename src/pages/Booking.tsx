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

const Booking = () => {
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

  const navigate = useNavigate();
  const safeString = (value: any) => (value ? value.toString() : "");


  const treatments = [
    { id: 1, name: "HydraFacial", price: 120, duration: "60 min" },
    { id: 2, name: "Microblading", price: 180, duration: "120 min" },
    { id: 3, name: "Microneedling", price: 35, duration: "45 min" },
    { id: 4, name: "Microshading", price: 60, duration: "45 min" },
    { id: 5, name: "Répulpeur des lèvres", price: 90, duration: "60 min" },
  ];

  const getWeekDays = (start: Date) => {
    const days = [];
    const current = new Date(start);
    for (let i = 0; i < 7; i++) {
      if (current.getDay() !== 0) days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const [startDate] = useState(new Date());
  const weekDays = getWeekDays(startDate);

  const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  const formatDate = (date: Date) =>
    date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });

  const nextStep = () => { if (currentStep < 4) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  // ======= FIXED EMAILJS SUBMISSION =======
  const handleSubmit = async () => {
    // check required fields
    if (!selectedTreatment || !selectedDate || !selectedTime || !clientInfo.name || !clientInfo.email || !clientInfo.phone) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const templateParams = {
  treatment_name: (selectedTreatment?.name || "").toString(),
  treatment_duration: (selectedTreatment?.duration || "").toString(),
  treatment_price: (selectedTreatment?.price || "").toString(),
  date: selectedDate
    ? new Date(selectedDate).toLocaleDateString("fr-FR", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "",
  time: (selectedTime || "").toString(),
  client_name: (clientInfo.name || "").toString(),
  client_email: (clientInfo.email || "").toString(),
  client_phone: (clientInfo.phone || "").toString(),
  client_notes: (clientInfo.notes || "").toString(),
};


    try {
      const response = await emailjs.send(
        "service_uty1bp6",
        "template_ewy0mvk",
        templateParams,
        "Wvb_KoiVDKfzb33fT"
      );

      console.log("EmailJS response:", response);

      if (response.status === 200) {
        navigate("/confirmation", {
          state: { treatment: selectedTreatment, date: selectedDate, time: selectedTime, clientInfo },
        });
      } else {
        alert("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur EmailJS:", error);
      alert("Impossible d’envoyer l’email. Vérifiez votre connexion ou la configuration EmailJS.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3e1e3] py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Réservez votre <span className="hero-text">Rendez-vous</span>
            </h1>
            <p className="text-sm text-black">
              Suivez ces étapes simples pour planifier votre soin de beauté
            </p>
          </div>

          <Card className="p-8 glass-card">
            {/* Step 1: Treatment */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Sélectionnez un soin</h2>
                  <p className="text-muted-foreground">Choisissez le service souhaité</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Sélectionnez la date et l’heure</h2>
                  <p className="text-muted-foreground text-sm">Choisissez votre créneau de rendez-vous préféré</p>
                </div>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-6 gap-4">
                    {weekDays.map((day) => (
                      <div key={day.toISOString()} className="flex flex-col">
                        <div className="text-center font-semibold mb-2">{formatDate(day)}</div>
                        <div className="space-y-2">
                          {availableTimes.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => {
                                setSelectedDate(day.toISOString().split("T")[0]);
                                setSelectedTime(slot);
                              }}
                              className={`w-full py-2 rounded transition ${selectedDate === day.toISOString().split("T")[0] && selectedTime === slot ? "bg-[#b2525c] text-white" : "bg-gray-100 hover:bg-pink-200"}`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}><ArrowLeft className="w-4 h-4 mr-2" /> Retour</Button>
                  <Button onClick={nextStep} disabled={!selectedDate || !selectedTime} className="bg-[#b2525c] text-white">Étape suivante <ArrowRight className="w-4 h-4 ml-2" /></Button>
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
                        <p className="text-xl font-bold text-primary">{selectedTreatment?.price}€</p>
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
