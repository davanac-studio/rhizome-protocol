import { supabase } from "./supabase";
import { toast } from "@/components/ui/use-toast";

interface UserFormData {
  accountType: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  avatarUrl: string;
  bannerUrl: string;
  linkedin: string;
  youtube: string;
  github: string;
  spotify: string;
  instagram: string;
  facebook: string;
  entreprise: string;
}

export const checkUsernameExists = async (username: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username);

  if (error && error.code !== 'PGRST116') {
    console.error("Error checking username:", error);
    return false;
  }

  return data && data.length > 0;
};

export const createUser = async (formData: UserFormData) => {
  // 1. Créer le compte auth
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
      },
    },
  });

  if (signUpError) {
    if (signUpError.message.includes("User already registered")) {
      toast({
        title: "Erreur",
        description: "Un compte existe déjà avec cet email",
        variant: "destructive",
      });
      return false;
    }
    throw signUpError;
  }

  if (!authData.user?.id) {
    throw new Error("Erreur lors de la création du compte");
  }

  // 2. Vérifier si un profil existe déjà avec ce username
  const { data: existingProfileByUsername } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', formData.username);

  if (existingProfileByUsername && existingProfileByUsername.length > 0) {
    toast({
      title: "Erreur",
      description: "Ce nom d'utilisateur est déjà pris",
      variant: "destructive",
    });
    // Supprimer le compte auth puisqu'on n'a pas pu créer le profil
    await supabase.auth.admin.deleteUser(authData.user.id);
    return false;
  }

  // 3. Vérifier si un profil existe déjà pour cet ID
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', authData.user.id);

  const profileData = {
    username: formData.username,
    first_name: formData.accountType === 'particulier' ? formData.firstName : null,
    last_name: formData.accountType === 'particulier' ? formData.lastName : null,
    bio: formData.bio,
    avatar_url: formData.avatarUrl,
    banner_url: formData.bannerUrl,
    linkedin: formData.linkedin,
    youtube: formData.youtube,
    github: formData.github,
    spotify: formData.spotify,
    instagram: formData.instagram,
    facebook: formData.facebook,
    entreprise: formData.entreprise,
    account_type: formData.accountType,
  };

  // Si le profil existe déjà, on le met à jour au lieu de le créer
  if (existingProfile && existingProfile.length > 0) {
    const { error: updateError } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', authData.user.id);

    if (updateError) {
      console.error("Erreur lors de la mise à jour du profil:", updateError);
      throw updateError;
    }
  } else {
    // 4. Créer le profil s'il n'existe pas
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          ...profileData,
        },
      ]);

    if (profileError) {
      console.error("Erreur lors de la création du profil:", profileError);
      // Supprimer le compte auth puisqu'on n'a pas pu créer le profil
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw profileError;
    }
  }

  toast({
    title: "Compte créé avec succès",
    description: "Bienvenue sur Project Pulse ! Vérifiez votre email pour confirmer votre compte.",
  });

  return true;
};