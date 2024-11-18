import { Textarea } from "@/components/ui/textarea";
import { FormField } from "./FormField";

interface BioFieldProps {
  bio: string;
  accountType: string;
  onChange: (value: string) => void;
}

export const BioField = ({ bio, accountType, onChange }: BioFieldProps) => {
  const label = accountType === 'entreprise' ? "Description de l'entreprise" : "Bio";
  
  return (
    <FormField label={label} required>
      <Textarea
        required
        value={bio}
        onChange={(e) => {
          const text = e.target.value;
          if (text.length <= 150) {
            onChange(text);
          }
        }}
        placeholder={accountType === 'entreprise' ? "Décrivez votre entreprise (150 caractères max)" : "Parlez-nous de vous (150 caractères max)"}
        className="h-24"
        maxLength={150}
      />
      <p className="text-xs text-gray-500 mt-1">
        {bio.length}/150 caractères
      </p>
    </FormField>
  );
};