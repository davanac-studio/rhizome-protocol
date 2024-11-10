import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { Github, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SignUpStep1Props {
  email: string;
  password: string;
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  loading: boolean;
}

export const SignUpStep1 = ({ email, password, onChange, onNext, loading }: SignUpStep1Props) => {
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      console.error("Erreur lors de la connexion sociale:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField label="Email" required>
          <Input
            required
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="votre@email.com"
          />
        </FormField>

        <FormField label="Mot de passe" required>
          <Input
            required
            type="password"
            value={password}
            onChange={(e) => onChange('password', e.target.value)}
            placeholder="Votre mot de passe"
          />
        </FormField>
      </div>

      <Button 
        type="button" 
        className="w-full" 
        onClick={onNext}
        disabled={loading || !email || !password}
      >
        Continuer
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={() => handleSocialLogin('google')}
          type="button"
          disabled={loading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
        <Button 
          variant="outline"
          onClick={() => handleSocialLogin('github')}
          type="button"
          disabled={loading}
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
    </div>
  );
};