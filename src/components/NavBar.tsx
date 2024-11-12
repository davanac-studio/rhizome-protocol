import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserCircle2, Home, LogOut, Users } from "lucide-react";
import { Button } from "./ui/button";
import { NewProjectDialog } from "./NewProjectDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase";

const NavBar = () => {
  const { user, clearSession } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleLogout = async () => {
    clearSession();
    await supabase.auth.signOut().catch((error) => {
      console.error("Erreur Supabase lors de la déconnexion:", error);
    });
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate("/");
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

  const getProfilePath = () => {
    if (!user) return "/auth";
    const username = user.user_metadata?.username || user.user_metadata?.preferred_username || user.id;
    return `/profile/${username}`;
  };

  return (
    <nav className="bg-gray-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-900 hover:text-gray-700">
              <Home className="h-6 w-6" />
            </Link>
            {!isHomePage && (
              <>
                <Link to="/about" className="text-gray-900 hover:text-gray-700">
                  Comment ça marche ?
                </Link>
                <Link to="/users" className="text-gray-900 hover:text-gray-700 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Communauté
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to={getProfilePath()}>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100" title="Voir mon profil">
                    <UserCircle2 className="h-5 w-5" />
                  </Button>
                </Link>
                <NewProjectDialog />
                <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={handleLogout}>
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