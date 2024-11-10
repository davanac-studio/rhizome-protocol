export type ProjectRole = "Team Leader" | "Member";

export interface ProjectMember {
  name: string;
  username: string;
  avatar?: string;
  role: ProjectRole;
  contribution: number;
  contributionDescription?: string;
  expertise?: string;
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
    github: string;
    preview: string;
  };
  certification?: NFTCertification;
}