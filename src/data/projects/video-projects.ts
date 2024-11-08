import { Project } from "@/types/project";
import { teamMembers } from "../team-members";

export const videoProjects: Project[] = [
  {
    id: "1",
    title: "Vidéo Explainer \"La guerre en Ukraine\"",
    description: "Production d'une vidéo explicative détaillée sur le conflit en Ukraine, incluant des animations, des graphiques et une narration professionnelle pour une meilleure compréhension du sujet.",
    dueDate: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Rédaction/Production audiovisuelle",
    client: "RH Solutions",
    testimonial: "La vidéo explicative a permis à nos employés de mieux comprendre les enjeux complexes du conflit en Ukraine. Le format était clair, professionnel et parfaitement adapté à nos besoins de formation interne.",
    author: {
      ...teamMembers.profile1,
      role: "Team Leader",
      contribution: 40,
      contributionDescription: "Direction technique et développement de la plateforme"
    },
    participants: [
      {
        ...teamMembers.profile2,
        role: "Member",
        contribution: 30,
        contributionDescription: "Rédaction du script et interviews journalistiques"
      },
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 30,
        contributionDescription: "Design de l'interface et des animations"
      }
    ],
    links: {
      github: "https://github.com/example/ukraine-explainer",
      preview: "https://video.example.com/ukraine"
    }
  },
  {
    id: "2",
    title: "Vidéo Aftermovie KIKK Festival",
    description: "Création d'un aftermovie dynamique capturant l'essence et les moments forts du KIKK Festival, mettant en valeur les installations artistiques, les conférences et l'ambiance générale de l'événement.",
    dueDate: "2024-04-01",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    category: "Rédaction/Production audiovisuelle",
    client: "KIKK Festival",
    testimonial: "L'aftermovie capture parfaitement l'énergie et l'esprit d'innovation du KIKK Festival. La qualité de la production et le montage dynamique ont dépassé nos attentes. Un excellent outil pour promouvoir nos futures éditions !",
    author: {
      ...teamMembers.profile2,
      role: "Team Leader",
      contribution: 40,
      contributionDescription: "Direction éditoriale et interviews des participants"
    },
    participants: [
      {
        ...teamMembers.profile4,
        role: "Member",
        contribution: 20,
        contributionDescription: "Couverture journalistique de l'événement"
      },
      {
        ...teamMembers.profile1,
        role: "Member",
        contribution: 20,
        contributionDescription: "Développement de la plateforme de diffusion"
      },
      {
        ...teamMembers.profile3,
        role: "Member",
        contribution: 20,
        contributionDescription: "Design des transitions et des animations"
      }
    ],
    links: {
      github: "https://github.com/example/kikk-aftermovie",
      preview: "https://video.example.com/kikk"
    }
  }
];