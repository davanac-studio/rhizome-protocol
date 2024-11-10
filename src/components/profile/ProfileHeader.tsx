import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileSocialButtons } from "./ProfileSocialButtons";

export const ProfileHeader = ({ user, projectCount }: { user: any, projectCount: number }) => (
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
      <ProfileSocialButtons user={user} />
    </div>
  </div>
);