import { supabase } from "./supabase";
import { Project } from "@/types/project";

export const createProject = async (projectData: Omit<Project, "id">) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

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

  return data;
};