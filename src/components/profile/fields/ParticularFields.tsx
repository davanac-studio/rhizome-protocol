import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "@/components/signup/FormField";
import { Enterprise } from "../types/Enterprise";

interface ParticularFieldsProps {
  firstName: string;
  lastName: string;
  expertise: string;
  entreprise: string;
  enterprises: Enterprise[];
  required?: boolean;
  onFieldChange: (field: string, value: string) => void;
}

export const ParticularFields = ({
  firstName,
  lastName,
  expertise,
  entreprise,
  enterprises,
  required = false,
  onFieldChange,
}: ParticularFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Prénom" required={true}>
          <Input
            value={firstName}
            onChange={(e) => onFieldChange("firstName", e.target.value)}
            required={true}
          />
        </FormField>
        <FormField label="Nom" required={true}>
          <Input
            value={lastName}
            onChange={(e) => onFieldChange("lastName", e.target.value)}
            required={true}
          />
        </FormField>
      </div>

      <FormField label="Entreprise" required={required}>
        <Select
          value={entreprise}
          onValueChange={(value) => onFieldChange("entreprise", value)}
          required={required}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une entreprise" />
          </SelectTrigger>
          <SelectContent>
            {enterprises.map((enterprise) => (
              <SelectItem key={enterprise.id} value={enterprise.entreprise}>
                {enterprise.entreprise}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Expertise" required={true}>
        <Input
          value={expertise}
          onChange={(e) => onFieldChange("expertise", e.target.value)}
          placeholder="Votre domaine d'expertise"
          required={true}
        />
      </FormField>
    </>
  );
};