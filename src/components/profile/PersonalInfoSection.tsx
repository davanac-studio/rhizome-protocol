import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ParticularFields } from "./fields/ParticularFields";
import { EnterpriseFields } from "./fields/EnterpriseFields";
import { BioField } from "./fields/BioField";
import { UsernameField } from "./fields/UsernameField";
import { Enterprise } from "./types/Enterprise";

interface PersonalInfoSectionProps {
  firstName: string;
  lastName: string;
  expertise: string;
  collectif: string;
  bio: string;
  username: string;
  accountType: string;
  required?: boolean;
  onFieldChange: (field: string, value: string) => void;
}

export const PersonalInfoSection = ({
  firstName,
  lastName,
  expertise,
  collectif,
  bio,
  username,
  accountType,
  required = false,
  onFieldChange,
}: PersonalInfoSectionProps) => {
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);

  useEffect(() => {
    const fetchEnterprises = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, username, collectif')
        .eq('account_type', 'collectif')
        .not('collectif', 'is', null);
      
      if (data) {
        setEnterprises(data.map(enterprise => ({
          id: enterprise.id,
          username: enterprise.username,
          collectif: enterprise.collectif
        })));
      }
    };

    if (accountType === 'individuel') {
      fetchEnterprises();
    }
  }, [accountType]);

  return (
    <div className="space-y-4">
      <UsernameField
        username={username}
        onFieldChange={onFieldChange}
      />

      {accountType === 'particulier' ? (
        <ParticularFields
          firstName={firstName}
          lastName={lastName}
          expertise={expertise}
          collectif={collectif}
          enterprises={enterprises}
          required={false}
          onFieldChange={onFieldChange}
        />
      ) : (
        <EnterpriseFields
          collectif={collectif}
          required={required}
          onFieldChange={onFieldChange}
        />
      )}

      <BioField
        bio={bio}
        accountType={accountType}
        required={required}
        onFieldChange={onFieldChange}
      />
    </div>
  );
};