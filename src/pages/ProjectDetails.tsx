import { useParams, useLocation } from "react-router-dom";
import { useProjectQuery } from "@/hooks/useProjectQuery";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectError } from "@/components/project/ProjectError";
import { ProjectContent } from "@/components/project/ProjectContent";
import { ProjectMeta } from "@/components/project/ProjectMeta";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const { idWithSlug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
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

  const fullUrl = `${window.location.origin}${location.pathname}`;

  return (
    <>
      <ProjectMeta project={project} url={fullUrl} />
      <ProjectContent 
        project={project}
        isProjectCreator={isProjectCreator}
        onEditClick={handleEditClick}
        idWithSlug={idWithSlug || ''}
      />
    </>
  );
};

export default ProjectDetails;