import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { ProfileImageSection } from "./ProfileImageSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { SocialLinksSection } from "./SocialLinksSection";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

interface EditProfileFormProps {
  user: any;
  onClose: () => void;
  onUpdate: (updatedUser: any) => void;
}

const getDavanacLevel = (davanacPoints: number = 0) => {
  if (davanacPoints >= 5001) return { level: "DAVANAC Master", color: "bg-purple-500" };
  if (davanacPoints >= 1001) return { level: "DAVANAC Expert", color: "bg-blue-500" };
  return { level: "DAVANAC Initié", color: "bg-green-500" };
};

export const EditProfileForm = ({ user, onClose, onUpdate }: EditProfileFormProps) => {
  const { user: authUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.first_name || user?.firstName || "",
    lastName: user?.last_name || user?.lastName || "",
    bio: user?.bio || "",
    expertise: user?.expertise || "",
    avatarUrl: user?.avatar_url || user?.avatarUrl || "",
    bannerUrl: user?.banner_url || user?.bannerUrl || "",
    linkedin: user?.linkedin || "",
    youtube: user?.youtube || "",
    github: user?.github || "",
    spotify: user?.spotify || "",
    instagram: user?.instagram || "",
    facebook: user?.facebook || "",
  });

  const davanacLevel = getDavanacLevel(user?.davanac_points);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authUser) {
      toast({
        title: "Erreur d'authentification",
        description: "Votre session a expiré. Veuillez vous reconnecter.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      console.log("Updating profile with data:", formData);

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
        .eq('id', authUser.id);

      if (error) {
        throw error;
      }

      const updatedUser = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        expertise: formData.expertise,
        avatarUrl: formData.avatarUrl,
        bannerUrl: formData.bannerUrl,
        linkedin: formData.linkedin,
        youtube: formData.youtube,
        github: formData.github,
        spotify: formData.spotify,
        instagram: formData.instagram,
        facebook: formData.facebook,
      };

      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès.",
      });
      
      onUpdate(updatedUser);
      onClose();
    } catch (error: any) {
      console.error('Error updating profile:', error);
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Points DAVANAC</h3>
          <p className="text-sm text-gray-500">
            {user?.davanac_points || 0} $DAVANAC
          </p>
        </div>
        <Badge className={`${davanacLevel.color} text-white`}>
          {davanacLevel.level}
        </Badge>
      </div>

      <Separator className="my-6" />

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
