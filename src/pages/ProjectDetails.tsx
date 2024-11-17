import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { transformDatabaseProject } from "@/utils/projectTransformers";
import { useAuth } from "@/contexts/AuthContext";
import { extractIdFromSlug } from "@/utils/slugUtils";
import { ProjectError } from "@/components/project/ProjectError";
import { ProjectContent } from "@/components/project/ProjectContent";

const ProjectDetails = () => {
  const { idWithSlug } = useParams();
  const id = extractIdFromSlug(idWithSlug);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: project, isLoading, error } = useQuery({
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
        .single();

      if (projectError) {
        console.error('Error fetching project:', projectError);
        toast({
          title: "Erreur",
          description: "Impossible de charger le projet",
          variant: "destructive"
        });
        throw projectError;
      }

      if (!projectData) {
        toast({
          title: "Erreur",
          description: "Projet non trouvé",
          variant: "destructive"
        });
        throw new Error("Project not found");
      }

      return transformDatabaseProject({
        ...projectData,
        author: {
          ...projectData.team_leader_profile,
          role: "Team Leader",
          contribution: projectData.team_leader_contribution,
          contributionDescription: projectData.team_leader_contribution_description
        },
        participants: projectData.project_participants?.map((p: any) => ({
          ...p.user,
          role: "Member",
          contribution: p.contribution,
          contributionDescription: p.contribution_description
        })) || []
      });
    },
    retry: false,
    enabled: !!id
  });

  if (error) {
    return (
      <ProjectError 
        title="Une erreur est survenue lors du chargement du projet"
        description="Le projet n'a pas pu être chargé. Veuillez réessayer ultérieurement."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Chargement...</h2>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <ProjectError 
        title="Projet non trouvé"
        description="Le projet que vous recherchez n'existe pas ou a été supprimé."
      />
    );
  }

  const isProjectCreator = user?.id === project.author.id;
  const handleEditClick = () => {
    if (idWithSlug) {
      navigate(`/project/${idWithSlug}/edit`);
    }
  };

  return (
    <ProjectContent 
      project={project}
      isProjectCreator={isProjectCreator}
      onEditClick={handleEditClick}
      idWithSlug={idWithSlug || ''}
    />
  );
};

export default ProjectDetails;