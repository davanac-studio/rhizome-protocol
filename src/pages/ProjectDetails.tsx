import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ProjectHeader } from "@/components/ProjectHeader";
import { ProjectDetailsComponent } from "@/components/ProjectDetails";
import { projectsData } from "@/data/projects";
import { TestimonialBlock } from "@/components/TestimonialBlock";

const ProjectDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    } else {
      toast({
        title: "Erreur",
        description: "Projet non trouvé",
        variant: "destructive"
      });
    }
  }, [id, toast]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Chargement...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux Projets
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-96 object-cover"
          />
          
          <div className="p-8">
            <ProjectHeader project={project} />

            <div className="prose max-w-none mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.testimonial && (
              <TestimonialBlock testimonial={project.testimonial} />
            )}

            <ProjectDetailsComponent project={project} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;