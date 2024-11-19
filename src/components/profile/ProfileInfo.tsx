interface ProfileInfoProps {
  firstName?: string;
  lastName?: string;
  name?: string;
  username?: string;
  accountType?: string;
  expertise?: string;
  collectif?: string;
}

export const ProfileInfo = ({
  firstName,
  lastName,
  name,
  username,
  accountType,
  expertise,
  collectif
}: ProfileInfoProps) => {
  return (
    <div className="text-center mt-4">
      {accountType === 'collectif' ? (
        <>
          <h1 className="text-2xl font-bold text-gray-900">
            {collectif}
          </h1>
          <p className="text-gray-500 mt-1">@{username}</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-900">
            {firstName && lastName ? `${firstName} ${lastName}` : name}
          </h1>
          <p className="text-gray-500 mt-1">@{username}</p>
          {expertise && (
            <p className="text-gray-600 mt-2 font-medium">{expertise}</p>
          )}
        </>
      )}
    </div>
  );
};