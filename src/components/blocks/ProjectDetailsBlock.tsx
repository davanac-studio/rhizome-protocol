import { ProjectMember } from "@/types/project";
import { TeamMemberCard } from "./TeamMemberCard";
import { Card, CardContent } from "@/components/ui/card";

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
      <div>
        <h3 className="text-lg font-semibold mb-4">Team Leader</h3>
        <TeamMemberCard
          name={author.name}
          avatar={author.avatar || ""}
          expertise={author.expertise}
          contribution={author.contribution}
          bio={author.contributionDescription}
        />
      </div>

      {participants && participants.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Participants</h3>
          <div className="space-y-4">
            {participants.map((participant, index) => (
              <TeamMemberCard
                key={index}
                name={participant.name}
                avatar={participant.avatar || ""}
                expertise={participant.expertise}
                contribution={participant.contribution}
                bio={participant.contributionDescription}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};