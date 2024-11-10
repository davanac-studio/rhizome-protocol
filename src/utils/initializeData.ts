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

      // Ajouter le profil utilisateur
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            username: member.name.toLowerCase().replace(' ', '.'),
            first_name: member.name.split(' ')[0],
            last_name: member.name.split(' ')[1] || '',
            bio: member.bio,
            avatar_url: member.avatar,
            role: member.role,
            expertise: member.expertise,
            quote: member.quote,
            linkedin: member.linkedin,
            github: member.github,
            youtube: member.youtube,
            spotify: member.spotify,
            instagram: member.instagram,
            facebook: member.facebook,
          },
        ]);

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