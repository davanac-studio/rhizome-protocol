/**
 * Custom Hook: useNetworkData
 * Description: Fetches and processes network visualization data
 * 
 * Endpoint: GET /rest/v1/projects
 * Description: Fetches all projects with related participant data
 * Response Structure:
 *   - nodes: Array<{
 *       id: string
 *       name: string
 *       group: string
 *       value: number
 *     }>
 *   - links: Array<{
 *       source: string
 *       target: string
 *       value: number
 *     }>
 * 
 * Query Parameters:
 *   - select: Specific fields to return
 *   - relationships: Related data to include
 */
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { NetworkNode, NetworkLink, Profile, Project } from "../types/networkTypes";
import { transformProfileToNode, createNetworkLinks } from "../utils/networkUtils";

/**
 * Helper function to count and aggregate collaborations between nodes
 * 
 * @param links - Array of network links to process
 * @returns Array of network links with added collaboration counts
 */
const countCollaborations = (links: NetworkLink[]): NetworkLink[] => {
  const collaborationMap = new Map<string, number>();
  
  links.forEach(link => {
    const key = [link.source, link.target].sort().join('-');
    collaborationMap.set(key, (collaborationMap.get(key) || 0) + 1);
  });
  
  return links.map(link => {
    const key = [link.source, link.target].sort().join('-');
    return {
      ...link,
      collaborationCount: collaborationMap.get(key) || 1
    };
  });
};

/**
 * Custom Hook: useNetworkData
 * Fetches and processes project data to create a network visualization of collaborations
 * between team leaders, clients, and project participants.
 * 
 * @returns {Object} An object containing:
 *   - data (Object | undefined): The processed network data containing:
 *     - nodes (NetworkNode[]): Array of network nodes representing users
 *     - links (NetworkLink[]): Array of connections between users
 *   - isLoading (boolean): Loading state of the data fetch
 *   - error (Error | null): Any error that occurred during data fetch
 */
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
          const node = transformProfileToNode(project.team_leader_profile as unknown as Profile);
          if (nodes.has(node.id)) {
            const existingNode = nodes.get(node.id)!;
            nodes.set(node.id, { ...existingNode, value: existingNode.value + 1 });
          } else {
            nodes.set(node.id, node);
          }
        }

        // Add client to nodes
        if (project.client_profile) {
          const node = transformProfileToNode(project.client_profile as unknown as Profile);
          if (nodes.has(node.id)) {
            const existingNode = nodes.get(node.id)!;
            nodes.set(node.id, { ...existingNode, value: existingNode.value + 1 });
          } else {
            nodes.set(node.id, node);
          }
        }

        // Add participants to nodes and create links
        project.project_participants?.forEach(({ user }) => {
          if (!user) return;
          
          const node = transformProfileToNode(user as unknown as Profile);
          if (nodes.has(node.id)) {
            const existingNode = nodes.get(node.id)!;
            nodes.set(node.id, { ...existingNode, value: existingNode.value + 1 });
          } else {
            nodes.set(node.id, node);
          }

          // Create link between participant and client
          if (project.client_profile) {
            links.push({
              source: node.id,
              target: (project.client_profile as unknown as Profile).id,
              projectId: project.id,
              projectTitle: project.title
            });
          }

          // Create link between participant and team leader
          if (project.team_leader_profile) {
            links.push({
              source: node.id,
              target: (project.team_leader_profile as unknown as Profile).id,
              projectId: project.id,
              projectTitle: project.title
            });
          }
        });

        // Create link between team leader and client
        if (project.client_profile && project.team_leader_profile) {
          links.push({
            source: (project.team_leader_profile as unknown as Profile).id,
            target: (project.client_profile as unknown as Profile).id,
            projectId: project.id,
            projectTitle: project.title
          });
        }
      });

      const processedLinks = countCollaborations(links);

      return {
        nodes: Array.from(nodes.values()),
        links: processedLinks.filter((link, index, self) => 
          index === self.findIndex(l => 
            (l.source === link.source && l.target === link.target) ||
            (l.source === link.target && l.target === link.source)
          )
        )
      };
    }
  });
};