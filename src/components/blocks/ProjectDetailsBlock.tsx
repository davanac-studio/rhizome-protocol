import { ProjectMember } from "@/types/project";
import { TeamMemberCard } from "./TeamMemberCard";
import { Link2Icon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OembedContainer } from "react-oembed-container";

interface ProjectDetailsBlockProps {
  dueDate: string;
  links: {
    demo_link_1: string;
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
      {(links.demo_link_1 || links.preview) && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Link2Icon className="w-5 h-5" />
            Liens du projet
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.demo_link_1 && (
              <div className="space-y-2">
                <a href={links.demo_link_1} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 w-full">
                    <ExternalLinkIcon className="w-4 h-4" />
                    Lien de présentation #1
                  </Button>
                </a>
                <div className="aspect-video w-full overflow-hidden rounded-lg border bg-white shadow">
                  <OembedContainer
                    className="w-full h-full"
                    url={links.demo_link_1}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <iframe
                        src={links.demo_link_1}
                        className="w-full h-full"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </OembedContainer>
                </div>
              </div>
            )}
            {links.preview && (
              <div className="space-y-2">
                <a href={links.preview} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 w-full">
                    <ExternalLinkIcon className="w-4 h-4" />
                    Lien de présentation #2
                  </Button>
                </a>
                <div className="aspect-video w-full overflow-hidden rounded-lg border bg-white shadow">
                  <OembedContainer
                    className="w-full h-full"
                    url={links.preview}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <iframe
                        src={links.preview}
                        className="w-full h-full"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </OembedContainer>
                </div>
              </div>
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