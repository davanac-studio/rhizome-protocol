import { useParams } from "react-router-dom";
import { useState } from "react";
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

const ProjectDetails = () => {
  const { id } = useParams();
  const [project] = useState<Project>({
    id: "1",
    title: "Vidéo Explainer \"La guerre en Ukraine\"",
    description: "Création d'une vidéo explicative détaillée sur le conflit en Ukraine, analysant les enjeux géopolitiques et humanitaires pour une meilleure compréhension du public.",
    dueDate: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    category: "Production Vidéo",
    client: "TechCorp",
    testimonial: "Une vidéo explicative exceptionnelle qui a permis à notre audience de mieux comprendre les enjeux complexes du conflit en Ukraine. L'équipe a su traduire des concepts géopolitiques complexes en contenus accessibles et engageants.",
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