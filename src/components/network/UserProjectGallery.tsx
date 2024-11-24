import { Project } from "@/types/project";
import { ProjectCard } from "../ProjectCard";

interface UserProjectGalleryProps {
  projects: Project[];
}

export const UserProjectGallery = ({ projects }: UserProjectGalleryProps) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun projet trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};