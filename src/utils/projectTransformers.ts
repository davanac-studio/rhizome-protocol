import { DatabaseProject } from "@/types/database";
import { Project, ProjectLink } from "@/types/project";

export const transformDatabaseProject = (project: DatabaseProject): Project => {
  const links = project.project_links?.map(link => ({
    url: link.url
  })) || [];

  const getDisplayName = (profile: any) => {
    if (profile.account_type === 'collectif') {
      return profile["collectif-name"] || '';
    }
    return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
  };

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
      name: getDisplayName(project.team_leader_profile),
      username: project.team_leader_profile.username,
      avatar: project.team_leader_profile.avatar_url,
      expertise: project.team_leader_profile.expertise,
      role: "Team Leader",
      contribution: project.team_leader_contribution || 0,
      contributionDescription: project.team_leader_contribution_description
    },
    participants: project.project_participants?.map(participant => ({
      id: participant.user.id,
      name: getDisplayName(participant.user),
      username: participant.user.username,
      avatar: participant.avatar || participant.user.avatar_url,
      expertise: participant.user.expertise,
      role: "Member" as const,
      contribution: participant.contribution,
      contributionDescription: participant.contribution_description
    })) || [],
    links
  };
};