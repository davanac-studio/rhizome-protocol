import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { createUser } from "@/lib/auth";
import { SignUpStep1 } from "./signup/SignUpStep1";
import { SignUpStep2 } from "./signup/SignUpStep2";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl: "",
    bannerUrl: "",
    linkedin: "",
    youtube: "",
    github: "",
    spotify: "",
    instagram: "",
    facebook: "",
  });

  const validateStep1 = () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return false;
    }
    if (formData.password.length < 6) {
      toast({
        title: "Erreur de validation",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const success = await createUser(formData);
      if (success) {
        toast({
          title: "Compte créé avec succès",
          description: "Votre compte a été créé avec succès.",
        });
        // Redirect to the user's profile page
        navigate(`/profile/${encodeURIComponent(formData.username)}`);
      }
    } catch (error: any) {
      toast({
        title: "Erreur lors de la création du compte",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Créer un compte</h2>
        <p className="text-muted-foreground mt-2">
          {currentStep === 1 
            ? "Commencez par créer vos identifiants"
            : "Complétez votre profil"
          }
        </p>
      </div>

      {currentStep === 1 ? (
        <SignUpStep1
          email={formData.email}
          password={formData.password}
          onChange={handleFieldChange}
          onNext={handleNext}
          loading={loading}
        />
      ) : (
        <SignUpStep2
          formData={formData}
          onChange={handleFieldChange}
          onBack={handleBack}
          loading={loading}
        />
      )}
    </form>
  );
};

export default SignUpForm;