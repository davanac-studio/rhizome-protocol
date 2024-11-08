import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface TeamMemberCardProps {
  name: string;
  avatar: string;
  expertise: string;
  contribution: number;
  bio?: string;
}

export const TeamMemberCard = ({ name, avatar, expertise, contribution, bio }: TeamMemberCardProps) => {
  if (!name) {
    return null; // Ne rien afficher si le nom est undefined
  }

  return (
    <Link to={`/profile?name=${encodeURIComponent(name)}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{expertise}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              {bio || "Aucune bio disponible"}
            </div>
            <div className="text-sm text-gray-500">
              Contribution: {contribution}%
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};