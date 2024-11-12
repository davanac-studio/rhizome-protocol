interface ProfileInfoProps {
  firstName?: string;
  lastName?: string;
  name?: string;
  expertise?: string;
  username?: string;
}

export const ProfileInfo = ({ firstName, lastName, name, expertise, username }: ProfileInfoProps) => {
  return (
    <div className="mt-4 text-center">
      <h1 className="text-3xl font-bold text-gray-900">
        {firstName && lastName 
          ? `${firstName} ${lastName}`
          : name}
      </h1>
      <p className="text-gray-600 mt-1">{expertise || "News Producer"}</p>
      <p className="text-gray-500 mt-1">@{username}</p>
    </div>
  );
};