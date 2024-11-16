import { Button } from "@/components/ui/button";
import { LinkedinIcon, YoutubeIcon, GithubIcon, Music2Icon, InstagramIcon, FacebookIcon } from "lucide-react";

interface SocialButton {
  url: string | null;
  icon: any;
  label: string;
  ariaLabel: string;
}

export const ProfileSocialButtons = ({ user }: { user: any }) => {
  const socialButtons: SocialButton[] = [
    {
      url: user.linkedin,
      icon: LinkedinIcon,
      label: "LinkedIn",
      ariaLabel: "Voir le profil LinkedIn"
    },
    {
      url: user.github,
      icon: GithubIcon,
      label: "GitHub",
      ariaLabel: "Voir le profil GitHub"
    },
    {
      url: user.youtube,
      icon: YoutubeIcon,
      label: "YouTube",
      ariaLabel: "Voir la chaîne YouTube"
    },
    {
      url: user.spotify,
      icon: Music2Icon,
      label: "Spotify",
      ariaLabel: "Écouter sur Spotify"
    },
    {
      url: user.instagram,
      icon: InstagramIcon,
      label: "Instagram",
      ariaLabel: "Voir le profil Instagram"
    },
    {
      url: user.facebook,
      icon: FacebookIcon,
      label: "Facebook",
      ariaLabel: "Voir le profil Facebook"
    }
  ];

  // Filter out buttons with empty URLs
  const availableSocialButtons = socialButtons.filter(button => button.url);

  if (availableSocialButtons.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {availableSocialButtons.map(({ url, icon: Icon, label, ariaLabel }) => (
        <Button
          key={label}
          variant="ghost"
          size="icon"
          className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
          onClick={() => window.open(url, '_blank')}
          aria-label={ariaLabel}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900" />
        </Button>
      ))}
    </div>
  );
};