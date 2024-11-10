import { ImageUploadField } from "./ImageUploadField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProfileImageSectionProps {
  bannerUrl: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  onFieldChange: (field: string, value: string) => void;
}

export const ProfileImageSection = ({
  bannerUrl,
  avatarUrl,
  firstName,
  lastName,
  onFieldChange,
}: ProfileImageSectionProps) => {
  return (
    <div className="space-y-4">
      <ImageUploadField
        label="Image de bannière"
        value={bannerUrl}
        onChange={(value) => onFieldChange("bannerUrl", value)}
        type="banner"
      />

      {bannerUrl && (
        <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-lg">
          <img
            src={bannerUrl}
            alt="Banner preview"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      )}

      <ImageUploadField
        label="Avatar"
        value={avatarUrl}
        onChange={(value) => onFieldChange("avatarUrl", value)}
        type="avatar"
      />
      
      {avatarUrl && (
        <div className="flex justify-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarUrl} alt="Avatar preview" />
            <AvatarFallback>
              {firstName.charAt(0)}{lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};