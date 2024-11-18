import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Project } from "@/types/project";
import { generateProjectSlug } from "@/utils/slugify";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleProjectClick = () => {
    const slug = generateProjectSlug(project.title, project.id);
    navigate(`/project/${slug}`);
  };

  const handleProfileClick = (e: React.MouseEvent, username: string) => {
    e.stopPropagation();
    navigate(`/profile/${username}`);
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
      onClick={handleProjectClick}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {project.category}
          </Badge>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={project.author.avatar || "/default-avatar.png"}
              alt={project.author.name}
              className="h-8 w-8 rounded-full"
            />
            <div>
              <p
                className="text-sm font-medium text-gray-900 hover:underline"
                onClick={(e) => handleProfileClick(e, project.author.username)}
              >
                {project.author.name}
              </p>
              <p className="text-xs text-gray-500">{project.author.expertise}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">
              {new Date(project.dueDate).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};