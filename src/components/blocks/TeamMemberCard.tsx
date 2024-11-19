import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TeamMemberCardProps {
  name: string;
  username: string;
  avatar: string;
  contribution: number | null;
  contributionDescription?: string;
  expertise?: string;
  bio?: string;
}

export const TeamMemberCard = ({
  name,
  username,
  avatar,
  contribution,
  contributionDescription,
  expertise,
  bio
}: TeamMemberCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${encodeURIComponent(username)}`);
  };

  const isClient = expertise === "Client";
  const isCollective = expertise === "Collectif";
  const fallbackText = name ? name[0] : '?';

  return (
    <Button 
      variant="ghost" 
      className="w-full p-0 h-auto hover:bg-transparent"
      onClick={handleClick}
    >
      <Card className="p-4 w-full">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="flex-shrink-0">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback className="bg-gray-200 text-gray-600">{fallbackText}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            {isCollective ? (
              <>
                <h4 className="font-semibold text-left whitespace-normal break-words">{name}</h4>
                <p className="text-sm text-gray-600 text-left whitespace-normal break-words">@{username}</p>
              </>
            ) : (
              <>
                <h4 className="font-semibold text-left whitespace-normal break-words">{name}</h4>
                <p className="text-sm text-gray-600 text-left whitespace-normal break-words">@{username}</p>
                {expertise && !isClient && (
                  <p className="text-sm text-gray-600 text-left whitespace-normal break-words">{expertise}</p>
                )}
              </>
            )}
          </div>
        </div>
        
        {bio && (
          <div className="text-sm text-gray-600 text-left mb-4">
            <p className="whitespace-normal break-words">{bio}</p>
          </div>
        )}
        
        {!isClient && contributionDescription && (
          <div className="text-sm text-gray-600 text-left mb-4">
            <p className="whitespace-normal break-words">{contributionDescription}</p>
          </div>
        )}

        {!isClient && contribution !== null && (
          <div className="text-left mt-2 pt-2 border-t">
            <span className="text-sm text-gray-600">Contribution: {contribution}%</span>
          </div>
        )}
      </Card>
    </Button>
  );
};