import { Button } from "@/components/ui/button";
import { ImageUploadField } from "../profile/ImageUploadField";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SignUpStep3Props {
  avatarUrl: string;
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  loading: boolean;
}

export const SignUpStep3 = ({ 
  avatarUrl,
  onChange,
  onBack,
  loading 
}: SignUpStep3Props) => {
  return (
    <div className="space-y-6">
      <ImageUploadField
        value={avatarUrl}
        onChange={(value) => onChange('avatarUrl', value)}
        type="avatar"
        buttonText="Choisir un avatar"
      />

      {avatarUrl && (
        <div className="flex justify-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarUrl} alt="Avatar preview" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </div>
      )}

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
        <Button 
          type="submit" 
          className="flex-1"
          disabled={loading}
        >
          {loading ? "Création en cours..." : "Créer mon compte"}
        </Button>
      </div>
    </div>
  );
};