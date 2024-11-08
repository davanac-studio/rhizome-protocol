import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const eventProjects: Project[] = [
  {
    id: "4",
    title: "Conférence/Hackathon Blockchain Web3",
    description: "Organisation et couverture médiatique d'un hackathon dédié à la blockchain et au Web3, incluant la captation des présentations, interviews des participants et création de contenu pour les réseaux sociaux.",
    dueDate: "2024-04-15",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Événementiel",
    client: "Web3 Community",
    author: {
      ...teamMembers.profile4,
      role: "Team Leader",
      contribution: 40,
      contributionDescription: "Coordination événement"
    },
    participants: [
      {
        ...teamMembers.profile2,
        role: "Member",
        contribution: 30,
        contributionDescription: "Captation vidéo"
      },
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 30,
        contributionDescription: "Production contenu"
      }
    ],
    links: {
      github: "https://github.com/example/blockchain-hackathon",
      preview: "https://event.example.com/web3"
    }
  },
  {
    id: "5",
    title: "Couverture Evènement: SXSW London 2025",
    description: "Couverture complète du festival SXSW London, incluant reportages quotidiens, interviews exclusives, et création de contenu multimédia pour différentes plateformes.",
    dueDate: "2024-05-01",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Événementiel",
    client: "SXSW",
    author: {
      ...teamMembers.profile2,
      role: "Team Leader",
      contribution: 35,
      contributionDescription: "Direction éditoriale"
    },
    participants: [
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 35,
        contributionDescription: "Production vidéo"
      },
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 30,
        contributionDescription: "Interviews"
      }
    ],
    links: {
      github: "https://github.com/example/sxsw-coverage",
      preview: "https://event.example.com/sxsw"
    }
  }
];