import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface TeamMemberCardProps {
  name: string;
  avatar: string;
  expertise: string;
  contribution: number;
  bio?: string;
  contributionDescription?: string;
}

export const TeamMemberCard = ({
  name,
  avatar,
  expertise,
  contribution,
  bio,
  contributionDescription
}: TeamMemberCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-gray-500">{expertise}</p>
          </div>
        </div>
        
        {contributionDescription && (
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Description de la contribution :</p>
            <p>{contributionDescription}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Contribution</span>
          <span className="text-sm text-gray-600">{contribution}%</span>
        </div>

        {bio && (
          <p className="text-sm text-gray-600">{bio}</p>
        )}
      </div>
    </Card>
  );
};