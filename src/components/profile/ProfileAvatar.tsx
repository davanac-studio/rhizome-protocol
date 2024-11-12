import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  avatarUrl?: string;
  avatar?: string;
  firstName?: string;
  name?: string;
}

export const ProfileAvatar = ({ avatarUrl, avatar, firstName, name }: ProfileAvatarProps) => {
  return (
    <Avatar className="h-48 w-48 border-4 border-white shadow-lg">
      <AvatarImage src={avatarUrl || avatar} alt={name} />
      <AvatarFallback className="text-4xl">
        {firstName?.charAt(0) || name?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};