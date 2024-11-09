import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { projects as initialProjects } from "@/data/projects";

export default function Index() {
  const [projects, setProjects] = useState(initialProjects);

  const handleCreateProject = (project: any) => {
    setProjects((prev) => [...prev, project]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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