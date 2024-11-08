import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { CalendarIcon } from "lucide-react";

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const categories = project.category.split(", ");
  
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
            <div className="flex gap-2">
              {categories.map((category, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};