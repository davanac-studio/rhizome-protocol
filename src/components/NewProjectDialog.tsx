import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectStatus } from "@/types/project";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NewProjectDialogProps {
  onProjectCreate: (project: any) => void;
}

export const NewProjectDialog = ({ onProjectCreate }: NewProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    status: "Planning" as ProjectStatus,
    dueDate: "",
    client: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      ...formData,
      id: crypto.randomUUID(),
      progress: 0,
    };
    onProjectCreate(newProject);
    setOpen(false);
    toast({
      title: "Succès",
      description: "Projet créé avec succès !",
    });
    setFormData({
      title: "",
      shortDescription: "",
      description: "",
      status: "Planning",
      dueDate: "",
      client: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-5 w-5" />
          Nouveau Projet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un Nouveau Projet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
            <label className="text-sm font-medium">Description courte</label>
            <Input
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Entrez une brève description du projet"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description longue</label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Entrez la description détaillée du projet"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Client</label>
            <Input
              required
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              placeholder="Entrez le nom du client"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Statut</label>
            <Select
              value={formData.status}
              onValueChange={(value: ProjectStatus) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Planning">Planification</SelectItem>
                <SelectItem value="In Progress">En cours</SelectItem>
                <SelectItem value="On Hold">En pause</SelectItem>
                <SelectItem value="Completed">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date d'échéance</label>
            <Input
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full">Créer le Projet</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};