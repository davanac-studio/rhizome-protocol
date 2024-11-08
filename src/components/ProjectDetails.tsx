import { CalendarIcon, UserCircle2 } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectDetailsProps {
  project: Project;
}

export const ProjectDetailsComponent = ({ project }: ProjectDetailsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Détails du Projet</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarIcon className="w-4 h-4" />
          <span>Date de publication: {new Date(project.dueDate).toLocaleDateString('fr-FR')}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <UserCircle2 className="w-4 h-4" />
          <span>Client: {project.client}</span>
        </div>
      </div>
    </div>
  );
};