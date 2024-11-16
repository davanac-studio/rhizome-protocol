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
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const isUUID = uuidRegex.test(client);

      if (!isUUID) {
        setClientProfile({
          name: client,
          username: client.toLowerCase().replace(/\s+/g, '-'),
          avatar: null,
          expertise: "Client",
          contributionDescription: "Client du projet",
          contribution: null,
          bio: "Client externe"
        });
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', client)
        .single();
      
      if (data) {
        setClientProfile({
          name: `${data.first_name} ${data.last_name}`,
          username: data.username,
          avatar: data.avatar_url,
          expertise: "Client",
          contributionDescription: "Client du projet",
          contribution: null,
          bio: data.bio || "Client externe"
        });
      }
    };

    fetchClientProfile();
  }, [client]);

  if (!clientProfile) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Commanditaire</h3>
      <TeamMemberCard
        name={clientProfile.name}
        username={clientProfile.username}
        avatar={clientProfile.avatar || ""}
        contribution={null}
        contributionDescription={clientProfile.contributionDescription}
        expertise={clientProfile.expertise}
        bio={clientProfile.bio}
      />
    </div>
  );
};