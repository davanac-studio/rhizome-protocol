import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { ProjectForm } from "@/components/project/ProjectForm";
import { useAuth } from "@/contexts/AuthContext";
import { transformDatabaseProject } from "@/utils/projectTransformers";
import { slugify } from "@/utils/slugify";

const EditProject = () => {
  const { idWithSlug } = useParams();
  // Extract the full ID from the URL parameter
  const id = idWithSlug?.split('-')[0];
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Une erreur est survenue</h2>
          <p className="text-gray-600 mb-4">Impossible de charger le projet</p>
          <Button variant="outline" onClick={() => navigate('/')}>
            Retour à l'accueil
          </Button>
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Projet non trouvé</h2>
          <p className="text-gray-600 mb-4">Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button variant="outline" onClick={() => navigate('/')}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (updatedProject: any) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour modifier un projet",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('projects')
        .update({
          title: updatedProject.title,
          description: updatedProject.description,
          due_date: updatedProject.dueDate,
          thumbnail: updatedProject.thumbnail,
          category: updatedProject.category,
          client: updatedProject.client,
          testimonial: updatedProject.testimonial,
          github_link: updatedProject.links.github,
          preview_link: updatedProject.links.preview,
          team_leader_contribution: updatedProject.author.contribution,
          team_leader_contribution_description: updatedProject.author.contributionDescription,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // Mise à jour des participants
      const { error: deleteParticipantsError } = await supabase
        .from('project_participants')
        .delete()
        .eq('project_id', id);

      if (deleteParticipantsError) throw deleteParticipantsError;

      if (updatedProject.participants && updatedProject.participants.length > 0) {
        const { error: participantsError } = await supabase
          .from('project_participants')
          .insert(
            updatedProject.participants.map((participant: any) => ({
              project_id: id,
              user_id: participant.profile,
              contribution: participant.contribution,
              contribution_description: participant.contributionDescription,
            }))
          );

        if (participantsError) throw participantsError;
      }

      toast({
        title: "Succès",
        description: "Le projet a été mis à jour avec succès",
      });

      const slug = slugify(updatedProject.title);
      navigate(`/project/${id}-${slug}`);
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du projet",
        variant: "destructive"
      });
    }
  };

  const initialFormData = {
    title: project.title,
    description: project.description,
    dueDate: project.dueDate,
    thumbnail: project.thumbnail,
    category: project.category,
    client: project.client,
    testimonial: project.testimonial || "",
    links: {
      github: project.links.github || "",
      preview: project.links.preview || ""
    }
  };

  return (
    <ProjectForm
      onSubmit={handleSubmit}
      onCancel={() => navigate(`/project/${idWithSlug}`)}
      initialData={initialFormData}
      initialParticipants={project.participants?.map(p => ({
        profile: p.id,
        contribution: p.contribution,
        contributionDescription: p.contributionDescription || ""
      }))}
      initialTeamLeaderContribution={project.author.contribution}
      initialTeamLeaderContributionDescription={project.author.contributionDescription || ""}
    />
  );
};

export default EditProject;