import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { projectsData } from "@/data/projects";

export default function Index() {
  const sortedProjects = [...projectsData].sort((a, b) => 
    new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
  );
  
  const [projects, setProjects] = useState(sortedProjects);

  const handleCreateProject = (project: any) => {
    const updatedProjects = [project, ...projects].sort((a, b) => 
      new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );
    setProjects(updatedProjects);
  };

  const svgBackground = `data:image/svg+xml,${encodeURIComponent(`<svg viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fond" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#f0f7f4;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#e1efe6;stop-opacity:1" />
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
      <path d="M 100,150 C 200,100 250,120 300,100" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 250,220 350,180 500,200" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 300,50 500,250 700,150" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 400,100 600,150 900,100" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 500,250 800,150 1100,200" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 350,180 450,150 500,200" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 450,50 550,200 700,150" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 500,180 700,50 900,100" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 600,250 850,150 1100,200" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 500,200 C 550,150 650,180 700,150" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 500,200 C 650,250 750,150 900,100" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 500,200 C 700,150 900,250 1100,200" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 700,150 C 750,100 850,150 900,100" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 700,150 C 850,200 950,150 1100,200" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 900,100 C 950,150 1050,180 1100,200" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 300,250 500,50 700,150" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 500,200 700,100 900,100" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 500,200 C 700,250 900,150 1100,200" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 200,150 C 400,50 600,250 800,150" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 400,100 C 600,180 800,80 1000,100" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 400,250 700,50 1000,100" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 200,150 C 500,50 800,250 1100,200" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 C 600,200 900,100 1100,200" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 C 400,180 700,120 1000,100" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 200,150 Q 400,100 600,200 T 1000,100" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 300,100 Q 500,200 700,150 T 1100,200" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
      <path d="M 100,150 Q 300,200 500,100 T 900,100" stroke="#2a9d8f" stroke-width="1" opacity="0.3" fill="none"/>
    </g>
  
    <g>
      <circle cx="100" cy="150" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="3;7;3" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="300" cy="100" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="4;8;4" dur="3.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="500" cy="200" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="2;6;2" dur="5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.5;0.8" dur="5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="700" cy="150" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="3;8;3" dur="4.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="4.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="900" cy="100" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="4;7;4" dur="3.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1100" cy="200" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="2;8;2" dur="4.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="4.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="200" cy="150" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="3;6;3" dur="3.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.5;0.8" dur="3.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="400" cy="100" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="4;7;4" dur="4.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="4.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="600" cy="200" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="2;8;2" dur="3.9s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3.9s" repeatCount="indefinite"/>
      </circle>
      <circle cx="800" cy="150" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="3;7;3" dur="4.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="4.4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="1000" cy="100" r="4" fill="#e76f51" opacity="0.8">
        <animate attributeName="r" values="4;8;4" dur="3.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3.6s" repeatCount="indefinite"/>
      </circle>
    </g>
  </svg>`)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url("${svgBackground}")`,
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="text-center text-white z-10 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Collaborez avec confiance
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto px-4">
            Une plateforme qui réunit les talents et les projets dans un environnement de confiance et d'innovation
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}