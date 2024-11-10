import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";

interface PersonalInfoFieldsProps {
  firstName: string;
  lastName: string;
  username: string;
  onChange: (field: string, value: string) => void;
}

export const PersonalInfoFields = ({
  firstName,
  lastName,
  username,
  onChange
}: PersonalInfoFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Prénom" required>
          <Input
            required
            value={firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            placeholder="Votre prénom"
          />
        </FormField>

        <FormField label="Nom" required>
          <Input
            required
            value={lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            placeholder="Votre nom"
          />
        </FormField>
      </div>

      <FormField label="Nom d'utilisateur" required>
        <Input
          required
          value={username}
          onChange={(e) => onChange('username', e.target.value)}
          placeholder="Votre nom d'utilisateur"
        />
      </FormField>
    </>
  );
};