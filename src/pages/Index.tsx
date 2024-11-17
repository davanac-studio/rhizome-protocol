import React from 'react';
import { Hero } from '@/components/home/Hero';
import { ProjectGallery } from '@/components/home/ProjectGallery';
import { ParticipantNetwork } from '@/components/network/ParticipantNetwork';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <ParticipantNetwork />
      </div>
      <ProjectGallery />
    </div>
  );
}