import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BannerAdjustButton } from "./BannerAdjustButton";

interface ProfileBannerProps {
  bannerUrl?: string;
  isOwnProfile?: boolean;
  onAdjust?: () => void;
}

export const ProfileBanner = ({ bannerUrl, isOwnProfile, onAdjust }: ProfileBannerProps) => {
  return (
    <div className="relative w-full h-[300px] bg-gray-100 overflow-hidden">
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt="Profile banner"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200" />
      )}
      
      {isOwnProfile && bannerUrl && onAdjust && (
        <BannerAdjustButton onClick={onAdjust} />
      )}
    </div>
  );
};