import { supabase } from '@/lib/supabase';
import { teamMembers } from '@/data/team-members';

export const initializeUsers = async () => {
  try {
    // Vérifier si les utilisateurs existent déjà
    const { data: existingUsers } = await supabase
      .from('profiles')
      .select('email');

    if (existingUsers && existingUsers.length > 0) {
      console.log('Users already initialized');
      return;
    }

    // Créer les utilisateurs dans auth
    for (const member of teamMembers) {
      const { error: authError } = await supabase.auth.signUp({
        email: `${member.name.toLowerCase().replace(' ', '.')}@rhizome.dev`,
        password: 'Rhizome2024!',
      });

      if (authError) {
        console.error(`Error creating auth user for ${member.name}:`, authError);
        continue;
      }

      // Ajouter le profil utilisateur
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            username: member.name.toLowerCase().replace(' ', '.'),
            email: `${member.name.toLowerCase().replace(' ', '.')}@rhizome.dev`,
            firstName: member.name.split(' ')[0],
            lastName: member.name.split(' ')[1] || '',
            bio: member.role,
            avatarUrl: member.avatar,
            linkedin: member.linkedin || '',
            github: member.github || '',
            youtube: member.youtube || '',
            spotify: member.spotify || '',
            instagram: member.instagram || '',
            facebook: member.facebook || '',
          },
        ]);

      if (profileError) {
        console.error(`Error creating profile for ${member.name}:`, profileError);
      }
    }

    console.log('Users initialization completed');
  } catch (error) {
    console.error('Error initializing users:', error);
  }
};