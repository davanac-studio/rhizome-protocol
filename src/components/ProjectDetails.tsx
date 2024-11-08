import { CalendarIcon, UserCircle2, Users, Link as LinkIcon, Quote, ExternalLink } from "lucide-react";
import { Project } from "@/types/project";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Liens du Projet</h3>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.open(project.links.github, '_blank')} className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            voir le site
          </Button>
          <Button variant="outline" onClick={() => window.open(project.links.preview, '_blank')} className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            voir la vidéo
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Team Leader</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-gray-600">
            <Avatar className="w-12 h-12">
              <AvatarImage src={project.author.avatar} alt={project.author.name} />
              <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{project.author.name}</span>
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
        <div className="space-y-4">
          {project.participants && project.participants.map((participant, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{participant.name}</span>
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

      {project.testimonial && (
        <div className="mt-6 bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start gap-2 text-gray-600">
            <Quote className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <p className="italic text-gray-700">{project.testimonial}</p>
          </div>
        </div>
      )}

      {project.certification && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Certification NFT</h3>
          <div className="bg-white rounded-lg border p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Contract:</p>
                <p className="font-mono">{project.certification.contract}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Token ID:</p>
                <p className="font-mono">{project.certification.tokenId}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-base font-medium">Metadata:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date de création:</span>
                  <span>{project.certification.creationDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Blockchain:</span>
                  <span>{project.certification.blockchain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Standard:</span>
                  <span>{project.certification.standard}</span>
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-4 flex items-center justify-center gap-2"
              onClick={() => window.open(project.certification?.scanUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              Voir sur Polygonscan
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Client</h3>
        <div className="flex items-center gap-2 text-gray-600">
          <UserCircle2 className="w-4 h-4" />
          <span>{project.client}</span>
        </div>
      </div>
    </div>
  );
};
