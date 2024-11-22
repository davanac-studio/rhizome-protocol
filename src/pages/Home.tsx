import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { CommunityLevels } from "@/components/home/CommunityLevels";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { CallToAction } from "@/components/home/CallToAction";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <CommunityLevels />
      <ProjectGallery />
      <CallToAction />
    </div>
  );
};

export default Home;