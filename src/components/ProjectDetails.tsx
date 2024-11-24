import { useParams } from "react-router-dom";
import { useProjectQuery } from "@/hooks/useProjectQuery";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectError } from "@/components/project/ProjectError";
import { ProjectContent } from "@/components/project/ProjectContent";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const { idWithSlug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: project, isLoading, error } = useProjectQuery(idWithSlug);

  if (error) {
    console.error('Project loading error:', error);
    return (
      <ProjectError 
        title="Une erreur est survenue lors du chargement du projet"
        description="Le projet n'a pas pu être chargé. Veuillez réessayer ultérieurement."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Chargement...</h2>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <ProjectError 
        title="Projet non trouvé"
        description="Le projet que vous recherchez n'existe pas ou a été supprimé."
      />
    );
  }

  const isProjectCreator = user?.id === project.author.id;
  const handleEditClick = () => {
    if (idWithSlug) {
      navigate(`/project/${idWithSlug}/edit`);
    }
  };

  return (
    <ProjectContent 
      project={{
        ...project,
        links: {
          demo_link_1: project.links?.demo_link_1 || "",
          preview_link: project.links?.preview_link || "",
          demo_link_3: project.links?.demo_link_3 || "",
          demo_link_4: project.links?.demo_link_4 || ""
        }
      }}
      isProjectCreator={isProjectCreator}
      onEditClick={handleEditClick}
      idWithSlug={idWithSlug || ''}
    />
  );
};

export default ProjectDetails;