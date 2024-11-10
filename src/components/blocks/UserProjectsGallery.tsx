import { ProjectCard } from "@/components/ProjectCard";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { DatabaseProject } from "@/types/database";
import { transformDatabaseProject } from "@/utils/projectTransformers";

export const UserProjectsGallery = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['userProjects', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        console.log('No user ID found');
        return [];
      }

      // Fetch projects where user is team leader
      const { data: teamLeaderProjects, error: leaderError } = await supabase
        .from('projects')
        .select(`
          *,
          team_leader_profile:profiles!inner(
            id,
            first_name,
            last_name,
            username,
            avatar_url,
            expertise,
            role
          ),
          participants:project_participants(
            user:profiles!inner(
              id,
              first_name,
              last_name,
              username,
              avatar_url,
              expertise,
              role
            ),
            contribution,
            contribution_description
          )
        `)
        .eq('team_leader', user.id);

      if (leaderError) {
        console.error('Error fetching team leader projects:', leaderError);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos projets en tant que team leader",
          variant: "destructive",
        });
        return [];
      }

      // Transform team leader projects
      const leaderProjects = teamLeaderProjects ? 
        teamLeaderProjects.map((project: any) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          due_date: project.due_date,
          thumbnail: project.thumbnail,
          category: project.category,
          client: project.client,
          team_leader: project.team_leader,
          team_leader_contribution: project.team_leader_contribution,
          team_leader_contribution_description: project.team_leader_contribution_description,
          author: project.team_leader_profile,
          participants: project.participants?.map((p: any) => ({
            ...p.user,
            contribution: p.contribution,
            contribution_description: p.contribution_description
          })) || [],
          github_link: project.github_link,
          preview_link: project.preview_link
        })).map(transformDatabaseProject) : [];

      // Fetch projects where user is a participant
      const { data: participantProjects, error: participantError } = await supabase
        .from('project_participants')
        .select(`
          projects!inner (
            *,
            team_leader_profile:profiles!inner(
              id,
              first_name,
              last_name,
              username,
              avatar_url,
              expertise,
              role
            ),
            participants:project_participants(
              user:profiles!inner(
                id,
                first_name,
                last_name,
                username,
                avatar_url,
                expertise,
                role
              ),
              contribution,
              contribution_description
            )
          )
        `)
        .eq('user_id', user.id);

      if (participantError) {
        console.error('Error fetching participant projects:', participantError);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos projets en tant que participant",
          variant: "destructive",
        });
        return leaderProjects;
      }

      // Transform participant projects
      const participatingProjects = participantProjects ? 
        participantProjects.map((item: any) => ({
          id: item.projects.id,
          title: item.projects.title,
          description: item.projects.description,
          due_date: item.projects.due_date,
          thumbnail: item.projects.thumbnail,
          category: item.projects.category,
          client: item.projects.client,
          team_leader: item.projects.team_leader,
          team_leader_contribution: item.projects.team_leader_contribution,
          team_leader_contribution_description: item.projects.team_leader_contribution_description,
          author: item.projects.team_leader_profile,
          participants: item.projects.participants?.map((p: any) => ({
            ...p.user,
            contribution: p.contribution,
            contribution_description: p.contribution_description
          })) || [],
          github_link: item.projects.github_link,
          preview_link: item.projects.preview_link
        })).map(transformDatabaseProject) : [];

      // Remove duplicates based on project ID
      const uniqueProjects = [...leaderProjects, ...participatingProjects].filter(
        (project, index, self) =>
          index === self.findIndex((p) => p.id === project.id)
      );

      return uniqueProjects;
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Chargement de vos projets...</p>
      </div>
    );
  }

  if (!projects?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Vous n'avez pas encore de projets</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Vos Projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};