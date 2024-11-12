import { supabase } from "@/lib/supabase";
import { Project } from "@/types/project";
import { transformDatabaseProject } from "./projectTransformers";

export const fetchUserProjects = async (username: string): Promise<Project[]> => {
  // First, get the user's profile ID from the username
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single();

  if (profileError) {
    console.error('Error fetching profile:', profileError);
    throw profileError;
  }

  if (!profile) {
    throw new Error('Profile not found');
  }

  // Then fetch all projects where the user is either team leader or participant
  const { data: projects, error: projectsError } = await supabase
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
        contribution_description
      )
    `)
    .or(`team_leader.eq.${profile.id},project_participants.user_id.eq.${profile.id}`);

  if (projectsError) {
    console.error('Error fetching projects:', projectsError);
    throw projectsError;
  }

  return projects.map(project => transformDatabaseProject({
    ...project,
    author: {
      ...project.team_leader_profile,
      role: "Team Leader",
      contribution: project.team_leader_contribution,
      contributionDescription: project.team_leader_contribution_description
    },
    participants: project.project_participants?.map(p => ({
      ...p.user,
      role: "Member",
      contribution: p.contribution,
      contributionDescription: p.contribution_description
    })) || []
  }));
};