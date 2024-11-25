export interface ProjectLink {
  url: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  dueDate: string;
  thumbnail: string;
  category: string;
  client: string;
  testimonial: string;
  links: ProjectLink[];
}