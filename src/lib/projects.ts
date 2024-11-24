import { supabase } from "./supabase";
import { Project } from "@/types/project";

export const fetchProject = async (id: string): Promise<Project> => {
  const { data: project, error } = await supabase
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
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!project) throw new Error('Project not found');

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    dueDate: project.due_date,
    thumbnail: project.thumbnail,
    category: project.category,
    client: project.client,
    testimonial: project.testimonial,
    author: {
      id: project.team_leader_profile.id,
      name: `${project.team_leader_profile.first_name} ${project.team_leader_profile.last_name}`,
      username: project.team_leader_profile.username || '',
      avatar: project.team_leader_profile.avatar_url,
      expertise: project.team_leader_profile.expertise,
      role: "Team Leader",
      contribution: project.team_leader_contribution || 0,
      contributionDescription: project.team_leader_contribution_description
    },
    participants: project.project_participants?.map(p => ({
      id: p.user.id,
      name: `${p.user.first_name} ${p.user.last_name}`,
      username: p.user.username || '',
      avatar: p.avatar || p.user.avatar_url,
      expertise: p.user.expertise,
      role: "Member",
      contribution: p.contribution,
      contributionDescription: p.contribution_description
    })) || [],
    links: {
      demo_link_1: project.demo_link_1 || '',
      preview_link: project.preview_link || '',
      demo_link_3: project.demo_link_3 || '',
      demo_link_4: project.demo_link_4 || ''
    }
  };
};