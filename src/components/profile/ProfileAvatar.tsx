import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { decryptStorageUrl } from "@/utils/urlEncryption";

interface ProfileAvatarProps {
  avatarUrl?: string;
  avatar?: string;
  name?: string;
}

export const ProfileAvatar = ({ avatarUrl, avatar, name }: ProfileAvatarProps) => {
  const imageUrl = avatarUrl || avatar;
  const decryptedUrl = imageUrl ? decryptStorageUrl(imageUrl) : undefined;
  const initials = name?.split(' ').map(n => n[0]).join('') || '?';

  return (
    <Avatar className="h-48 w-48 border-4 border-white shadow-lg">
      <AvatarImage 
        src={decryptedUrl} 
        alt={name || "Profile"} 
        className="object-cover"
      />
      <AvatarFallback className="text-4xl">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};