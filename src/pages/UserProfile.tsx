import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { UserProjectsGallery } from "@/components/blocks/UserProjectsGallery";
import { useEffect, useState } from "react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfile = () => {
  const { username } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (!data) {
          toast({
            title: "Utilisateur non trouvé",
            description: "Cet utilisateur n'existe pas",
            variant: "destructive"
          });
          navigate('/'); // Redirection vers la page d'accueil
          return;
        }

        setUser({
          name: `${data.first_name} ${data.last_name}`,
          firstName: data.first_name,
          lastName: data.last_name,
          username: data.username,
          email: data.email,
          role: data.role || "Membre",
          avatarUrl: data.avatar_url,
          bannerUrl: data.banner_url,
          bio: data.bio,
          expertise: data.expertise,
          quote: data.quote,
          linkedin: data.linkedin,
          github: data.github,
          youtube: data.youtube,
          spotify: data.spotify,
          instagram: data.instagram,
          facebook: data.facebook
        });
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: "Impossible de charger le profil",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username, toast, navigate]);

  if (!username) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container">
          <div className="text-center">
            <p className="text-gray-600">Aucun utilisateur spécifié</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-80 w-full bg-gray-200" />
        <div className="container max-w-5xl mx-auto px-4">
          <div className="relative -mt-24 mb-6 flex flex-col items-center">
            <Skeleton className="h-48 w-48 rounded-full" />
            <div className="mt-4 space-y-4 text-center">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader user={user} />
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <UserProjectsGallery username={user.username} />
      </div>
    </div>
  );
};

export default UserProfile;