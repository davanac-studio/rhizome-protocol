import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { NetworkChart } from "./NetworkChart";
import { NetworkBackground } from "./NetworkBackground";
import { Card } from "@/components/ui/card";
import { Database } from "@/integrations/supabase/types";

interface NetworkNode {
  id: string;
  name: string;
  avatar: string | null;
  value: number;
}

interface NetworkLink {
  source: NetworkNode;
  target: NetworkNode;
  projectId: string;
  projectTitle: string;
}

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

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
            avatar_url
          ),
          project_participants (
            user:profiles!project_participants_user_id_fkey (
              id,
              first_name,
              last_name,
              avatar_url
            )
          )
        `);

      if (error) throw error;

      const nodes = new Map<string, NetworkNode>();
      const links: NetworkLink[] = [];

      projects?.forEach(project => {
        // Add team leader to nodes
        const teamLeader = project.team_leader_profile as Profile;
        if (teamLeader) {
          const leaderId = teamLeader.id;
          if (!nodes.has(leaderId)) {
            nodes.set(leaderId, {
              id: leaderId,
              name: `${teamLeader.first_name || ''} ${teamLeader.last_name || ''}`.trim(),
              avatar: teamLeader.avatar_url,
              value: 1
            });
          } else {
            const node = nodes.get(leaderId)!;
            nodes.set(leaderId, { ...node, value: node.value + 1 });
          }
        }

        // Add participants to nodes and create links
        project.project_participants?.forEach(({ user }) => {
          if (!user) return;
          
          const participantId = user.id;
          if (!nodes.has(participantId)) {
            nodes.set(participantId, {
              id: participantId,
              name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
              avatar: user.avatar_url,
              value: 1
            });
          } else {
            const node = nodes.get(participantId)!;
            nodes.set(participantId, { ...node, value: node.value + 1 });
          }

          // Create links between team leader and participants
          if (teamLeader) {
            const sourceNode = nodes.get(teamLeader.id)!;
            const targetNode = nodes.get(participantId)!;
            links.push({
              source: sourceNode,
              target: targetNode,
              projectId: project.id,
              projectTitle: project.title
            });
          }

          // Create links between participants
          project.project_participants?.forEach(({ user: otherUser }) => {
            if (!otherUser || otherUser.id === participantId) return;
            const sourceNode = nodes.get(participantId)!;
            const targetNode = nodes.get(otherUser.id)!;
            links.push({
              source: sourceNode,
              target: targetNode,
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
            (l.source.id === link.source.id && l.target.id === link.target.id) ||
            (l.source.id === link.target.id && l.target.id === link.source.id)
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
    <Card className="relative p-4">
      <h2 className="text-2xl font-bold mb-4">Réseau des collaborations</h2>
      <div className="relative h-[600px] w-full">
        <NetworkBackground />
        <div className="relative z-10 h-full">
          <NetworkChart data={networkData} />
        </div>
      </div>
    </Card>
  );
};