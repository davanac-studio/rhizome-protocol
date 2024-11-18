import { Button } from "@/components/ui/button";
import { ImageUploadField } from "../profile/ImageUploadField";

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
        label="Avatar"
        value={avatarUrl}
        onChange={(value) => onChange('avatarUrl', value)}
        type="avatar"
      />

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