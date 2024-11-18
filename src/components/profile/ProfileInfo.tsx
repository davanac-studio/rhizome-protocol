interface ProfileInfoProps {
  firstName?: string;
  lastName?: string;
  name?: string;
  username?: string;
  accountType?: string;
  entreprise?: string;
}

export const ProfileInfo = ({
  firstName,
  lastName,
  name,
  username,
  accountType,
  entreprise
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
      <p className="text-gray-500 mt-1">{username}</p>
    </div>
  );
};