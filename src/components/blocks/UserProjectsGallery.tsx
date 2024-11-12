import { ProjectCard } from "@/components/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { transformDatabaseProject } from "@/utils/projectTransformers";
import { useParams } from "react-router-dom";

export const UserProjectsGallery = () => {
  const { username } = useParams();
  const { toast } = useToast();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['userProjects', username],
    queryFn: async () => {
      if (!username) {
        console.log('No username found');
        return [];
      }

      // First, get the user's profile ID from their username
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        toast({
          title: "Erreur",
          description: "Impossible de charger le profil",
          variant: "destructive",
        });
        return [];
      }

      if (!profile?.id) {
        console.log('No profile found for username:', username);
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
        .eq('team_leader', profile.id);

      if (leaderError) {
        console.error('Error fetching team leader projects:', leaderError);
        toast({
          title: "Erreur",
          description: "Impossible de charger les projets en tant que team leader",
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
            name: `${p.user.first_name} ${p.user.last_name}`,
            username: p.user.username,
            avatar: p.avatar || p.user.avatar_url,
            expertise: p.user.expertise,
            role: "Member",
            contribution: p.contribution,
            contributionDescription: p.contribution_description
          })) || []
        })).map(transformDatabaseProject) : [];

      // Fetch projects where user is a participant
      const { data: participantProjects, error: participantError } = await supabase
        .from('project_participants')
        .select(`
          project:projects (
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
          )
        `)
        .eq('user_id', profile.id);

      if (participantError) {
        console.error('Error fetching participant projects:', participantError);
        toast({
          title: "Erreur",
          description: "Impossible de charger les projets en tant que participant",
          variant: "destructive",
        });
        return leaderProjects;
      }

      const participatingProjects = participantProjects ? 
        participantProjects
          .filter((item: any) => item.project !== null)
          .map((item: any) => ({
            ...item.project,
            author: {
              ...item.project.team_leader_profile,
              role: "Team Leader",
              contribution: item.project.team_leader_contribution,
              contributionDescription: item.project.team_leader_contribution_description
            },
            participants: item.project.project_participants?.map((p: any) => ({
              name: `${p.user.first_name} ${p.user.last_name}`,
              username: p.user.username,
              avatar: p.avatar || p.user.avatar_url,
              expertise: p.user.expertise,
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
    staleTime: 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Chargement des projets...</p>
      </div>
    );
  }

  if (!projects?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun projet trouvé pour ce profil</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};