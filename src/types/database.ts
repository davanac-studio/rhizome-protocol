export interface DatabaseUser {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar_url: string;
  expertise: string;
  role: string;
}

export interface DatabaseParticipant {
  user: DatabaseUser;
  contribution: number;
  contribution_description: string;
}

export interface DatabaseProject {
  id: string;
  title: string;
  description: string;
  due_date: string;
  thumbnail: string;
  category: string;
  client: string;
  testimonial?: string;
  team_leader: string;
  team_leader_contribution: number;
  team_leader_contribution_description: string;
  team_leader_profile: DatabaseUser;
  project_participants: DatabaseParticipant[];
  github_link?: string;
  preview_link?: string;
}

export interface ParticipantProject {
  project: DatabaseProject;
}