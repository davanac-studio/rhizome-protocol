import { supabase } from "@/lib/supabase";
import { Project } from "@/types/project";
import { projects } from "@/data/projects";

export const migrateProjectsToSupabase = async () => {
  for (const project of projects) {
    // Insert project
    const { error: projectError } = await supabase
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
        preview_link: project.links.preview_link,
        demo_link_3: project.links.demo_link_3,
        demo_link_4: project.links.demo_link_4,
        team_leader: project.author.id,
        team_leader_contribution: project.author.contribution,
        team_leader_contribution_description: project.author.contributionDescription
      });

    if (projectError) {
      console.error('Error inserting project:', projectError);
      continue;
    }

    // Insert participants
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
        console.error('Error inserting participant:', participantError);
      }
    }
  }
};