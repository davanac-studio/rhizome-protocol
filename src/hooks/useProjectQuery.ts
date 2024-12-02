/**
 * Custom Hook: useProjectQuery
 * Description: Fetches and manages project data using React Query.
 * 
 * Technical choices:
 * - React Query: For data fetching, caching, and automatic background updates
 * - Supabase: As the backend service for data storage and retrieval
 * - Toast notifications: For user feedback on errors
 * 
 * @param {string | undefined} idWithSlug - Project ID with optional slug
 * @returns {Object} Query result object containing:
 *   - data: The transformed project data
 *   - isLoading: Loading state indicator
 *   - error: Any error that occurred
 */
import { useQuery } from "@tanstack/react-query"; // For data fetching and caching
import { supabase } from "@/lib/supabase"; // Supabase client for database operations
import { useToast } from "@/hooks/use-toast"; // Toast notifications for user feedback
import { transformDatabaseProject } from "@/utils/projectTransformers"; // Data transformation utility
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import { extractIdFromSlug } from "@/utils/slugify"; // URL slug processing utility

export const useProjectQuery = (idWithSlug: string | undefined) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Extract numeric ID from slug format
  const id = extractIdFromSlug(idWithSlug);

  return useQuery({
    queryKey: ['project', id], // Unique key for React Query cache
    queryFn: async () => {
      if (!id) {
        console.error('Invalid project ID:', idWithSlug);
        throw new Error("Invalid project ID");
      }

      // Fetch project data with all related information in a single query
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
        .maybeSingle(); // Returns null instead of empty array if not found

      if (projectError) {
        console.error('Error fetching project:', projectError);
        throw projectError;
      }

      if (!projectData) {
        console.error('Project not found:', id);
        throw new Error("Project not found");
      }

      // Transform database model to application model
      return transformDatabaseProject(projectData);
    },
    retry: 1, // Only retry once on failure
    enabled: !!id // Only run query if we have an ID
  });
};