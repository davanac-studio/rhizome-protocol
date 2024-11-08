import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  const categories = project.category.split(", ");

  const handleProjectClick = () => {
    navigate(`/project/${project.id}`);
  };

  const handleProfileClick = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    navigate(`/profile?name=${encodeURIComponent(name)}`);
  };

  return (
    <Button
      variant="ghost"
      className="p-0 h-auto w-full hover:bg-transparent"
      onClick={handleProjectClick}
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 w-full hover:scale-[1.02] animate-fadeIn">
        <div className="relative">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-52 object-cover brightness-75 group-hover:brightness-90 transition-all"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-blue-100/90 text-blue-700">
              Certifié
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-xl mb-2 text-left break-words line-clamp-2 min-h-[3.5rem] overflow-hidden text-ellipsis whitespace-normal">
            {project.title}
          </h3>
          
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-sm">
              {new Date(project.dueDate).toLocaleDateString('fr-FR')}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4 text-left text-sm line-clamp-3 min-h-[5.5rem] overflow-hidden text-ellipsis whitespace-normal break-words">
            {project.description}
          </p>
          
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {categories.map((category, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-2">
              <UserCircle2 className="w-4 h-4" />
              <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                Client: {project.client}
              </span>
            </div>
            
            <div className="flex -space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={(e) => handleProfileClick(e, project.author.name)}>
                    <Avatar className="w-8 h-8 border-2 border-white cursor-pointer">
                      <AvatarImage src={project.author.avatar} alt={project.author.name} />
                      <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{project.author.name}</p>
                    <p className="text-xs text-muted-foreground">{project.author.role}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {project.participants?.map((participant, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger onClick={(e) => handleProfileClick(e, participant.name)}>
                      <Avatar className="w-8 h-8 border-2 border-white cursor-pointer">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-xs text-muted-foreground">{participant.role}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Button>
  );
};