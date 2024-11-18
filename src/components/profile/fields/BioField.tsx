import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
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
  expertise,
  accountType,
  required = false,
  onFieldChange,
}: BioFieldProps) => {
  const generateBio = () => {
    if (!expertise) return;

    const bioTemplates = [
      `Professionnel passionné spécialisé en ${expertise.toLowerCase()}, je m'engage à créer de la valeur à travers des solutions innovantes.`,
      `Expert en ${expertise.toLowerCase()}, je combine créativité et expertise technique pour relever les défis complexes.`,
      `Avec une expertise pointue en ${expertise.toLowerCase()}, je contribue activement à l'évolution des projets innovants.`,
    ];

    const randomBio = bioTemplates[Math.floor(Math.random() * bioTemplates.length)];
    onFieldChange("bio", randomBio);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <FormField 
          label={accountType === 'entreprise' ? "Description de l'entreprise" : "Bio"}
          required={required}
        >
          {accountType === 'particulier' && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateBio}
              disabled={!expertise}
              className="flex items-center gap-2 ml-2"
            >
              <Wand2 className="w-4 h-4" />
              Générer une bio
            </Button>
          )}
        </FormField>
      </div>
      <Textarea
        value={bio}
        onChange={(e) => onFieldChange("bio", e.target.value)}
        className="h-24"
        required={required}
      />
    </div>
  );
};