import { Project } from "@/types/project";
import { ClientBlock } from "./blocks/ClientBlock";
import { ProjectDetailsBlock } from "./blocks/ProjectDetailsBlock";
import { CertificationBlock } from "./blocks/CertificationBlock";
import { TestimonialBlock } from "./TestimonialBlock";
import { createCertification } from "@/data/certifications";

interface ProjectDetailsProps {
  project: Project;
}

export const ProjectDetailsComponent = ({ project }: ProjectDetailsProps) => {
  // Si le projet n'a pas de certification, on en crée une fictive
  const certification = project.certification || createCertification(project.id);

  return (
    <div className="space-y-8 mt-12">
      <div className="prose max-w-none mb-8">
        <p className="text-gray-600 text-lg leading-relaxed">
          {project.description}
        </p>
      </div>

      <ClientBlock 
        client={project.client}
        testimonial={project.testimonial}
      />

      {project.testimonial && (
        <TestimonialBlock testimonial={project.testimonial} />
      )}

      <ProjectDetailsBlock 
        dueDate={project.dueDate}
        links={project.links}
        author={project.author}
        participants={project.participants}
      />

      <CertificationBlock certification={certification} />
    </div>
  );
};