export interface ProjectFormData {
  title: string;
  description: string;
  dueDate: string;
  thumbnail: string;
  category: string;
  client: string;
  testimonial: string;
  links: {
    demo_link_1: string;
    demo_link_2: string;
    demo_link_3: string;
    demo_link_4: string;
  };
}