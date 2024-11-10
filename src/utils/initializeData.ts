import { supabase } from '@/lib/supabase';
import { teamMembers } from '@/data/team-members';

export const initializeUsers = async () => {
  try {
    // Vérifier si les utilisateurs existent déjà
    const { data: existingUsers } = await supabase
      .from('profiles')
      .select('id');

    if (existingUsers && existingUsers.length > 0) {
      console.log('Users already initialized');
      return;
    }

    // Créer les utilisateurs dans auth
    for (const member of Object.values(teamMembers)) {
      const email = `${member.name.toLowerCase().replace(' ', '.')}@rhizome.dev`;
      
      // Vérifier si l'utilisateur existe déjà
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', member.name.toLowerCase().replace(' ', '.'))
        .single();

      if (existingUser) {
        console.log(`User ${member.name} already exists`);
        continue;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: 'Rhizome2024!',
        options: {
          data: {
            username: member.name.toLowerCase().replace(' ', '.'),
            first_name: member.name.split(' ')[0],
            last_name: member.name.split(' ')[1] || '',
          },
        },
      });

      if (authError) {
        if (authError.message.includes("User already registered")) {
          console.log(`User ${member.name} already registered`);
          continue;
        }
        console.error(`Error creating auth user for ${member.name}:`, authError);
        continue;
      }

      if (!authData.user?.id) {
        console.error(`No user ID returned for ${member.name}`);
        continue;
      }

      // Préparer les données du profil avec gestion des champs optionnels
      const profileData = {
        id: authData.user.id,
        username: member.name.toLowerCase().replace(' ', '.'),
        first_name: member.name.split(' ')[0],
        last_name: member.name.split(' ')[1] || '',
        bio: member.bio,
        avatar_url: member.avatar,
        role: member.role,
        expertise: member.expertise,
        quote: member.quote,
        linkedin: 'linkedin' in member ? member.linkedin : null,
        github: 'github' in member ? member.github : null,
        youtube: 'youtube' in member ? member.youtube : null,
        spotify: 'spotify' in member ? member.spotify : null,
        instagram: 'instagram' in member ? member.instagram : null,
        facebook: 'facebook' in member ? member.facebook : null,
      };

      // Ajouter le profil utilisateur
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([profileData]);

      if (profileError) {
        console.error(`Error creating profile for ${member.name}:`, profileError);
        continue;
      }

      console.log(`Successfully created user and profile for ${member.name}`);
    }

    console.log('Users initialization completed');
  } catch (error) {
    console.error('Error initializing users:', error);
  }
};