import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ProjectForm } from "@/components/project/ProjectForm";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/utils/slugify";
import { EditProjectError } from "@/components/project/EditProjectError";
import { EditProjectLoading } from "@/components/project/EditProjectLoading";
import { useProjectQuery } from "@/hooks/useProjectQuery";

const EditProject = () => {
  const { idWithSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  // Extract the full ID from the URL parameter, including any hyphens that might be part of the ID
  const id = idWithSlug?.includes('-') ? idWithSlug.split('-')[0] : idWithSlug;
  
  const { data: project, isLoading, error } = useProjectQuery(id);

  if (error) {
    return (
      <EditProjectError 
        title="Une erreur est survenue"
        description="Impossible de charger le projet"
      />
    );
  }

  if (isLoading) {
    return <EditProjectLoading />;
  }

  if (!project) {
    return (
      <EditProjectError 
        title="Projet non trouvé"
        description="Le projet que vous recherchez n'existe pas ou a été supprimé."
      />
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

      // Update participants
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