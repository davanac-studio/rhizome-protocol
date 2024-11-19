import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Project } from "@/types/project";
import { generateProjectSlug } from "@/utils/slugify";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const allParticipants = [
    project.author,
    ...(project.participants || [])
  ];

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
        <p className="mb-4 text-sm text-gray-600">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {new Date(project.dueDate).toLocaleDateString("fr-FR")}
          </div>
          <div className="flex -space-x-2">
            {allParticipants.map((participant, index) => (
              <Avatar
                key={index}
                className="h-8 w-8 border-2 border-white hover:z-10 cursor-pointer"
                onClick={(e) => handleProfileClick(e, participant.username)}
              >
                <AvatarImage
                  src={participant.avatar || "/default-avatar.png"}
                  alt={participant.name}
                />
                <AvatarFallback>
                  {participant.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};