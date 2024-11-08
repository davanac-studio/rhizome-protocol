import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProjectMember } from "@/types/project";
import { useNavigate } from "react-router-dom";

interface TeamMemberCardProps {
  member: ProjectMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile?name=${encodeURIComponent(member.name)}`);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
      <Avatar className="w-12 h-12 cursor-pointer" onClick={handleProfileClick}>
        <AvatarImage src={member.avatar} alt={member.name} />
        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold">{member.name}</h4>
        <p className="text-sm text-gray-600">{member.expertise}</p>
        <p className="text-sm text-gray-500">{member.role}</p>
      </div>
      <div className="ml-auto">
        <span className="text-sm font-medium text-blue-600">
          {member.contribution}%
        </span>
      </div>
    </div>
  );
};