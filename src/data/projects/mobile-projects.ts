import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const mobileProjects: Project[] = [
  {
    id: "8",
    title: "Développement application mobile \"Petits producteurs locaux\"",
    description: "Création d'une application mobile permettant de connecter les consommateurs aux producteurs locaux, incluant géolocalisation, système de commande et contenus vidéo promotionnels.",
    dueDate: "2024-03-30",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    category: "Développement/Workflow",
    client: "Association des Producteurs",
    testimonial: "L'application a révolutionné la façon dont nos producteurs locaux se connectent avec leurs clients. L'interface intuitive et les fonctionnalités de géolocalisation ont considérablement augmenté la visibilité de nos membres et facilité les ventes directes.",
    author: {
      ...teamMembers.profile3,
      role: "Team Leader",
      contribution: 45,
      contributionDescription: "Design UX/UI de l'application"
    },
    participants: [
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 30,
        contributionDescription: "Développement technique de l'application"
      },
      {
        ...teamMembers.profile4,
        role: "Member",
        contribution: 25,
        contributionDescription: "Contenu éditorial et interviews producteurs"
      }
    ],
    links: [
      { url: "https://github.com/example/local-producers-app" },
      { url: "https://app.example.com/producers" }
    ]
  }
];