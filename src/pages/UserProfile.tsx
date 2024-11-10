import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { UserProjectsGallery } from "@/components/blocks/UserProjectsGallery";
import { useEffect, useState } from "react";
import { projectsData } from "@/data/projects";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfile = () => {
  const { username } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .maybeSingle(); // Changed from .single() to .maybeSingle()

        if (error) throw error;

        if (data) {
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
            quote: data.quote,
            linkedin: data.linkedin,
            github: data.github,
            youtube: data.youtube,
            spotify: data.spotify,
            instagram: data.instagram,
            facebook: data.facebook
          });
        } else {
          toast({
            title: "Utilisateur non trouvé",
            description: "Cet utilisateur n'existe pas",
            variant: "destructive"
          });
        }
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: "Impossible de charger le profil",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username, toast]);

  const projectCount = projectsData.filter(project => {
    const isLeader = project.author.name === user?.name;
    const isParticipant = project.participants?.some(
      participant => participant.name === user?.name
    );
    return isLeader || isParticipant;
  }).length;

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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
              <div className="space-y-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container">
          <Link to="/users">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <div className="text-center">
            <p className="text-gray-600">Utilisateur non trouvé</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <Link to="/users">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </Link>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {user.bannerUrl && (
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={user.bannerUrl}
                  alt="Banner"
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            )}
            <div className="p-8">
              <ProfileHeader user={user} projectCount={projectCount} />
              <ProfileContent user={user} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <UserProjectsGallery userName={user.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;