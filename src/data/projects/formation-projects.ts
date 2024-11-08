import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const formationProjects: Project[] = [
  {
    id: "6",
    title: "Programme de formation Entrepreneur Media",
    description: "Développement d'un programme de formation complet pour entrepreneurs médias, incluant modules vidéo, ressources pédagogiques et sessions de mentorat en ligne.",
    dueDate: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Formation",
    client: "Media Lab",
    author: {
      ...teamMembers.profile1,
      role: "Team Leader",
      contribution: 40,
      contributionDescription: "Conception pédagogique"
    },
    participants: [
      {
        ...teamMembers.profile2,
        role: "Member",
        contribution: 30,
        contributionDescription: "Production vidéo"
      },
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 30,
        contributionDescription: "Contenu pédagogique"
      }
    ],
    links: {
      github: "https://github.com/example/media-training",
      preview: "https://formation.example.com/entrepreneur"
    }
  }
];