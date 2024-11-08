import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarIcon, UserCircle2, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

const ProjectDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);

  // Simulation de la récupération des données depuis Index.tsx
  useEffect(() => {
    const projects = [
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
        author: {
          name: "Lucas Petit",
          avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          role: "Team Leader"
        }
      }
    ];

    const foundProject = projects.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    } else {
      toast({
        title: "Erreur",
        description: "Projet non trouvé",
        variant: "destructive"
      });
    }
  }, [id, toast]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Chargement...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux Projets
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-96 object-cover"
          />
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={project.author.avatar} alt={project.author.name} />
                            <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{project.author.name}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{project.author.role}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Badge variant="outline">
                {project.category}
              </Badge>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Détails du Projet</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Date de publication: {new Date(project.dueDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <UserCircle2 className="w-4 h-4" />
                  <span>Client: {project.client}</span>
                </div>
                {project.testimonial && (
                  <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start gap-2 text-gray-600">
                      <Quote className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                      <p className="italic text-gray-700">{project.testimonial}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;