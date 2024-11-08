import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileSocialButtons } from "./ProfileSocialButtons";

export const ProfileHeader = ({ user, projectCount }: { user: any, projectCount: number }) => (
  <div className="flex items-center gap-6 mb-8">
    <Avatar className="h-24 w-24">
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex items-start gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
        <p className="text-gray-500">{user.role}</p>
        <p className="text-sm text-gray-600 mt-1">{projectCount} projet{projectCount > 1 ? 's' : ''}</p>
      </div>
      <ProfileSocialButtons user={user} />
    </div>
  </div>
);