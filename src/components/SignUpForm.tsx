import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { SocialInput } from "./signup/SocialInput";
import { FormField } from "./signup/FormField";
import { ImageFields } from "./signup/ImageFields";
import {
  LinkedinIcon,
  YoutubeIcon,
  GithubIcon,
  Music2Icon,
  InstagramIcon,
  FacebookIcon,
} from "lucide-react";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    quote: "",
    avatarUrl: "",
    bannerUrl: "",
    linkedin: "",
    youtube: "",
    github: "",
    spotify: "",
    instagram: "",
    facebook: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Compte créé avec succès",
      description: "Bienvenue sur Project Pulse !",
    });
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Créer un compte</h2>
        <p className="text-muted-foreground mt-2">
          Rejoignez Project Pulse pour gérer vos projets
        </p>
      </div>

      <ImageFields
        avatarUrl={formData.avatarUrl}
        bannerUrl={formData.bannerUrl}
        firstName={formData.firstName}
        lastName={formData.lastName}
        onAvatarChange={(value) => setFormData({ ...formData, avatarUrl: value })}
        onBannerChange={(value) => setFormData({ ...formData, bannerUrl: value })}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Prénom" required>
          <Input
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Votre prénom"
          />
        </FormField>

        <FormField label="Nom" required>
          <Input
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Votre nom"
          />
        </FormField>
      </div>

      <FormField label="Nom d'utilisateur" required>
        <Input
          required
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Votre nom d'utilisateur"
        />
      </FormField>

      <FormField label="Email" required>
        <Input
          required
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="votre@email.com"
        />
      </FormField>

      <FormField label="Mot de passe" required>
        <Input
          required
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Votre mot de passe"
        />
      </FormField>

      <FormField label="Bio" required>
        <Textarea
          required
          value={formData.bio}
          onChange={(e) => {
            const text = e.target.value;
            if (text.length <= 150) {
              setFormData({ ...formData, bio: text });
            }
          }}
          placeholder="Parlez-nous de vous (150 caractères max)"
          className="h-24"
          maxLength={150}
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.bio.length}/150 caractères
        </p>
      </FormField>

      <FormField label="Citation" required>
        <Input
          required
          value={formData.quote}
          onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
          placeholder="Votre citation préférée"
        />
      </FormField>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Réseaux sociaux</h3>
        <div className="space-y-3">
          <SocialInput
            icon={LinkedinIcon}
            value={formData.linkedin}
            onChange={(value) => setFormData({ ...formData, linkedin: value })}
            placeholder="URL LinkedIn"
          />
          <SocialInput
            icon={YoutubeIcon}
            value={formData.youtube}
            onChange={(value) => setFormData({ ...formData, youtube: value })}
            placeholder="URL YouTube"
          />
          <SocialInput
            icon={GithubIcon}
            value={formData.github}
            onChange={(value) => setFormData({ ...formData, github: value })}
            placeholder="URL GitHub"
          />
          <SocialInput
            icon={Music2Icon}
            value={formData.spotify}
            onChange={(value) => setFormData({ ...formData, spotify: value })}
            placeholder="URL Spotify"
          />
          <SocialInput
            icon={InstagramIcon}
            value={formData.instagram}
            onChange={(value) => setFormData({ ...formData, instagram: value })}
            placeholder="URL Instagram"
          />
          <SocialInput
            icon={FacebookIcon}
            value={formData.facebook}
            onChange={(value) => setFormData({ ...formData, facebook: value })}
            placeholder="URL Facebook"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" className="flex-1" onClick={handleCancel}>
          Annuler
        </Button>
        <Button type="submit" className="flex-1">
          Créer mon compte
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
