import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ParticipantsSection } from "./ParticipantsSection";
import { useToast } from "@/components/ui/use-toast";
import { TEAM_LEADER_CONTRIBUTION } from "@/data/team-config";
import { ProjectFormFields } from "./ProjectFormFields";
import { ProjectFormData } from "@/types/form";
import { useAuth } from "@/contexts/AuthContext";

interface ProjectFormProps {
  onSubmit: (project: any) => void;
  onCancel: () => void;
  initialData?: ProjectFormData;
  initialParticipants?: Array<{
    profile: string;
    contribution: number;
    contributionDescription: string;
  }>;
  initialTeamLeaderContribution?: number;
  initialTeamLeaderContributionDescription?: string;
}

export const ProjectForm = ({ 
  onSubmit, 
  onCancel,
  initialData,
  initialParticipants = [],
  initialTeamLeaderContribution = TEAM_LEADER_CONTRIBUTION,
  initialTeamLeaderContributionDescription = ""
}: ProjectFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>(initialData || {
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
  }>>(initialParticipants);

  const [teamLeaderContribution, setTeamLeaderContribution] = useState(initialTeamLeaderContribution);
  const [teamLeaderContributionDescription, setTeamLeaderContributionDescription] = useState(initialTeamLeaderContributionDescription);

  const validateContributions = () => {
    const total = teamLeaderContribution + participants.reduce((acc, curr) => acc + curr.contribution, 0);
    return total <= 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) {
      return;
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
          profile: p.profile,
          contribution: p.contribution,
          contributionDescription: p.contributionDescription
        }))
      };

      await onSubmit(projectData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {initialData ? "Modifier le Projet" : "Créer un Nouveau Projet"}
        </h1>
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
        {isSubmitting ? "Enregistrement en cours..." : (initialData ? "Enregistrer les Modifications" : "Créer le Projet")}
      </Button>
    </form>
  );
};