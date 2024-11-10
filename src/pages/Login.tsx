import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        toast({
          title: "Déjà connecté",
          description: "Redirection vers votre espace...",
        });
        navigate("/");
      }
    };
    
    checkSession();

    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        if (session) {
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur Project Pulse !",
          });
          navigate("/");
        }
      } else if (event === "SIGNED_OUT") {
        toast({
          title: "Déconnexion",
          description: "Vous avez été déconnecté",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Project Pulse</h2>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous pour accéder à votre espace
          </p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            style: {
              button: { background: 'rgb(59, 130, 246)', color: 'white' },
              anchor: { color: 'rgb(59, 130, 246)' },
              message: { color: 'red' },
            }
          }}
          theme="light"
          providers={[]}
          redirectTo={window.location.origin}
          showLinks={false}
          view="sign_in"
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email',
                password_label: 'Mot de passe',
                button_label: 'Se connecter',
                loading_button_label: 'Connexion en cours...',
              }
            },
          }}
        />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Pas encore de compte ?</p>
          <Button
            onClick={handleSignUpClick}
            variant="outline"
            className="mt-2 w-full"
          >
            Créer un compte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;