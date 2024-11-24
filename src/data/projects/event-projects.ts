import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const eventProjects: Project[] = [
  {
    id: "4",
    title: "Conférence/Hackathon Blockchain Web3",
    description: "Organisation et couverture médiatique d'un hackathon dédié à la blockchain et au Web3, incluant la captation des présentations, interviews des participants et création de contenu pour les réseaux sociaux.",
    dueDate: "2024-04-15",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Stratégie/Management, Formation/Recrutement",
    client: "Web3 Community",
    testimonial: "L'organisation et la couverture médiatique du hackathon ont été impeccables. Les contenus produits ont parfaitement capturé l'essence de l'événement et généré un engagement significatif sur nos réseaux sociaux.",
    author: {
      ...teamMembers.profile4,
      role: "Team Leader",
      contribution: 40,
      contributionDescription: "Couverture journalistique principale et interviews"
    },
    participants: [
      {
        ...teamMembers.profile2,
        role: "Member",
        contribution: 30,
        contributionDescription: "Rédaction des articles et reportages"
      },
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 30,
        contributionDescription: "Design des supports visuels et de la signalétique"
      }
    ],
    links: {
      demo_link_1: "https://github.com/example/blockchain-hackathon",
      demo_link_2: "https://event.example.com/web3",
      demo_link_3: "",
      demo_link_4: ""
    }
  },
  {
    id: "5",
    title: "Couverture Evènement: SXSW London 2025",
    description: "Couverture complète du festival SXSW London, incluant reportages quotidiens, interviews exclusives, et création de contenu multimédia pour différentes plateformes.",
    dueDate: "2024-05-01",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Rédaction/Production audiovisuelle",
    client: "SXSW",
    testimonial: "La qualité et la diversité des contenus produits ont dépassé nos attentes. L'équipe a su capturer l'essence de SXSW London tout en maintenant un flux constant de contenus pertinents et engageants sur toutes nos plateformes.",
    author: {
      ...teamMembers.profile2,
      role: "Team Leader",
      contribution: 35,
      contributionDescription: "Direction éditoriale et interviews principales"
    },
    participants: [
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 25,
        contributionDescription: "Design de l'identité visuelle et des supports"
      },
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 20,
        contributionDescription: "Développement de la plateforme de diffusion"
      },
      {
        ...teamMembers.profile5,
        role: "Member",
        contribution: 20,
        contributionDescription: "Relations presse et communication événementielle"
      }
    ],
    links: {
      demo_link_1: "https://github.com/example/sxsw-coverage",
      demo_link_2: "https://event.example.com/sxsw",
      demo_link_3: "",
      demo_link_4: ""
    }
  }
];
