import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Project } from "@/types/project";
import { useNavigate } from "react-router-dom";

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const navigate = useNavigate();

  const handleProfileClick = (name: string) => {
    navigate(`/profile?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="flex justify-between items-start mb-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-2">
                  <Avatar 
                    className="w-8 h-8 cursor-pointer" 
                    onClick={() => handleProfileClick(project.author.name)}
                  >
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
  );
};