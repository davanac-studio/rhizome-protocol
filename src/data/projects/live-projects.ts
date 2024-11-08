import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const liveProjects: Project[] = [
  {
    id: "3",
    title: "Live Twitch/Youtube: Stereopsia Bruxelles",
    description: "Gestion complète d'un streaming multi-plateformes pour la conférence Stereopsia, incluant la régie en direct, la gestion des transitions et l'interaction avec le public en temps réel.",
    dueDate: "2024-03-30",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "Streaming",
    client: "Stereopsia",
    author: {
      ...teamMembers.profile3,
      role: "Team Leader",
      contribution: 45,
      contributionDescription: "Régie et direction technique"
    },
    participants: [
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 30,
        contributionDescription: "Gestion des plateformes"
      },
      {
        ...teamMembers.profile4,
        role: "Member",
        contribution: 25,
        contributionDescription: "Support technique"
      }
    ],
    links: {
      github: "https://github.com/example/stereopsia-live",
      preview: "https://live.example.com/stereopsia"
    }
  }
];