import { Input } from "@/components/ui/input";
import { ProjectFormData } from "@/types/form";

interface ProjectLinksFieldsProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}

export const ProjectLinksFields = ({ formData, setFormData }: ProjectLinksFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Lien de présentation #1</label>
          <Input
            type="url"
            value={formData.links.demo_link_1}
            onChange={(e) => setFormData({
              ...formData,
              links: { ...formData.links, demo_link_1: e.target.value }
            })}
            placeholder="URL de présentation #1"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Lien de présentation #2</label>
          <Input
            type="url"
            value={formData.links.preview_link}
            onChange={(e) => setFormData({
              ...formData,
              links: { ...formData.links, preview_link: e.target.value }
            })}
            placeholder="URL de présentation #2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Lien de présentation #3</label>
          <Input
            type="url"
            value={formData.links.demo_link_3}
            onChange={(e) => setFormData({
              ...formData,
              links: { ...formData.links, demo_link_3: e.target.value }
            })}
            placeholder="URL de présentation #3"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Lien de présentation #4</label>
          <Input
            type="url"
            value={formData.links.demo_link_4}
            onChange={(e) => setFormData({
              ...formData,
              links: { ...formData.links, demo_link_4: e.target.value }
            })}
            placeholder="URL de présentation #4"
          />
        </div>
      </div>
    </>
  );
};