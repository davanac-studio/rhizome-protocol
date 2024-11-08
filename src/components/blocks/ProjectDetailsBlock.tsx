import { ProjectMember } from "@/types/project";
import { TeamMemberCard } from "./TeamMemberCard";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectDetailsBlockProps {
  leader: ProjectMember;
  participants?: ProjectMember[];
}

export const ProjectDetailsBlock = ({
  leader,
  participants,
}: ProjectDetailsBlockProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Team Leader</h3>
        <TeamMemberCard
          name={leader.name}
          avatar={leader.avatar || ""}
          expertise={leader.expertise}
          contribution={leader.contribution}
          bio={leader.contributionDescription}
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