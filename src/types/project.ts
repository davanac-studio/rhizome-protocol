export type ProjectRole = "Team Leader" | "Member";

export interface ProjectMember {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  role: ProjectRole;
  contribution: number;
  contributionDescription?: string;
  expertise?: string;
  profile?: string;
  collectif?: string;
}

export interface NFTCertification {
  contract: string;
  tokenId: string;
  creationDate: string;
  blockchain: string;
  standard: string;
  scanUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  thumbnail: string;
  category: string;
  client: string;
  testimonial?: string;
  author: ProjectMember & { role: "Team Leader" };
  participants?: ProjectMember[];
  links: {
    demo_link_1: string;
    preview: string;
    demo_link_3: string;
    demo_link_4: string;
  };
  certification?: NFTCertification;
}