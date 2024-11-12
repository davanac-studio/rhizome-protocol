import { supabase } from "./supabase";
import { Project } from "@/types/project";

export const createProject = async (projectData: Omit<Project, "id">) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  if (!userData.user) {
    throw new Error("Utilisateur non authentifié");
  }

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
        testimonial: projectData.testimonial || null,
        github_link: projectData.links?.github || null,
        preview_link: projectData.links?.preview || null,
        team_leader: userData.user.id,
        team_leader_contribution: projectData.author.contribution || 0,
        team_leader_contribution_description: projectData.author.contributionDescription || null,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Erreur Supabase:", error);
    throw new Error(error.message);
  }

  return data;
};