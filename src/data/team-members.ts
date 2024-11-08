import { ProjectMember } from "@/types/project";

export const teamMembers: Record<string, ProjectMember> = {
  profile1: {
    name: "Sophie Martin",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    role: "Team Leader",
    expertise: "Direction de Projet",
    contribution: 40
  },
  profile2: {
    name: "Thomas Bernard",
    avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    role: "Member",
    expertise: "Production Vidéo",
    contribution: 30
  },
  profile3: {
    name: "Emma Dubois",
    avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    role: "Member",
    expertise: "Marketing Digital",
    contribution: 30
  },
  profile4: {
    name: "Lucas Petit",
    avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    role: "Member",
    expertise: "Développement Web",
    contribution: 30
  }
};