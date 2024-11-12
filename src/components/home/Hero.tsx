import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NetworkBackground } from './NetworkBackground';

export const Hero = () => {
  return (
    <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
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
              Manifesto
            </Button>
          </Link>
          <Link to="/users">
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-primary border-primary">
              Qui participe ?
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};