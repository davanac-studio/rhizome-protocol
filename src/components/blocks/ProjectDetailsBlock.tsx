import { ProjectMember } from "@/types/project";
import { TeamMemberCard } from "./TeamMemberCard";
import { Link2Icon, GithubIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectDetailsBlockProps {
  dueDate: string;
  links: {
    github: string;
    preview: string;
  };
  author: ProjectMember & { role: "Team Leader" };
  participants?: ProjectMember[];
}

export const ProjectDetailsBlock = ({
  dueDate,
  links,
  author,
  participants,
}: ProjectDetailsBlockProps) => {
  return (
    <div className="space-y-6">
      {(links.github || links.preview) && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Link2Icon className="w-5 h-5" />
            Liens du projet
          </h3>
          <div className="flex flex-wrap gap-4">
            {links.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </Button>
              </a>
            )}
            {links.preview && (
              <a href={links.preview} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <ExternalLinkIcon className="w-4 h-4" />
                  Prévisualisation
                </Button>
              </a>
            )}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-4">Team Leader</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <TeamMemberCard
            name={author.name}
            username={author.username}
            avatar={author.avatar || ""}
            contribution={author.contribution}
            contributionDescription={author.contributionDescription}
            expertise={author.expertise}
          />
        </div>
      </div>

      {participants && participants.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Participants</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {participants.map((participant, index) => (
              <TeamMemberCard
                key={index}
                name={participant.name}
                username={participant.username}
                avatar={participant.avatar || ""}
                contribution={participant.contribution}
                contributionDescription={participant.contributionDescription}
                expertise={participant.expertise}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};