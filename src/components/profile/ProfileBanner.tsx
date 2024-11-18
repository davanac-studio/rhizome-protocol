import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProfileBannerProps {
  bannerUrl?: string;
}

export const ProfileBanner = ({ bannerUrl }: ProfileBannerProps) => {
  return (
    <div className="w-full bg-gray-100">
      <AspectRatio ratio={16 / 9}>
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            Modifier la bannière
          </div>
        )}
      </AspectRatio>
    </div>
  );
};