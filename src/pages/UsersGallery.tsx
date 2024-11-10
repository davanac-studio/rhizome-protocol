import { useEffect } from "react";
import { initializeUsers } from "@/utils/initializeData";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { teamMembers } from "@/data/team-members";
import { useNavigate } from "react-router-dom";

const UsersGallery = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    initializeUsers();
  }, []);

  const handleUserClick = (username: string) => {
    navigate(`/profile/${encodeURIComponent(username)}`);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Notre équipe</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(teamMembers).map((member) => (
          <Card 
            key={member.username}
            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => handleUserClick(member.username)}
          >
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{member.name}</h2>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UsersGallery;