// Index.tsx

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sparkles, Clock, Star, ArrowRight } from "lucide-react";
import heroImage from "@/assets/close-up-brunette-woman-with-cream-jar.jpg";

const Index = () => {
  const popularTreatments = [
    {
      name: "HydraFacial",
      description:
        "Soin du visage en profondeur : nettoyage et hydratation pour une peau éclatante.",
      price: 120,
      duration: "60 min",
      rating: 5,
      category: "Visage",
       image: "/Hydrafacial treatment (2).jpg"
    },
    {
      name: "Microblading",
      description:
        "Sublimation semi-permanente des sourcils pour un résultat naturel.",
      price: 180,
      duration: "120 min",
      rating: 5,
      category: "Visage",
      image: "/Le microblading, nouvelle méthode pour des sourcils de rêve.jpg"
    },
    {
      name: "Répulpeur des lèvres",
      description: "Repulpez vos lèvres pour un effet naturel et irrésistible.",
      price: 90,
      duration: "60 min",
      rating: 5,
      category: "Visage",
      image: "/How Long Does Bruising Last After Lip Fillers____.jpg"
    },
  ];

  const projects = [
    { id: 1, title: "Hydrafacial", image: "/Benefits of Retinol. - 2025-06-24T224848.398.png" },
    { id: 2, title: "Rehaussement de cils", image: "/Benefits of Retinol. - 2025-06-27T230638.812.png" },
    { id: 3, title: "Microblading", image: "/Benefits of Retinol. - 2025-06-25T234810.887.png" },
    { id: 4, title: "Microshading", image: "/correction - 2025-09-03T230939.147.png" },
    { id: 5, title: "Répulpeur des lèvres", image: "/correction - 2025-06-29T203106.931.png" },
    { id: 6, title: "Blanchiment des dents", image: "/correction - 2025-09-07T112010.491.png" },
  ];

  return (
    <div className="min-h-screen bg-[#f3e1e3]">
      {/* Section Héro */}
      <section className="relative min-h-[95vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0" />
        </div>

        <div className="relative container mx-auto px-4 transform -translate-y-20">
          <div className="max-w-2xl space-y-7">
            <Badge variant="secondary" className="w-fit bg-[#d2a3a8c9]">
              Centre de Beauté Professionnel
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-5xl font-bold text-foreground leading-tight">
              Transformez Votre Look
              <span className="hero-text block mt-4">Avec des Soins Experts</span>
            </h1>

            <p className="text-sm text-black leading-relaxed max-w-lg">
              Vivez l’expérience de soins de beauté luxueux grâce à nos services experts
              dans notre centre de beauté haut de gamme. Des soins professionnels pour des résultats exceptionnels.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-[#b2525c] text-white text-lg px-8 py-6 gold-shimmer">
                <Link to="/booking">
                  <Calendar className="w-5 h-5 mr-3" />
                  Réservez Votre Rendez-vous
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/treatments">
                  Voir Tous les Soins
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Soins Populaires */}
      {/* Section Soins Populaires */}
<section className="py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <Badge variant="secondary" className="mb-4 bg-[#d2a3a8c9]">
        Les Plus Populaires
      </Badge>
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
        <span className="hero-text">Soins en Vedette</span>
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Découvrez nos soins de beauté les plus prisés, appréciés pour leurs résultats exceptionnels et leur expérience luxueuse.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {popularTreatments.map((treatment, index) => (
        <Card key={index} className="treatment-card group cursor-pointer">
          <div className="aspect-[4/3] rounded-lg mb-6 overflow-hidden relative">
            {/* ✅ Add image here */}
            {treatment.image ? (
              <img
                src={treatment.image}
                alt={treatment.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                <span className="text-muted-foreground">Image à venir</span>
              </div>
            )}

            <Badge className="absolute top-4 left-4" variant="secondary">
              {treatment.category}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {treatment.name}
              </h3>
              <div className="flex items-center space-x-1">
                {[...Array(treatment.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {treatment.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{treatment.duration}</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {treatment.price}€
              </div>
            </div>

            <Button asChild className="w-full bg-[#b2525c] text-white">
              <Link to="/booking">Réserver ce Soin</Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>

    <div className="text-center mt-12">
      <Button asChild variant="outline" size="lg" className="px-8">
        <Link to="/treatments">
          Voir Tous les Soins
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </Button>
    </div>
  </div>
</section>


      {/* Section Projets */}
      <section className="py-20 -mt-17 bg-white">
        <div className="pt-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 -translate-y-20">
              Un Aperçu de <span className="hero-text">Notre Travail</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto -translate-y-16">
              Plongez dans l’univers de nos soins d’exception, conçus pour sublimer votre beauté et vous offrir une expérience unique.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
              {projects.map((project) => (
                <div key={project.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 " />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-center">{project.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Appel à l'Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="glass-card p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Prête à Transformer Votre <span className="hero-text">Beauté ?</span>
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Rejoignez des milliers de clientes satisfaites qui nous font confiance pour leurs besoins beauté.
                Réservez votre rendez-vous dès aujourd’hui et découvrez la différence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button asChild size="lg" className="bg-[#b2525c] text-white text-lg px-8 py-6">
                  <Link to="/booking">
                    <Calendar className="w-5 h-5 mr-3" />
                    Réserver Maintenant
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Link to="/contact">Contactez-nous</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
