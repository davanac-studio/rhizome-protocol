import { ProjectMember } from "@/types/project";
import { TeamMemberCard } from "./TeamMemberCard";
import { Link2Icon } from "lucide-react";
import { LinkPreviewCard } from "./LinkPreviewCard";

interface ProjectDetailsBlockProps {
  dueDate: string;
  links: {
    demo_link_1: string;
    preview: string;
  };
  thumbnail: string;
  title: string;
  author: ProjectMember & { role: "Team Leader" };
  participants?: ProjectMember[];
}

export const ProjectDetailsBlock = ({
  dueDate,
  links,
  thumbnail,
  title,
  author,
  participants,
}: ProjectDetailsBlockProps) => {
  return (
    <div className="space-y-6">
      {(links.demo_link_1 || links.preview) && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Link2Icon className="w-5 h-5" />
            Liens du projet
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.demo_link_1 && (
              <LinkPreviewCard 
                url={links.demo_link_1}
                title={title}
                thumbnail={thumbnail}
              />
            )}
            {links.preview && (
              <LinkPreviewCard 
                url={links.preview}
                title={title}
                thumbnail={thumbnail}
              />
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
          <h3 className="text-lg font-semibold mb-4">Contributeur(s)</h3>
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