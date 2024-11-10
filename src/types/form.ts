export interface ProjectFormData {
  title: string;
  description: string;
  dueDate: string;
  thumbnail: string;
  category: string;
  client: string;
  testimonial: string;
  links: {
    github: string;
    preview: string;
  };
}