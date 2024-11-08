import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FormField } from "./FormField";

interface ImageFieldsProps {
  avatarUrl: string;
  bannerUrl: string;
  firstName: string;
  lastName: string;
  onAvatarChange: (value: string) => void;
  onBannerChange: (value: string) => void;
}

export const ImageFields = ({
  avatarUrl,
  bannerUrl,
  firstName,
  lastName,
  onAvatarChange,
  onBannerChange
}: ImageFieldsProps) => (
  <div className="space-y-6">
    {bannerUrl && (
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src={bannerUrl}
          alt="Banner"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    )}
    
    <div className="flex justify-center">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>
          {firstName.charAt(0)}{lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>

    <FormField label="Image de bannière" required>
      <Input
        type="url"
        required
        value={bannerUrl}
        onChange={(e) => onBannerChange(e.target.value)}
        placeholder="https://exemple.com/banniere.jpg"
      />
    </FormField>

    <FormField label="URL de l'avatar" required>
      <Input
        type="url"
        required
        value={avatarUrl}
        onChange={(e) => onAvatarChange(e.target.value)}
        placeholder="https://exemple.com/avatar.jpg"
      />
    </FormField>
  </div>
);