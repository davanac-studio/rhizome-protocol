import { useEffect, useState } from "react";
import { Project } from "@/types/project";
import { fetchUserProjects } from "@/utils/projectQueries";
import { ProjectCard } from "@/components/ProjectCard";
import { useToast } from "@/components/ui/use-toast";

interface ProfileProjectsProps {
  username: string;
}

export const ProfileProjects = ({ username }: ProfileProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const userProjects = await fetchUserProjects(username);
        setProjects(userProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les projets",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [username, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-gray-600">Chargement des projets...</p>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Aucun projet trouvé</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};