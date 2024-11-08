import { Link } from "react-router-dom";
import { House, UserCircle2 } from "lucide-react";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <House className="h-5 w-5" />
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <UserCircle2 className="h-5 w-5" />
            </Button>
            
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