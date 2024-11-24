import { transformDatabaseProject } from "./projectTransformers";

export const transformProjectData = (project: any) => ({
  ...project,
  author: {
    ...project.team_leader_profile,
    role: "Team Leader",
    contribution: project.team_leader_contribution,
    contributionDescription: project.team_leader_contribution_description
  },
  participants: project.project_participants?.map((p: any) => ({
    name: `${p.user.first_name} ${p.user.last_name}`,
    username: p.user.username,
    avatar: p.avatar || p.user.avatar_url,
    expertise: p.user.expertise,
    role: "Member",
    contribution: p.contribution,
    contributionDescription: p.contribution_description
  })) || []
});

export const transformAndDeduplicateProjects = (projects: any[]) => {
  return projects
    .map(transformProjectData)
    .map(transformDatabaseProject)
    .filter(
      (project, index, self) =>
        index === self.findIndex((p) => p.id === project.id)
    );
};