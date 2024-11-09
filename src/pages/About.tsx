import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
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
  );
};

export default About;