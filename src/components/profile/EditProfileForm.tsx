import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { ImageFields } from "../signup/ImageFields";

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
    role: user.role || "",
    expertise: user.expertise || "",
    quote: user.quote || "",
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
          role: formData.role,
          expertise: formData.expertise,
          quote: formData.quote,
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Prénom</label>
          <Input
            value={formData.firstName}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Nom</label>
          <Input
            value={formData.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Bio</label>
        <Textarea
          value={formData.bio}
          onChange={(e) => handleFieldChange("bio", e.target.value)}
          className="h-24"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Rôle</label>
        <Input
          value={formData.role}
          onChange={(e) => handleFieldChange("role", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Expertise</label>
        <Input
          value={formData.expertise}
          onChange={(e) => handleFieldChange("expertise", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Citation</label>
        <Input
          value={formData.quote}
          onChange={(e) => handleFieldChange("quote", e.target.value)}
        />
      </div>

      <ImageFields
        avatarUrl={formData.avatarUrl}
        bannerUrl={formData.bannerUrl}
        firstName={formData.firstName}
        lastName={formData.lastName}
        onAvatarChange={(value) => handleFieldChange("avatarUrl", value)}
        onBannerChange={(value) => handleFieldChange("bannerUrl", value)}
      />

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Réseaux sociaux</h3>
        <div className="space-y-3">
          <Input
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={(e) => handleFieldChange("linkedin", e.target.value)}
          />
          <Input
            placeholder="YouTube URL"
            value={formData.youtube}
            onChange={(e) => handleFieldChange("youtube", e.target.value)}
          />
          <Input
            placeholder="GitHub URL"
            value={formData.github}
            onChange={(e) => handleFieldChange("github", e.target.value)}
          />
          <Input
            placeholder="Spotify URL"
            value={formData.spotify}
            onChange={(e) => handleFieldChange("spotify", e.target.value)}
          />
          <Input
            placeholder="Instagram URL"
            value={formData.instagram}
            onChange={(e) => handleFieldChange("instagram", e.target.value)}
          />
          <Input
            placeholder="Facebook URL"
            value={formData.facebook}
            onChange={(e) => handleFieldChange("facebook", e.target.value)}
          />
        </div>
      </div>

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