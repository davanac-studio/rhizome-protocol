import { Project } from "@/types/project";
import { ClientBlock } from "./blocks/ClientBlock";
import { ProjectDetailsBlock } from "./blocks/ProjectDetailsBlock";
import { CertificationBlock } from "./blocks/CertificationBlock";

interface ProjectDetailsProps {
  project: Project;
}

export const ProjectDetailsComponent = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="space-y-8">
      <ProjectDetailsBlock 
        dueDate={project.dueDate}
        links={project.links}
        author={project.author}
        participants={project.participants}
      />

      <ClientBlock 
        client={project.client}
        testimonial={project.testimonial}
      />

      {project.certification && (
        <CertificationBlock certification={project.certification} />
      )}
    </div>
  );
};