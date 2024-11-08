import { UserCircle2, Quote } from "lucide-react";
import { Project } from "@/types/project";

interface ClientBlockProps {
  client: string;
  testimonial?: string;
}

export const ClientBlock = ({ client, testimonial }: ClientBlockProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Client</h3>
        <div className="flex items-center gap-2 text-gray-600">
          <UserCircle2 className="w-4 h-4" />
          <span>{client}</span>
        </div>
      </div>

      {testimonial && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start gap-2 text-gray-600">
            <Quote className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <p className="italic text-gray-700">{testimonial}</p>
          </div>
        </div>
      )}
    </div>
  );
};