import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ProjectForm } from "./project/ProjectForm";
import { useQueryClient } from "@tanstack/react-query";
import { createProject } from "@/lib/projects";
import { useAuth } from "@/contexts/AuthContext";

export const NewProjectDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const handleProjectCreate = async (projectData: any) => {
    try {
      const newProject = await createProject(projectData);
      setIsOpen(false);
      await queryClient.invalidateQueries({ queryKey: ['userProjects'] });
      toast({
        title: "Succès",
        description: "Projet créé avec succès !",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création du projet",
        variant: "destructive",
      });
    }
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
    <Button 
      className="gap-2 bg-[#2a9d8f] hover:bg-[#2a9d8f]/90" 
      onClick={() => setIsOpen(true)}
    >
      <PlusCircle className="h-5 w-5" />
      Nouveau Projet
    </Button>
  );
};