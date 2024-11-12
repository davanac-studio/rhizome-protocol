import { supabase } from "./supabase";
import { Project } from "@/types/project";
import { v4 as uuidv4 } from 'uuid';

export const createProject = async (projectData: Omit<Project, "id">) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  if (!userData.user) {
    throw new Error("Utilisateur non authentifié");
  }

  // Format the date to ISO string if it exists, otherwise use current date
  const formattedDueDate = projectData.dueDate 
    ? new Date(projectData.dueDate).toISOString()
    : new Date().toISOString();

  // Generate a unique ID for the project
  const projectId = uuidv4();

  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        id: projectId,
        title: projectData.title,
        description: projectData.description,
        due_date: formattedDueDate,
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