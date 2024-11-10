import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { UserProjectsGallery } from "@/components/blocks/UserProjectsGallery";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setUser({
            ...data,
            name: `${data.first_name} ${data.last_name}`,
            firstName: data.first_name,
            lastName: data.last_name,
            avatarUrl: data.avatar_url,
            bannerUrl: data.banner_url,
          });
        }
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: "Impossible de charger le profil utilisateur",
          variant: "destructive",
        });
        console.error('Error fetching user profile:', error);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username, toast]);

  if (!user) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Chargement du profil...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <ProfileHeader user={user} />
      <UserProjectsGallery />
    </div>
  );
}