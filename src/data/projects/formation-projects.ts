import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const formationProjects: Project[] = [
  {
    id: "1",
    title: "Programme de formation Entrepreneur Media",
    description: "Développement d'un programme de formation complet pour entrepreneurs médias, incluant modules vidéo, ressources pédagogiques et sessions de mentorat en ligne.",
    dueDate: "2024-03-15",
    client: "Media Lab",
    category: "Formation/Recrutement",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    testimonial: "Le programme de formation a dépassé nos attentes. La qualité du contenu et l'accompagnement personnalisé ont permis à nos entrepreneurs de développer rapidement leurs compétences médias.",
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
        contribution: 15,
        contributionDescription: "Développement plateforme"
      },
      {
        ...teamMembers.profile5,
        role: "Member",
        contribution: 15,
        contributionDescription: "Relations publiques"
      }
    ],
    links: {
      github: "https://github.com/example/formation-platform",
      preview: "https://formation.example.com"
    }
  }
];