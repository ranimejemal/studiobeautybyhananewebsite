import { useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Calendar, ArrowLeft } from "lucide-react";

const BookingConfirmation = () => {
  const { state } = useLocation() as any;

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Aucune réservation trouvée.</p>
      </div>
    );
  }

  const { treatment, date, time, clientInfo } = state;

  return (
    <div className="min-h-screen bg-[#f3e1e3] py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="p-10 text-center glass-card">
          <Check className="w-16 h-16 text-[#b2525c] mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            Réservation Confirmée 🎉
          </h1>
          <p className="text-muted-foreground mb-8">
            Merci {clientInfo.name}, votre rendez-vous a bien été enregistré !
          </p>

          <div className="space-y-6 text-left">
            <div>
              <h2 className="font-semibold text-lg mb-1">Soin choisi</h2>
              <p>{treatment?.name} ({treatment?.duration})</p>
              <p className="text-primary font-bold">{treatment?.price}€</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-1">Date & Heure</h2>
              <p>
                {new Date(date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}{" "}
                à {time}
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-1">Vos informations</h2>
              <p>{clientInfo.name}</p>
              <p>{clientInfo.email}</p>
              <p>{clientInfo.phone}</p>
            </div>
            {clientInfo.notes && (
              <div>
                <h2 className="font-semibold text-lg mb-1">Notes</h2>
                <p>{clientInfo.notes}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button asChild className="bg-[#b2525c] text-white">
              <Link to="/booking">
                <ArrowLeft className="w-4 h-4 mr-2" /> Nouvelle Réservation
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Accueil</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmation;
