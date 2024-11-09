import { Link } from "react-router-dom";
import { UserCircle2, Users } from "lucide-react";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <nav className="bg-gray-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Project Pulse
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;