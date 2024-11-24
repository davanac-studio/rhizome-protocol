import { Project } from "@/types/project";
import { ProjectCard } from "../ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { transformAndDeduplicateProjects } from "@/utils/projectDataTransformers";

interface UserProjectGalleryProps {
  userId: string;
}

export const UserProjectGallery = ({ userId }: UserProjectGalleryProps) => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['userProjects', userId],
    queryFn: async () => {
      const { data: projectsData, error } = await supabase
        .from('projects')
        .select(`
          *,
          team_leader_profile:profiles!projects_team_leader_fkey(
            id,
            first_name,
            last_name,
            username,
            avatar_url,
            expertise
          ),
          project_participants(
            contribution,
            contribution_description,
            avatar,
            user:profiles!project_participants_user_id_fkey(
              id,
              first_name,
              last_name,
              username,
              avatar_url,
              expertise
            )
          )
        `)
        .or(`team_leader.eq.${userId},and(project_participants.user_id.eq.${userId})`);

      if (error) throw error;
      return transformAndDeduplicateProjects(projectsData || []);
    }
  });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Chargement des projets...</p>
      </div>
    );
  }

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