import { ProjectCard } from "@/components/ProjectCard";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
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
          team_leader_profile:profiles!projects_team_leader_fkey (
            id,
            first_name,
            last_name,
            username,
            avatar_url,
            expertise
          ),
          project_participants (
            participant:profiles!project_participants_user_id_fkey (
              id,
              first_name,
              last_name,
              username,
              avatar_url,
              expertise
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

      const leaderProjects = teamLeaderProjects ? 
        teamLeaderProjects.map((project: any) => ({
          ...project,
          author: {
            ...project.team_leader_profile,
            role: "Team Leader",
            contribution: project.team_leader_contribution,
            contributionDescription: project.team_leader_contribution_description
          },
          participants: project.project_participants?.map((p: any) => ({
            ...p.participant,
            role: "Member",
            contribution: p.contribution,
            contributionDescription: p.contribution_description
          })) || []
        })).map(transformDatabaseProject) : [];

      // Fetch projects where user is a participant
      const { data: participantProjects, error: participantError } = await supabase
        .from('project_participants')
        .select(`
          projects (
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
              participant:profiles!project_participants_user_id_fkey (
                id,
                first_name,
                last_name,
                username,
                avatar_url,
                expertise
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

      const participatingProjects = participantProjects ? 
        participantProjects
          .filter((item: any) => item.projects !== null)
          .map((item: any) => ({
            ...item.projects,
            author: {
              ...item.projects.team_leader_profile,
              role: "Team Leader",
              contribution: item.projects.team_leader_contribution,
              contributionDescription: item.projects.team_leader_contribution_description
            },
            participants: item.projects.project_participants?.map((p: any) => ({
              ...p.participant,
              role: "Member",
              contribution: p.contribution,
              contributionDescription: p.contribution_description
            })) || []
          })).map(transformDatabaseProject) : [];

      // Remove duplicates based on project ID
      const uniqueProjects = [...leaderProjects, ...participatingProjects].filter(
        (project, index, self) =>
          index === self.findIndex((p) => p.id === project.id)
      );

      return uniqueProjects;
    },
    staleTime: 1000, // Add a small stale time to prevent immediate refetches
    gcTime: 5 * 60 * 1000, // Changed from cacheTime to gcTime for v5 compatibility
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