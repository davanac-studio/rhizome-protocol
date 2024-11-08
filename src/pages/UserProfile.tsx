import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { UserProjectsGallery } from "@/components/blocks/UserProjectsGallery";
import { useEffect } from "react";

const UserProfile = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const userName = searchParams.get("name");

  // Simulation d'une base de données d'utilisateurs
  const profiles = [
    {
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      role: "Développeuse Full Stack",
      avatarUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      bio: "Développeuse passionnée avec 3 ans d'expérience en React et Node.js. Spécialisée dans la création d'applications web performantes et scalables."
    },
    {
      name: "Thomas Bernard",
      email: "thomas.bernard@example.com",
      role: "Chef de Projet Tech",
      avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      bio: "Chef de projet expérimenté avec plus de 8 ans dans la gestion d'équipes tech. Expert en méthodologies agiles et en développement de produits."
    },
    {
      name: "Emma Dubois",
      email: "emma.dubois@example.com",
      role: "UX/UI Designer",
      avatarUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      bio: "Designer créative spécialisée dans la conception d'interfaces utilisateur intuitives. Passionnée par l'expérience utilisateur et l'accessibilité."
    },
    {
      name: "Lucas Petit",
      email: "lucas.petit@example.com",
      role: "DevOps Engineer",
      avatarUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      bio: "Ingénieur DevOps avec expertise en CI/CD, Docker et Kubernetes. Focalisé sur l'automatisation et l'optimisation des processus de déploiement."
    },
    {
      name: "Julie Moreau",
      email: "julie.moreau@example.com",
      role: "Data Scientist",
      avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      bio: "Data Scientist avec une expertise en machine learning et analyse de données. Passionnée par l'IA et les projets d'innovation."
    }
  ];

  const user = profiles.find(profile => profile.name === userName) || profiles[0];

  useEffect(() => {
    if (!userName) {
      toast({
        title: "Erreur",
        description: "Aucun utilisateur spécifié",
        variant: "destructive"
      });
    }
  }, [userName, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <Link to="/users">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </Link>

        <div className="space-y-8">
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

          <div className="bg-white rounded-lg shadow-lg p-8">
            <UserProjectsGallery userName={user.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;