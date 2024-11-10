import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { ProfileImageSection } from "./ProfileImageSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { SocialLinksSection } from "./SocialLinksSection";
import { Separator } from "@/components/ui/separator";

interface EditProfileFormProps {
  user: any;
  onClose: () => void;
  onUpdate: () => void;
}

export const EditProfileForm = ({ user, onClose, onUpdate }: EditProfileFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    bio: user.bio || "",
    expertise: user.expertise || "",
    avatarUrl: user.avatarUrl || "",
    bannerUrl: user.bannerUrl || "",
    linkedin: user.linkedin || "",
    youtube: user.youtube || "",
    github: user.github || "",
    spotify: user.spotify || "",
    instagram: user.instagram || "",
    facebook: user.facebook || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          bio: formData.bio,
          expertise: formData.expertise,
          avatar_url: formData.avatarUrl,
          banner_url: formData.bannerUrl,
          linkedin: formData.linkedin,
          youtube: formData.youtube,
          github: formData.github,
          spotify: formData.spotify,
          instagram: formData.instagram,
          facebook: formData.facebook,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès.",
      });
      
      onUpdate();
      onClose();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProfileImageSection
        bannerUrl={formData.bannerUrl}
        avatarUrl={formData.avatarUrl}
        firstName={formData.firstName}
        lastName={formData.lastName}
        onFieldChange={handleFieldChange}
      />

      <Separator className="my-6" />

      <PersonalInfoSection
        firstName={formData.firstName}
        lastName={formData.lastName}
        expertise={formData.expertise}
        bio={formData.bio}
        onFieldChange={handleFieldChange}
      />

      <Separator className="my-6" />

      <SocialLinksSection
        linkedin={formData.linkedin}
        github={formData.github}
        youtube={formData.youtube}
        spotify={formData.spotify}
        instagram={formData.instagram}
        facebook={formData.facebook}
        onFieldChange={handleFieldChange}
      />

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
      </div>
    </form>
  );
};