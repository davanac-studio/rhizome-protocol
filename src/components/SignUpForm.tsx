import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { SocialInput } from "./signup/SocialInput";
import { FormField } from "./signup/FormField";
import { ImageFields } from "./signup/ImageFields";
import { PersonalInfoFields } from "./signup/PersonalInfoFields";
import { BioField } from "./signup/BioField";
import { supabase } from "@/lib/supabase";
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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl: "",
    bannerUrl: "",
    linkedin: "",
    youtube: "",
    github: "",
    spotify: "",
    instagram: "",
    facebook: "",
  });

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.username) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return false;
    }
    if (formData.password.length < 6) {
      toast({
        title: "Erreur de validation",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // 1. Vérifier si l'email existe déjà
      const { data: existingUsers } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', formData.email)
        .single();

      if (existingUsers) {
        toast({
          title: "Erreur",
          description: "Cet email est déjà utilisé",
          variant: "destructive",
        });
        return;
      }

      // 2. Créer le compte auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            username: formData.username,
          },
        },
      });

      if (signUpError) throw signUpError;

      // 3. Créer le profil utilisateur
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData?.user?.id, // Lier le profil à l'utilisateur auth
            email: formData.email,
            username: formData.username,
            first_name: formData.firstName,
            last_name: formData.lastName,
            bio: formData.bio,
            avatar_url: formData.avatarUrl,
            banner_url: formData.bannerUrl,
            linkedin: formData.linkedin,
            youtube: formData.youtube,
            github: formData.github,
            spotify: formData.spotify,
            instagram: formData.instagram,
            facebook: formData.facebook,
          },
        ]);

      if (profileError) throw profileError;

      toast({
        title: "Compte créé avec succès",
        description: "Bienvenue sur Project Pulse ! Vérifiez votre email pour confirmer votre compte.",
      });

      // Rediriger vers la page de connexion
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Erreur lors de la création du compte",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
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
        onAvatarChange={(value) => handleFieldChange('avatarUrl', value)}
        onBannerChange={(value) => handleFieldChange('bannerUrl', value)}
      />

      <PersonalInfoFields
        firstName={formData.firstName}
        lastName={formData.lastName}
        username={formData.username}
        email={formData.email}
        password={formData.password}
        onChange={handleFieldChange}
      />

      <BioField
        bio={formData.bio}
        onChange={(value) => handleFieldChange('bio', value)}
      />

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Réseaux sociaux</h3>
        <div className="space-y-3">
          <SocialInput
            icon={LinkedinIcon}
            value={formData.linkedin}
            onChange={(value) => handleFieldChange('linkedin', value)}
            placeholder="URL LinkedIn"
          />
          <SocialInput
            icon={YoutubeIcon}
            value={formData.youtube}
            onChange={(value) => handleFieldChange('youtube', value)}
            placeholder="URL YouTube"
          />
          <SocialInput
            icon={GithubIcon}
            value={formData.github}
            onChange={(value) => handleFieldChange('github', value)}
            placeholder="URL GitHub"
          />
          <SocialInput
            icon={Music2Icon}
            value={formData.spotify}
            onChange={(value) => handleFieldChange('spotify', value)}
            placeholder="URL Spotify"
          />
          <SocialInput
            icon={InstagramIcon}
            value={formData.instagram}
            onChange={(value) => handleFieldChange('instagram', value)}
            placeholder="URL Instagram"
          />
          <SocialInput
            icon={FacebookIcon}
            value={formData.facebook}
            onChange={(value) => handleFieldChange('facebook', value)}
            placeholder="URL Facebook"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1" 
          onClick={() => navigate("/login")}
          disabled={loading}
        >
          Annuler
        </Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? "Création en cours..." : "Créer mon compte"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;