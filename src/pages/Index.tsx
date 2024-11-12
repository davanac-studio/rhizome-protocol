import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Users, BookOpen, Shield } from "lucide-react";

const NetworkBackground = () => (
  <svg viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <defs>
      <linearGradient id="fond" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor:"#f0f7f4",stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#e1efe6",stopOpacity:1}} />
      </linearGradient>
      
      <filter id="glow">
        <feGaussianBlur stdDeviation="0.8" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <rect width="100%" height="100%" fill="url(#fond)"/>

    <g filter="url(#glow)">
      <path d="M 100,150 C 200,100 250,120 300,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 250,220 350,180 500,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 300,50 500,250 700,150" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 400,100 600,150 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 500,250 800,150 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 350,180 450,150 500,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 450,50 550,200 700,150" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 500,180 700,50 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 600,250 850,150 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 500,200 C 550,150 650,180 700,150" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 500,200 C 650,250 750,150 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 500,200 C 700,150 900,250 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 700,150 C 750,100 850,150 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 700,150 C 850,200 950,150 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 900,100 C 950,150 1050,180 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 300,250 500,50 700,150" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 500,200 700,100 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 500,200 C 700,250 900,150 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 200,150 C 400,50 600,250 800,150" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 400,100 C 600,180 800,80 1000,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 400,250 700,50 1000,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 200,150 C 500,50 800,250 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 600,200 900,100 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 400,180 700,120 1000,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 200,150 Q 400,100 600,200 T 1000,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 Q 500,200 700,150 T 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 Q 300,200 500,100 T 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none"/>
    </g>

    <g>
      {[
        { cx: 100, cy: 150, dur: "4s" },
        { cx: 300, cy: 100, dur: "3.2s" },
        { cx: 500, cy: 200, dur: "5s" },
        { cx: 700, cy: 150, dur: "4.5s" },
        { cx: 900, cy: 100, dur: "3.8s" },
        { cx: 1100, cy: 200, dur: "4.2s" },
        { cx: 200, cy: 150, dur: "3.5s" },
        { cx: 400, cy: 100, dur: "4.8s" },
        { cx: 600, cy: 200, dur: "3.9s" },
        { cx: 800, cy: 150, dur: "4.4s" },
        { cx: 1000, cy: 100, dur: "3.6s" }
      ].map((point, i) => (
        <circle key={i} cx={point.cx} cy={point.cy} r="4" fill="#e76f51" opacity="0.8">
          <animate attributeName="r" values="3;7;3" dur={point.dur} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur={point.dur} repeatCount="indefinite"/>
        </circle>
      ))}
    </g>
  </svg>
);

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <NetworkBackground />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fadeIn">
            Rhizome Protocol
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto animate-fadeIn">
            Certification décentralisée pour les projets culturels et créatifs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Comment ça marche ?
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-primary border-primary">
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