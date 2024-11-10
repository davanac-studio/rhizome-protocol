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

  // Insérer les participants
  if (projectData.participants && projectData.participants.length > 0) {
    const { error: participantsError } = await supabase
      .from('project_participants')
      .insert(
        projectData.participants.map(participant => ({
          project_id: data.id,
          user_id: participant.username, // Assuming username is used as user_id for now
          contribution: participant.contribution,
          contribution_description: participant.contributionDescription
        }))
      );

    if (participantsError) throw participantsError;
  }

  return {
    ...data,
    author: {
      name: `${profileData.first_name} ${profileData.last_name}`,
      username: profileData.username,
      avatar: profileData.avatar_url,
      expertise: profileData.expertise,
      role: "Team Leader" as const,
      contribution: projectData.author.contribution,
      contributionDescription: projectData.author.contributionDescription
    }
  };
};