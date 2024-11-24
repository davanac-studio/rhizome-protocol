import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProjectCard } from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ProjectGallery = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          team_leader_profile:profiles!projects_team_leader_fkey (
            id,
            first_name,
            last_name,
            username,
            avatar_url,
            expertise
          ),
          client_profile:profiles!projects_client_fkey (
            id,
            first_name,
            last_name
          ),
          project_participants (
            user:profiles!project_participants_user_id_fkey (
              id,
              first_name,
              last_name,
              username,
              avatar_url,
              expertise
            ),
            contribution,
            contribution_description,
            avatar
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data?.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        dueDate: project.due_date,
        thumbnail: project.thumbnail,
        category: project.category,
        client: project.client_profile ? 
          `${project.client_profile.first_name} ${project.client_profile.last_name}`.trim() : 
          project.client || "Non spécifié",
        testimonial: project.testimonial,
        author: {
          id: project.team_leader_profile.id,
          name: `${project.team_leader_profile.first_name} ${project.team_leader_profile.last_name}`,
          username: project.team_leader_profile.username || '',
          avatar: project.team_leader_profile.avatar_url,
          expertise: project.team_leader_profile.expertise,
          role: "Team Leader" as const,
          contribution: project.team_leader_contribution || 0,
          contributionDescription: project.team_leader_contribution_description
        },
        participants: project.project_participants?.map(p => ({
          id: p.user.id,
          name: `${p.user.first_name} ${p.user.last_name}`,
          username: p.user.username || '',
          avatar: p.avatar || p.user.avatar_url,
          expertise: p.user.expertise,
          role: "Member" as const,
          contribution: p.contribution,
          contributionDescription: p.contribution_description
        })) || [],
        links: {
          demo_link_1: project.demo_link_1 || '',
          preview: project.preview_link || '',
          demo_link_3: project.demo_link_3 || '',
          demo_link_4: project.demo_link_4 || ''
        }
      })) || [];
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[500px] w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mx-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Une erreur est survenue lors du chargement des projets.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Projets de la communauté
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};