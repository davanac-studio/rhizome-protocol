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
  const id = idWithSlug?.split('-')[0];
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data: project, error } = await supabase
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

      if (error) throw error;
      if (!project) throw new Error('Project not found');

      return transformDatabaseProject(project);
    }
  });

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

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!project) {
    return <div>Projet non trouvé</div>;
  }

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
      onCancel={() => navigate(`/project/${id}`)}
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