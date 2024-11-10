import { ProjectCard } from "@/components/ProjectCard";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export const UserProjectsGallery = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['userProjects', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

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
        toast({
          title: "Erreur",
          description: "Impossible de charger vos projets en tant que team leader",
          variant: "destructive",
        });
        throw leaderError;
      }

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
        toast({
          title: "Erreur",
          description: "Impossible de charger vos projets en tant que participant",
          variant: "destructive",
        });
        throw participantError;
      }

      const leaderProjects = (teamLeaderProjects || []).map(project => ({
        ...project,
        author: {
          name: `${project.author?.first_name || ''} ${project.author?.last_name || ''}`.trim(),
          username: project.author?.username || '',
          avatar: project.author?.avatar_url || '',
          expertise: project.author?.expertise || '',
          role: "Team Leader" as const,
          contribution: project.team_leader_contribution || 0,
          contributionDescription: project.team_leader_contribution_description || ''
        },
        participants: (project.participants || []).map(p => ({
          name: `${p.user?.first_name || ''} ${p.user?.last_name || ''}`.trim(),
          username: p.user?.username || '',
          avatar: p.user?.avatar_url || '',
          expertise: p.user?.expertise || '',
          role: "Member" as const,
          contribution: p.contribution || 0,
          contributionDescription: p.contribution_description || ''
        }))
      }));

      const participatingProjects = (participantProjects || [])
        .map(p => p.project)
        .filter(Boolean)
        .map(project => ({
          ...project,
          author: {
            name: `${project.author?.first_name || ''} ${project.author?.last_name || ''}`.trim(),
            username: project.author?.username || '',
            avatar: project.author?.avatar_url || '',
            expertise: project.author?.expertise || '',
            role: "Team Leader" as const,
            contribution: project.team_leader_contribution || 0,
            contributionDescription: project.team_leader_contribution_description || ''
          },
          participants: (project.participants || []).map(p => ({
            name: `${p.user?.first_name || ''} ${p.user?.last_name || ''}`.trim(),
            username: p.user?.username || '',
            avatar: p.user?.avatar_url || '',
            expertise: p.user?.expertise || '',
            role: "Member" as const,
            contribution: p.contribution || 0,
            contributionDescription: p.contribution_description || ''
          }))
        }));

      return [...leaderProjects, ...participatingProjects];
    },
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