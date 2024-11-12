import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users as UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("first_name");
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center space-x-2 mb-6">
          <UsersIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Communauté</h1>
        </div>
        <div className="text-center py-12">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center space-x-2 mb-6">
        <UsersIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Communauté</h1>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-8">
        <div className="text-4xl">👣</div>
        <h2 className="text-2xl font-semibold">
          Nous sommes des compagnons de route
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>
            Nomades, nous développons des compétences techniques et stratégiques complémentaires, au service de nos clients et partenaires.
          </p>
          <p>
            Indépendants, nous nous agrégeons selon la nature et la temporalité des projets que nous initions et auxquels nous contribuons.
          </p>
          <p>
            Nous partageons des valeurs d'honnêteté intellectuelle, de transparence et de confiance mutuelle
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users?.map((user) => (
          <Link key={user.id} to={`/profile/${user.username}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>
                      {user.first_name?.[0]}{user.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">
                    {user.first_name} {user.last_name}
                    {user.expertise && (
                      <div className="text-sm font-normal text-muted-foreground mt-1">
                        {user.expertise}
                      </div>
                    )}
                  </CardTitle>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Users;