import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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
  
  const { data: project, isLoading, error } = useProjectQuery(idWithSlug);

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
      // Update project main information
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
          team_leader_contribution: updatedProject.author.contribution,
          team_leader_contribution_description: updatedProject.author.contributionDescription,
        })
        .eq('id', project.id);

      if (updateError) throw updateError;

      // Delete existing project links
      const { error: deleteLinksError } = await supabase
        .from('project_links')
        .delete()
        .eq('project_id', project.id);

      if (deleteLinksError) throw deleteLinksError;

      // Insert new project links if any
      if (updatedProject.links && updatedProject.links.length > 0) {
        const validLinks = updatedProject.links.filter((link: { url: string }) => link.url && link.url.trim() !== "");
        
        if (validLinks.length > 0) {
          const { error: linksError } = await supabase
            .from('project_links')
            .insert(
              validLinks.map((link: { url: string }) => ({
                project_id: project.id,
                url: link.url.trim()
              }))
            );

          if (linksError) {
            console.error('Error inserting links:', linksError);
            throw linksError;
          }
        }
      }

      // Update participants
      const { error: deleteParticipantsError } = await supabase
        .from('project_participants')
        .delete()
        .eq('project_id', project.id);

      if (deleteParticipantsError) throw deleteParticipantsError;

      if (updatedProject.participants && updatedProject.participants.length > 0) {
        const { error: participantsError } = await supabase
          .from('project_participants')
          .insert(
            updatedProject.participants.map((participant: any) => ({
              project_id: project.id,
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
      navigate(`/project/${project.id}-${slug}`);
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
    links: project.links || []
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