import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const eventProjects: Project[] = [
  {
    id: "1",
    title: "Festival de Musique Électronique",
    description: "Organisation et production d'un festival de musique électronique sur deux jours, mettant en vedette des artistes locaux et internationaux.",
    dueDate: "2024-07-15",
    client: "Électro Productions",
    category: "Événementiel",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    testimonial: "Une organisation impeccable et une ambiance électrique qui a dépassé toutes nos attentes. L'équipe a su gérer chaque aspect avec professionnalisme.",
    author: {
      ...teamMembers.profile1,
      role: "Team Leader",
      contribution: 40,
      contributionDescription: "Direction artistique et coordination générale"
    },
    participants: [
      {
        ...teamMembers.profile2,
        role: "Member",
        contribution: 30,
        contributionDescription: "Production technique et logistique"
      },
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 15,
        contributionDescription: "Communication et relations presse"
      },
      {
        ...teamMembers.profile4,
        role: "Member",
        contribution: 15,
        contributionDescription: "Gestion des artistes et planning"
      }
    ],
    links: [
      { url: "https://github.com/example/festival-website" },
      { url: "https://festival.example.com" }
    ]
  },
  {
    id: "2",
    title: "Concert de Bienfaisance",
    description: "Organisation d'un concert de bienfaisance pour collecter des fonds en faveur de l'éducation des enfants défavorisés.",
    dueDate: "2024-09-10",
    client: "Charité Musique",
    category: "Événementiel",
    thumbnail: "https://images.unsplash.com/photo-1601500498766-04f86a3a1c4d",
    testimonial: "Un concert mémorable qui a touché le cœur de tous et a permis de récolter des fonds importants pour notre cause.",
    author: {
      ...teamMembers.profile2,
      role: "Team Leader",
      contribution: 50,
      contributionDescription: "Coordination de l'événement et gestion des sponsors"
    },
    participants: [
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 20,
        contributionDescription: "Réalisation de la promotion et des supports de communication"
      },
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 30,
        contributionDescription: "Gestion des artistes et planification logistique"
      }
    ],
    links: [
      { url: "https://github.com/example/benefit-concert" },
      { url: "https://concert.charite.org" }
    ]
  },
  {
    id: "3",
    title: "Festival de Danse Contemporaine",
    description: "Mise en œuvre d'un festival qui célèbre la danse contemporaine avec des performances et des ateliers.",
    dueDate: "2024-05-20",
    client: "Dancing Arts",
    category: "Art et Culture",
    thumbnail: "https://images.unsplash.com/photo-1515040428949-8030aa6e62a5",
    testimonial: "Une expérience enrichissante qui a attiré un large public et a permis de découvrir de nouveaux talents.",
    author: {
      ...teamMembers.profile3,
      role: "Team Leader",
      contribution: 70,
      contributionDescription: "Direction artistique et mise en scène du festival"
    },
    participants: [
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 20,
        contributionDescription: "Conception des affiches et promotion de l'événement"
      },
      {
        ...teamMembers.profile4,
        role: "Member",
        contribution: 10,
        contributionDescription: "Gestion des ateliers et des intervenants"
      }
    ],
    links: [
      { url: "https://github.com/example/contemporary-dance-festival" },
      { url: "https://dancefestival.example.com" }
    ]
  }
];