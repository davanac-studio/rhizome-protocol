import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { UserProjectsGallery } from "@/components/blocks/UserProjectsGallery";
import { useEffect } from "react";
import { projectsData } from "@/data/projects";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const UserProfile = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const userName = searchParams.get("name");

  const profiles = [
    {
      name: "Sophie Martin",
      firstName: "Sophie",
      lastName: "Martin",
      username: "sophiemartin",
      email: "sophie.martin@example.com",
      role: "Développeuse Full Stack",
      avatarUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      bannerUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
      bio: "Développeuse passionnée avec 3 ans d'expérience en React et Node.js. Spécialisée dans la création d'applications web performantes et scalables.",
      quote: "Le code est poésie en mouvement",
      linkedin: "https://www.linkedin.com/in/sophie-martin",
      github: "https://github.com/sophiemartin",
      youtube: "https://youtube.com/@sophiemartin",
      spotify: "https://open.spotify.com/user/sophiemartin",
      instagram: "https://instagram.com/sophiemartin",
      facebook: "https://facebook.com/sophiemartin"
    },
    {
      name: "Thomas Bernard",
      email: "thomas.bernard@example.com",
      role: "Chef de Projet Tech",
      avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      bio: "Chef de projet expérimenté avec plus de 8 ans dans la gestion d'équipes tech. Expert en méthodologies agiles et en développement de produits.",
      quote: "La technologie doit faciliter la vie.",
      linkedin: "https://www.linkedin.com/in/thomas-bernard"
    },
    {
      name: "Emma Dubois",
      email: "emma.dubois@example.com",
      role: "UX/UI Designer",
      avatarUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      bio: "Designer créative spécialisée dans la conception d'interfaces utilisateur intuitives. Passionnée par l'expérience utilisateur et l'accessibilité.",
      quote: "La simplicité est la sophistication suprême.",
      linkedin: "https://www.linkedin.com/in/emma-dubois"
    },
    {
      name: "Lucas Petit",
      email: "lucas.petit@example.com",
      role: "DevOps Engineer",
      avatarUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      bio: "Ingénieur DevOps avec expertise en CI/CD, Docker et Kubernetes. Focalisé sur l'automatisation et l'optimisation des processus de déploiement.",
      quote: "L'automatisation est la clé de l'efficacité.",
      linkedin: "https://www.linkedin.com/in/lucas-petit"
    },
    {
      name: "Julie Moreau",
      email: "julie.moreau@example.com",
      role: "Data Scientist",
      avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      bio: "Data Scientist avec une expertise en machine learning et analyse de données. Passionnée par l'IA et les projets d'innovation.",
      quote: "Les données parlent, écoutez-les.",
      linkedin: "https://www.linkedin.com/in/julie-moreau"
    }
  ];

  const user = profiles.find(profile => profile.name === userName) || profiles[0];

  const projectCount = projectsData.filter(project => {
    const isLeader = project.author.name === user.name;
    const isParticipant = project.participants?.some(
      participant => participant.name === user.name
    );
    return isLeader || isParticipant;
  }).length;

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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {user.bannerUrl && (
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={user.bannerUrl}
                  alt="Banner"
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            )}
            <div className="p-8">
              <ProfileHeader user={user} projectCount={projectCount} />
              <ProfileContent user={user} />
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