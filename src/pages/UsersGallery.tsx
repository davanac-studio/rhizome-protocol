import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const UsersGallery = () => {
  // Utilisation des profils existants depuis UserProfile.tsx
  const profiles = [
    {
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      role: "Développeuse Full Stack",
      avatarUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      bio: "Développeuse passionnée avec 3 ans d'expérience en React et Node.js."
    },
    {
      name: "Thomas Bernard",
      email: "thomas.bernard@example.com",
      role: "Chef de Projet Tech",
      avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      bio: "Chef de projet expérimenté avec plus de 8 ans dans la gestion d'équipes tech."
    },
    {
      name: "Emma Dubois",
      email: "emma.dubois@example.com",
      role: "UX/UI Designer",
      avatarUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      bio: "Designer créative spécialisée dans la conception d'interfaces utilisateur."
    },
    {
      name: "Lucas Petit",
      email: "lucas.petit@example.com",
      role: "DevOps Engineer",
      avatarUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      bio: "Ingénieur DevOps avec expertise en CI/CD, Docker et Kubernetes."
    },
    {
      name: "Julie Moreau",
      email: "julie.moreau@example.com",
      role: "Data Scientist",
      avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      bio: "Data Scientist avec une expertise en machine learning."
    }
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Utilisateurs de la plateforme</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <Link 
            key={profile.email} 
            to={`/profile?name=${encodeURIComponent(profile.name)}`}
            className="hover:no-underline"
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{profile.name}</CardTitle>
                  <p className="text-sm text-gray-500">{profile.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-2">{profile.bio}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UsersGallery;