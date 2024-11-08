import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  // Note: Ces données seraient normalement récupérées depuis un état global ou une API
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Producteur Vidéo",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Producteur vidéo passionné avec plus de 5 ans d'expérience dans la création de contenu digital."
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-6 mb-8">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">{user.role}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Email</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Bio</h2>
              <p className="text-gray-600">{user.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;