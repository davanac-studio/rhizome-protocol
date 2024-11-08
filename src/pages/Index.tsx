import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { NewProjectDialog } from "@/components/NewProjectDialog";
import { Project } from "@/types/project";

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Vidéo Explainer",
      description: "Production de vidéos explicatives professionnelles pour présenter vos produits, services ou concepts de manière claire et engageante.",
      status: "In Progress",
      progress: 65,
      dueDate: "2024-03-15",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      category: "Production Vidéo",
      client: "TechCorp",
      author: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John"
      }
    },
    {
      id: "2",
      title: "Vidéo Aftermovie",
      description: "Création d'aftermovies captivants pour immortaliser vos événements et partager les moments forts avec votre audience.",
      status: "Planning",
      progress: 20,
      dueDate: "2024-04-30",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "Production Vidéo",
      client: "EventPro",
      author: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Jane"
      }
    },
    {
      id: "3",
      title: "Live Twitch/Youtube",
      description: "Gestion et production de streams en direct sur Twitch et YouTube, incluant la configuration technique et la modération.",
      status: "In Progress",
      progress: 45,
      dueDate: "2024-05-15",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      category: "Streaming",
      client: "StreamMaster",
      author: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John"
      }
    },
    {
      id: "4",
      title: "Conférence/Hackathon",
      description: "Organisation et couverture complète de conférences et hackathons, incluant la captation vidéo et la diffusion en direct.",
      status: "Planning",
      progress: 15,
      dueDate: "2024-06-01",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "Événementiel",
      client: "TechEvents",
      author: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Jane"
      }
    },
    {
      id: "5",
      title: "Couverture Evènement",
      description: "Service complet de couverture médiatique pour vos événements, incluant photo, vidéo et création de contenu en temps réel.",
      status: "On Hold",
      progress: 0,
      dueDate: "2024-07-15",
      thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      category: "Événementiel",
      client: "EventCorp",
      author: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John"
      }
    },
    {
      id: "6",
      title: "Programme de formation Entrepreneur Media",
      description: "Programme de formation complet pour entrepreneurs souhaitant maîtriser la création et la gestion de contenu médiatique.",
      status: "Planning",
      progress: 30,
      dueDate: "2024-08-30",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      category: "Formation",
      client: "EduMedia",
      author: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Jane"
      }
    },
    {
      id: "7",
      title: "Campagne Marketing Digital",
      description: "Stratégie et exécution de campagnes marketing digitales multicanales pour maximiser votre présence en ligne.",
      status: "In Progress",
      progress: 50,
      dueDate: "2024-09-15",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      category: "Marketing",
      client: "DigitalBoost",
      author: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John"
      }
    },
    {
      id: "8",
      title: "Développement application mobile",
      description: "Conception et développement d'applications mobiles sur mesure pour iOS et Android avec focus sur l'expérience utilisateur.",
      status: "Planning",
      progress: 10,
      dueDate: "2024-10-30",
      thumbnail: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      category: "Développement",
      client: "AppTech",
      author: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=Jane"
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
