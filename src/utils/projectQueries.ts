import { supabase } from "@/lib/supabase";
import { transformDatabaseProject } from "./projectTransformers";
import { toast } from "@/components/ui/use-toast";

export const fetchUserProjects = async (username: string) => {
  if (!username) {
    console.log('No username found');
    return [];
  }

  // Get user's profile ID from username
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

  // Fetch projects where user is a client
  const { data: clientProjects, error: clientError } = await supabase
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
    .eq('client', profile.id);

  if (clientError) {
    console.error('Error fetching client projects:', clientError);
    toast({
      title: "Erreur",
      description: "Impossible de charger les projets en tant que client",
      variant: "destructive",
    });
  }

  if (participantError) {
    console.error('Error fetching participant projects:', participantError);
    toast({
      title: "Erreur",
      description: "Impossible de charger les projets en tant que participant",
      variant: "destructive",
    });
    return leaderProjects;
  }

  // Transform all projects
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

  const clientProjectsList = clientProjects ? 
    clientProjects.map((project: any) => ({
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

  // Remove duplicates and combine all projects
  return [...leaderProjects, ...participatingProjects, ...clientProjectsList].filter(
    (project, index, self) =>
      index === self.findIndex((p) => p.id === project.id)
  );
};