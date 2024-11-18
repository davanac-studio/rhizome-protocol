import { ProfileFormData } from "../types/ProfileFormData";

type ToastFunction = (props: {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}) => void;

export const validateProfileForm = (formData: ProfileFormData, toast: ToastFunction): boolean => {
  if (!formData.avatarUrl) {
    toast({
      title: "Erreur de validation",
      description: "L'avatar est obligatoire",
      variant: "destructive",
    });
    return false;
  }

  if (!formData.bio) {
    toast({
      title: "Erreur de validation",
      description: "La bio est obligatoire",
      variant: "destructive",
    });
    return false;
  }

  if (!formData.username) {
    toast({
      title: "Erreur de validation",
      description: "Le nom d'utilisateur est obligatoire",
      variant: "destructive",
    });
    return false;
  }

  if (formData.accountType === 'entreprise' && !formData.entreprise) {
    toast({
      title: "Erreur de validation",
      description: "L'entreprise est obligatoire",
      variant: "destructive",
    });
    return false;
  }

  return true;
};