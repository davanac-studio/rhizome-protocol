import { Project } from "@/types/project";
import { TeamMemberCard } from "./TeamMemberCard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ClientBlockProps {
  client: string;
  testimonial?: string;
}

export const ClientBlock = ({ client }: ClientBlockProps) => {
  const [clientProfile, setClientProfile] = useState<any>(null);

  useEffect(() => {
    const fetchClientProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', client)
        .single();
      
      if (data) {
        setClientProfile({
          name: `${data.first_name} ${data.last_name}`,
          username: data.username,
          avatar: data.avatar_url,
          expertise: data.expertise,
          contribution: 0,
          contributionDescription: "Client du projet"
        });
      }
    };

    fetchClientProfile();
  }, [client]);

  if (!clientProfile) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Client</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <TeamMemberCard
            name={clientProfile.name}
            username={clientProfile.username}
            avatar={clientProfile.avatar || ""}
            contribution={clientProfile.contribution}
            contributionDescription={clientProfile.contributionDescription}
            expertise={clientProfile.expertise}
          />
        </div>
      </div>
    </div>
  );
};