import React from 'react';
import { Hero } from '@/components/home/Hero';
import { ProjectGallery } from '@/components/home/ProjectGallery';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <ProjectGallery />
    </div>
  );
}