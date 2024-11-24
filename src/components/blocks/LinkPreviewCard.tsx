import { ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinkPreviewCardProps {
  url: string;
  title: string;
}

export const LinkPreviewCard = ({ url, title }: LinkPreviewCardProps) => {
  // Extract domain name for display
  const domain = url ? new URL(url).hostname : '';

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-lg">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ExternalLinkIcon className="h-4 w-4" />
          <span>{domain}</span>
        </div>
        
        <h3 className="font-semibold">{title}</h3>
        
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute inset-0"
        >
          <span className="sr-only">Visit {title}</span>
        </a>
      </div>
    </div>
  );
};