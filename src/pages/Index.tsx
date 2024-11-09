import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { projectsData } from "@/data/projects";

export default function Index() {
  // Sort projects by date in descending order (most recent first)
  const sortedProjects = [...projectsData].sort((a, b) => 
    new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
  );
  
  const [projects, setProjects] = useState(sortedProjects);

  const handleCreateProject = (project: any) => {
    // Add new project and re-sort the list
    const updatedProjects = [project, ...projects].sort((a, b) => 
      new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );
    setProjects(updatedProjects);
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