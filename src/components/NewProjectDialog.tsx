import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    dueDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      ...formData,
      id: crypto.randomUUID(),
      progress: 0,
      status: "Planning" as ProjectStatus,
      author: {
        name: "John Doe", // À remplacer par l'utilisateur connecté
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
        role: "Team Leader"
      }
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
      dueDate: "",
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
            <label className="text-sm font-medium">Date de publication</label>
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