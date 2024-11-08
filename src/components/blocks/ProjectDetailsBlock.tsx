import { CalendarIcon, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectMember } from "@/types/project";
import { TeamMemberCard } from "./TeamMemberCard";

interface ProjectDetailsBlockProps {
  dueDate: string;
  links: {
    github: string;
    preview: string;
  };
  author: ProjectMember;
  participants?: ProjectMember[];
}

export const ProjectDetailsBlock = ({ dueDate, links, author, participants }: ProjectDetailsBlockProps) => {
  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold">Détails du Projet</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarIcon className="w-4 h-4" />
          <span>Date de publication: {new Date(dueDate).toLocaleDateString('fr-FR')}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Team Leader</h3>
        <TeamMemberCard member={author} />
      </div>

      {participants && participants.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Participants</h3>
          <div className="space-y-4">
            {participants.map((participant, index) => (
              <TeamMemberCard key={index} member={participant} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-4">Liens du Projet</h3>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.open(links.github, '_blank')} className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            voir le site
          </Button>
          <Button variant="outline" onClick={() => window.open(links.preview, '_blank')} className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            voir la vidéo
          </Button>
        </div>
      </div>
    </div>
  );
};