import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ProjectForm } from "./project/ProjectForm";
import { useQueryClient } from "@tanstack/react-query";

interface NewProjectDialogProps {
  onProjectCreate: (project: any) => void;
}

export const NewProjectDialog = ({ onProjectCreate }: NewProjectDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleProjectCreate = async (project: any) => {
    onProjectCreate(project);
    setIsOpen(false);
    
    // Invalidate the projects query to force a refresh
    await queryClient.invalidateQueries({ queryKey: ['userProjects'] });
    
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
    <Button className="gap-2 bg-[#2a9d8f] hover:bg-[#2a9d8f]/90" onClick={() => setIsOpen(true)}>
      <PlusCircle className="h-5 w-5" />
      Nouveau Projet
    </Button>
  );
};