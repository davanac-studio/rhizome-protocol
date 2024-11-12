import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ParticipantsSection } from "./ParticipantsSection";
import { useToast } from "@/components/ui/use-toast";
import { TEAM_LEADER_CONTRIBUTION } from "@/data/team-config";
import { ProjectFormFields } from "./ProjectFormFields";
import { ProjectFormData } from "@/types/form";
import { teamMembers } from "@/data/team-members";
import { useAuth } from "@/contexts/AuthContext";

interface ProjectFormProps {
  onSubmit: (project: any) => void;
  onCancel: () => void;
}

export const ProjectForm = ({ onSubmit, onCancel }: ProjectFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    dueDate: "",
    thumbnail: "",
    category: "",
    client: "",
    testimonial: "",
    links: {
      github: "",
      preview: ""
    }
  });

  const [participants, setParticipants] = useState<Array<{
    profile: string;
    contribution: number;
    contributionDescription: string;
  }>>([]);

  const [teamLeaderContribution, setTeamLeaderContribution] = useState(TEAM_LEADER_CONTRIBUTION);
  const [teamLeaderContributionDescription, setTeamLeaderContributionDescription] = useState("");

  const validateContributions = () => {
    const total = teamLeaderContribution + participants.reduce((acc, curr) => acc + curr.contribution, 0);
    return total <= 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return; // Prevent double submission
    }

    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour créer un projet",
        variant: "destructive"
      });
      return;
    }

    if (!validateContributions()) {
      toast({
        title: "Erreur",
        description: "Le total des contributions ne peut pas dépasser 100%",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const projectData = {
        ...formData,
        author: {
          contribution: teamLeaderContribution,
          contributionDescription: teamLeaderContributionDescription
        },
        participants: participants.map(p => ({
          ...teamMembers[p.profile],
          role: "Member" as const,
          contribution: p.contribution,
          contributionDescription: p.contributionDescription
        }))
      };

      await onSubmit(projectData);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Créer un Nouveau Projet</h1>
        <Button variant="outline" onClick={onCancel} type="button">Retour</Button>
      </div>

      <ProjectFormFields formData={formData} setFormData={setFormData} />

      <ParticipantsSection
        participants={participants}
        setParticipants={setParticipants}
        teamLeaderContribution={teamLeaderContribution}
        setTeamLeaderContribution={setTeamLeaderContribution}
        teamLeaderContributionDescription={teamLeaderContributionDescription}
        setTeamLeaderContributionDescription={setTeamLeaderContributionDescription}
      />

      <Button 
        type="submit" 
        disabled={isSubmitting} 
        className="w-full"
      >
        {isSubmitting ? "Création en cours..." : "Créer le Projet"}
      </Button>
    </form>
  );
};