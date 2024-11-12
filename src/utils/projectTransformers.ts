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
  testimonial: project.testimonial,
  author: {
    ...transformToProjectMember(
      project.team_leader_profile?.first_name,
      project.team_leader_profile?.last_name,
      project.team_leader_profile?.username,
      project.team_leader_profile?.avatar_url,
      project.team_leader_profile?.expertise,
      "Team Leader",
      project.team_leader_contribution,
      project.team_leader_contribution_description
    ),
    role: "Team Leader" as const
  },
  participants: project.project_participants?.map(p => 
    transformToProjectMember(
      p.user?.first_name,
      p.user?.last_name,
      p.user?.username,
      p.avatar || p.user?.avatar_url, // Use the new avatar field, fallback to user's avatar_url
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
    .filter((project): project is DatabaseProject => !!project)
    .map(transformDatabaseProject);
};