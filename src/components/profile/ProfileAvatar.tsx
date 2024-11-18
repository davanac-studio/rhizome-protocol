import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  avatarUrl?: string;
  avatar?: string;
  firstName?: string;
  name?: string;
}

export const ProfileAvatar = ({ avatarUrl, avatar, firstName, name }: ProfileAvatarProps) => {
  const imageUrl = avatarUrl || avatar;
  const fallbackText = firstName?.charAt(0) || name?.charAt(0) || '?';

  return (
    <Avatar className="h-48 w-48 border-4 border-white shadow-lg">
      {imageUrl && <AvatarImage src={imageUrl} alt={name || "Profile"} />}
      <AvatarFallback className="text-4xl bg-gray-200 text-gray-600">
        {fallbackText}
      </AvatarFallback>
    </Avatar>
  );
};