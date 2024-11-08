import { Button } from "@/components/ui/button";
import { LinkedinIcon, YoutubeIcon, GithubIcon, Music2Icon, InstagramIcon, FacebookIcon } from "lucide-react";

const SocialButton = ({ url, icon: Icon, label }: { url?: string, icon: any, label: string }) => {
  if (!url) return null;
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
      onClick={() => window.open(url, '_blank')}
      aria-label={label}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900" />
    </Button>
  );
};

export const ProfileSocialButtons = ({ user }: { user: any }) => (
  <div className="flex flex-wrap gap-2">
    <SocialButton url={user.linkedin} icon={LinkedinIcon} label="LinkedIn" />
    <SocialButton url={user.github} icon={GithubIcon} label="GitHub" />
    <SocialButton url={user.youtube} icon={YoutubeIcon} label="YouTube" />
    <SocialButton url={user.spotify} icon={Music2Icon} label="Spotify" />
    <SocialButton url={user.instagram} icon={InstagramIcon} label="Instagram" />
    <SocialButton url={user.facebook} icon={FacebookIcon} label="Facebook" />
  </div>
);