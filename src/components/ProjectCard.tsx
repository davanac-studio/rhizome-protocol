import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Project } from "@/types/project";

const statusColors = {
  "In Progress": "bg-blue-500",
  "Completed": "bg-green-500",
  "On Hold": "bg-yellow-500",
  "Planning": "bg-purple-500",
};

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow animate-fadeIn">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-xl">{project.title}</h3>
        <Badge className={`${statusColors[project.status]} text-white`}>
          {project.status}
        </Badge>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Due: {new Date(project.dueDate).toLocaleDateString()}
      </div>
    </Card>
  );
};