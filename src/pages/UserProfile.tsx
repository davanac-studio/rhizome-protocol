import { ProfileHeader } from "@/components/ProfileHeader";
import { UserProjectsGallery } from "@/components/blocks/UserProjectsGallery";

export default function UserProfile() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <ProfileHeader />
      <UserProjectsGallery />
    </div>
  );
}
