interface ProfileInfoProps {
  firstName?: string;
  lastName?: string;
  name?: string;
  username?: string;
  accountType?: string;
  entreprise?: string;
  expertise?: string;
}

export const ProfileInfo = ({
  firstName,
  lastName,
  name,
  username,
  accountType,
  entreprise,
  expertise
}: ProfileInfoProps) => {
  return (
    <div className="text-center mt-4">
      <h1 className="text-2xl font-bold text-gray-900">
        {accountType === 'entreprise' ? (
          entreprise
        ) : (
          firstName && lastName ? `${firstName} ${lastName}` : name
        )}
      </h1>
      <p className="text-gray-500 mt-1">@{username}</p>
      {accountType === 'particulier' && expertise && (
        <p className="text-gray-600 mt-2 font-medium">{expertise}</p>
      )}
    </div>
  );
};