/**
 * Component: TeamLeaderForm
 * Description: Form for managing team leader information and contributions.
 * 
 * @param {Object} props - Component properties
 * @param {number} props.contribution - Team leader's contribution percentage
 * @param {string} props.contributionDescription - Description of team leader's contribution
 * @param {Function} props.onContributionChange - Handler for contribution changes
 * @param {Function} props.onDescriptionChange - Handler for description changes
 * @returns {JSX.Element} Team leader form section
 */
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";

interface TeamLeaderFormProps {
  contribution: number;
  contributionDescription: string;
  onContributionChange: (value: number) => void;
  onDescriptionChange: (value: string) => void;
}

export const TeamLeaderForm = ({
  contribution,
  contributionDescription,
  onContributionChange,
  onDescriptionChange,
}: TeamLeaderFormProps) => {
  const { user } = useAuth();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Team Leader ({user?.user_metadata?.first_name} {user?.user_metadata?.last_name})
      </label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="0"
          max="100"
          value={contribution}
          onChange={(e) => onContributionChange(Number(e.target.value))}
          className="w-24"
        />
        <span className="text-sm text-gray-500">% contribution</span>
      </div>
      <div className="mt-2">
        <label className="text-sm font-medium">Description de la contribution</label>
        <Textarea
          value={contributionDescription}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Décrivez la contribution du team leader..."
          className="mt-1"
        />
      </div>
    </div>
  );
};