import { supabase } from "./supabase";
import { toast } from "@/components/ui/use-toast";

interface UserFormData {
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
}

export const createUser = async (formData: UserFormData) => {
  // 1. Create auth account with metadata
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

  // 2. Create profile with all user data
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user.id,
        email: formData.email,
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        bio: formData.bio,
        avatar_url: formData.avatarUrl,
        banner_url: formData.bannerUrl,
        linkedin: formData.linkedin,
        youtube: formData.youtube,
        github: formData.github,
        spotify: formData.spotify,
        instagram: formData.instagram,
        facebook: formData.facebook,
        davanac_points: 0,
      },
    ])
    .select()
    .single();

  if (profileError) {
    console.error("Erreur lors de la création du profil:", profileError);
    throw profileError;
  }

  toast({
    title: "Compte créé avec succès",
    description: "Bienvenue sur Rhizome Protocol ! Vérifiez votre email pour confirmer votre compte.",
  });

  return true;
};

// Function to sync user data between auth and profiles
export const syncUserData = async (userId: string) => {
  try {
    const { data: authUser } = await supabase.auth.getUser();
    
    if (!authUser.user) return;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      throw profileError;
    }

    // If profile doesn't exist, create it with auth data
    if (!profile) {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            email: authUser.user.email,
            username: authUser.user.user_metadata.username,
            first_name: authUser.user.user_metadata.first_name,
            last_name: authUser.user.user_metadata.last_name,
            davanac_points: 0,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;
    }

    return true;
  } catch (error: any) {
    console.error('Error syncing user data:', error);
    toast({
      title: "Erreur de synchronisation",
      description: "Impossible de synchroniser les données utilisateur",
      variant: "destructive",
    });
    return false;
  }
};