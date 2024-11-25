import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { NetworkChart } from "./NetworkChart";
import { Card } from "@/components/ui/card";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  "collectif-name": string | null;
  avatar_url: string | null;
  expertise: string | null;
  account_type: string | null;
}

interface NetworkNode {
  id: string;
  name: string;
  avatar: string | null;
  value: number;
  expertise: string;
  isCollectif: boolean;
}

interface NetworkLink {
  source: string;
  target: string;
  projectId: string;
  projectTitle: string;
}

export const ParticipantNetwork = () => {
  const { data: networkData, isLoading } = useQuery({
    queryKey: ['participant-network'],
    queryFn: async () => {
      const { data: projects, error } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          team_leader,
          team_leader_profile:profiles!projects_team_leader_fkey (
            id,
            first_name,
            last_name,
            avatar_url,
            expertise,
            account_type,
            "collectif-name"
          ),
          project_participants (
            user:profiles!project_participants_user_id_fkey (
              id,
              first_name,
              last_name,
              avatar_url,
              expertise,
              account_type,
              "collectif-name"
            )
          )
        `);

      if (error) throw error;

      const nodes = new Map<string, NetworkNode>();
      const links: NetworkLink[] = [];

      projects?.forEach(project => {
        // Add team leader to nodes
        const teamLeader = project.team_leader_profile as unknown as Profile;
        if (teamLeader) {
          const leaderId = teamLeader.id;
          const isCollectif = teamLeader.account_type === 'collectif';
          const name = isCollectif 
            ? teamLeader["collectif-name"] || ''
            : `${teamLeader.first_name || ''} ${teamLeader.last_name || ''}`.trim();

          if (!nodes.has(leaderId)) {
            nodes.set(leaderId, {
              id: leaderId,
              name: name,
              avatar: teamLeader.avatar_url,
              expertise: teamLeader.expertise || 'Non spécifié',
              value: 1,
              isCollectif
            });
          } else {
            const node = nodes.get(leaderId)!;
            nodes.set(leaderId, { ...node, value: node.value + 1 });
          }
        }

        // Add participants to nodes and create links
        project.project_participants?.forEach(({ user }) => {
          if (!user) return;
          
          const participant = user as unknown as Profile;
          const participantId = participant.id;
          const isCollectif = participant.account_type === 'collectif';
          const name = isCollectif
            ? participant["collectif-name"] || ''
            : `${participant.first_name || ''} ${participant.last_name || ''}`.trim();

          if (!nodes.has(participantId)) {
            nodes.set(participantId, {
              id: participantId,
              name: name,
              avatar: participant.avatar_url,
              expertise: participant.expertise || 'Non spécifié',
              value: 1,
              isCollectif
            });
          } else {
            const node = nodes.get(participantId)!;
            nodes.set(participantId, { ...node, value: node.value + 1 });
          }

          // Create links between team leader and participants
          if (teamLeader) {
            links.push({
              source: teamLeader.id,
              target: participantId,
              projectId: project.id,
              projectTitle: project.title
            });
          }

          // Create links between participants
          project.project_participants?.forEach(({ user: otherUser }) => {
            if (!otherUser || (otherUser as unknown as Profile).id === participantId) return;
            links.push({
              source: participantId,
              target: (otherUser as unknown as Profile).id,
              projectId: project.id,
              projectTitle: project.title
            });
          });
        });
      });

      return {
        nodes: Array.from(nodes.values()),
        links: links.filter((link, index, self) => 
          index === self.findIndex(l => 
            (l.source === link.source && l.target === link.target) ||
            (l.source === link.target && l.target === link.source)
          )
        )
      };
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Chargement du réseau...</p>
      </div>
    );
  }

  if (!networkData) return null;

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">Réseau des collaborations</h2>
      <div className="h-[600px] w-full">
        <NetworkChart data={networkData} />
      </div>
    </Card>
  );
};