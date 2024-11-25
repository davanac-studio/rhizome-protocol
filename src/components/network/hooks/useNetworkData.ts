import { NetworkNode, NetworkLink, Profile, Project } from "../types/networkTypes";

const transformProfileToNode = (profile: Profile): NetworkNode => {
  const isCollectif = profile.account_type?.toLowerCase() === 'collectif';
  const name = isCollectif ? profile["collectif-name"] || '' : `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
  
  return {
    id: profile.id,
    name,
    avatar: profile.avatar_url,
    value: 1,
    expertise: profile.expertise || '',
    isCollectif,
    x: 0,
    y: 0,
    index: 0,
    vx: 0,
    vy: 0,
    fx: null,
    fy: null
  };
};

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

const createNetworkLinks = (project: Project, links: NetworkLink[]) => {
  const participants = project.project_participants?.map(p => p.user.id) || [];
  const allMembers = [project.team_leader_profile.id, ...participants];

  // Create links between all project members
  for (let i = 0; i < allMembers.length; i++) {
    for (let j = i + 1; j < allMembers.length; j++) {
      links.push({
        source: allMembers[i],
        target: allMembers[j],
        projectId: project.id,
        projectTitle: project.title
      });
    }
  }

  // Add link between team leader and client if exists
  if (project.client_profile) {
    links.push({
      source: project.team_leader_profile.id,
      target: project.client_profile.id,
      projectId: project.id,
      projectTitle: project.title
    });
  }
};

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

        // Create network links
        createNetworkLinks(project as unknown as Project, links);

        // Add participants to nodes
        project.project_participants?.forEach(({ user }) => {
          if (!user) return;
          const node = transformProfileToNode(user as unknown as Profile);
          if (nodes.has(node.id)) {
            const existingNode = nodes.get(node.id)!;
            nodes.set(node.id, { ...existingNode, value: existingNode.value + 1 });
          } else {
            nodes.set(node.id, node);
          }
        });
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