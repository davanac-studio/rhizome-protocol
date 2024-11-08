import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    avatarUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici nous simulons la création d'un compte
    // Dans une vraie application, cela devrait être connecté à une API
    toast({
      title: "Compte créé avec succès",
      description: "Bienvenue sur Project Pulse !",
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Créer un compte</h2>
        <p className="text-muted-foreground mt-2">
          Rejoignez Project Pulse pour gérer vos projets
        </p>
      </div>

      <div className="flex justify-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={formData.avatarUrl} />
          <AvatarFallback>
            {formData.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">URL de l'avatar</label>
          <Input
            type="url"
            value={formData.avatarUrl}
            onChange={(e) =>
              setFormData({ ...formData, avatarUrl: e.target.value })
            }
            placeholder="https://exemple.com/avatar.jpg"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Nom d'utilisateur</label>
          <Input
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="Votre nom d'utilisateur"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Mot de passe</label>
          <Input
            required
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Votre mot de passe"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Bio</label>
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Parlez-nous de vous"
            className="h-24"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Créer mon compte
      </Button>
    </form>
  );
};

export default SignUpForm;