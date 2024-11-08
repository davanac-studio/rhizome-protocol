import { CalendarIcon, UserCircle2, Users } from "lucide-react";
import { Project } from "@/types/project";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectDetailsProps {
  project: Project;
}

export const ProjectDetailsComponent = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="space-y-8">
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

      <div>
        <h3 className="text-lg font-semibold mb-4">Team Leader</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-gray-600">
            <Avatar className="w-8 h-8">
              <AvatarImage src={project.author.avatar} alt={project.author.name} />
              <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span>{project.author.name}</span>
                <span className="text-sm text-gray-500">{project.author.contribution}%</span>
              </div>
              <div className="text-sm text-gray-500">{project.author.expertise}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Participants
        </h3>
        <div className="space-y-6">
          {project.participants && project.participants.map((participant, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span>{participant.name}</span>
                          <span className="text-sm text-gray-500">{participant.contribution}%</span>
                        </div>
                        <div className="text-sm text-gray-500">{participant.expertise}</div>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{participant.role}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
};