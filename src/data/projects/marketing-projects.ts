import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const marketingProjects: Project[] = [
  {
    id: "7",
    title: "Campagne Marketing Digital \"Road to 2030\"",
    description: "Création d'une campagne marketing digitale multicanale sur les objectifs de développement durable, incluant vidéos, infographies et contenu pour réseaux sociaux.",
    dueDate: "2024-04-01",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Communication/Relations Publiques",
    client: "Green Initiative",
    testimonial: "La campagne a eu un impact significatif sur la sensibilisation aux objectifs de développement durable. Les contenus créatifs et la stratégie multicanale ont permis d'atteindre et d'engager nos différentes audiences cibles de manière efficace.",
    author: {
      ...teamMembers.profile2,
      role: "Team Leader",
      contribution: 50,
      contributionDescription: "Direction éditoriale et interviews"
    },
    participants: [
      {
        ...teamMembers.profile4,
        role: "Member",
        contribution: 25,
        contributionDescription: "Reportages et contenus journalistiques"
      },
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 25,
        contributionDescription: "Développement des outils de diffusion"
      }
    ],
    links: {
      demo_link_1: "https://github.com/example/road-to-2030",
      preview: "https://campaign.example.com/2030",
      demo_link_3: "",
      demo_link_4: ""
    }
  }
];