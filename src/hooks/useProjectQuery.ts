import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { transformDatabaseProject } from "@/utils/projectTransformers";
import { useNavigate } from "react-router-dom";
import { extractIdFromSlug } from "@/utils/slugify";

/**
 * Custom Hook: useProjectQuery
 * Fetches detailed project information from Supabase, including team leader, participants, and links.
 * 
 * @param {string | undefined} idWithSlug - The project ID with optional slug (e.g., "123-project-name")
 * @returns {Object} An object containing:
 *   - data (Project | undefined): The transformed project data with all related information
 *   - isLoading (boolean): Loading state of the project fetch
 *   - error (Error | null): Any error that occurred during the fetch
 *   - isFetching (boolean): Indicates if a background refetch is happening
 */
export const useProjectQuery = (idWithSlug: string | undefined) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const id = extractIdFromSlug(idWithSlug);

  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!id) {
        console.error('Invalid project ID:', idWithSlug);
        throw new Error("Invalid project ID");
      }

      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select(`
          *,
          team_leader_profile:profiles!projects_team_leader_fkey (
            id,
            first_name,
            last_name,
            username,
            avatar_url,
            expertise
          ),
          project_participants (
            user:profiles!project_participants_user_id_fkey (
              id,
              first_name,
              last_name,
              username,
              avatar_url,
              expertise
            ),
            contribution,
            contribution_description
          ),
          project_links (
            url
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (projectError) {
        console.error('Error fetching project:', projectError);
        throw projectError;
      }

      if (!projectData) {
        console.error('Project not found:', id);
        throw new Error("Project not found");
      }

      return transformDatabaseProject(projectData);
    },
    retry: 1,
    enabled: !!id
  });
};