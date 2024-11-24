import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectFormData } from "@/types/form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useParams } from "react-router-dom";

interface ProjectFormFieldsProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}

export const ProjectFormFields = ({ formData, setFormData }: ProjectFormFieldsProps) => {
  const { idWithSlug } = useParams();
  const projectId = idWithSlug?.split('-')[0];

  const { data: profiles, isLoading } = useQuery({
    queryKey: ['profiles', projectId],
    queryFn: async () => {
      let teamLeaderId;
      
      if (projectId) {
        const { data: project } = await supabase
          .from('projects')
          .select('team_leader')
          .eq('id', projectId)
          .maybeSingle();
          
        teamLeaderId = project?.team_leader;
      }

      let query = supabase
        .from('profiles')
        .select('id, first_name, last_name, expertise, "collectif-name"')
        .eq('account_type', 'individuel');

      if (teamLeaderId) {
        query = query.neq('id', teamLeaderId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
    enabled: true
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            value={formData.links.preview}
            onChange={(e) => setFormData({
              ...formData,
              links: { ...formData.links, preview: e.target.value }
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Collectif/Client/Commanditaire</label>
        <Select
          value={formData.client}
          onValueChange={(value) => setFormData({ ...formData, client: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={isLoading ? "Chargement..." : "Sélectionnez un collectif"} />
          </SelectTrigger>
          <SelectContent>
            {profiles && profiles.length > 0 ? (
              profiles.map((profile) => (
                <SelectItem key={profile.id} value={profile.id}>
                  {profile["collectif-name"]}
                  {profile.expertise && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({profile.expertise})
                    </span>
                  )}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-clients" disabled>
                {isLoading ? "Chargement des collectifs..." : "Aucun collectif disponible"}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
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