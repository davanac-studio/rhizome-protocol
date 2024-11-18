import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { NewProjectDialog } from "@/components/NewProjectDialog";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileSocial } from "./ProfileSocial";

interface ProfileHeaderContentProps {
  user: any;
  isOwnProfile: boolean;
  onEdit: () => void;
}

export const ProfileHeaderContent = ({ 
  user, 
  isOwnProfile, 
  onEdit 
}: ProfileHeaderContentProps) => {
  return (
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

      {isOwnProfile && (
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 h-10 px-4"
            onClick={onEdit}
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
  );
};