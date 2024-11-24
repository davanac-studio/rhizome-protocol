import { ExternalLinkIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface LinkPreviewCardProps {
  url: string;
  title?: string;
  thumbnail?: string;
}

export const LinkPreviewCard = ({ url }: LinkPreviewCardProps) => {
  // Extract domain name for display
  const domain = url ? new URL(url).hostname : '';

  // Fetch metadata for the URL
  const { data: metadata } = useQuery({
    queryKey: ['linkPreview', url],
    queryFn: async () => {
      const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      return data.data;
    },
    enabled: !!url,
  });

  const linkTitle = metadata?.title || domain;
  const linkImage = metadata?.image?.url || metadata?.logo?.url;

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        {linkImage && (
          <img
            src={linkImage}
            alt={linkTitle}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ExternalLinkIcon className="h-4 w-4" />
          <span>{domain}</span>
        </div>
        
        <h3 className="font-semibold line-clamp-2">{linkTitle}</h3>
        
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute inset-0"
        >
          <span className="sr-only">Visit {linkTitle}</span>
        </a>
      </div>
    </div>
  );
};