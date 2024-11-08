import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { projectsData } from "@/data/projects";

const UsersGallery = () => {
  const profiles = [
    {
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      role: "Développeuse Full Stack",
      avatarUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      bannerUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      bio: "Développeuse passionnée avec 3 ans d'expérience en React et Node.js."
    },
    {
      name: "Thomas Bernard",
      email: "thomas.bernard@example.com",
      role: "Chef de Projet Tech",
      avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      bannerUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e",
      bio: "Chef de projet expérimenté avec plus de 8 ans dans la gestion d'équipes tech."
    },
    {
      name: "Emma Dubois",
      email: "emma.dubois@example.com",
      role: "UX/UI Designer",
      avatarUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      bannerUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
      bio: "Designer créative spécialisée dans la conception d'interfaces utilisateur."
    },
    {
      name: "Lucas Petit",
      email: "lucas.petit@example.com",
      role: "DevOps Engineer",
      avatarUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      bannerUrl: "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc",
      bio: "Ingénieur DevOps avec expertise en CI/CD, Docker et Kubernetes."
    },
    {
      name: "Julie Moreau",
      email: "julie.moreau@example.com",
      role: "Data Scientist",
      avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      bannerUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
      bio: "Data Scientist avec une expertise en machine learning."
    }
  ];

  const getProjectCount = (userName: string) => {
    return projectsData.filter(project => {
      const isLeader = project.author.name === userName;
      const isParticipant = project.participants?.some(
        participant => participant.name === userName
      );
      return isLeader || isParticipant;
    }).length;
  };

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
            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={profile.bannerUrl}
                  alt={profile.name}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{profile.name}</CardTitle>
                  <p className="text-sm text-gray-500">{profile.role}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {getProjectCount(profile.name)} projet{getProjectCount(profile.name) > 1 ? 's' : ''}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">{profile.bio}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UsersGallery;