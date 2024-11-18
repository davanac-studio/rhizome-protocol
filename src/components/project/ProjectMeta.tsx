import { Helmet } from "react-helmet-async";
import { Project } from "@/types/project";

interface ProjectMetaProps {
  project: Project;
  url: string;
}

export const ProjectMeta = ({ project, url }: ProjectMetaProps) => {
  const title = `${project.title} | Rhizome Protocol`;
  const description = project.description.slice(0, 155) + (project.description.length > 155 ? '...' : '');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={project.thumbnail} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Rhizome Protocol" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={project.thumbnail} />

      {/* WhatsApp specific */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Additional Meta Tags for SEO */}
      <meta name="author" content={project.author.name} />
      <meta name="keywords" content={`${project.category}, projet blockchain, certification, NFT, Rhizome Protocol`} />
      <meta name="robots" content="index, follow" />

      {/* Schema.org markup for Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Project",
          "name": project.title,
          "description": project.description,
          "image": project.thumbnail,
          "datePublished": project.dueDate,
          "author": {
            "@type": "Person",
            "name": project.author.name
          },
          "contributor": project.participants?.map(participant => ({
            "@type": "Person",
            "name": participant.name
          }))
        })}
      </script>
    </Helmet>
  );
};