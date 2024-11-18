import { Button } from "@/components/ui/button";
import { LinkedinIcon, YoutubeIcon, GithubIcon, Music2Icon, InstagramIcon, FacebookIcon, GlobeIcon } from "lucide-react";

interface SocialButton {
  url: string | null;
  icon: any;
  label: string;
  ariaLabel: string;
}

export const ProfileSocialButtons = ({ user }: { user: any }) => {
  const socialButtons: SocialButton[] = [
    {
      url: user.website,
      icon: GlobeIcon,
      label: "Website",
      ariaLabel: "Visiter le site web"
    },
    {
      url: user.linkedin,
      icon: LinkedinIcon,
      label: "LinkedIn",
      ariaLabel: "Visiter le profil LinkedIn"
    },
    {
      url: user.github,
      icon: GithubIcon,
      label: "GitHub",
      ariaLabel: "Visiter le profil GitHub"
    },
    {
      url: user.youtube,
      icon: YoutubeIcon,
      label: "YouTube",
      ariaLabel: "Visiter la chaîne YouTube"
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
      ariaLabel: "Visiter le profil Instagram"
    },
    {
      url: user.facebook,
      icon: FacebookIcon,
      label: "Facebook",
      ariaLabel: "Visiter le profil Facebook"
    }
  ];

  return (
    <>
      {socialButtons.map((button, index) => (
        button.url && (
          <Button
            key={index}
            variant="outline"
            size="icon"
            asChild
          >
            <a
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={button.ariaLabel}
            >
              <button.icon className="h-4 w-4" />
            </a>
          </Button>
        )
      ))}
    </>
  );
};