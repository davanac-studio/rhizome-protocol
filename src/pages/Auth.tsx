import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-md mx-auto">
        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="signup">Créer un compte</TabsTrigger>
            <TabsTrigger value="login">Se connecter</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;