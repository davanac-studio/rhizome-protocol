import { ProjectCard } from "@/components/ProjectCard";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { DatabaseProject } from "@/types/database";
import { transformDatabaseProject } from "@/utils/projectTransformers";

export const UserProjectsGallery = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['userProjects', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        console.log('No user ID found');
        return [];
      }

      console.log('Fetching projects for user:', user.id);

      // Fetch projects where user is team leader
      const { data: teamLeaderProjects, error: leaderError } = await supabase
        .from('projects')
        .select(`
          *,
          author:team_leader (
            id,
            first_name,
            last_name,
            username,
            avatar_url,
            expertise,
            role
          ),
          participants:project_participants (
            user:profiles (
              id,
              first_name,
              last_name,
              username,
              avatar_url,
              expertise,
              role
            ),
            contribution,
            contribution_description
          )
        `)
        .eq('team_leader', user.id);

      if (leaderError) {
        console.error('Error fetching team leader projects:', leaderError);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos projets en tant que team leader",
          variant: "destructive",
        });
        return [];
      }

      console.log('Team leader projects:', teamLeaderProjects);

      // Transform team leader projects
      const leaderProjects = teamLeaderProjects ? 
        teamLeaderProjects.map((project: unknown) => {
          console.log('Transforming leader project:', project);
          return transformDatabaseProject(project as DatabaseProject);
        }) : 
        [];

      console.log('Transformed leader projects:', leaderProjects);

      // Fetch projects where user is a participant
      const { data: participantProjects, error: participantError } = await supabase
        .from('project_participants')
        .select(`
          project:projects (
            *,
            author:team_leader (
              id,
              first_name,
              last_name,
              username,
              avatar_url,
              expertise,
              role
            ),
            participants:project_participants (
              user:profiles (
                id,
                first_name,
                last_name,
                username,
                avatar_url,
                expertise,
                role
              ),
              contribution,
              contribution_description
            )
          )
        `)
        .eq('user_id', user.id);

      if (participantError) {
        console.error('Error fetching participant projects:', participantError);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos projets en tant que participant",
          variant: "destructive",
        });
        return leaderProjects;
      }

      console.log('Participant projects:', participantProjects);

      // Transform participant projects
      const participatingProjects = participantProjects ? 
        participantProjects
          .filter(item => {
            console.log('Filtering participant project item:', item);
            return item.project && typeof item.project === 'object';
          })
          .map(item => {
            console.log('Transforming participant project:', item.project);
            return transformDatabaseProject(item.project as unknown as DatabaseProject);
          })
        : [];

      console.log('Transformed participant projects:', participatingProjects);

      // Remove duplicates based on project ID
      const uniqueProjects = [...leaderProjects, ...participatingProjects].filter(
        (project, index, self) =>
          index === self.findIndex((p) => p.id === project.id)
      );

      console.log('Final unique projects:', uniqueProjects);
      return uniqueProjects;
    },
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Chargement de vos projets...</p>
      </div>
    );
  }

  if (!projects?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Vous n'avez pas encore de projets</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Vos Projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};