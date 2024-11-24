import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ProjectForm } from "./project/ProjectForm";
import { useQueryClient } from "@tanstack/react-query";
import { createProject } from "@/lib/projects";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const NewProjectDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProjectCreate = async (projectData: any) => {
    if (isSubmitting) return; // Prevent double submission
    
    try {
      setIsSubmitting(true);
      
      if (!user) {
        throw new Error("Vous devez être connecté pour créer un projet");
      }

      const projectToCreate = {
        ...projectData,
        links: {
          demo_link_1: projectData.links?.demo_link_1 || "",
          preview: projectData.links?.preview || "",
        },
        author: {
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
          username: user.email?.split('@')[0] || '',
          avatar: user.user_metadata?.avatar_url,
          expertise: user.user_metadata?.expertise || '',
          role: "Team Leader" as const,
          contribution: projectData.author?.contribution || 0,
          contributionDescription: projectData.author?.contributionDescription || ""
        },
        participants: projectData.participants || []
      };

      const newProject = await createProject(projectToCreate);
      
      queryClient.setQueryData(['userProjects', user.id], (oldData: any) => {
        if (!oldData) return [newProject];
        return [...oldData, newProject];
      });

      setIsOpen(false);
      toast({
        title: "Succès",
        description: "Projet créé avec succès !",
      });
      
      navigate(`/project/${newProject.id}`);
    } catch (error: any) {
      console.error("Erreur lors de la création du projet:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création du projet",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
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