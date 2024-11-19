import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { TeamLeaderForm } from "./TeamLeaderForm";
import { ParticipantForm } from "./ParticipantForm";
import { useToast } from "@/components/ui/use-toast";

interface ParticipantsSectionProps {
  participants: Array<{
    profile: string;
    contribution: number;
    contributionDescription: string;
  }>;
  setParticipants: React.Dispatch<React.SetStateAction<Array<{
    profile: string;
    contribution: number;
    contributionDescription: string;
  }>>>;
  teamLeaderContribution: number;
  setTeamLeaderContribution: React.Dispatch<React.SetStateAction<number>>;
  teamLeaderContributionDescription: string;
  setTeamLeaderContributionDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const ParticipantsSection = ({
  participants,
  setParticipants,
  teamLeaderContribution,
  setTeamLeaderContribution,
  teamLeaderContributionDescription,
  setTeamLeaderContributionDescription
}: ParticipantsSectionProps) => {
  const { toast } = useToast();
  const remainingContribution = 100 - teamLeaderContribution - participants.reduce((acc, curr) => acc + curr.contribution, 0);

  const handleAddParticipant = () => {
    setParticipants([...participants, { profile: "", contribution: 0, contributionDescription: "" }]);
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleParticipantChange = (index: number, field: 'profile' | 'contribution' | 'contributionDescription', value: string | number) => {
    // Validate profile ID before updating
    if (field === 'profile' && typeof value === 'string' && !value.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un participant valide",
        variant: "destructive",
      });
      return;
    }

    const newParticipants = [...participants];
    newParticipants[index] = {
      ...newParticipants[index],
      [field]: value
    };
    setParticipants(newParticipants);
  };

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <TeamLeaderForm
        contribution={teamLeaderContribution}
        contributionDescription={teamLeaderContributionDescription}
        onContributionChange={setTeamLeaderContribution}
        onDescriptionChange={setTeamLeaderContributionDescription}
      />

      {participants.map((participant, index) => (
        <ParticipantForm
          key={index}
          index={index}
          participant={participant}
          onRemove={() => handleRemoveParticipant(index)}
          onChange={(field, value) => handleParticipantChange(index, field, value)}
          existingParticipants={participants.map(p => p.profile).filter((_, i) => i !== index)}
        />
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