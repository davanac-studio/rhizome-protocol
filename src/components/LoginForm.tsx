import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase";
import { FormField } from "./signup/FormField";

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur Project Pulse !",
        });
        navigate("/profile");
      }
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Connexion</h2>
        <p className="text-muted-foreground mt-2">
          Connectez-vous à votre compte Project Pulse
        </p>
      </div>

      <div className="space-y-4">
        <FormField label="Email" required>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            required
          />
        </FormField>

        <FormField label="Mot de passe" required>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => handleFieldChange("password", e.target.value)}
            required
          />
        </FormField>
      </div>

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1" 
          onClick={() => navigate("/signup")}
          disabled={loading}
        >
          Créer un compte
        </Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;