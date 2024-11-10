import { useEffect, useState } from "react";
import { initializeUsers } from "@/utils/initializeData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TeamMemberCard } from "@/components/blocks/TeamMemberCard";
import { teamMembers } from "@/data/team-members";

const UsersGallery = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const init = async () => {
      await initializeUsers();
      setIsLoading(false);
    };
    init();
  }, []);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <p className="text-gray-600">Chargement des profils...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8 text-center">Notre équipe</h1>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {Object.values(teamMembers).map((member) => (
            <TeamMemberCard
              key={member.username}
              name={member.name}
              username={member.username}
              avatar={member.avatar}
              contribution={member.contribution || 0}
              contributionDescription={member.quote}
              expertise={member.expertise}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default UsersGallery;