import React from 'react';
import { Link } from 'react-router-dom';

const NetworkSVG = () => (
  <svg viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <defs>
      <linearGradient id="fond" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#f0f7f4", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#e1efe6", stopOpacity: 1 }} />
      </linearGradient>
      
      <filter id="glow">
        <feGaussianBlur stdDeviation="0.8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Fond */}
    <rect width="100%" height="100%" fill="url(#fond)" />

    {/* Réseau totalement interconnecté avec courbes organiques */}
    <g filter="url(#glow)">
      {/* Connexions depuis P1 (100,150) */}
      <path d="M 100,150 C 200,100 250,120 300,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 100,150 C 250,220 350,180 500,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 100,150 C 300,50 500,250 700,150" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 100,150 C 400,100 600,150 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 100,150 C 500,250 800,150 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />

      {/* Connexions depuis P2 (300,100) */}
      <path d="M 300,100 C 350,180 450,150 500,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 300,100 C 450,50 550,200 700,150" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 300,100 C 500,180 700,50 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 300,100 C 600,250 850,150 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />

      {/* Connexions depuis P3 (500,200) */}
      <path d="M 500,200 C 550,150 650,180 700,150" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 500,200 C 650,250 750,150 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 500,200 C 700,150 900,250 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />

      {/* Connexions depuis P4 (700,150) */}
      <path d="M 700,150 C 750,100 850,150 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 700,150 C 850,200 950,150 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />

      {/* Connexions depuis P5 (900,100) */}
      <path d="M 900,100 C 950,150 1050,180 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />

      {/* Connexions supplémentaires pour densité */}
      <path d="M 100,150 C 300,250 500,50 700,150" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 300,100 C 500,200 700,100 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 500,200 C 700,250 900,150 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 200,150 C 400,50 600,250 800,150" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 400,100 C 600,180 800,80 1000,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      
      {/* Connexions croisées */}
      <path d="M 100,150 C 400,250 700,50 1000,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 200,150 C 500,50 800,250 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 300,100 C 600,200 900,100 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 100,150 C 400,180 700,120 1000,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      
      {/* Connexions ondulantes */}
      <path d="M 200,150 Q 400,100 600,200 T 1000,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 300,100 Q 500,200 700,150 T 1100,200" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M 100,150 Q 300,200 500,100 T 900,100" stroke="#2a9d8f" strokeWidth="1" opacity="0.3" fill="none" />
    </g>

    {/* Points d'influence avec animations variées */}
    <g>
      <circle cx="100" cy="150" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="3;7;3" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="100" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="4;8;4" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="500" cy="200" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="2;6;2" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.5;0.8" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="700" cy="150" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="3;8;3" dur="4.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="4.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="900" cy="100" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="4;7;4" dur="3.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="1100" cy="200" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="2;8;2" dur="4.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="4.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="150" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="3;6;3" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.5;0.8" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="400" cy="100" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="4;7;4" dur="4.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="4.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="600" cy="200" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="2;8;2" dur="3.9s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3.9s" repeatCount="indefinite" />
      </circle>
      <circle cx="800" cy="150" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="3;7;3" dur="4.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="4.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="1000" cy="100" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="4;8;4" dur="3.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3.6s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden mb-12">
        <NetworkSVG />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Rhizome Protocol
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Construisez votre réputation professionnelle de manière transparente et décentralisée
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-bold mb-8">À propos de Rhizome Protocol</h1>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Notre Vision</h2>
          <p>
            Dans un monde professionnel de plus en plus collaboratif et décentralisé, nous imaginons un avenir où la confiance et la reconnaissance des contributions individuelles sont garanties par la technologie. Rhizome Protocol aspire à devenir la référence en matière de certification et de validation des contributions professionnelles, permettant à chacun de construire une réputation vérifiable et inaltérable.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Notre Mission</h2>
          <p>
            Rhizome Protocol a pour mission de révolutionner la façon dont les professionnels documentent, valident et partagent leurs contributions aux projets. Nous créons un écosystème transparent où :
          </p>
          <ul>
            <li>Chaque contribution est certifiée sur la blockchain</li>
            <li>Les compétences sont validées par les pairs</li>
            <li>Les réalisations sont immortalisées sous forme de NFTs</li>
            <li>La confiance est établie de manière décentralisée</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Nos Valeurs</h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">1. Transparence</h3>
          <ul>
            <li>Certification immuable des contributions</li>
            <li>Processus de validation transparent</li>
            <li>Historique complet et vérifiable des projets</li>
            <li>Documentation accessible et publique</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. Confiance</h3>
          <ul>
            <li>Validation multi-parties des contributions</li>
            <li>Certification client intégrée</li>
            <li>Système de réputation basé sur les $DAVANAC</li>
            <li>Vérification d'identité sécurisée</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">3. Reconnaissance</h3>
          <ul>
            <li>NFTs non-cessibles comme preuves de contribution</li>
            <li>Système de niveaux DAVANAC</li>
            <li>Valorisation des compétences spécifiques</li>
            <li>Portfolio professionnel vérifié</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. Collaboration</h3>
          <ul>
            <li>Promotion du travail d'équipe</li>
            <li>Validation par les pairs</li>
            <li>Partage des connaissances</li>
            <li>Communauté active</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">5. Innovation</h3>
          <ul>
            <li>Utilisation de la blockchain Polygon</li>
            <li>Stockage décentralisé IPFS</li>
            <li>Smart contracts évolutifs</li>
            <li>Interface utilisateur intuitive</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Notre Technologie</h2>
          <p>
            Rhizome Protocol s'appuie sur des technologies de pointe pour garantir fiabilité et transparence :
          </p>
          <ul>
            <li><strong>Blockchain Polygon</strong> : Pour des transactions rapides et économiques</li>
            <li><strong>Smart Contracts</strong> : Pour une logique métier immuable et transparente</li>
            <li><strong>IPFS</strong> : Pour un stockage décentralisé et pérenne</li>
            <li><strong>NFTs</strong> : Pour certifier les contributions de manière unique</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Notre Communauté</h2>
          <p>La plateforme s'articule autour de trois niveaux de reconnaissance :</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">DAVANAC Initié (0-1000 $DAVANAC)</h3>
          <ul>
            <li>Premiers pas dans l'écosystème</li>
            <li>Accès aux fonctionnalités de base</li>
            <li>Création limitée de projets</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">DAVANAC Expert (1001-5000 $DAVANAC)</h3>
          <ul>
            <li>Reconnaissance établie</li>
            <li>Création illimitée de projets</li>
            <li>Participation aux votes communautaires</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">DAVANAC Master (5001+ $DAVANAC)</h3>
          <ul>
            <li>Excellence reconnue</li>
            <li>Statut d'ambassadeur</li>
            <li>Rôle actif dans la gouvernance</li>
            <li>Mentorat de la communauté</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Impact et Objectifs</h2>
          <p>Rhizome Protocol vise à :</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">1. Renforcer la Confiance Professionnelle</h3>
          <ul>
            <li>Certification vérifiable des contributions</li>
            <li>Élimination des fausses déclarations</li>
            <li>Validation par les pairs et les clients</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. Valoriser les Talents</h3>
          <ul>
            <li>Reconnaissance tangible des compétences</li>
            <li>Portfolio professionnel vérifié</li>
            <li>Historique de contributions certifié</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">3. Faciliter la Collaboration</h3>
          <ul>
            <li>Processus de validation transparent</li>
            <li>Attribution équitable des contributions</li>
            <li>Documentation claire des rôles</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. Innover dans la Gestion de Réputation</h3>
          <ul>
            <li>Système de tokens $DAVANAC</li>
            <li>NFTs comme certificats de contribution</li>
            <li>Niveaux de reconnaissance évolutifs</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Rejoignez-nous</h2>
          <p>
            Contribuez à construire l'avenir de la certification professionnelle en rejoignant Rhizome Protocol. Ensemble, créons un écosystème où la confiance, la reconnaissance et la collaboration sont au cœur de chaque interaction professionnelle.
          </p>

          <div className="mt-8 mb-12">
            <Link 
              to="/signup"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Commencer maintenant →
            </Link>
          </div>

          <hr className="my-8" />

          <p className="text-center italic">Rhizome Protocol - Certifier. Valoriser. Innover.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
