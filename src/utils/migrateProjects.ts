import { supabase } from "@/lib/supabase";
import { eventProjects } from "@/data/projects/event-projects";
import { formationProjects } from "@/data/projects/formation-projects";
import { liveProjects } from "@/data/projects/live-projects";
import { marketingProjects } from "@/data/projects/marketing-projects";
import { mobileProjects } from "@/data/projects/mobile-projects";
import { videoProjects } from "@/data/projects/video-projects";

export const migrateProjects = async () => {
  const allProjects = [
    ...eventProjects,
    ...formationProjects,
    ...liveProjects,
    ...marketingProjects,
    ...mobileProjects,
    ...videoProjects
  ];

  for (const project of allProjects) {
    const { error } = await supabase
      .from('projects')
      .insert({
        id: project.id,
        title: project.title,
        description: project.description,
        due_date: project.dueDate,
        thumbnail: project.thumbnail,
        category: project.category,
        client: project.client,
        testimonial: project.testimonial,
        demo_link_1: project.links.demo_link_1,
        demo_link_2: project.links.preview_link,
        demo_link_3: project.links.demo_link_3,
        demo_link_4: project.links.demo_link_4,
        team_leader: project.author.id,
        team_leader_contribution: project.author.contribution,
        team_leader_contribution_description: project.author.contributionDescription,
      });

    if (error) {
      console.error('Error migrating project:', error);
      continue;
    }

    // Migrate participants
    for (const participant of project.participants || []) {
      const { error: participantError } = await supabase
        .from('project_participants')
        .insert({
          project_id: project.id,
          user_id: participant.id,
          contribution: participant.contribution,
          contribution_description: participant.contributionDescription,
          avatar: participant.avatar
        });

      if (participantError) {
        console.error('Error migrating participant:', participantError);
      }
    }
  }
};