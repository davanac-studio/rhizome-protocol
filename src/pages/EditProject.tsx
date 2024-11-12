import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { ProjectForm } from "@/components/project/ProjectForm";
import { useAuth } from "@/contexts/AuthContext";
import { transformDatabaseProject } from "@/utils/projectTransformers";

const EditProject = () => {
  const { id } = useParams();
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

      if (error) {
        console.error('Error fetching project:', error);
        throw error;
      }

      if (!project) {
        throw new Error('Project not found');
      }

      return transformDatabaseProject({
        ...project,
        author: {
          ...project.team_leader_profile,
          role: "Team Leader",
          contribution: project.team_leader_contribution,
          contributionDescription: project.team_leader_contribution_description
        },
        participants: project.project_participants?.map((p: any) => ({
          ...p.user,
          role: "Member",
          contribution: p.contribution,
          contributionDescription: p.contribution_description
        })) || []
      });
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

      navigate(`/project/${id}`);
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
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-gray-600">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Projet non trouvé</h2>
        </div>
      </div>
    );
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
    <div className="container mx-auto py-8">
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
    </div>
  );
};

export default EditProject;