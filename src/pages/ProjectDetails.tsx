import { useParams } from "react-router-dom";
import { useState } from "react";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarIcon, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project] = useState<Project>({
    id: "1",
    title: "Vidéo Explainer \"La guerre en Ukraine\"",
    description: "Création d'une vidéo explicative détaillée sur le conflit en Ukraine, analysant les enjeux géopolitiques et humanitaires pour une meilleure compréhension du public.",
    status: "In Progress",
    progress: 65,
    dueDate: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    category: "Production Vidéo",
    client: "TechCorp",
    author: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
      role: "Team Leader"
    }
  });

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
              <div className="flex flex-col items-end gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {project.status}
                </Badge>
                <Badge variant="outline">
                  {project.category}
                </Badge>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Progression du Projet</h3>
                <Progress value={project.progress} className="w-full h-2" />
                <span className="text-sm text-gray-600 mt-2 inline-block">
                  {project.progress}% Complété
                </span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;