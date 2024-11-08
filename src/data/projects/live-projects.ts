import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const liveProjects: Project[] = [
  {
    id: "3",
    title: "Live Twitch/Youtube: Stereopsia Bruxelles",
    description: "Gestion complète d'un streaming multi-plateformes pour la conférence Stereopsia, incluant la régie en direct, la gestion des transitions et l'interaction avec le public en temps réel.",
    dueDate: "2024-03-30",
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    category: "Rédaction/Production audiovisuelle",
    client: "Stereopsia",
    testimonial: "La qualité du streaming était exceptionnelle. L'équipe a su gérer les multiples flux en direct avec professionnalisme, assurant une expérience fluide pour nos participants en ligne. La réactivité face aux imprévus techniques était remarquable.",
    author: {
      ...teamMembers.profile3,
      role: "Team Leader",
      contribution: 40,
      contributionDescription: "Design de l'interface utilisateur et des overlays"
    },
    participants: [
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 25,
        contributionDescription: "Développement de l'infrastructure technique"
      },
      {
        ...teamMembers.profile4,
        role: "Member",
        contribution: 20,
        contributionDescription: "Couverture journalistique et interviews"
      },
      {
        ...teamMembers.profile5,
        role: "Member",
        contribution: 15,
        contributionDescription: "Communication et relations avec les intervenants"
      }
    ],
    links: {
      github: "https://github.com/example/stereopsia-live",
      preview: "https://live.example.com/stereopsia"
    }
  }
];