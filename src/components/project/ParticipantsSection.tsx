import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teamMembers } from "@/data/team-members";
import { PlusCircle, MinusCircle } from "lucide-react";

interface ParticipantsSectionProps {
  participants: Array<{
    profile: string;
    contribution: number;
  }>;
  setParticipants: React.Dispatch<React.SetStateAction<Array<{
    profile: string;
    contribution: number;
  }>>>;
  teamLeaderContribution: number;
  setTeamLeaderContribution: React.Dispatch<React.SetStateAction<number>>;
}

export const ParticipantsSection = ({
  participants,
  setParticipants,
  teamLeaderContribution,
  setTeamLeaderContribution
}: ParticipantsSectionProps) => {
  const remainingContribution = 100 - teamLeaderContribution - participants.reduce((acc, curr) => acc + curr.contribution, 0);

  const handleAddParticipant = () => {
    setParticipants([...participants, { profile: "", contribution: 0 }]);
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleParticipantChange = (index: number, field: 'profile' | 'contribution', value: string | number) => {
    const newParticipants = [...participants];
    newParticipants[index] = {
      ...newParticipants[index],
      [field]: value
    };
    setParticipants(newParticipants);
  };

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Team Leader (Sophie Martin)</label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="0"
            max="100"
            value={teamLeaderContribution}
            onChange={(e) => setTeamLeaderContribution(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-gray-500">% contribution</span>
        </div>
      </div>

      {participants.map((participant, index) => (
        <div key={index} className="space-y-2 pt-2 border-t">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Participant {index + 1}</label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveParticipant(index)}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={participant.profile}
              onValueChange={(value) => handleParticipantChange(index, 'profile', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un participant" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(teamMembers)
                  .filter(([key]) => key !== 'profile1' && 
                    !participants.some(p => p.profile === key && p !== participant))
                  .map(([key, member]) => (
                    <SelectItem key={key} value={key}>
                      {member.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max={100 - teamLeaderContribution}
                value={participant.contribution}
                onChange={(e) => handleParticipantChange(index, 'contribution', Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleAddParticipant}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Ajouter un participant
        </Button>
        <span className="text-sm text-gray-500">
          Contribution restante: {remainingContribution}%
        </span>
      </div>
    </div>
  );
};