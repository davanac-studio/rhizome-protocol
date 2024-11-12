import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CallToAction = () => {
  return (
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
  );
};