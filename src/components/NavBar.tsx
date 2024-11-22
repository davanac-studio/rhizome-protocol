import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";

const NavBar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="font-bold">
          Rhizome Protocol
        </Link>
        
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <>
              <Link to={`/profile/${user.user_metadata?.username || user.id}`}>
                <Button variant="ghost">Mon profil</Button>
              </Link>
              <Button variant="ghost" onClick={signOut}>
                Se déconnecter
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Se connecter</Button>
              </Link>
              <Link to="/signup">
                <Button>S'inscrire</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;