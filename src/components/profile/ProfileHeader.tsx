import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { ProfileSocialButtons } from "./ProfileSocialButtons";
import { EditProfileDialog } from "./EditProfileDialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export const ProfileHeader = ({ user: initialUser }: { user: any }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const { user: currentUser } = useAuth();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [user, setUser] = useState(initialUser);

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
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger le profil",
          variant: "destructive",
        });
        return;
      }
      
      if (!userData?.id) {
        console.log('No user data found for profile');
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
    }
  };

  useEffect(() => {
    const checkProfileOwnership = async () => {
      if (!currentUser?.id) {
        console.log('No current user ID found');
        return;
      }

      await fetchUserData();
    };

    checkProfileOwnership();
  }, [user?.username, currentUser?.id]);

  const handleUpdate = async (updatedUser: any) => {
    setUser(updatedUser);
    await fetchUserData(); // Refresh the data after update
    setIsEditing(false);
  };

  return (
    <>
      {user.bannerUrl && (
        <div className="max-h-48 overflow-hidden rounded-lg mb-6">
          <img
            src={user.bannerUrl}
            alt="Banner"
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user?.avatarUrl || user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.firstName?.charAt(0) || user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.firstName && user?.lastName 
                ? `${user.firstName} ${user.lastName}`
                : user?.name}
            </h1>
            <p className="text-sm text-gray-600">@{user?.username}</p>
            {user?.expertise && (
              <p className="text-gray-700 font-bold italic mt-1">{user.expertise}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <ProfileSocialButtons user={user} />
            {isOwnProfile && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
                Modifier le profil
              </Button>
            )}
          </div>
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
    </>
  );
};