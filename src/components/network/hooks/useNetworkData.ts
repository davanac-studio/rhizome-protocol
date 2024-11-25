import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { NetworkNode, NetworkLink } from "../types/networkTypes";
import { transformProfileToNode, createNetworkLinks } from "../utils/networkUtils";

export const useNetworkData = () => {
  return useQuery({
    queryKey: ['participant-network'],
    queryFn: async () => {
      const { data: projects, error } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          team_leader,
          client,
          team_leader_profile:profiles!projects_team_leader_fkey (
            id,
            first_name,
            last_name,
            avatar_url,
            expertise,
            account_type,
            "collectif-name"
          ),
          client_profile:profiles!projects_client_fkey (
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
        if (project.team_leader_profile) {
          const node = transformProfileToNode(project.team_leader_profile);
          if (nodes.has(node.id)) {
            const existingNode = nodes.get(node.id)!;
            nodes.set(node.id, { ...existingNode, value: existingNode.value + 1 });
          } else {
            nodes.set(node.id, node);
          }
        }

        // Add client to nodes
        if (project.client_profile) {
          const node = transformProfileToNode(project.client_profile);
          if (nodes.has(node.id)) {
            const existingNode = nodes.get(node.id)!;
            nodes.set(node.id, { ...existingNode, value: existingNode.value + 1 });
          } else {
            nodes.set(node.id, node);
          }
        }

        // Create network links
        createNetworkLinks(project, links);

        // Add participants to nodes
        project.project_participants?.forEach(({ user }) => {
          if (!user) return;
          const node = transformProfileToNode(user);
          if (nodes.has(node.id)) {
            const existingNode = nodes.get(node.id)!;
            nodes.set(node.id, { ...existingNode, value: existingNode.value + 1 });
          } else {
            nodes.set(node.id, node);
          }
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
};