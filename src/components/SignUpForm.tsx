import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { createUser } from "@/lib/auth";
import { SignUpStep1 } from "./signup/SignUpStep1";
import { SignUpStep2 } from "./signup/SignUpStep2";
import { SignUpStep3 } from "./signup/SignUpStep3";
import { supabase } from "@/integrations/supabase/client";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    accountType: 'individuel',
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    expertise: "",
    entreprise: "",
    avatarUrl: "",
    bannerUrl: "",
    linkedin: "",
    youtube: "",
    github: "",
    spotify: "",
    instagram: "",
    facebook: "",
  });

  const validateStep1 = async () => {
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

    // Check if there's an unclaimed profile with this email
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('invitation_email', formData.email)
      .eq('is_claimed', false)
      .single();

    if (existingProfile) {
      // Pre-fill form data with existing profile information
      setFormData(prev => ({
        ...prev,
        firstName: existingProfile.first_name || prev.firstName,
        lastName: existingProfile.last_name || prev.lastName,
        username: existingProfile.username || prev.username,
        bio: existingProfile.bio || prev.bio,
        expertise: existingProfile.expertise || prev.expertise,
        avatarUrl: existingProfile.avatar_url || prev.avatarUrl,
        bannerUrl: existingProfile.banner_url || prev.bannerUrl,
        linkedin: existingProfile.linkedin || prev.linkedin,
        youtube: existingProfile.youtube || prev.youtube,
        github: existingProfile.github || prev.github,
        spotify: existingProfile.spotify || prev.spotify,
        instagram: existingProfile.instagram || prev.instagram,
        facebook: existingProfile.facebook || prev.facebook,
      }));

      toast({
        title: "Profil trouvé",
        description: "Nous avons trouvé un profil associé à votre email. Les informations ont été pré-remplies.",
      });
    }

    return true;
  };

  const validateStep2 = () => {
    if (formData.accountType === 'individuel' && (!formData.firstName || !formData.lastName)) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.username) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez choisir un nom d'utilisateur",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (currentStep === 1 && await validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.avatarUrl) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez choisir un avatar",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const success = await createUser({
        ...formData,
        username: formData.username,
      });
      if (success) {
        toast({
          title: "Compte créé avec succès",
          description: "Votre compte a été créé avec succès.",
        });
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
    if (field === 'username') {
      value = value.startsWith('@') ? value.slice(1) : value;
    }
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Créer un compte</h2>
        <p className="text-muted-foreground mt-2">
          {currentStep === 1 && "Choisissez votre type de compte"}
          {currentStep === 2 && "Complétez vos informations"}
          {currentStep === 3 && "Choisissez votre avatar"}
        </p>
      </div>

      {currentStep === 1 && (
        <SignUpStep1
          accountType={formData.accountType}
          email={formData.email}
          password={formData.password}
          onChange={handleFieldChange}
          onNext={handleNext}
          loading={loading}
        />
      )}
      
      {currentStep === 2 && (
        <SignUpStep2
          formData={formData}
          onChange={handleFieldChange}
          onNext={handleNext}
          onBack={handleBack}
          loading={loading}
        />
      )}
      
      {currentStep === 3 && (
        <SignUpStep3
          avatarUrl={formData.avatarUrl}
          onChange={handleFieldChange}
          onBack={handleBack}
          loading={loading}
        />
      )}
    </form>
  );
};

export default SignUpForm;
