import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Users, BookOpen, Shield } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3)"
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
            Rhizome Protocol
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fadeIn">
            Certification décentralisée pour les projets culturels et créatifs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Comment ça marche ?
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">
                Rejoindre la communauté
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Notre Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparence Absolue</h3>
              <p className="text-gray-600">
                Certification immuable sur la blockchain de chaque contribution professionnelle
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Confiance Décentralisée</h3>
              <p className="text-gray-600">
                Système sophistiqué de validation multi-parties et réputation basée sur les $DAVANAC
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reconnaissance Méritocratique</h3>
              <p className="text-gray-600">
                NFTs non-cessibles comme preuves tangibles de contribution
              </p>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation Technologique</h3>
              <p className="text-gray-600">
                Infrastructure blockchain Polygon et stockage décentralisé IPFS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Levels Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Niveaux d'Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-semibold mb-4">DAVANAC Initié</h3>
              <p className="text-gray-600 mb-4">0-1000 $DAVANAC</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Accès aux fonctionnalités essentielles</li>
                <li>• Première immersion dans l'écosystème</li>
                <li>• Création encadrée de projets</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-primary">
              <h3 className="text-2xl font-semibold mb-4">DAVANAC Expert</h3>
              <p className="text-gray-600 mb-4">1001-5000 $DAVANAC</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Création illimitée de projets</li>
                <li>• Participation active à la gouvernance</li>
                <li>• Reconnaissance établie dans l'écosystème</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-semibold mb-4">DAVANAC Master</h3>
              <p className="text-gray-600 mb-4">5001+ $DAVANAC</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Statut d'ambassadeur</li>
                <li>• Rôle clé dans la gouvernance</li>
                <li>• Mission de mentorat communautaire</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Rejoignez la Révolution
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ensemble, construisons un écosystème où la confiance, la reconnaissance et la collaboration définissent chaque interaction professionnelle.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100">
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}