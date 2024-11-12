import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { EditProfileDialog } from "./EditProfileDialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { NewProjectDialog } from "@/components/NewProjectDialog";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileSocial } from "./ProfileSocial";

export const ProfileHeader = ({ user: initialUser }: { user: any }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { user: currentUser } = useAuth();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    if (!user?.username) {
      console.log('No username found for profile');
      return;
    }

    try {
      const { data: userData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', user.username)
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
        navigate('/'); // Redirect to home page
        return;
      }

      setUser({
        ...userData,
        name: `${userData.first_name} ${userData.last_name}`,
        firstName: userData.first_name,
        lastName: userData.last_name,
        avatarUrl: userData.avatar_url,
        bannerUrl: userData.banner_url,
      });
      setIsOwnProfile(currentUser?.id === userData.id);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du chargement du profil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkProfileOwnership = async () => {
      if (!currentUser?.id) {
        console.log('No current user ID found');
        setLoading(false);
        return;
      }

      await fetchUserData();
    };

    checkProfileOwnership();
  }, [user?.username, currentUser?.id]);

  const handleUpdate = async (updatedUser: any) => {
    setUser(updatedUser);
    await fetchUserData();
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p>Chargement du profil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Profil introuvable</h1>
        <p className="text-gray-600 mb-4">Ce profil n'existe pas ou a été supprimé.</p>
        <Button onClick={() => navigate('/')}>Retourner à l'accueil</Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <ProfileBanner bannerUrl={user.bannerUrl} />
      
      <div className="container max-w-5xl mx-auto px-4">
        <div className="relative -mt-24 mb-6 flex flex-col items-center">
          <ProfileAvatar
            avatarUrl={user?.avatarUrl}
            avatar={user?.avatar}
            firstName={user?.firstName}
            name={user?.name}
          />
          
          <ProfileInfo
            firstName={user?.firstName}
            lastName={user?.lastName}
            name={user?.name}
            expertise={user?.expertise}
            username={user?.username}
          />

          <ProfileSocial />

          {isOwnProfile && (
            <div className="flex flex-col gap-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
                Modifier le profil
              </Button>
            </div>
          )}

          {user?.bio && (
            <Card className="mt-6 p-6 w-full max-w-2xl bg-white shadow-sm">
              <p className="text-center text-gray-600 italic">
                {user.bio}
              </p>
            </Card>
          )}

          {isOwnProfile && (
            <div className="mt-4">
              <NewProjectDialog />
            </div>
          )}
        </div>
      </div>

      {isOwnProfile && (
        <EditProfileDialog
          user={user}
          open={isEditing}
          onOpenChange={setIsEditing}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};
