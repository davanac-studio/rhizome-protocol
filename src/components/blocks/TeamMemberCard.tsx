import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProjectMember } from "@/types/project";

interface TeamMemberCardProps {
  member: ProjectMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-gray-600">
              <Avatar className="w-12 h-12">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{member.name}</span>
                  <span className="text-sm text-gray-500">{member.contribution}%</span>
                </div>
                <div className="text-sm text-gray-500">{member.expertise}</div>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{member.role}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};