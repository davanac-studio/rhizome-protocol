import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserCircle2, LogOut, Users, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <Link to="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
              Rhizome Protocol
            </Link>
            {!isHomePage && (
              <Link to="/about" className="text-gray-900 hover:text-gray-700">
                Manifesto
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <UserCircle2 className="h-5 w-5" />
                    <span className="hidden sm:inline">Mon compte</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to={getProfilePath()} className="flex items-center gap-2">
                      <UserCircle2 className="h-4 w-4" />
                      Mon profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/users" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Communauté
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="h-4 w-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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