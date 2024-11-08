import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        
        <div className="p-4">
          <h3 className="font-bold text-xl mb-2 text-left break-words line-clamp-2 min-h-[3.5rem] overflow-hidden text-ellipsis whitespace-normal">
            {project.title}
          </h3>
          <p className="text-gray-600 mb-4 text-left text-sm line-clamp-3 min-h-[5rem] overflow-hidden text-ellipsis whitespace-normal break-words">
            {project.description}
          </p>
          
          <div className="flex items-center gap-4 mb-3 flex-wrap">
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

          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-2">
              <UserCircle2 className="w-4 h-4" />
              <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                Client: {project.client}
              </span>
            </div>
            <Avatar className="w-8 h-8">
              <AvatarImage src={project.author.avatar} alt={project.author.name} />
              <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </Card>
    </Button>
  );
};