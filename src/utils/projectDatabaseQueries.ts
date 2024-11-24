import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

const PROJECT_QUERY = `
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
`;

export const fetchUserProfile = async (username: string) => {
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
    return null;
  }

  return profile;
};

export const fetchTeamLeaderProjects = async (profileId: string) => {
  const { data: projects, error } = await supabase
    .from('projects')
    .select(PROJECT_QUERY)
    .eq('team_leader', profileId);

  if (error) {
    console.error('Error fetching team leader projects:', error);
    toast({
      title: "Erreur",
      description: "Impossible de charger les projets en tant que team leader",
      variant: "destructive",
    });
    return [];
  }

  return projects || [];
};

export const fetchParticipantProjects = async (profileId: string) => {
  const { data: participantProjects, error } = await supabase
    .from('project_participants')
    .select(`
      project:projects (
        ${PROJECT_QUERY}
      )
    `)
    .eq('user_id', profileId);

  if (error) {
    console.error('Error fetching participant projects:', error);
    toast({
      title: "Erreur",
      description: "Impossible de charger les projets en tant que participant",
      variant: "destructive",
    });
    return [];
  }

  return participantProjects || [];
};

export const fetchClientProjects = async (profileId: string) => {
  const { data: clientProjects, error } = await supabase
    .from('projects')
    .select(PROJECT_QUERY)
    .eq('client', profileId);

  if (error) {
    console.error('Error fetching client projects:', error);
    toast({
      title: "Erreur",
      description: "Impossible de charger les projets en tant que client",
      variant: "destructive",
    });
    return [];
  }

  return clientProjects || [];
};