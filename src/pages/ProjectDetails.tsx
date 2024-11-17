import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ProjectHeader } from "@/components/ProjectHeader";
import { ProjectDetailsComponent } from "@/components/ProjectDetails";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { transformDatabaseProject } from "@/utils/projectTransformers";
import { useAuth } from "@/contexts/AuthContext";

const ProjectDetails = () => {
  const { idWithSlug } = useParams();
  const id = idWithSlug?.split('-')[0];
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

  const handleEditClick = () => {
    if (id) {
      navigate(`/project/${idWithSlug}/edit`);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux Projets
            </Button>
          </Link>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Une erreur est survenue lors du chargement du projet
            </h2>
            <p className="text-gray-600">
              Le projet n'a pas pu être chargé. Veuillez réessayer ultérieurement.
            </p>
          </div>
        </div>
      </div>
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
      <div className="min-h-screen bg-gray-50">
        <div className="container py-8">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux Projets
            </Button>
          </Link>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Projet non trouvé
            </h2>
            <p className="text-gray-600">
              Le projet que vous recherchez n'existe pas ou a été supprimé.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isProjectCreator = user?.id === project.author.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux Projets
            </Button>
          </Link>
          {user && isProjectCreator && (
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleEditClick}
            >
              <Pencil className="w-4 h-4" />
              Modifier le projet
            </Button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-96 object-cover"
          />
          
          <div className="p-8">
            <ProjectHeader project={project} />
            <ProjectDetailsComponent project={project} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;