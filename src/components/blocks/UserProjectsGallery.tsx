import { Project } from "@/types/project";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

interface UserProjectsGalleryProps {
  username: string;  // Changed from userName to username to match usage
}

export const UserProjectsGallery = ({ username }: UserProjectsGalleryProps) => {
  // Updated parameter name in the function to match
  const userProjects = projectsData.filter(project => {
    const isLeader = project.author.username === username;
    const isParticipant = project.participants?.some(
      participant => participant.username === username
    );
    return isLeader || isParticipant;
  });

  if (userProjects.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Aucun projet trouvé pour cet utilisateur
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};