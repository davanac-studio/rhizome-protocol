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