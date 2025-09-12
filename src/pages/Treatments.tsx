import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const treatmentCategories = [
  {
    id: "face",
    title: "Visage",
    treatments: [
      {
        name: "HydraFacial",
        description: "Nettoyage en profondeur, exfoliation et hydratation intense pour une peau éclatante.",
        price: 70,
        duration: "60 min",
        image: "/Hydrafacial treatment (2).jpg"
      },
      {
        name: "Microblading",
        description: "Technique semi-permanente qui redessine et comble les sourcils pour un résultat naturel.",
        price: 150,
        duration: "120 min",
        image: "/Le microblading, nouvelle méthode pour des sourcils de rêve.jpg"
      },
      {
        name: "Microshading",
        description: "Effet poudré semi-permanent pour des sourcils plus définis et élégants.",
        price: 150,
        duration: "75 min",
        image: "/annyko_com.jpg"
      },
      {
        name: "Répulpeur des lèvres",
        description: "Soin pour redonner volume, douceur et éclat aux lèvres.",
        price: 180,
        duration: "75 min",
        image: "/Аугментация губ.jpg"
      },
      {
        name: "Microneedling",
        description: "Technique qui stimule le collagène et améliore la texture de la peau.",
        price: 60,
        duration: "75 min",
        image: "/microneedling.jpg"
      },
      {
        name: "Candy lips",
        description: "Pigmentation semi-permanente pour des lèvres colorées et naturelles.",
        price: 150,
        duration: "75 min",
        image: "/Перманентный макияж губ (5).jpg"
      },
      {
        name: "Retouche (3 à 4 semaines)",
        description: "Correction légère après une prestation pour un résultat parfait.",
        price: 50,
        duration: "75 min",
        image: "/retouche.jpg"
      },
      {
        name: "Blanchiment Dentaire",
        description: "Éclaircissement des dents en douceur pour un sourire éclatant.",
        price: 70,
        duration: "75 min",
        image: "/blanchiment.jpg"
      },
      {
        name: "Morpheus8",
        description: "Traitement anti-âge innovant combinant radiofréquence et microneedling pour raffermir la peau.",
        price: "À partir de 100",
        duration: "75 min",
        image: "/morpheus8.jpg"
      },
      {
        name: "Skin Booster Soin",
        description: "Injection hydratante qui améliore la qualité de la peau et ravive son éclat.",
        price: "À partir de 120",
        duration: "75 min",
        image: "/skinbooster.jpg"
      },
      {
        name: "Détatouage",
        description: "Suppression progressive et sécurisée des tatouages ou maquillage permanent.",
        price: 70,
        duration: "75 min",
        image: "/detatouage.jpg"
      },
      {
        name: "Bb Glow",
        description: "Soin perfecteur qui unifie le teint et donne un effet peau de bébé.",
        price: 70,
        duration: "75 min",
        image: "/bbglow.jpg"
      },
      {
        name: "Rehaussement des Cils",
        description: "Courbure naturelle et durable des cils pour un regard intense.",
        price: 35,
        duration: "75 min",
        image: "/cils.jpg"
      },
      {
        name: "Rehaussement des Cils avec Teinture",
        description: "Courbure et coloration des cils pour un effet mascara longue durée.",
        price: 40,
        duration: "75 min",
        image: "/cils-teinture.jpg"
      },
      {
        name: "Peeling Zina",
        description: "Exfoliation douce qui élimine les impuretés et ravive l’éclat du teint.",
        price: 70,
        duration: "75 min",
        image: "/peeling-zina.jpg"
      },
      {
        name: "Peeling Carbon",
        description: "Soin au laser avec masque carbone pour resserrer les pores et purifier la peau.",
        price: 70,
        duration: "75 min",
        image: "/peeling-carbon.jpg"
      },

      {
        name: "Brûlage de Graisse double menton KYBELLA",
        description: "Injections ciblées pour dissoudre les graisses localisées.",
        price: "À partir de 120 (selon les zone)",
        duration: "60 min",
        image: "/lemon-bottle.jpg"
      },

      {
        name: "Hyaluronidase",
        description: "Injections ciblées pour dissoudre les graisses localisées.",
        price: 120,
        duration: "60 min",
        image: "/lemon-bottle.jpg"
      },

      {
        name: "Epilation Laser Diode Visage Complet(lèvres , cou , menton)",
        description: "Injections ciblées pour dissoudre les graisses localisées.",
        price: 60 ,
        duration: "60 min",
        image: "/lemon-bottle.jpg"
      },
    ]
  },
  {
    id: "body",
    title: "Corps",
    treatments: [
      {
        name: "Lemon Bottle selon les parties",
        description: "Injections ciblées pour dissoudre les graisses localisées.",
        price: "À partir de 100",
        duration: "60 min",
        image: "/lemon-bottle.jpg"
      },
      
       {
        name: "Nuque",
        description: "Injections ciblées pour dissoudre les graisses localisées.",
        price: 40 ,
        duration: "60 min",
        image: "/lemon-bottle.jpg"
      },

      {
        name: "Aiselles",
        description: "Injections ciblées pour dissoudre les graisses localisées.",
        price: 60 ,
        duration: "60 min",
        image: "/lemon-bottle.jpg"
      },

      {
        name: "Demi-bras",
        description: "Injections ciblées pour dissoudre les graisses localisées.",
        price: 70 ,
        duration: "60 min",
        image: "/lemon-bottle.jpg"
      },

      {
        name: "3 zones aux chois",
        description: "Injections ciblées pour dissoudre les graisses localisées.",
        price: 99 ,
        duration: "60 min",
        image: "/lemon-bottle.jpg"
      },

      {
        name: "5 zones aux chois",
        description: "Injections ciblées pour dissoudre les graisses localisées.",
        price: 130 ,
        duration: "60 min",
        image: "/lemon-bottle.jpg"
      },

       {
        name: "Corps Complet",
        description: "Injections ciblées pour dissoudre les graisses localisées.",
        price: 150 ,
        duration: "60 min",
        image: "/lemon-bottle.jpg"
      },
      
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
          {treatmentCategories.map((category) => (
            <div key={category.id} className="space-y-8">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold text-foreground">{category.title}</h2>
              </div>

              {/* Treatments Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.treatments.map((treatment, index) => (
                  <Card key={index} className="treatment-card group cursor-pointer">
                    <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                      <img
                        src={treatment.image}
                        alt={treatment.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Treatments;
