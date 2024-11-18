import { Input } from "@/components/ui/input";
import { FormField } from "@/components/signup/FormField";

interface EnterpriseFieldsProps {
  entreprise: string;
  required?: boolean;
  onFieldChange: (field: string, value: string) => void;
}

export const EnterpriseFields = ({
  entreprise,
  required = false,
  onFieldChange,
}: EnterpriseFieldsProps) => {
  return (
    <FormField label="Nom de l'entreprise" required={required}>
      <Input
        value={entreprise}
        onChange={(e) => onFieldChange("entreprise", e.target.value)}
        placeholder="Nom de votre entreprise"
        required={required}
      />
    </FormField>
  );
};