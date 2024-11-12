import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MinusCircle } from "lucide-react";
import { ParticipantSearch } from "./ParticipantSearch";

interface ParticipantFormProps {
  index: number;
  participant: {
    profile: string;
    contribution: number;
    contributionDescription: string;
  };
  onRemove: () => void;
  onChange: (field: 'profile' | 'contribution' | 'contributionDescription', value: string | number) => void;
  existingParticipants: string[];
}

export const ParticipantForm = ({
  index,
  participant,
  onRemove,
  onChange,
  existingParticipants,
}: ParticipantFormProps) => {
  return (
    <div className="space-y-2 pt-2 border-t">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Participant {index + 1}</label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
        >
          <MinusCircle className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ParticipantSearch
          value={participant.profile}
          onSelect={(profileId) => {
            onChange('profile', profileId);
          }}
          existingParticipants={existingParticipants}
        />
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="0"
            max="100"
            value={participant.contribution}
            onChange={(e) => onChange('contribution', Number(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-gray-500">%</span>
        </div>
      </div>
      <div className="mt-2">
        <label className="text-sm font-medium">Description de la contribution</label>
        <Textarea
          value={participant.contributionDescription}
          onChange={(e) => onChange('contributionDescription', e.target.value)}
          placeholder="Décrivez la contribution du participant..."
          className="mt-1"
        />
      </div>
    </div>
  );
};