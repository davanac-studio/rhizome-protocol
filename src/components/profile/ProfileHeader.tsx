import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Mail, Globe, Twitter, Facebook, Linkedin } from "lucide-react";
import { EditProfileDialog } from "./EditProfileDialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const getDavanacLevel = (davanacPoints: number = 0) => {
  if (davanacPoints >= 5001) return { level: "DAVANAC Master", color: "bg-purple-500" };
  if (davanacPoints >= 1001) return { level: "DAVANAC Expert", color: "bg-blue-500" };
  return { level: "DAVANAC Initié", color: "bg-green-500" };
};

export const ProfileHeader = ({ user: initialUser }: { user: any }) => {
  const { user: currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [user, setUser] = useState(initialUser);

  const fetchUserData = async () => {
    // Fetch user data logic here
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

  const davanacLevel = getDavanacLevel(user?.davanac_points);

  return (
    <div className="relative">
      <div className="h-80 w-full overflow-hidden">
        {user?.bannerUrl ? (
          <img
            src={user.bannerUrl}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-400 to-purple-600" />
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
            <div className="flex items-center justify-center gap-2 mt-2">
              <p className="text-gray-600">{user?.expertise || "Membre Rhizome"}</p>
              <Badge className={`${davanacLevel.color} text-white`}>
                {davanacLevel.level}
              </Badge>
            </div>
            <p className="text-gray-500 mt-1">@{user?.username}</p>
            {user?.davanac_points && (
              <p className="text-sm text-purple-600 font-medium mt-1">
                {user.davanac_points} $DAVANAC
              </p>
            )}
          </div>

          <div className="flex gap-3 mt-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mail className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-5 w-5 text-gray-600" />
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
            <Card className="mt-6 p-6 w-full max-w-2xl bg-white shadow-sm">
              <p className="text-center text-gray-600">
                {user.bio}
              </p>
            </Card>
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
