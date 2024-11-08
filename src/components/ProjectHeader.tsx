import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { CalendarIcon, UserCircle2 } from "lucide-react";

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm">
                {new Date(project.dueDate).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {project.category}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <UserCircle2 className="w-4 h-4" />
        <span>Client: {project.client}</span>
      </div>
    </div>
  );
};