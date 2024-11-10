import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { NewProjectDialog } from "./NewProjectDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase";

const NavBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateProject = (project: any) => {
    console.log("Nouveau projet créé:", project);
  };

  const handleNewProjectClick = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour créer un nouveau projet.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear all auth related data
      localStorage.clear();
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });

      // Force a page reload to clear all states
      window.location.href = '/';
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-gray-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-900 hover:text-gray-700">
              <Home className="h-6 w-6" />
            </Link>
            <Link to="/about" className="text-gray-900 hover:text-gray-700">
              Comment ça marche ?
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <NewProjectDialog onProjectCreate={handleCreateProject} />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="hover:bg-gray-100">
                  Se connecter
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;