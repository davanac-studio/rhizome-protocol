interface ProfileBannerProps {
  bannerUrl?: string;
}

export const ProfileBanner = ({ bannerUrl }: ProfileBannerProps) => {
  return (
    <div className="h-80 w-full overflow-hidden">
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600" />
      )}
    </div>
  );
};