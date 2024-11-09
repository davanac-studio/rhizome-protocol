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

  return (
    <div className="min-h-screen bg-gray-50">
      <div 
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url("https://drive.usercontent.google.com/download?id=1Hf-V-wjzy9nhtZwHU6gqDxZ0_FST6Im0&export=view&authuser=0")`,
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