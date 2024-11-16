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

  return (
    <Button 
      variant="ghost" 
      className="w-full p-0 h-auto hover:bg-transparent"
      onClick={handleClick}
    >
      <Card className="p-4 w-full overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="flex-shrink-0">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name ? name[0] : '?'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
              <h4 className="font-semibold text-left truncate">{name}</h4>
              {expertise && (
                <p className="text-sm text-gray-600 text-left break-words line-clamp-2">{expertise}</p>
              )}
            </div>
          </div>
          
          <div className="flex-grow overflow-hidden">
            {bio && (
              <div className="text-sm text-gray-600 text-left mb-4">
                <p className="break-words line-clamp-3">{bio}</p>
              </div>
            )}
            {!isClient && contributionDescription && (
              <div className="text-sm text-gray-600 text-left mb-4">
                <p className="break-words line-clamp-3">{contributionDescription}</p>
              </div>
            )}
          </div>

          {!isClient && contribution !== null && (
            <div className="text-left mt-2">
              <span className="text-sm text-gray-600">Contribution: {contribution}%</span>
            </div>
          )}
        </div>
      </Card>
    </Button>
  );
};