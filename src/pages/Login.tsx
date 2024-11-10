import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        toast({
          title: "Déjà connecté",
          description: "Redirection vers votre espace...",
        });
        navigate("/");
      }
    });

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur Rhizome Protocol !",
        });
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Rhizome Protocol</h2>
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
          showLinks={true}
          view="sign_in"
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email',
                password_label: 'Mot de passe',
                button_label: 'Se connecter',
                loading_button_label: 'Connexion en cours...',
                social_provider_text: 'Se connecter avec {{provider}}',
                link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
              },
              sign_up: {
                email_label: 'Email',
                password_label: 'Mot de passe',
                button_label: "S'inscrire",
                loading_button_label: 'Inscription en cours...',
                social_provider_text: "S'inscrire avec {{provider}}",
                link_text: "Vous avez déjà un compte ? Connectez-vous",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;