import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TeamMemberCardProps {
  name: string;
  avatar: string;
  contribution: number;
  contributionDescription?: string;
}

export const TeamMemberCard = ({
  name,
  avatar,
  contribution,
  contributionDescription
}: TeamMemberCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile?name=${encodeURIComponent(name)}`);
  };

  return (
    <Button 
      variant="ghost" 
      className="w-full p-0 h-auto hover:bg-transparent"
      onClick={handleClick}
    >
      <Card className="p-4 w-full hover:shadow-md transition-all duration-300">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name ? name[0] : '?'}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{name}</h4>
            </div>
          </div>
          
          {contributionDescription && (
            <div className="text-sm text-gray-600">
              <p>{contributionDescription}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Contribution: {contribution}%</span>
          </div>
        </div>
      </Card>
    </Button>
  );
};