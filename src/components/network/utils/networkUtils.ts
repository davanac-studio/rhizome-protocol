import { NetworkNode, NetworkLink, Profile, Project } from "../types/networkTypes";

export const transformProfileToNode = (profile: Profile): NetworkNode => {
  const isCollectif = profile.account_type === 'collectif';
  const name = isCollectif 
    ? profile["collectif-name"] || ''
    : `${profile.first_name || ''} ${profile.last_name || ''}`.trim();

  return {
    id: profile.id,
    name,
    avatar: profile.avatar_url,
    expertise: profile.expertise || 'Non spécifié',
    value: 1,
    isCollectif,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    index: 0,
    fx: null,
    fy: null
  };
};

export const createNetworkLinks = (project: Project, links: NetworkLink[]) => {
  const teamLeaderId = project.team_leader_profile?.id;
  const clientId = project.client_profile?.id;

  // Create links between client and team leader
  if (clientId && teamLeaderId) {
    links.push({
      source: clientId,
      target: teamLeaderId,
      projectId: project.id,
      projectTitle: project.title
    });
  }

  // Create links between team leader and participants
  project.project_participants?.forEach(({ user }) => {
    if (!user || !teamLeaderId) return;
    
    links.push({
      source: teamLeaderId,
      target: user.id,
      projectId: project.id,
      projectTitle: project.title
    });

    // Create links between client and participants
    if (clientId) {
      links.push({
        source: clientId,
        target: user.id,
        projectId: project.id,
        projectTitle: project.title
      });
    }
  });
};