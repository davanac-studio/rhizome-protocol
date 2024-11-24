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

  console.log("Creating project with data:", {
    projectId,
    title: projectData.title,
    participants: projectData.participants
  });

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
        demo_link_1: projectData.links?.demo_link_1 || null,
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

  console.log("Project created successfully:", project);

  // If there are participants, create entries in project_participants table
  if (projectData.participants && projectData.participants.length > 0) {
    console.log("Processing participants:", projectData.participants);

    const participantsData = projectData.participants
      .filter(participant => {
        if (!participant.profile) {
          console.log("Skipping participant with no profile:", participant);
          return false;
        }
        return true;
      })
      .map(participant => {
        console.log("Creating participant data:", participant);
        return {
          project_id: projectId,
          user_id: participant.profile,
          contribution: participant.contribution,
          contribution_description: participant.contributionDescription,
        };
      });

    console.log("Final participants data to insert:", participantsData);

    if (participantsData.length > 0) {
      const { data: insertedParticipants, error: participantsError } = await supabase
        .from('project_participants')
        .insert(participantsData)
        .select();

      if (participantsError) {
        console.error("Erreur lors de l'ajout des participants:", participantsError);
        throw participantsError;
      }

      console.log("Participants added successfully:", insertedParticipants);
    }
  }

  return project;
};