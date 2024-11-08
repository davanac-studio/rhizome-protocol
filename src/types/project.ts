export type ProjectStatus = "In Progress" | "Completed" | "On Hold" | "Planning";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  thumbnail?: string;
}