import { Project } from "@/types/project";
import { createProject } from "./project-factory";

export const projectsData: Project[] = [
  createProject(
    "1",
    "Vidéo Explainer \"La guerre en Ukraine\"",
    "Création d'une vidéo explicative détaillée sur le conflit en Ukraine, analysant les enjeux géopolitiques et humanitaires pour une meilleure compréhension du public.",
    "2024-03-15",
    "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    "Production Vidéo",
    "TechCorp",
    "Une vidéo explicative exceptionnelle qui a permis à notre audience de mieux comprendre les enjeux complexes du conflit en Ukraine. L'équipe a su traduire des concepts géopolitiques complexes en contenus accessibles et engageants.",
    "profile1",
    ["profile2", "profile3"],
    {
      github: "https://github.com/company/ukraine-explainer",
      preview: "https://ukraine-explainer.demo.com"
    }
  ),
  createProject(
    "2",
    "Vidéo Aftermovie KIKK Festival",
    "Production d'un aftermovie dynamique capturant l'essence du KIKK Festival, mettant en valeur les moments forts, les installations artistiques et l'ambiance unique de l'événement.",
    "2024-04-30",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    "Production Vidéo",
    "EventPro",
    "L'aftermovie capture parfaitement l'énergie et l'esprit innovant du KIKK Festival. Les transitions fluides et le montage dynamique ont donné vie à nos moments les plus mémorables.",
    "profile2",
    ["profile1", "profile3"],
    {
      github: "https://github.com/company/kikk-aftermovie",
      preview: "https://kikk-aftermovie.demo.com"
    }
  ),
  createProject(
    "3",
    "Live Twitch/Youtube: Stereopsia Bruxelles",
    "Diffusion en direct de la conférence Stereopsia à Bruxelles, couvrant les dernières innovations en réalité virtuelle et augmentée, avec interaction en temps réel avec les spectateurs.",
    "2024-05-15",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    "Streaming",
    "StreamMaster",
    "La qualité du streaming était impeccable et l'interaction avec notre audience internationale a dépassé nos attentes. L'équipe technique a assuré une diffusion sans faille pendant toute la durée de l'événement.",
    "profile3",
    ["profile1", "profile4"],
    {
      github: "https://github.com/company/stereopsia-stream",
      preview: "https://stereopsia-replay.demo.com"
    }
  ),
  createProject(
    "4",
    "Conférence/Hackathon Blockchain Web3",
    "Organisation d'un événement hybride combinant conférences sur la blockchain et hackathon Web3, réunissant experts et développeurs pour explorer les innovations dans le domaine.",
    "2024-06-01",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    "Événementiel",
    "TechEvents",
    "L'organisation de cet événement hybride était remarquable. La synergie entre les conférences et le hackathon a créé une atmosphère unique d'apprentissage et d'innovation dans le domaine de la blockchain.",
    "profile4",
    ["profile2", "profile3"],
    {
      github: "https://github.com/company/blockchain-hackathon",
      preview: "https://blockchain-hackathon.demo.com"
    }
  ),
  createProject(
    "5",
    "Couverture Evènement: SXSW London 2025",
    "Couverture médiatique complète du SXSW London 2025, incluant reportages, interviews exclusives et création de contenu en direct pour documenter cet événement majeur de l'industrie créative.",
    "2024-07-15",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
    "Événementiel",
    "EventCorp",
    "La couverture médiatique de SXSW London était exceptionnelle. Les reportages et interviews ont capturé l'essence même de l'événement, offrant une perspective unique à ceux qui n'ont pas pu y assister.",
    "profile3",
    ["profile2", "profile4"],
    {
      github: "https://github.com/company/sxsw-london-2025",
      preview: "https://sxsw-london.demo.com"
    }
  ),
  createProject(
    "6",
    "Programme de formation Entrepreneur Media",
    "Développement d'un programme de formation complet destiné aux entrepreneurs, focalisé sur la création de contenu média, la stratégie digitale et la gestion de présence en ligne.",
    "2024-08-30",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    "Formation",
    "EduMedia",
    "Le programme de formation a transformé notre approche du marketing digital. Les modules sont pratiques, pertinents et immédiatement applicables. Nos entrepreneurs ont vu des résultats concrets dès la première semaine.",
    "profile1",
    ["profile2", "profile4"],
    {
      github: "https://github.com/company/entrepreneur-media-training",
      preview: "https://entrepreneur-media-training.demo.com"
    }
  ),
  createProject(
    "7",
    "Campagne Marketing Digital \"Road to 2030\"",
    "Élaboration et mise en œuvre d'une campagne marketing visionnaire projetant les tendances et innovations digitales jusqu'en 2030, avec stratégie multicanale et contenu prospectif.",
    "2024-09-15",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "Marketing",
    "DigitalBoost",
    "La campagne 'Road to 2030' a positionné notre entreprise comme un leader visionnaire dans le secteur digital. L'approche prospective et le contenu de qualité ont généré un engagement exceptionnel de notre audience cible.",
    "profile2",
    ["profile1", "profile3"],
    {
      github: "https://github.com/company/road-to-2030-campaign",
      preview: "https://road-to-2030.demo.com"
    }
  ),
  createProject(
    "8",
    "Développement application mobile \"Petits producteurs locaux\"",
    "Création d'une application mobile connectant consommateurs et producteurs locaux, avec fonctionnalités de géolocalisation, système de commande et plateforme communautaire.",
    "2024-10-30",
    "https://images.unsplash.com/photo-1512054502232-10a0a035d672",
    "Développement",
    "AppTech",
    "L'application a révolutionné la façon dont nos producteurs locaux connectent avec leurs clients. L'interface intuitive et les fonctionnalités de géolocalisation ont créé une véritable communauté autour de l'agriculture locale.",
    "profile4",
    ["profile2", "profile3"],
    {
      github: "https://github.com/company/local-producer-app",
      preview: "https://local-producer.demo.com"
    }
  )
];