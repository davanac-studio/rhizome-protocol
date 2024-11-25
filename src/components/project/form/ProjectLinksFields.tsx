import { Input } from "@/components/ui/input";
import { ProjectFormData } from "@/types/form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface ProjectLinksFieldsProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}

export const ProjectLinksFields = ({ formData, setFormData }: ProjectLinksFieldsProps) => {
  const [visibleLinks, setVisibleLinks] = useState(1);

  const handleAddLink = () => {
    if (visibleLinks < 4) {
      setVisibleLinks(prev => prev + 1);
    }
  };

  const updateLink = (linkNumber: number, value: string) => {
    setFormData({
      ...formData,
      links: {
        ...formData.links,
        [`demo_link_${linkNumber}`]: value
      }
    });
  };

  return (
    <div className="space-y-4">
      {[...Array(visibleLinks)].map((_, index) => (
        <div key={index} className="space-y-2">
          <label className="text-sm font-medium">
            Lien de présentation #{index + 1}
          </label>
          <Input
            type="url"
            value={formData.links[`demo_link_${index + 1}` as keyof typeof formData.links]}
            onChange={(e) => updateLink(index + 1, e.target.value)}
            placeholder={`URL de présentation #${index + 1}`}
          />
        </div>
      ))}

      {visibleLinks < 4 && (
        <Button
          type="button"
          variant="outline"
          onClick={handleAddLink}
          className="w-full flex items-center justify-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Ajouter un lien de présentation
        </Button>
      )}
    </div>
  );
};