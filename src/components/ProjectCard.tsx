import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <Button
      variant="ghost"
      className="p-0 h-auto w-full hover:bg-transparent"
      onClick={handleClick}
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 w-full hover:scale-[1.02] animate-fadeIn">
        <div className="relative">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-48 object-cover brightness-75 group-hover:brightness-90 transition-all"
          />
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-2xl mb-3 text-left break-words line-clamp-2">{project.title}</h3>
          <p className="text-gray-600 mb-6 text-left line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm">
                {new Date(project.dueDate).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              {project.category}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <UserCircle2 className="w-5 h-5" />
            <span className="text-sm">Client: {project.client}</span>
          </div>
        </div>
      </Card>
    </Button>
  );
};