import { Input } from "@/components/ui/input";
import { GlobeIcon } from "lucide-react";

interface SocialLinksSectionProps {
  linkedin: string;
  github: string;
  youtube: string;
  spotify: string;
  instagram: string;
  facebook: string;
  website: string;
  onFieldChange: (field: string, value: string) => void;
}

export const SocialLinksSection = ({
  linkedin,
  github,
  youtube,
  spotify,
  instagram,
  facebook,
  website,
  onFieldChange,
}: SocialLinksSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Réseaux sociaux</h3>
      <div className="space-y-3">
        <Input
          placeholder="Site internet"
          value={website}
          onChange={(e) => onFieldChange("website", e.target.value)}
        />
        <Input
          placeholder="LinkedIn URL"
          value={linkedin}
          onChange={(e) => onFieldChange("linkedin", e.target.value)}
        />
        <Input
          placeholder="GitHub URL"
          value={github}
          onChange={(e) => onFieldChange("github", e.target.value)}
        />
        <Input
          placeholder="YouTube URL"
          value={youtube}
          onChange={(e) => onFieldChange("youtube", e.target.value)}
        />
        <Input
          placeholder="Spotify URL"
          value={spotify}
          onChange={(e) => onFieldChange("spotify", e.target.value)}
        />
        <Input
          placeholder="Instagram URL"
          value={instagram}
          onChange={(e) => onFieldChange("instagram", e.target.value)}
        />
        <Input
          placeholder="Facebook URL"
          value={facebook}
          onChange={(e) => onFieldChange("facebook", e.target.value)}
        />
      </div>
    </div>
  );
};