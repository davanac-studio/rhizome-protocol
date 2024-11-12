import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProjectCard } from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

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
      return data;
    },
  });

  if (error) {
    toast({
      title: "Erreur",
      description: "Impossible de charger les projets",
      variant: "destructive",
    });
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Nos Projets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-52 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))
        ) : projects?.map((project) => (
          <ProjectCard
            key={project.id}
            project={{
              id: project.id,
              title: project.title,
              description: project.description,
              dueDate: project.due_date,
              thumbnail: project.thumbnail,
              category: project.category,
              client: project.client,
              testimonial: project.testimonial,
              author: {
                name: `${project.team_leader_profile.first_name} ${project.team_leader_profile.last_name}`,
                username: project.team_leader_profile.username || '',
                avatar: project.team_leader_profile.avatar_url,
                role: "Team Leader",
                contribution: project.team_leader_contribution || 0,
                contributionDescription: project.team_leader_contribution_description
              },
              participants: project.project_participants?.map(p => ({
                name: `${p.user.first_name} ${p.user.last_name}`,
                username: p.user.username || '',
                avatar: p.avatar || p.user.avatar_url,
                role: "Member",
                contribution: p.contribution,
                contributionDescription: p.contribution_description
              })) || [],
              links: {
                github: project.github_link || '',
                preview: project.preview_link || ''
              }
            }}
          />
        ))}
      </div>
    </section>
  );
};