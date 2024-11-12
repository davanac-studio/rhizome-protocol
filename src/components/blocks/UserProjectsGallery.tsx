import { ProjectCard } from "@/components/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUserProjects } from "@/utils/projectQueries";
import { LoadingProjects } from "./LoadingProjects";
import { EmptyProjects } from "./EmptyProjects";

export const UserProjectsGallery = () => {
  const { username } = useParams();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['userProjects', username],
    queryFn: () => fetchUserProjects(username || ''),
    staleTime: 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <LoadingProjects />;
  }

  if (!projects?.length) {
    return <EmptyProjects />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};