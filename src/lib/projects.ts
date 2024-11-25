import { supabase } from "./supabase";
import { Project, ProjectLink } from "@/types/project";

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
      ),
      project_links (
        url
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
    links: project.project_links || []
  };
};

export const createProject = async (projectData: any) => {
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .insert({
      id: crypto.randomUUID(),
      title: projectData.title,
      description: projectData.description,
      due_date: projectData.dueDate,
      thumbnail: projectData.thumbnail,
      category: projectData.category,
      client: projectData.client,
      testimonial: projectData.testimonial,
      team_leader: projectData.author.id,
      team_leader_contribution: projectData.author.contribution,
      team_leader_contribution_description: projectData.author.contributionDescription,
    })
    .select()
    .single();

  if (projectError) throw projectError;

  if (project && projectData.links?.length > 0) {
    const { error: linksError } = await supabase
      .from('project_links')
      .insert(
        projectData.links.map((link: ProjectLink) => ({
          project_id: project.id,
          url: link.url
        }))
      );

    if (linksError) throw linksError;
  }

  return project;
};