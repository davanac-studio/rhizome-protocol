import { useState, useEffect } from "react";
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
  const [inputValue, setInputValue] = useState(username);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const checkUsername = async (newUsername: string) => {
    if (newUsername === username) return true; // No change
    setIsChecking(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', newUsername);

      if (error) {
        console.error('Error checking username:', error);
        return false;
      }

      if (data && data.length > 0) {
        toast({
          title: "Nom d'utilisateur non disponible",
          description: "Ce nom d'utilisateur est déjà pris",
          variant: "destructive",
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking username:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la vérification du nom d'utilisateur",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to check username after user stops typing
    const newTimeoutId = setTimeout(async () => {
      const isValid = await checkUsername(value);
      if (isValid) {
        onFieldChange("username", value);
      }
    }, 500); // Wait 500ms after user stops typing

    setTimeoutId(newTimeoutId);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <FormField label="Nom d'utilisateur" required>
      <Input
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Votre nom d'utilisateur"
        disabled={isChecking}
        required
      />
    </FormField>
  );
};