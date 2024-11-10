import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { ProfileSocialButtons } from "./ProfileSocialButtons";
import { EditProfileDialog } from "./EditProfileDialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export const ProfileHeader = ({ user, projectCount }: { user: any, projectCount: number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user: currentUser } = useAuth();
  const [profileEmail, setProfileEmail] = useState<string | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchProfileEmail = async () => {
      try {
        const { data: userData, error } = await supabase
          .from('profiles')
          .select('email')
          .eq('username', user.username)
          .single();

        if (error) throw error;
        
        setProfileEmail(userData.email);
        setIsOwnProfile(currentUser?.email === userData.email);
        
        console.log('Current user email:', currentUser?.email);
        console.log('Profile user email:', userData.email);
        console.log('Is own profile:', currentUser?.email === userData.email);
      } catch (error) {
        console.error('Error fetching profile email:', error);
      }
    };

    if (user.username) {
      fetchProfileEmail();
    }
  }, [user.username, currentUser?.email]);

  const handleUpdate = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatarUrl || user.avatar} alt={user.name} />
          <AvatarFallback>{user.firstName?.charAt(0) || user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.firstName && user.lastName 
                ? `${user.firstName} ${user.lastName}`
                : user.name}
            </h1>
            <p className="text-gray-500">{user.role || "Membre"}</p>
            <p className="text-sm text-gray-600 mt-1">{projectCount} projet{projectCount > 1 ? 's' : ''}</p>
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

      <EditProfileDialog
        user={user}
        open={isEditing}
        onOpenChange={setIsEditing}
        onUpdate={handleUpdate}
      />
    </>
  );
};