import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Mail, Globe, Twitter, Facebook, Linkedin } from "lucide-react";
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
    await fetchUserData();
    setIsEditing(false);
  };

  return (
    <div className="relative">
      <div className="h-80 w-full overflow-hidden">
        {user.bannerUrl ? (
          <img
            src={user.bannerUrl}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600" />
        )}
      </div>
      
      <div className="container max-w-5xl mx-auto px-4">
        <div className="relative -mt-24 mb-6 flex flex-col items-center">
          <Avatar className="h-48 w-48 border-4 border-white shadow-lg">
            <AvatarImage src={user?.avatarUrl || user?.avatar} alt={user?.name} />
            <AvatarFallback className="text-4xl">
              {user?.firstName?.charAt(0) || user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {user?.firstName && user?.lastName 
                ? `${user.firstName} ${user.lastName}`
                : user?.name}
            </h1>
            <p className="text-gray-600 mt-1">{user?.expertise || "News Producer"}</p>
            <p className="text-gray-500 mt-1">@{user?.username}</p>
          </div>

          <div className="flex gap-3 mt-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mail className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Twitter className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Facebook className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="h-5 w-5 text-gray-600" />
            </Button>
          </div>

          {isOwnProfile && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4 flex items-center gap-2"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
              Modifier le profil
            </Button>
          )}

          {user?.bio && (
            <p className="mt-6 text-center text-gray-600 max-w-2xl">
              {user.bio}
            </p>
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