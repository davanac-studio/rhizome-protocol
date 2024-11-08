import { videoProjects } from "./projects/video-projects";
import { liveProjects } from "./projects/live-projects";
import { eventProjects } from "./projects/event-projects";
import { formationProjects } from "./projects/formation-projects";
import { marketingProjects } from "./projects/marketing-projects";
import { mobileProjects } from "./projects/mobile-projects";

export const projectsData = [
  ...videoProjects,
  ...liveProjects,
  ...eventProjects,
  ...formationProjects,
  ...marketingProjects,
  ...mobileProjects
];