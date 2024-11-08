import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const videoProjects: Project[] = [
  {
    id: "1",
    title: "Vidéo Explainer \"La guerre en Ukraine\"",
    description: "Production d'une vidéo explicative détaillée sur le conflit en Ukraine, incluant des animations, des graphiques et une narration professionnelle pour une meilleure compréhension du sujet.",
    dueDate: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Production Vidéo",
    client: "RH Solutions",
    author: {
      ...teamMembers.profile1,
      role: "Team Leader",
      contribution: 40,
      contributionDescription: "Direction du projet et scénarisation"
    },
    participants: [
      {
        ...teamMembers.profile2,
        role: "Member",
        contribution: 30,
        contributionDescription: "Animation et montage"
      },
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 30,
        contributionDescription: "Recherche et narration"
      }
    ],
    links: {
      github: "https://github.com/example/ukraine-explainer",
      preview: "https://video.example.com/ukraine"
    }
  },
  {
    id: "2",
    title: "Vidéo Aftermovie KIKK Festival",
    description: "Création d'un aftermovie dynamique capturant l'essence et les moments forts du KIKK Festival, mettant en valeur les installations artistiques, les conférences et l'ambiance générale de l'événement.",
    dueDate: "2024-04-01",
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "Production Vidéo",
    client: "KIKK Festival",
    author: {
      ...teamMembers.profile2,
      role: "Team Leader",
      contribution: 50,
      contributionDescription: "Direction et montage"
    },
    participants: [
      {
        ...teamMembers.profile4,
        role: "Member",
        contribution: 25,
        contributionDescription: "Captation vidéo"
      },
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 25,
        contributionDescription: "Sound design"
      }
    ],
    links: {
      github: "https://github.com/example/kikk-aftermovie",
      preview: "https://video.example.com/kikk"
    }
  }
];