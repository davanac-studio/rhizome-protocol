import { Project } from "@/types/project";
import { ClientBlock } from "./blocks/ClientBlock";
import { ProjectDetailsBlock } from "./blocks/ProjectDetailsBlock";
import { CertificationBlock } from "./blocks/CertificationBlock";
import { TestimonialBlock } from "./TestimonialBlock";

interface ProjectDetailsProps {
  project: Project;
}

export const ProjectDetailsComponent = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none mb-8">
        <p className="text-gray-600 text-lg leading-relaxed">
          {project.description}
        </p>
      </div>

      {project.testimonial && (
        <TestimonialBlock testimonial={project.testimonial} />
      )}

      <ClientBlock 
        client={project.client}
        testimonial={project.testimonial}
      />

      <ProjectDetailsBlock 
        dueDate={project.dueDate}
        links={project.links}
        author={project.author}
        participants={project.participants}
      />

      {project.certification && (
        <CertificationBlock certification={project.certification} />
      )}
    </div>
  );
};