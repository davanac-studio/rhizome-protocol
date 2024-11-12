import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface ParticipantSearchProps {
  value: string;
  onSelect: (profileId: string, profileData: any) => void;
  existingParticipants: string[];
}

export const ParticipantSearch = ({ value, onSelect, existingParticipants }: ParticipantSearchProps) => {
  const { data: profiles } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {value ? 
            profiles?.find(p => p.id === value)?.first_name + " " + 
            profiles?.find(p => p.id === value)?.last_name
            : "Sélectionner un participant"}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Rechercher un participant..." />
          <CommandEmpty>Aucun participant trouvé.</CommandEmpty>
          <CommandGroup>
            {profiles?.filter(profile => 
              !existingParticipants.includes(profile.id)
            ).map((profile) => (
              <CommandItem
                key={profile.id}
                value={profile.id}
                onSelect={() => onSelect(profile.id, profile)}
              >
                {profile.first_name} {profile.last_name}
                {profile.expertise && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({profile.expertise})
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};