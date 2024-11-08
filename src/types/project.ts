export type ProjectRole = "Team Leader" | "Member";

export interface Project {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  thumbnail: string;
  category: string;
  client: string;
  author: {
    name: string;
    avatar?: string;
    role: ProjectRole;
  };
}