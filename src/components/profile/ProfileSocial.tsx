import { ProfileSocialButtons } from "./ProfileSocialButtons";

interface ProfileSocialProps {
  user: any;
}

export const ProfileSocial = ({ user }: ProfileSocialProps) => {
  return (
    <div className="flex gap-3 mt-4">
      <ProfileSocialButtons user={user} />
    </div>
  );
};