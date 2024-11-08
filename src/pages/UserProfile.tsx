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
      bannerUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
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
      role: "Journaliste",
      avatarUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      bannerUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e",
      bio: "Journaliste d'investigation spécialisé dans les nouvelles technologies et leur impact sur la société. Plus de 10 ans d'expérience dans le journalisme digital.",
      quote: "La vérité est dans les détails",
      linkedin: "https://www.linkedin.com/in/thomas-bernard"
    },
    {
      name: "Emma Dubois",
      email: "emma.dubois@example.com",
      role: "UX/UI Designer",
      avatarUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      bannerUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
      bio: "Designer créative spécialisée dans la conception d'interfaces utilisateur intuitives. Passionnée par l'expérience utilisateur et l'accessibilité.",
      quote: "La simplicité est la sophistication suprême.",
      linkedin: "https://www.linkedin.com/in/emma-dubois"
    },
    {
      name: "Lucas Petit",
      email: "lucas.petit@example.com",
      role: "Journaliste/Copy",
      avatarUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      bannerUrl: "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc",
      bio: "Journaliste et rédacteur avec une passion pour le storytelling et la création de contenu engageant. Spécialisé dans la rédaction d'articles, de scripts et de contenus marketing.",
      quote: "Les mots ont le pouvoir de changer le monde.",
      linkedin: "https://www.linkedin.com/in/lucas-petit"
    },
    {
      name: "Julie Moreau",
      email: "julie.moreau@example.com",
      role: "Relations Publiques",
      avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      bannerUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      bio: "Spécialiste en relations publiques avec une expertise dans la gestion de l'image de marque et la communication stratégique. Passionnée par la création de liens durables entre les organisations et leurs publics.",
      quote: "La communication est un pont entre les personnes.",
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
              <AspectRatio ratio={21 / 9} className="bg-muted">
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