import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { NewProjectDialog } from "@/components/NewProjectDialog";
import { Project } from "@/types/project";

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Website Redesign",
      description: "Complete overhaul of the company website with modern design principles and improved user experience.",
      status: "In Progress",
      progress: 65,
      dueDate: "2024-03-15",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Creating a new mobile application for both iOS and Android platforms.",
      status: "Planning",
      progress: 20,
      dueDate: "2024-04-30",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
  ]);

  const handleCreateProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Project Pulse</h1>
          <NewProjectDialog onProjectCreate={handleCreateProject} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;