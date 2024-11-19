import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileProjects } from "@/components/profile/ProfileProjects";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export default function UserProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!username) {
        console.log('No username found for profile');
        navigate('/');
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
          navigate('/');
          return;
        }
        
        if (!userData) {
          toast({
            title: "Profil introuvable",
            description: "Ce profil n'existe pas",
            variant: "destructive",
          });
          navigate('/');
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
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username, toast, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Chargement du profil...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <ProfileHeader user={user} />
      <ProfileProjects username={username || ''} />
    </div>
  );
}