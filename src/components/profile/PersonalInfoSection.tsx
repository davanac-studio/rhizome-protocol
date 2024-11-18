import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ParticularFields } from "./fields/ParticularFields";
import { EnterpriseFields } from "./fields/EnterpriseFields";
import { BioField } from "./fields/BioField";
import { Enterprise } from "./types/Enterprise";

interface PersonalInfoSectionProps {
  firstName: string;
  lastName: string;
  expertise: string;
  entreprise: string;
  bio: string;
  accountType: string;
  required?: boolean;
  onFieldChange: (field: string, value: string) => void;
}

export const PersonalInfoSection = ({
  firstName,
  lastName,
  expertise,
  entreprise,
  bio,
  accountType,
  required = false,
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

  return (
    <div className="space-y-4">
      {accountType === 'particulier' ? (
        <ParticularFields
          firstName={firstName}
          lastName={lastName}
          expertise={expertise}
          entreprise={entreprise}
          enterprises={enterprises}
          required={required}
          onFieldChange={onFieldChange}
        />
      ) : (
        <EnterpriseFields
          entreprise={entreprise}
          required={required}
          onFieldChange={onFieldChange}
        />
      )}

      <BioField
        bio={bio}
        expertise={expertise}
        accountType={accountType}
        required={required}
        onFieldChange={onFieldChange}
      />
    </div>
  );
};