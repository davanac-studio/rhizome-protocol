import { supabase } from "./supabase";
import { Project } from "@/types/project";

export const createProject = async (projectData: Omit<Project, "id">) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('username, first_name, last_name, avatar_url, expertise')
    .eq('id', userData.user.id)
    .single();

  if (profileError) throw profileError;

  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        title: projectData.title,
        description: projectData.description,
        due_date: projectData.dueDate,
        thumbnail: projectData.thumbnail,
        category: projectData.category,
        client: projectData.client,
        testimonial: projectData.testimonial,
        github_link: projectData.links.github,
        preview_link: projectData.links.preview,
        team_leader: userData.user.id,
        team_leader_contribution: projectData.author.contribution,
        team_leader_contribution_description: projectData.author.contributionDescription,
      }
    ])
    .select()
    .single();

  if (error) throw error;

  // Return the complete project data with author information
  return {
    ...data,
    id: data.id,
    dueDate: data.due_date,
    author: {
      name: `${profileData.first_name} ${profileData.last_name}`,
      username: profileData.username,
      avatar: profileData.avatar_url,
      expertise: profileData.expertise,
      role: "Team Leader" as const,
      contribution: data.team_leader_contribution,
      contributionDescription: data.team_leader_contribution_description
    },
    links: {
      github: data.github_link,
      preview: data.preview_link
    }
  };
};