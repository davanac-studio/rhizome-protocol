import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!username) {
        console.log('No username found for profile');
        return;
      }

      try {
        const { data: userData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: "Erreur",
            description: "Impossible de charger le profil",
            variant: "destructive",
          });
          return;
        }
        
        if (!userData) {
          toast({
            title: "Profil introuvable",
            description: "Ce profil n'existe pas",
            variant: "destructive",
          });
          return;
        }

        setUser(userData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du chargement du profil",
          variant: "destructive",
        });
      }
    };

    fetchUserProfile();
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
    <div className="container mx-auto py-8">
      <ProfileHeader user={user} />
    </div>
  );
}