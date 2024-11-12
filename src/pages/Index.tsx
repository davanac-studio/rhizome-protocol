import React from 'react';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { CommunityLevels } from '@/components/home/CommunityLevels';
import { CallToAction } from '@/components/home/CallToAction';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <Features />
      <CommunityLevels />
      <CallToAction />
    </div>
  );
}