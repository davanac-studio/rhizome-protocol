import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const marketingProjects: Project[] = [
  {
    id: "7",
    title: "Campagne Marketing Digital \"Road to 2030\"",
    description: "Création d'une campagne marketing digitale multicanale sur les objectifs de développement durable, incluant vidéos, infographies et contenu pour réseaux sociaux.",
    dueDate: "2024-04-01",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", // Image de marketing digital
    category: "Marketing Digital",
    client: "Green Initiative",
    author: {
      ...teamMembers.profile2,
      role: "Team Leader",
      contribution: 50,
      contributionDescription: "Stratégie marketing"
    },
    participants: [
      {
        ...teamMembers.profile4,
        role: "Member",
        contribution: 25,
        contributionDescription: "Production contenu"
      },
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 25,
        contributionDescription: "Community management"
      }
    ],
    links: {
      github: "https://github.com/example/road-to-2030",
      preview: "https://campaign.example.com/2030"
    }
  }
];