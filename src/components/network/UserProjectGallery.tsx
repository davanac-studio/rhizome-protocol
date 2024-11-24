import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { generateProjectSlug } from "@/utils/slugify";

interface Project {
  id: string;
  title: string;
  thumbnail: string;
}

interface UserProjectGalleryProps {
  userId: string;
}

export const UserProjectGallery = ({ userId }: UserProjectGalleryProps) => {
  const navigate = useNavigate();

  const { data: projects } = useQuery({
    queryKey: ['user-projects', userId],
    queryFn: async () => {
      const { data: projects } = await supabase
        .from('projects')
        .select('id, title, thumbnail')
        .or(`team_leader.eq.${userId},project_participants.user_id.eq.${userId},client.eq.${userId}`);
      
      return projects || [];
    }
  });

  const handleProjectClick = (projectId: string, title: string) => {
    const slug = generateProjectSlug(title, projectId);
    navigate(`/project/${slug}`);
  };

  if (!projects?.length) {
    return <p className="text-sm text-muted-foreground">Aucun projet</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {projects.map((project) => (
        <div key={project.id} className="space-y-2">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-24 object-cover rounded-md"
          />
          <button
            onClick={() => handleProjectClick(project.id, project.title)}
            className="text-sm font-medium hover:underline text-left w-full truncate"
          >
            {project.title}
          </button>
        </div>
      ))}
    </div>
  );
};