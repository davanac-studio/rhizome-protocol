import { SimulationNodeDatum } from 'd3';

export interface NetworkNode extends SimulationNodeDatum {
  id: string;
  name: string;
  avatar: string | null;
  value: number;
  expertise: string;
  isCollectif: boolean;
}

export interface NetworkLink {
  source: NetworkNode | string;
  target: NetworkNode | string;
  projectId: string;
  projectTitle: string;
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  "collectif-name": string | null;
  avatar_url: string | null;
  expertise: string | null;
  account_type: string | null;
}

export interface Project {
  id: string;
  title: string;
  team_leader: string;
  client: string | null;
  team_leader_profile: Profile;
  client_profile?: Profile;
  project_participants?: Array<{
    user: Profile;
  }>;
}