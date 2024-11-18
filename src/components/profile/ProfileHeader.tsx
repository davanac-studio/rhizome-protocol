import { useState, useEffect } from "react";
import { EditProfileDialog } from "./EditProfileDialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ProfileBanner } from "./ProfileBanner";
import { BannerCropHandler } from "./BannerCropHandler";
import { useBannerManagement } from "./hooks/useBannerManagement";
import { ProfileHeaderContent } from "./ProfileHeaderContent";
import 'react-image-crop/dist/ReactCrop.css';

export const ProfileHeader = ({ user: initialUser }: { user: any }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { user: currentUser } = useAuth();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);
  
  const {
    isCropping,
    setIsCropping,
    handleBannerAdjust
  } = useBannerManagement(currentUser);

  const fetchUserData = async () => {
    if (!user?.username) {
      setLoading(false);
      return;
    }

    try {
      const { data: userData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', user.username);

      if (error) throw error;
      
      if (!userData || userData.length === 0) {
        toast({
          title: "Profil introuvable",
          description: "Ce profil n'existe pas",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      const profile = userData[0];
      
      setUser({
        ...profile,
        name: `${profile.first_name} ${profile.last_name}`,
        firstName: profile.first_name,
        lastName: profile.last_name,
        avatarUrl: profile.avatar_url,
        bannerUrl: profile.banner_url,
        accountType: profile.account_type,
        entreprise: profile.entreprise,
      });
      
      setIsOwnProfile(currentUser?.id === profile.id);
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
    if (!currentUser?.id) {
      setIsOwnProfile(false);
      setLoading(false);
      return;
    }

    fetchUserData();
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
      <ProfileBanner 
        bannerUrl={user.bannerUrl} 
        isOwnProfile={isOwnProfile}
        onAdjust={handleBannerAdjust}
      />
      
      <div className="container max-w-5xl mx-auto px-4">
        <ProfileHeaderContent 
          user={user}
          isOwnProfile={isOwnProfile}
          onEdit={() => setIsEditing(true)}
        />
      </div>

      {isOwnProfile && (
        <>
          <EditProfileDialog
            user={user}
            open={isEditing}
            onOpenChange={setIsEditing}
            onUpdate={handleUpdate}
          />
          <BannerCropHandler
            isOpen={isCropping}
            onOpenChange={setIsCropping}
            bannerUrl={user.bannerUrl}
            userId={currentUser?.id}
            onSuccess={(newBannerUrl) => {
              setUser(prev => ({ ...prev, bannerUrl: newBannerUrl }));
            }}
          />
        </>
      )}
    </div>
  );
};