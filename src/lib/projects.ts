import { supabase } from "./supabase";
import { Project, ProjectLink } from "@/types/project";

/**
 * Endpoint: GET /rest/v1/projects
 * Description: Fetches a single project with all related data
 * Parameters:
 *   - id (string): Project ID
 * Returns:
 *   - Project: Complete project object with team leader, participants, and links
 * Response Structure:
 *   - id (string)
 *   - title (string)
 *   - description (string)
 *   - author: {
 *       id (string)
 *       name (string)
 *       username (string)
 *       avatar (string)
 *       expertise (string)
 *       role (string)
 *       contribution (number)
 *     }
 *   - participants: Array<{
 *       id (string)
 *       name (string)
 *       username (string)
 *       avatar (string)
 *       expertise (string)
 *       role (string)
 *       contribution (number)
 *     }>
 */
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
      project_links!project_links_project_id_fkey (
        id,
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
    links: project.project_links?.map((link: any) => ({
      url: link.url
    })) || []
  };
};

/**
 * Endpoint: POST /rest/v1/projects
 * Description: Creates a new project with all related data
 * Body Parameters:
 *   - title (string): Project title
 *   - description (string): Project description
 *   - dueDate (string): Project due date
 *   - thumbnail (string): Project thumbnail URL
 *   - category (string): Project category
 *   - client (string): Client ID
 *   - testimonial (string): Client testimonial
 *   - author: Project leader information
 *   - participants: Array of project participants
 * 
 * Additional Endpoints:
 * POST /rest/v1/project_links
 *   - project_id (string)
 *   - url (string)
 * 
 * POST /rest/v1/project_participants
 *   - project_id (string)
 *   - user_id (string)
 *   - contribution (number)
 *   - contribution_description (string)
 * 
 * Returns:
 *   - Project: Created project object
 */
export const createProject = async (projectData: any) => {
  try {
    // First create the project
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

    // Then create the links if any exist
    if (project && projectData.links?.length > 0) {
      const validLinks = projectData.links
        .filter((link: ProjectLink) => link && typeof link.url === 'string' && link.url.trim() !== "")
        .map((link: ProjectLink) => ({
          project_id: project.id,
          url: link.url.trim()
        }));

      if (validLinks.length > 0) {
        const { error: linksError } = await supabase
          .from('project_links')
          .insert(validLinks);

        if (linksError) throw linksError;
      }
    }

    // Create participants if any exist
    if (project && projectData.participants?.length > 0) {
      const validParticipants = projectData.participants
        .filter((participant: any) => participant.profile && participant.profile.trim() !== "")
        .map((participant: any) => ({
          project_id: project.id,
          user_id: participant.profile,
          contribution: participant.contribution,
          contribution_description: participant.contributionDescription
        }));

      if (validParticipants.length > 0) {
        const { error: participantsError } = await supabase
          .from('project_participants')
          .insert(validParticipants);

        if (participantsError) {
          console.error('Error creating participants:', participantsError);
          throw participantsError;
        }
      }
    }

    return project;
  } catch (error) {
    console.error('Error in createProject:', error);
    throw error;
  }
};