import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { NewProjectDialog } from "@/components/NewProjectDialog";
import { Project } from "@/types/project";

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Vidéo Explainer \"La guerre en Ukraine\"",
      description: "Création d'une vidéo explicative détaillée sur le conflit en Ukraine, analysant les enjeux géopolitiques et humanitaires pour une meilleure compréhension du public.",
      status: "In Progress",
      progress: 65,
      dueDate: "2024-03-15",
      thumbnail: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144", // Image liée à l'Ukraine
      category: "Production Vidéo",
      client: "TechCorp",
      author: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
        role: "Team Leader"
      }
    },
    {
      id: "2",
      title: "Vidéo Aftermovie KIKK Festival",
      description: "Production d'un aftermovie dynamique capturant l'essence du KIKK Festival, mettant en valeur les moments forts, les installations artistiques et l'ambiance unique de l'événement.",
      status: "Planning",
      progress: 20,
      dueDate: "2024-04-30",
      thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", // Image d'un festival
      category: "Production Vidéo",
      client: "EventPro",
      author: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Jane",
        role: "Team Leader"
      }
    },
    {
      id: "3",
      title: "Live Twitch/Youtube: Stereopsia Bruxelles",
      description: "Diffusion en direct de la conférence Stereopsia à Bruxelles, couvrant les dernières innovations en réalité virtuelle et augmentée, avec interaction en temps réel avec les spectateurs.",
      status: "In Progress",
      progress: 45,
      dueDate: "2024-05-15",
      thumbnail: "https://images.unsplash.com/photo-1615138133693-e3432e36b0b7", // Image de streaming setup
      category: "Streaming",
      client: "StreamMaster",
      author: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
        role: "Team Leader"
      }
    },
    {
      id: "4",
      title: "Conférence/Hackathon Blockchain Web3",
      description: "Organisation d'un événement hybride combinant conférences sur la blockchain et hackathon Web3, réunissant experts et développeurs pour explorer les innovations dans le domaine.",
      status: "Planning",
      progress: 15,
      dueDate: "2024-06-01",
      thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e", // Image blockchain/crypto
      category: "Événementiel",
      client: "TechEvents",
      author: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Jane",
        role: "Team Leader"
      }
    },
    {
      id: "5",
      title: "Couverture Evènement: SXSW London 2025",
      description: "Couverture médiatique complète du SXSW London 2025, incluant reportages, interviews exclusives et création de contenu en direct pour documenter cet événement majeur de l'industrie créative.",
      status: "On Hold",
      progress: 0,
      dueDate: "2024-07-15",
      thumbnail: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205", // Image de Londres
      category: "Événementiel",
      client: "EventCorp",
      author: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
        role: "Team Leader"
      }
    },
    {
      id: "6",
      title: "Programme de formation Entrepreneur Media",
      description: "Développement d'un programme de formation complet destiné aux entrepreneurs, focalisé sur la création de contenu média, la stratégie digitale et la gestion de présence en ligne.",
      status: "Planning",
      progress: 30,
      dueDate: "2024-08-30",
      thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655", // Image de formation
      category: "Formation",
      client: "EduMedia",
      author: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Jane",
        role: "Team Leader"
      }
    },
    {
      id: "7",
      title: "Campagne Marketing Digital \"Road to 2030\"",
      description: "Élaboration et mise en œuvre d'une campagne marketing visionnaire projetant les tendances et innovations digitales jusqu'en 2030, avec stratégie multicanale et contenu prospectif.",
      status: "In Progress",
      progress: 50,
      dueDate: "2024-09-15",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f", // Image marketing digital
      category: "Marketing",
      client: "DigitalBoost",
      author: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
        role: "Team Leader"
      }
    },
    {
      id: "8",
      title: "Développement application mobile \"Petits producteurs locaux\"",
      description: "Création d'une application mobile connectant consommateurs et producteurs locaux, avec fonctionnalités de géolocalisation, système de commande et plateforme communautaire.",
      status: "Planning",
      progress: 10,
      dueDate: "2024-10-30",
      thumbnail: "https://images.unsplash.com/photo-1512054502232-10a0a035d672", // Image producteurs locaux
      category: "Développement",
      client: "AppTech",
      author: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Jane",
        role: "Team Leader"
      }
    }
  ]);

  const handleCreateProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Project Pulse</h1>
          <NewProjectDialog onProjectCreate={handleCreateProject} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;