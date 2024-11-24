import { Project, ProjectMember } from "@/types/project";
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
  links: { demo_link_1: string; demo_link_2: string; demo_link_3?: string; demo_link_4?: string }
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
    links: {
      demo_link_1: links.demo_link_1,
      demo_link_2: links.demo_link_2,
      demo_link_3: links.demo_link_3 || '',
      demo_link_4: links.demo_link_4 || ''
    },
    certification: createCertification(id)
  };
};