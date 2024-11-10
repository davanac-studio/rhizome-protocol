import { Button } from "@/components/ui/button";
import { ImageFields } from "./ImageFields";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { BioField } from "./BioField";
import { SocialInput } from "./SocialInput";
import {
  LinkedinIcon,
  YoutubeIcon,
  GithubIcon,
  Music2Icon,
  InstagramIcon,
  FacebookIcon,
} from "lucide-react";

interface SignUpStep2Props {
  formData: {
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
    avatarUrl: string;
    bannerUrl: string;
    linkedin: string;
    youtube: string;
    github: string;
    spotify: string;
    instagram: string;
    facebook: string;
  };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  loading: boolean;
}

export const SignUpStep2 = ({ formData, onChange, onBack, loading }: SignUpStep2Props) => {
  return (
    <div className="space-y-6">
      <ImageFields
        avatarUrl={formData.avatarUrl}
        bannerUrl={formData.bannerUrl}
        firstName={formData.firstName}
        lastName={formData.lastName}
        onAvatarChange={(value) => onChange('avatarUrl', value)}
        onBannerChange={(value) => onChange('bannerUrl', value)}
      />

      <PersonalInfoFields
        firstName={formData.firstName}
        lastName={formData.lastName}
        username={formData.username}
        email=""
        password=""
        onChange={onChange}
      />

      <BioField
        bio={formData.bio}
        onChange={(value) => onChange('bio', value)}
      />

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Réseaux sociaux</h3>
        <div className="space-y-3">
          <SocialInput
            icon={LinkedinIcon}
            value={formData.linkedin}
            onChange={(value) => onChange('linkedin', value)}
            placeholder="URL LinkedIn"
          />
          <SocialInput
            icon={YoutubeIcon}
            value={formData.youtube}
            onChange={(value) => onChange('youtube', value)}
            placeholder="URL YouTube"
          />
          <SocialInput
            icon={GithubIcon}
            value={formData.github}
            onChange={(value) => onChange('github', value)}
            placeholder="URL GitHub"
          />
          <SocialInput
            icon={Music2Icon}
            value={formData.spotify}
            onChange={(value) => onChange('spotify', value)}
            placeholder="URL Spotify"
          />
          <SocialInput
            icon={InstagramIcon}
            value={formData.instagram}
            onChange={(value) => onChange('instagram', value)}
            placeholder="URL Instagram"
          />
          <SocialInput
            icon={FacebookIcon}
            value={formData.facebook}
            onChange={(value) => onChange('facebook', value)}
            placeholder="URL Facebook"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1"
          onClick={onBack}
          disabled={loading}
        >
          Retour
        </Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? "Création en cours..." : "Créer mon compte"}
        </Button>
      </div>
    </div>
  );
};