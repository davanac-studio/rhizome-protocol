import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectFormData } from "@/types/form";

interface ProjectFormFieldsProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}

export const ProjectFormFields = ({ formData, setFormData }: ProjectFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Titre</label>
          <Input
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Entrez le titre du projet"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Client</label>
          <Input
            required
            value={formData.client}
            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            placeholder="Nom du client"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description détaillée du projet"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Catégorie</label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Formation/Recrutement">Formation/Recrutement</SelectItem>
              <SelectItem value="Stratégie/Management">Stratégie/Management</SelectItem>
              <SelectItem value="Développement/Workflow">Développement/Workflow</SelectItem>
              <SelectItem value="Communication/Relations Publiques">Communication/Relations Publiques</SelectItem>
              <SelectItem value="Rédaction/Production audiovisuelle">Rédaction/Production audiovisuelle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Date de publication</label>
          <Input
            type="date"
            required
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Image de couverture (URL)</label>
        <Input
          type="url"
          required
          value={formData.thumbnail}
          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
          placeholder="URL de l'image de couverture"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Lien de démonstration</label>
          <Input
            type="url"
            value={formData.links.github}
            onChange={(e) => setFormData({
              ...formData,
              links: { ...formData.links, github: e.target.value }
            })}
            placeholder="URL de démonstration"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Autre lien de présentation</label>
          <Input
            type="url"
            value={formData.links.preview}
            onChange={(e) => setFormData({
              ...formData,
              links: { ...formData.links, preview: e.target.value }
            })}
            placeholder="Autre lien de présentation"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Témoignage client</label>
        <Textarea
          value={formData.testimonial}
          onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
          placeholder="Témoignage du client (optionnel)"
        />
      </div>
    </>
  );
};