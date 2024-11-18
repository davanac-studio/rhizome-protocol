import { AspectRatio } from "@/components/ui/aspect-ratio";
import { decryptStorageUrl } from "@/utils/urlEncryption";

interface ProfileBannerProps {
  bannerUrl?: string;
}

export const ProfileBanner = ({ bannerUrl }: ProfileBannerProps) => {
  const decryptedUrl = bannerUrl ? decryptStorageUrl(bannerUrl) : undefined;

  return (
    <div className="w-full bg-gray-100">
      <AspectRatio ratio={16 / 9}>
        {decryptedUrl ? (
          <img
            src={decryptedUrl}
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </AspectRatio>
    </div>
  );
};