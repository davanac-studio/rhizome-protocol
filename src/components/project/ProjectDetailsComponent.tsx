import { Project } from "@/types/project";
import { ClientBlock } from "../blocks/ClientBlock";
import { ProjectDetailsBlock } from "../blocks/ProjectDetailsBlock";
import { CertificationBlock } from "../blocks/CertificationBlock";
import { TestimonialBlock } from "../TestimonialBlock";
import { createCertification } from "@/data/certifications";

interface ProjectDetailsProps {
  project: Project;
}

export const ProjectDetailsComponent = ({ project }: ProjectDetailsProps) => {
  const certification = project.certification || createCertification(project.id);

  return (
    <div className="space-y-12 mt-12">
      <div className="prose max-w-none">
        <p className="text-gray-600 text-lg leading-relaxed">
          {project.description}
        </p>
      </div>

      <ProjectDetailsBlock 
        dueDate={project.dueDate}
        links={{
          demo_link_1: project.links.demo_link_1,
          demo_link_2: project.links.preview_link,
          demo_link_3: project.links.demo_link_3,
          demo_link_4: project.links.demo_link_4
        }}
        author={project.author}
        participants={project.participants}
        thumbnail={project.thumbnail}
        title={project.title}
      />

      {project.testimonial ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TestimonialBlock testimonial={project.testimonial} />
          </div>
          <div className="lg:col-span-1">
            <ClientBlock 
              client={project.client}
              testimonial={project.testimonial}
            />
          </div>
        </div>
      ) : (
        <ClientBlock 
          client={project.client}
          testimonial={project.testimonial}
        />
      )}

      <CertificationBlock certification={certification} />
    </div>
  );
};