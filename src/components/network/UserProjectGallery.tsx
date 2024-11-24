import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface UserProjectGalleryProps {
  userId: string;
}

interface ProjectData {
  id: string;
  title: string;
  thumbnail: string;
}

interface ProjectParticipant {
  project: ProjectData | null;
}

export const UserProjectGallery = ({ userId }: UserProjectGalleryProps) => {
  const navigate = useNavigate();
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['user-projects', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, thumbnail')
        .or(`team_leader.eq.${userId},client.eq.${userId}`)
        .limit(6);

      if (error) throw error;

      // Get projects where user is a participant
      const { data: participantProjects, error: participantError } = await supabase
        .from('project_participants')
        .select('project:projects(id, title, thumbnail)')
        .eq('user_id', userId)
        .limit(6);

      if (participantError) throw participantError;

      const participantProjectsData = (participantProjects as ProjectParticipant[])
        ?.map(pp => pp.project)
        .filter((project): project is ProjectData => project !== null) || [];

      // Combine and deduplicate projects
      const allProjects = [
        ...(data || []),
        ...participantProjectsData
      ];

      // Remove duplicates based on project id
      return Array.from(
        new Map(allProjects.map(project => [project.id, project])).values()
      );
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="aspect-video animate-pulse bg-gray-200" />
        ))}
      </div>
    );
  }

  if (!projects?.length) {
    return <p className="text-muted-foreground">Aucun projet trouvé</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {projects.map((project) => (
        <Card 
          key={project.id}
          className="relative aspect-video cursor-pointer overflow-hidden group"
          onClick={() => navigate(`/project/${project.id}`)}
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <h3 className="text-white font-medium line-clamp-2 text-sm">
              {project.title}
            </h3>
          </div>
        </Card>
      ))}
    </div>
  );
};