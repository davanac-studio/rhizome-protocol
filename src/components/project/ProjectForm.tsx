import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ParticipantsSection } from "./ParticipantsSection";
import { useToast } from "@/components/ui/use-toast";
import { TEAM_LEADER_CONTRIBUTION } from "@/data/team-config";
import { teamMembers } from "@/data/team-members";

interface ProjectFormProps {
  onSubmit: (project: any) => void;
  onCancel: () => void;
}

export const ProjectForm = ({ onSubmit, onCancel }: ProjectFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateContributions()) {
      toast({
        title: "Erreur",
        description: "Le total des contributions ne peut pas dépasser 100%",
        variant: "destructive"
      });
      return;
    }

    const newProject = {
      ...formData,
      id: crypto.randomUUID(),
      author: {
        ...teamMembers.profile1,
        role: "Team Leader",
        contribution: teamLeaderContribution,
        contributionDescription: teamLeaderContributionDescription
      },
      participants: participants.map(p => ({
        ...teamMembers[p.profile as keyof typeof teamMembers],
        role: "Member" as const,
        contribution: p.contribution,
        contributionDescription: p.contributionDescription
      }))
    };

    onSubmit(newProject);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Créer un Nouveau Projet</h1>
        <Button variant="outline" onClick={onCancel}>Retour</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Titre</label>
          <Input
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Entrez le titre du projet"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Client</label>
          <Input
            required
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            placeholder="Nom du client"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description détaillée du projet"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Catégorie</label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Web">Web</SelectItem>
              <SelectItem value="Mobile">Mobile</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Date de publication</label>
          <Input
            type="date"
            required
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Image de couverture (URL)</label>
        <Input
          type="url"
          required
          value={formData.thumbnail}
          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
          placeholder="URL de l'image de couverture"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Lien GitHub</label>
          <Input
            type="url"
            value={formData.links.github}
            onChange={(e) => setFormData({
              ...formData,
              links: { ...formData.links, github: e.target.value }
            })}
            placeholder="URL du repository GitHub"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Lien de prévisualisation</label>
          <Input
            type="url"
            value={formData.links.preview}
            onChange={(e) => setFormData({
              ...formData,
              links: { ...formData.links, preview: e.target.value }
            })}
            placeholder="URL de prévisualisation"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Témoignage client</label>
        <Textarea
          value={formData.testimonial}
          onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
          placeholder="Témoignage du client (optionnel)"
        />
      </div>

      <ParticipantsSection
        participants={participants}
        setParticipants={setParticipants}
        teamLeaderContribution={teamLeaderContribution}
        setTeamLeaderContribution={setTeamLeaderContribution}
        teamLeaderContributionDescription={teamLeaderContributionDescription}
        setTeamLeaderContributionDescription={setTeamLeaderContributionDescription}
      />

      <Button type="submit" className="w-full">Créer le Projet</Button>
    </form>
  );
};
