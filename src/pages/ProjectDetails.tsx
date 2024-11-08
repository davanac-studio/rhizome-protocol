import { useParams } from "react-router-dom";
import { useState } from "react";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarIcon, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project] = useState<Project>({
    id: "1",
    title: "Website Redesign",
    description: "Complete overhaul of the company website with modern design principles and improved user experience.",
    status: "In Progress",
    progress: 65,
    dueDate: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    category: "Development/Workflow",
    client: "TechCorp",
    author: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
      role: "Team Leader"
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                <p className="text-gray-600 mt-2">
                  Créé par {project.author.name}
                </p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {project.status}
              </Badge>
            </div>

            <p className="text-gray-600 mb-8 text-lg">
              {project.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
                <Progress value={project.progress} className="w-full h-2" />
                <span className="text-sm text-gray-600 mt-2 inline-block">
                  {project.progress}% Complete
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Due Date: {new Date(project.dueDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <UserCircle2 className="w-4 h-4" />
                    <span>Client: {project.client}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;