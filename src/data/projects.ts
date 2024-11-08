import { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Vidéo Explainer \"La guerre en Ukraine\"",
    description: "Création d'une vidéo explicative détaillée sur le conflit en Ukraine, analysant les enjeux géopolitiques et humanitaires pour une meilleure compréhension du public.",
    dueDate: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    category: "Production Vidéo",
    client: "TechCorp",
    testimonial: "Une vidéo explicative exceptionnelle qui a permis à notre audience de mieux comprendre les enjeux complexes du conflit en Ukraine. L'équipe a su traduire des concepts géopolitiques complexes en contenus accessibles et engageants.",
    author: {
      name: "Sophie Martin",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      role: "Team Leader"
    }
  },
  {
    id: "2",
    title: "Vidéo Aftermovie KIKK Festival",
    description: "Production d'un aftermovie dynamique capturant l'essence du KIKK Festival, mettant en valeur les moments forts, les installations artistiques et l'ambiance unique de l'événement.",
    dueDate: "2024-04-30",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    category: "Production Vidéo",
    client: "EventPro",
    testimonial: "L'aftermovie capture parfaitement l'énergie et l'esprit innovant du KIKK Festival. Les transitions fluides et le montage dynamique ont donné vie à nos moments les plus mémorables.",
    author: {
      name: "Thomas Bernard",
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      role: "Team Leader"
    }
  },
  {
    id: "3",
    title: "Live Twitch/Youtube: Stereopsia Bruxelles",
    description: "Diffusion en direct de la conférence Stereopsia à Bruxelles, couvrant les dernières innovations en réalité virtuelle et augmentée, avec interaction en temps réel avec les spectateurs.",
    dueDate: "2024-05-15",
    thumbnail: "https://images.unsplash.com/photo-1615138133693-e3432e36b0b7",
    category: "Streaming",
    client: "StreamMaster",
    testimonial: "La qualité du streaming était impeccable et l'interaction avec notre audience internationale a dépassé nos attentes. L'équipe technique a assuré une diffusion sans faille pendant toute la durée de l'événement.",
    author: {
      name: "Emma Dubois",
      avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      role: "Team Leader"
    }
  },
  {
    id: "4",
    title: "Conférence/Hackathon Blockchain Web3",
    description: "Organisation d'un événement hybride combinant conférences sur la blockchain et hackathon Web3, réunissant experts et développeurs pour explorer les innovations dans le domaine.",
    dueDate: "2024-06-01",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Événementiel",
    client: "TechEvents",
    testimonial: "L'organisation de cet événement hybride était remarquable. La synergie entre les conférences et le hackathon a créé une atmosphère unique d'apprentissage et d'innovation dans le domaine de la blockchain.",
    author: {
      name: "Lucas Petit",
      avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      role: "Team Leader"
    }
  },
  {
    id: "5",
    title: "Couverture Evènement: SXSW London 2025",
    description: "Couverture médiatique complète du SXSW London 2025, incluant reportages, interviews exclusives et création de contenu en direct pour documenter cet événement majeur de l'industrie créative.",
    dueDate: "2024-07-15",
    thumbnail: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
    category: "Événementiel",
    client: "EventCorp",
    testimonial: "La couverture médiatique de SXSW London était exceptionnelle. Les reportages et interviews ont capturé l'essence même de l'événement, offrant une perspective unique à ceux qui n'ont pas pu y assister.",
    author: {
      name: "Emma Dubois",
      avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      role: "Team Leader"
    }
  },
  {
    id: "6",
    title: "Programme de formation Entrepreneur Media",
    description: "Développement d'un programme de formation complet destiné aux entrepreneurs, focalisé sur la création de contenu média, la stratégie digitale et la gestion de présence en ligne.",
    dueDate: "2024-08-30",
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    category: "Formation",
    client: "EduMedia",
    testimonial: "Le programme de formation a transformé notre approche du marketing digital. Les modules sont pratiques, pertinents et immédiatement applicables. Nos entrepreneurs ont vu des résultats concrets dès la première semaine.",
    author: {
      name: "Sophie Martin",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      role: "Team Leader"
    }
  },
  {
    id: "7",
    title: "Campagne Marketing Digital \"Road to 2030\"",
    description: "Élaboration et mise en œuvre d'une campagne marketing visionnaire projetant les tendances et innovations digitales jusqu'en 2030, avec stratégie multicanale et contenu prospectif.",
    dueDate: "2024-09-15",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Marketing",
    client: "DigitalBoost",
    testimonial: "La campagne 'Road to 2030' a positionné notre entreprise comme un leader visionnaire dans le secteur digital. L'approche prospective et le contenu de qualité ont généré un engagement exceptionnel de notre audience cible.",
    author: {
      name: "Thomas Bernard",
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      role: "Team Leader"
    }
  },
  {
    id: "8",
    title: "Développement application mobile \"Petits producteurs locaux\"",
    description: "Création d'une application mobile connectant consommateurs et producteurs locaux, avec fonctionnalités de géolocalisation, système de commande et plateforme communautaire.",
    dueDate: "2024-10-30",
    thumbnail: "https://images.unsplash.com/photo-1512054502232-10a0a035d672",
    category: "Développement",
    client: "AppTech",
    testimonial: "L'application a révolutionné la façon dont nos producteurs locaux connectent avec leurs clients. L'interface intuitive et les fonctionnalités de géolocalisation ont créé une véritable communauté autour de l'agriculture locale.",
    author: {
      name: "Lucas Petit",
      avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      role: "Team Leader"
    }
  }
];
