import { DatabaseProject, ParticipantProject } from "@/types/database";
import { Project, ProjectMember } from "@/types/project";

const transformToProjectMember = (
  firstName: string = '',
  lastName: string = '',
  username: string = '',
  avatarUrl: string = '',
  expertise: string = '',
  role: "Team Leader" | "Member",
  contribution: number = 0,
  contributionDescription: string = ''
): ProjectMember => ({
  name: `${firstName} ${lastName}`.trim(),
  username,
  avatar: avatarUrl,
  expertise,
  role,
  contribution,
  contributionDescription
});

export const transformDatabaseProject = (project: DatabaseProject): Project => ({
  id: project.id,
  title: project.title,
  description: project.description,
  dueDate: project.due_date,
  thumbnail: project.thumbnail,
  category: project.category,
  client: project.client,
  author: transformToProjectMember(
    project.author?.first_name,
    project.author?.last_name,
    project.author?.username,
    project.author?.avatar_url,
    project.author?.expertise,
    "Team Leader",
    project.team_leader_contribution,
    project.team_leader_contribution_description
  ),
  participants: project.participants?.map(p => 
    transformToProjectMember(
      p.user?.first_name,
      p.user?.last_name,
      p.user?.username,
      p.user?.avatar_url,
      p.user?.expertise,
      "Member",
      p.contribution,
      p.contribution_description
    )
  ) || [],
  links: {
    github: project.github_link || '',
    preview: project.preview_link || ''
  }
});

export const transformParticipantProjects = (participantProjects: ParticipantProject[]): Project[] => {
  return participantProjects
    .map(p => p.project)
    .filter(Boolean)
    .map(transformDatabaseProject);
};