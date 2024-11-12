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

  // Start a transaction by creating the project first
  const { data: project, error: projectError } = await supabase
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

  if (projectError) {
    console.error("Erreur lors de la création du projet:", projectError);
    throw projectError;
  }

  // If there are participants, create entries in project_participants table
  if (projectData.participants && projectData.participants.length > 0) {
    const validParticipants = projectData.participants.filter(
      participant => participant.profile && typeof participant.profile === 'string'
    );

    if (validParticipants.length > 0) {
      const participantsData = await Promise.all(
        validParticipants.map(async (participant) => {
          try {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('id, avatar_url')
              .eq('id', participant.profile)
              .single();

            if (profileError) {
              console.error(`Error fetching profile: ${profileError.message}`);
              return null;
            }

            if (!profileData) {
              console.error(`Profile not found for ID: ${participant.profile}`);
              return null;
            }

            return {
              project_id: projectId,
              user_id: profileData.id,
              avatar: profileData.avatar_url,
              contribution: participant.contribution,
              contribution_description: participant.contributionDescription
            };
          } catch (error) {
            console.error(`Error processing participant: ${error}`);
            return null;
          }
        })
      );

      // Filter out any null values from failed profile lookups
      const validParticipantsData = participantsData.filter(
        (data): data is NonNullable<typeof data> => data !== null
      );

      if (validParticipantsData.length > 0) {
        const { error: participantsError } = await supabase
          .from('project_participants')
          .insert(validParticipantsData);

        if (participantsError) {
          console.error("Erreur lors de l'ajout des participants:", participantsError);
          throw participantsError;
        }
      }
    }
  }

  return project;
};