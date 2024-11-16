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
}

export const TeamMemberCard = ({
  name,
  username,
  avatar,
  contribution,
  contributionDescription,
  expertise
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
      <Card className="p-4 w-full flex flex-col hover:shadow-md transition-all duration-300">
        <div className="flex flex-col h-full">
          <div className="flex items-start space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name ? name[0] : '?'}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-left">
              <h4 className="font-semibold">{name}</h4>
              {expertise && (
                <p className="text-sm text-gray-600">{expertise}</p>
              )}
            </div>
          </div>
          
          <div className="flex-grow">
            {!isClient && contributionDescription && (
              <div className="text-sm text-gray-600 text-left mb-4 break-words whitespace-normal">
                <p>{contributionDescription}</p>
              </div>
            )}
          </div>

          {!isClient && contribution !== null && (
            <div className="text-left">
              <span className="text-sm text-gray-600">Contribution: {contribution}%</span>
            </div>
          )}
        </div>
      </Card>
    </Button>
  );
};