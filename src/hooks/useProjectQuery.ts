import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { transformDatabaseProject } from "@/utils/projectTransformers";
import { useNavigate } from "react-router-dom";

export const useProjectQuery = (idWithSlug: string | undefined) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Extract the ID from the slug (e.g., "123-my-project" -> "123")
  const id = idWithSlug?.split('-')[0];

  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!id) {
        toast({
          title: "Erreur",
          description: "ID du projet invalide",
          variant: "destructive"
        });
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
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (projectError) {
        console.error('Error fetching project:', projectError);
        toast({
          title: "Erreur",
          description: "Impossible de charger le projet",
          variant: "destructive"
        });
        navigate('/');
        throw projectError;
      }

      if (!projectData) {
        toast({
          title: "Erreur",
          description: "Projet non trouvé",
          variant: "destructive"
        });
        navigate('/');
        throw new Error("Project not found");
      }

      return transformDatabaseProject(projectData);
    },
    retry: false,
    enabled: !!id
  });
};