import { useState } from "react";
import { FormField } from "@/components/signup/FormField";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface UsernameFieldProps {
  username: string;
  onFieldChange: (field: string, value: string) => void;
}

export const UsernameField = ({ username, onFieldChange }: UsernameFieldProps) => {
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);

  const checkUsername = async (newUsername: string) => {
    if (newUsername === username) return true; // No change
    setIsChecking(true);
    
    try {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', newUsername)
        .single();

      if (data) {
        toast({
          title: "Nom d'utilisateur non disponible",
          description: "Ce nom d'utilisateur est déjà pris",
          variant: "destructive",
        });
        return false;
      }
      return true;
    } catch (error) {
      return true; // If error, username probably doesn't exist
    } finally {
      setIsChecking(false);
    }
  };

  const handleUsernameChange = async (value: string) => {
    const isValid = await checkUsername(value);
    if (isValid) {
      onFieldChange("username", value);
    }
  };

  return (
    <FormField label="Nom d'utilisateur" required>
      <Input
        value={username}
        onChange={(e) => handleUsernameChange(e.target.value)}
        placeholder="Votre nom d'utilisateur"
        disabled={isChecking}
        required
      />
    </FormField>
  );
};