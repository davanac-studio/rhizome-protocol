import { supabase } from "@/lib/supabase";
import { projectsData } from "@/data/projects";
import { Project } from "@/types/project";

export const migrateProjectsToSupabase = async () => {
  try {
    // Transform projects to match Supabase table structure
    const formattedProjects = projectsData.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      due_date: project.dueDate,
      thumbnail: project.thumbnail,
      category: project.category,
      client: project.client,
      testimonial: project.testimonial,
      github_link: project.links?.github || null,
      preview_link: project.links?.preview || null,
      team_leader: project.author.name, // Temporarily using name as we don't have user IDs yet
      team_leader_contribution: project.author.contribution,
      team_leader_contribution_description: project.author.contributionDescription
    }));

    // Insert projects into Supabase
    const { data, error } = await supabase
      .from('projects')
      .upsert(formattedProjects, {
        onConflict: 'id',
        ignoreDuplicates: false
      });

    if (error) {
      console.error('Error migrating projects:', error);
      throw error;
    }

    console.log('Projects successfully migrated:', data);
    return data;
  } catch (error) {
    console.error('Error in migration process:', error);
    throw error;
  }
};