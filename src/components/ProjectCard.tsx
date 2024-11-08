import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const statusColors = {
  "In Progress": "bg-blue-500",
  "Completed": "bg-green-500",
  "On Hold": "bg-yellow-500",
  "Planning": "bg-purple-500",
};

export const ProjectCard = ({ project }: { project: Project }) => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: project.title,
      description: "Project details coming soon!",
    });
  };

  return (
    <Button
      variant="ghost"
      className="p-0 h-auto w-full hover:bg-transparent"
      onClick={handleClick}
    >
      <Card className="p-6 hover:shadow-lg transition-all duration-300 w-full hover:scale-[1.02] animate-fadeIn">
        {project.thumbnail && (
          <div className="mb-4 -mx-6 -mt-6">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </div>
        )}
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
    </Button>
  );
};