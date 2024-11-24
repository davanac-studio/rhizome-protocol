import { Project } from "@/types/project";
import { generateProjectSlug } from "@/utils/slugify";
import { useNavigate } from "react-router-dom";

interface UserProjectGalleryProps {
  projects: Project[];
}

export const UserProjectGallery = ({ projects }: UserProjectGalleryProps) => {
  const navigate = useNavigate();

  const handleProjectClick = (project: Project) => {
    const slug = generateProjectSlug(project.title, project.id);
    navigate(`/project/${slug}`);
  };

  if (!projects.length) {
    return <p className="text-sm text-gray-500">Aucun projet trouvé</p>;
  }

  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold">Projets</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group cursor-pointer"
            onClick={() => handleProjectClick(project)}
          >
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-2">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h4 className="text-sm font-medium group-hover:text-blue-600 transition-colors">
              {project.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};