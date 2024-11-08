import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, MinusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { teamMembers } from "@/data/team-members";
import { TEAM_LEADER_CONTRIBUTION } from "@/data/team-config";

interface NewProjectDialogProps {
  onProjectCreate: (project: any) => void;
}

export const NewProjectDialog = ({ onProjectCreate }: NewProjectDialogProps) => {
  const [open, setOpen] = useState(false);
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
  }>>([]);

  const [teamLeaderContribution, setTeamLeaderContribution] = useState(TEAM_LEADER_CONTRIBUTION);

  const remainingContribution = 100 - teamLeaderContribution - participants.reduce((acc, curr) => acc + curr.contribution, 0);

  const handleAddParticipant = () => {
    if (participants.length < Object.keys(teamMembers).length - 1) {
      setParticipants([...participants, { profile: "", contribution: 0 }]);
    }
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
        contribution: teamLeaderContribution
      },
      participants: participants.map(p => ({
        ...teamMembers[p.profile as keyof typeof teamMembers],
        role: "Member" as const,
        contribution: p.contribution
      }))
    };

    onProjectCreate(newProject);
    setOpen(false);
    toast({
      title: "Succès",
      description: "Projet créé avec succès !",
    });
    setFormData({
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
    setParticipants([]);
    setTeamLeaderContribution(TEAM_LEADER_CONTRIBUTION);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-5 w-5" />
          Nouveau Projet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer un Nouveau Projet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
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
                disabled={participants.length >= Object.keys(teamMembers).length - 1}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter un participant
              </Button>
              <span className="text-sm text-gray-500">
                Contribution restante: {remainingContribution}%
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full">Créer le Projet</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};