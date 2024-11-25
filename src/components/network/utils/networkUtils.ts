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

    // Add links between participants and client
    participants.forEach(participantId => {
      links.push({
        source: participantId,
        target: project.client_profile.id,
        projectId: project.id,
        projectTitle: project.title
      });
    });
  }
};