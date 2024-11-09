import { Link, useNavigate } from "react-router-dom";
import { UserCircle2, Users, Home, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { NewProjectDialog } from "./NewProjectDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

const NavBar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateProject = (project: any) => {
    console.log("Nouveau projet créé:", project);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur Rhizome Protocol !",
    });
    navigate("/login");
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
            <Link to="/users">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Users className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <UserCircle2 className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/signup">
              <Button variant="outline" className="hover:bg-gray-100">
                Créer un profil
              </Button>
            </Link>
            <NewProjectDialog onProjectCreate={handleCreateProject} />
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;