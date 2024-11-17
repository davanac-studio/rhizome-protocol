import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectHeader } from "@/components/ProjectHeader";
import { ProjectDetailsComponent } from "@/components/ProjectDetails";

interface ProjectContentProps {
  project: Project;
  isProjectCreator: boolean;
  onEditClick: () => void;
  idWithSlug: string;
}

export const ProjectContent = ({ 
  project, 
  isProjectCreator, 
  onEditClick,
  idWithSlug 
}: ProjectContentProps) => (
  <div className="min-h-screen bg-gray-50">
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <Link to="/">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux Projets
          </Button>
        </Link>
        {isProjectCreator && (
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={onEditClick}
          >
            <Pencil className="w-4 h-4" />
            Modifier le projet
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-96 object-cover"
        />
        
        <div className="p-8">
          <ProjectHeader project={project} />
          <ProjectDetailsComponent project={project} />
        </div>
      </div>
    </div>
  </div>
);