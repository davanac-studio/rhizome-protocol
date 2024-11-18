import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/signup/FormField";

interface BioFieldProps {
  bio: string;
  expertise: string;
  accountType: string;
  required?: boolean;
  onFieldChange: (field: string, value: string) => void;
}

export const BioField = ({
  bio,
  accountType,
  required = false,
  onFieldChange,
}: BioFieldProps) => {
  return (
    <div>
      <FormField 
        label={accountType === 'entreprise' ? "Description de l'entreprise" : "Bio"}
        required={required}
      />
      <Textarea
        value={bio}
        onChange={(e) => onFieldChange("bio", e.target.value)}
        className="h-24"
        required={required}
      />
    </div>
  );
};