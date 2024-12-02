/**
 * Module: projectQueries
 * Description: Handles project-related database queries
 * 
 * Endpoint: GET /rest/v1/profiles
 * Description: Fetches user profile by username
 * Parameters:
 *   - username (string): User's username
 * 
 * Endpoint: GET /rest/v1/projects
 * Description: Fetches projects where user is team leader
 * Parameters:
 *   - team_leader (string): User's ID
 * 
 * Endpoint: GET /rest/v1/project_participants
 * Description: Fetches projects where user is participant
 * Parameters:
 *   - user_id (string): User's ID
 * 
 * Response Structure for all queries:
 *   - Array of projects with:
 *     - Basic project information
 *     - Team leader profile
 *     - Participant information
 *     - Project links
 */
import { fetchUserProfile, fetchTeamLeaderProjects, fetchParticipantProjects, fetchClientProjects } from "./projectDatabaseQueries";
import { transformAndDeduplicateProjects } from "./projectDataTransformers";

export const fetchUserProjects = async (username: string) => {
  if (!username) {
    console.log('No username found');
    return [];
  }

  const profile = await fetchUserProfile(username);
  if (!profile?.id) {
    console.log('No profile found for username:', username);
    return [];
  }

  // Fetch all types of projects
  const teamLeaderProjects = await fetchTeamLeaderProjects(profile.id);
  const participantProjects = await fetchParticipantProjects(profile.id);
  const clientProjects = await fetchClientProjects(profile.id);

  // Transform participant projects to match the expected format
  const participatingProjects = participantProjects
    .filter((item: any) => item.project !== null)
    .map((item: any) => item.project);

  // Combine and transform all projects
  return transformAndDeduplicateProjects([
    ...teamLeaderProjects,
    ...participatingProjects,
    ...clientProjects
  ]);
};