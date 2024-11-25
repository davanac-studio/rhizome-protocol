import { Project, ProjectMember, ProjectLink } from "@/types/project";
import { teamMembers } from "./team-members";
import { createCertification } from "./certifications";
import { TEAM_LEADER_CONTRIBUTION, calculateParticipantContributions } from "./team-config";

export const createProject = (
  id: string,
  title: string,
  description: string,
  dueDate: string,
  thumbnail: string,
  category: string,
  client: string,
  testimonial: string,
  authorProfile: keyof typeof teamMembers,
  participantProfiles: (keyof typeof teamMembers)[],
  links: { url: string }[]
): Project => {
  const author = { 
    ...teamMembers[authorProfile], 
    role: "Team Leader" as const,
    contribution: TEAM_LEADER_CONTRIBUTION
  };
  
  const { perParticipant, lastParticipantContribution } = calculateParticipantContributions(participantProfiles.length);
  
  const participants = participantProfiles.map((profile, index) => ({
    ...teamMembers[profile],
    role: "Member" as const,
    contribution: index === participantProfiles.length - 1 
      ? lastParticipantContribution
      : perParticipant
  }));
  
  return {
    id,
    title,
    description,
    dueDate,
    thumbnail,
    category,
    client,
    testimonial,
    author,
    participants,
    links: links.map(link => ({ url: link.url }))
  };
};