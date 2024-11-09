import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">À propos de Rhizome Protocol</h1>
        
        <div className="prose prose-lg">
          <p className="mb-4">
            Rhizome Protocol est une plateforme innovante dédiée à la certification décentralisée
            des projets culturels et créatifs. Notre mission est de créer un écosystème transparent
            et collaboratif pour soutenir et valoriser les initiatives créatives.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Notre Vision</h2>
          <p className="mb-4">
            Nous croyons en un monde où la créativité et la culture sont accessibles à tous,
            où les projets artistiques et culturels peuvent être certifiés et reconnus de
            manière décentralisée, garantissant ainsi leur authenticité et leur valeur.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Notre Approche</h2>
          <p className="mb-4">
            En utilisant des technologies décentralisées, nous offrons une plateforme
            qui permet aux créateurs, aux institutions culturelles et aux amateurs d'art
            de collaborer et de certifier des projets de manière transparente et sécurisée.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;