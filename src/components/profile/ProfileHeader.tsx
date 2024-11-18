import { useState, useEffect, useRef } from "react";
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
import { ImageCropDialog } from "./ImageCropDialog";
import { Crop } from 'react-image-crop';

export const ProfileHeader = ({ user: initialUser }: { user: any }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const { user: currentUser } = useAuth();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0
  });
  const [uploading, setUploading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const fetchUserData = async () => {
    if (!user?.username) {
      console.log('No username found for profile');
      setLoading(false);
      return;
    }

    try {
      const { data: userData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', user.username);

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger le profil",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      if (!userData || userData.length === 0) {
        toast({
          title: "Profil introuvable",
          description: "Ce profil n'existe pas",
          variant: "destructive",
        });
        navigate('/'); // Redirect to home page
        return;
      }

      const profile = userData[0]; // Get the first result since we know it exists
      
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
      
      // Vérifier si l'utilisateur connecté est le propriétaire du profil
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
    const checkProfileOwnership = async () => {
      if (!currentUser?.id) {
        setIsOwnProfile(false);
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

  const handleBannerAdjust = () => {
    if (user.bannerUrl) {
      setPreviewUrl(user.bannerUrl);
      setIsCropping(true);
    }
  };

  const handleCropComplete = async () => {
    if (!imgRef.current || !crop || !previewUrl) return;

    setUploading(true);
    try {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      const pixelRatio = window.devicePixelRatio;
      
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        imgRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      // Convert the canvas to a blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => resolve(blob as Blob),
          'image/jpeg',
          0.95
        );
      });

      // Upload to Supabase Storage
      const fileName = `banner-${Date.now()}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(fileName);

      // Update profile with new banner URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ banner_url: publicUrl })
        .eq('id', currentUser?.id);

      if (updateError) throw updateError;

      // Update local state
      setUser(prev => ({ ...prev, bannerUrl: publicUrl }));
      
      toast({
        title: "Bannière mise à jour",
        description: "Votre photo de couverture a été mise à jour avec succès.",
      });
    } catch (error: any) {
      console.error('Error updating banner:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de la bannière.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setIsCropping(false);
    }
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
        <div className="relative -mt-24 mb-6 flex flex-col items-center">
          <ProfileAvatar
            avatarUrl={user?.avatarUrl}
            avatar={user?.avatar}
            name={user?.name}
          />
          
          <ProfileInfo
            firstName={user?.firstName}
            lastName={user?.lastName}
            name={user?.name}
            username={user?.username}
            accountType={user?.accountType}
            entreprise={user?.entreprise}
          />

          <ProfileSocial user={user} />

          {user?.bio && (
            <Card className="mt-6 p-6 w-full max-w-2xl bg-white shadow-sm">
              <p className="text-center text-gray-600 italic">
                {user.bio}
              </p>
            </Card>
          )}

          {currentUser && isOwnProfile && (
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10 px-4"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
                Modifier le profil
              </Button>
              <div className="h-10">
                <NewProjectDialog />
              </div>
            </div>
          )}
        </div>
      </div>

      {isOwnProfile && (
        <>
          <EditProfileDialog
            user={user}
            open={isEditing}
            onOpenChange={setIsEditing}
            onUpdate={handleUpdate}
          />
          <ImageCropDialog
            open={isCropping}
            onOpenChange={setIsCropping}
            previewUrl={previewUrl}
            crop={crop}
            onCropChange={setCrop}
            onConfirm={handleCropComplete}
            uploading={uploading}
            aspectRatio={16/9}
            imgRef={imgRef}
          />
        </>
      )}
    </div>
  );
};
