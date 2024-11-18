import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PersonalInfoSectionProps {
  firstName: string;
  lastName: string;
  expertise: string;
  entreprise: string;
  bio: string;
  accountType: string;
  onFieldChange: (field: string, value: string) => void;
}

interface Enterprise {
  id: string;
  username: string;
  entreprise: string;
}

export const PersonalInfoSection = ({
  firstName,
  lastName,
  expertise,
  entreprise,
  bio,
  accountType,
  onFieldChange,
}: PersonalInfoSectionProps) => {
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);

  useEffect(() => {
    const fetchEnterprises = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, username, entreprise')
        .eq('account_type', 'entreprise')
        .not('entreprise', 'is', null);
      
      if (data) {
        setEnterprises(data);
      }
    };

    if (accountType === 'particulier') {
      fetchEnterprises();
    }
  }, [accountType]);

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
    <div className="space-y-4">
      {accountType === 'particulier' && (
        <>
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
              placeholder="Votre domaine d'expertise"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Entreprise</label>
            <Select
              value={entreprise}
              onValueChange={(value) => onFieldChange("entreprise", value)}
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
          </div>
        </>
      )}

      {accountType === 'entreprise' && (
        <div>
          <label className="text-sm font-medium">Nom de l'entreprise</label>
          <Input
            value={entreprise}
            onChange={(e) => onFieldChange("entreprise", e.target.value)}
            placeholder="Nom de votre entreprise"
          />
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Bio</label>
          {accountType === 'particulier' && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateBio}
              disabled={!expertise}
              className="flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Générer une bio
            </Button>
          )}
        </div>
        <Textarea
          value={bio}
          onChange={(e) => onFieldChange("bio", e.target.value)}
          className="h-24"
        />
      </div>
    </div>
  );
};