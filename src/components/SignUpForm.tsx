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
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    quote: "",
    avatarUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Compte créé avec succès",
      description: "Bienvenue sur Project Pulse !",
    });
    navigate("/");
  };

  const handleCancel = () => {
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
            {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Prénom</label>
            <Input
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="Votre prénom"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Nom</label>
            <Input
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Votre nom"
            />
          </div>
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

        <div>
          <label className="text-sm font-medium">Citation</label>
          <Input
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            placeholder="Votre citation préférée"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
          Créer mon compte
        </Button>
        <Button type="button" variant="outline" className="flex-1" onClick={handleCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
