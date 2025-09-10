import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Palette, User } from "lucide-react";

const treatmentCategories = [
  {
    id: "face",
    title: "Visage",
    icon: Sparkles,
    treatments: [
      {
        name: "HydraFacial",
        description: "Soin du visage profond pour nettoyer et hydrater",
        price: 120,
        duration: "60 min",
        image: "/Hydrafacial treatment (2).jpg"
      },
      {
        name: "Microblading",
        description: "Soin semi-permanent pour embellir les sourcils",
        price: 180,
        duration: "120 min",
        image: "/api/placeholder/300/200"
      },
      {
        name: "Microshading",
        description: "Soin anti-âge avancé avec peptides",
        price: 140,
        duration: "75 min",
        image: "/api/placeholder/300/200"
      },
      {
        name: "Répulpeur des lèvres",
        description: "Soin anti-âge avancé pour les lèvres",
        price: 140,
        duration: "75 min",
        image: "/api/placeholder/300/200"
      },
      {
        name: "Microneedling",
        description: "Soin anti-âge avancé avec peptides",
        price: 140,
        duration: "75 min",
        image: "/api/placeholder/300/200"
      },
    ]
  },
  {
    id: "body",
    title: "Corps",
    icon: Heart,
    treatments: [
      {
        name: "Massage Relaxant",
        description: "Massage suédois complet pour tout le corps",
        price: 90,
        duration: "60 min",
        image: "/api/placeholder/300/200"
      },
      {
        name: "Gommage du corps",
        description: "Exfoliation avec hydratation",
        price: 70,
        duration: "45 min",
        image: "/api/placeholder/300/200"
      },
      {
        name: "Traitement cellulite",
        description: "Thérapie avancée pour réduire la cellulite",
        price: 110,
        duration: "90 min",
        image: "/api/placeholder/300/200"
      }
    ]
  }
];

const Treatments = () => {
  return (
    <div className="min-h-screen bg-[#f3e1e3]">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-[#d2a3a8c9]">
              Nos Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Soins <span className="hero-text">Beauté</span>
            </h1>
            <p className="text-sm max-w-2xl mx-auto text-black">
              Découvrez notre gamme complète de soins de beauté professionnels, conçus pour sublimer votre beauté naturelle et votre bien-être.
            </p>
          </div>
        </div>
      </div>

      {/* Treatments Grid */}
      <div className="container mx-auto px-4 py-16 ">
        <div className="space-y-16 -translate-y-20">
          {treatmentCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="space-y-8">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-bold text-foreground">{category.title}</h2>
                </div>

                {/* Treatments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.treatments.map((treatment, index) => (
                    <Card key={index} className="treatment-card group cursor-pointer">
                      <div className="aspect-video bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg mb-4 overflow-hidden">
                        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                          <IconComponent className="w-12 h-12 text-muted-foreground/50" />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {treatment.name}
                          </h3>
                          <Badge variant="secondary" className="text-sm font-medium">
                            {treatment.duration}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {treatment.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-2xl font-bold text-primary">
                            {treatment.price}€
                          </div>
                          <Button size="sm" className="bg-[#b2525c] text-white">
                            Réserver
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Treatments;
