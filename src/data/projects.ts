import { Project } from "@/types/project";
import { teamMembers } from "./team-members";

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Refonte du Système de Formation",
    description: "Modernisation complète du système de formation interne avec implémentation d'une plateforme e-learning et création de contenus pédagogiques innovants.",
    dueDate: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    category: "Formation/Recrutement",
    client: "RH Solutions",
    author: {
      ...teamMembers.profile1,
      role: "Team Leader",
      contribution: 40,
      contributionDescription: "Direction du projet et conception pédagogique"
    },
    participants: [
      {
        ...teamMembers.profile2,
        role: "Member",
        contribution: 30,
        contributionDescription: "Développement de la plateforme"
      },
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 30,
        contributionDescription: "Création de contenus"
      }
    ],
    links: {
      github: "https://github.com/example/formation-system",
      preview: "https://formation.example.com"
    }
  },
  {
    id: "2",
    title: "Optimisation des Process Internes",
    description: "Analyse et amélioration des processus de travail internes pour augmenter l'efficacité opérationnelle et la collaboration entre les équipes.",
    dueDate: "2024-04-01",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    category: "Stratégie/Management",
    client: "OptiProcess Corp",
    author: {
      ...teamMembers.profile2,
      role: "Team Leader",
      contribution: 50,
      contributionDescription: "Analyse et recommandations stratégiques"
    },
    participants: [
      {
        ...teamMembers.profile4,
        role: "Member",
        contribution: 25,
        contributionDescription: "Analyse des données"
      },
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 25,
        contributionDescription: "Implémentation des solutions"
      }
    ],
    links: {
      github: "https://github.com/example/process-optimization",
      preview: "https://process.example.com"
    }
  },
  {
    id: "3",
    title: "Pipeline CI/CD Automatisé",
    description: "Mise en place d'un pipeline d'intégration et de déploiement continu pour accélérer et sécuriser les déploiements d'applications.",
    dueDate: "2024-03-30",
    thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec",
    category: "Développement/Workflow",
    client: "TechFlow Solutions",
    author: {
      ...teamMembers.profile3,
      role: "Team Leader",
      contribution: 45,
      contributionDescription: "Architecture et implémentation DevOps"
    },
    participants: [
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 30,
        contributionDescription: "Configuration des tests automatisés"
      },
      {
        ...teamMembers.profile4,
        role: "Member",
        contribution: 25,
        contributionDescription: "Documentation et formation"
      }
    ],
    links: {
      github: "https://github.com/example/cicd-pipeline",
      preview: "https://pipeline.example.com"
    }
  },
  {
    id: "4",
    title: "Campagne de Communication Digitale",
    description: "Élaboration et exécution d'une stratégie de communication digitale multicanale pour augmenter la visibilité de la marque.",
    dueDate: "2024-04-15",
    thumbnail: "https://images.unsplash.com/photo-1557838923-2985c318be48",
    category: "Communication/Relations Publiques",
    client: "Digital Brand Agency",
    author: {
      ...teamMembers.profile4,
      role: "Team Leader",
      contribution: 40,
      contributionDescription: "Stratégie et coordination"
    },
    participants: [
      {
        ...teamMembers.profile2,
        role: "Member",
        contribution: 30,
        contributionDescription: "Création de contenu"
      },
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 30,
        contributionDescription: "Gestion des médias sociaux"
      }
    ],
    links: {
      github: "https://github.com/example/digital-campaign",
      preview: "https://campaign.example.com"
    }
  },
  {
    id: "5",
    title: "Série de Podcasts Tech",
    description: "Production d'une série de podcasts sur les dernières tendances technologiques et leur impact sur l'industrie.",
    dueDate: "2024-05-01",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
    category: "Rédaction/Production audiovisuelle",
    client: "TechMedia Productions",
    author: {
      ...teamMembers.profile2,
      role: "Team Leader",
      contribution: 35,
      contributionDescription: "Production et édition"
    },
    participants: [
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 35,
        contributionDescription: "Recherche et scénarisation"
      },
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 30,
        contributionDescription: "Animation et interviews"
      }
    ],
    links: {
      github: "https://github.com/example/tech-podcast",
      preview: "https://podcast.example.com"
    }
  }
];