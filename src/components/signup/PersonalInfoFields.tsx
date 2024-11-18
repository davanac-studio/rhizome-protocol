import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { PersonalDetailsBlock } from "./PersonalDetailsBlock";

interface PersonalInfoFieldsProps {
  firstName: string;
  lastName: string;
  username: string;
  expertise: string;
  entreprise: string;
  onChange: (field: string, value: string) => void;
}

export const PersonalInfoFields = ({
  firstName,
  lastName,
  username,
  expertise,
  entreprise,
  onChange
}: PersonalInfoFieldsProps) => {
  return (
    <div className="space-y-6">
      <PersonalDetailsBlock
        firstName={firstName}
        lastName={lastName}
        entreprise={entreprise}
        onChange={onChange}
      />

      <div className="space-y-4">
        <FormField label="Nom d'utilisateur" required>
          <Input
            required
            value={username}
            onChange={(e) => onChange('username', e.target.value)}
            placeholder="Votre nom d'utilisateur"
          />
        </FormField>

        <FormField label="Expertise" required>
          <Input
            required
            value={expertise}
            onChange={(e) => onChange('expertise', e.target.value)}
            placeholder="Votre domaine d'expertise"
          />
        </FormField>
      </div>
    </div>
  );
};