import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ProjectForm } from "./project/ProjectForm";

interface NewProjectDialogProps {
  onProjectCreate: (project: any) => void;
}

export const NewProjectDialog = ({ onProjectCreate }: NewProjectDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleProjectCreate = (project: any) => {
    onProjectCreate(project);
    setIsOpen(false);
    toast({
      title: "Succès",
      description: "Projet créé avec succès !",
    });
  };

  if (isOpen) {
    return (
      <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
        <ProjectForm
          onSubmit={handleProjectCreate}
          onCancel={() => setIsOpen(false)}
        />
      </div>
    );
  }

  return (
    <Button className="gap-2" onClick={() => setIsOpen(true)}>
      <PlusCircle className="h-5 w-5" />
      Nouveau Projet
    </Button>
  );
};