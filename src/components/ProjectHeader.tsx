import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
      </div>
      <Badge variant="outline">
        {project.category}
      </Badge>
    </div>
  );
};