import { supabase } from "@/lib/supabase";
import { ProjectLink } from "@/types/project";

export const migrateProjects = async () => {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*');

  if (error) {
    console.error('Error fetching projects:', error);
    return;
  }

  for (const project of projects) {
    const links: ProjectLink[] = [];
    
    if (project.demo_link_1) links.push({ url: project.demo_link_1 });
    if (project.demo_link_2) links.push({ url: project.demo_link_2 });
    if (project.demo_link_3) links.push({ url: project.demo_link_3 });
    if (project.demo_link_4) links.push({ url: project.demo_link_4 });

    try {
      const { error: insertError } = await supabase
        .from('project_links')
        .insert(links.map(link => ({
          project_id: project.id,
          url: link.url
        })));

      if (insertError) {
        console.error('Error inserting project links:', insertError);
      }
    } catch (err) {
      console.error('Error during migration:', err);
    }
  }
};