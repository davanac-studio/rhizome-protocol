import { UserCircle2 } from "lucide-react";
import { Project } from "@/types/project";

interface ClientBlockProps {
  client: string;
  testimonial?: string;
}

export const ClientBlock = ({ client }: ClientBlockProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Client</h3>
        <div className="flex items-center gap-2 text-gray-600">
          <UserCircle2 className="w-4 h-4" />
          <span>{client}</span>
        </div>
      </div>
    </div>
  );
};