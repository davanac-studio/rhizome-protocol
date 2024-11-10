import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PersonalInfoSectionProps {
  firstName: string;
  lastName: string;
  expertise: string;
  bio: string;
  onFieldChange: (field: string, value: string) => void;
}

export const PersonalInfoSection = ({
  firstName,
  lastName,
  expertise,
  bio,
  onFieldChange,
}: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Prénom</label>
          <Input
            value={firstName}
            onChange={(e) => onFieldChange("firstName", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Nom</label>
          <Input
            value={lastName}
            onChange={(e) => onFieldChange("lastName", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Expertise</label>
        <Input
          value={expertise}
          onChange={(e) => onFieldChange("expertise", e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Bio</label>
        <Textarea
          value={bio}
          onChange={(e) => onFieldChange("bio", e.target.value)}
          className="h-24"
        />
      </div>
    </div>
  );
};