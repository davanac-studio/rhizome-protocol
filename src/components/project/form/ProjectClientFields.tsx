import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectFormData } from "@/types/form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface ProjectClientFieldsProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}

export const ProjectClientFields = ({ formData, setFormData }: ProjectClientFieldsProps) => {
  const { data: profiles, isLoading } = useQuery({
    queryKey: ['collectif-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, expertise, "collectif-name"')
        .eq('account_type', 'collectif');
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <>
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