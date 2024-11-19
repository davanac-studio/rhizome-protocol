import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { ProfileImageSection } from "./ProfileImageSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { SocialLinksSection } from "./SocialLinksSection";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { DangerZone } from "./DangerZone";
import { FormActions } from "./FormActions";
import { ProfileFormData } from "./types/ProfileFormData";
import { validateProfileForm } from "./utils/formValidation";

interface EditProfileFormProps {
  user: any;
  onClose: () => void;
  onUpdate: (updatedUser: any) => void;
}

export const EditProfileForm = ({ user, onClose, onUpdate }: EditProfileFormProps) => {
  const { user: authUser, clearSession } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user?.first_name || user?.firstName || "",
    lastName: user?.last_name || user?.lastName || "",
    username: user?.username || "",
    bio: user?.bio || "",
    expertise: user?.expertise || "",
    entreprise: user?.entreprise || "",
    avatarUrl: user?.avatar_url || user?.avatarUrl || "",
    bannerUrl: user?.banner_url || user?.bannerUrl || "",
    website: user?.website || "",
    linkedin: user?.linkedin || "",
    youtube: user?.youtube || "",
    github: user?.github || "",
    spotify: user?.spotify || "",
    instagram: user?.instagram || "",
    facebook: user?.facebook || "",
    accountType: user?.account_type || "individuel",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfileForm(formData, toast)) return;

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
      // Vérifier si le nouveau nom d'utilisateur est déjà pris
      if (formData.username !== user.username) {
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', formData.username)
          .neq('id', authUser.id)
          .maybeSingle();

        if (existingUser) {
          toast({
            title: "Erreur",
            description: "Ce nom d'utilisateur est déjà pris.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      // Mettre à jour le profil
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          bio: formData.bio,
          expertise: formData.expertise,
          entreprise: formData.entreprise,
          avatar_url: formData.avatarUrl,
          banner_url: formData.bannerUrl,
          website: formData.website,
          linkedin: formData.linkedin,
          youtube: formData.youtube,
          github: formData.github,
          spotify: formData.spotify,
          instagram: formData.instagram,
          facebook: formData.facebook,
        })
        .eq('id', authUser.id);

      if (error) throw error;

      const updatedUser = {
        ...user,
        ...formData,
        avatar_url: formData.avatarUrl,
        banner_url: formData.bannerUrl,
      };

      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès.",
      });
      
      onUpdate(updatedUser);
      onClose();

      // Si le nom d'utilisateur a changé, rediriger vers le nouveau profil
      if (formData.username !== user.username) {
        navigate(`/profile/${formData.username}`, { replace: true });
        window.location.reload();
      }
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

  const handleDeleteAccount = async () => {
    if (!authUser) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', authUser.id);

      if (error) throw error;

      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès.",
      });

      clearSession();
      navigate('/');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du compte.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProfileImageSection
        bannerUrl={formData.bannerUrl}
        avatarUrl={formData.avatarUrl}
        firstName={formData.firstName}
        lastName={formData.lastName}
        onFieldChange={handleFieldChange}
        required={true}
      />

      <Separator className="my-6" />

      <PersonalInfoSection
        firstName={formData.firstName}
        lastName={formData.lastName}
        expertise={formData.expertise}
        entreprise={formData.entreprise}
        bio={formData.bio}
        username={formData.username}
        accountType={formData.accountType}
        onFieldChange={handleFieldChange}
        required={true}
      />

      <Separator className="my-6" />

      <SocialLinksSection
        website={formData.website}
        linkedin={formData.linkedin}
        github={formData.github}
        youtube={formData.youtube}
        spotify={formData.spotify}
        instagram={formData.instagram}
        facebook={formData.facebook}
        onFieldChange={handleFieldChange}
      />

      <FormActions onClose={onClose} loading={loading} />

      <Separator className="my-6" />

      <DangerZone onDeleteAccount={handleDeleteAccount} />
    </form>
  );
};