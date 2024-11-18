import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

interface ParticipantSearchProps {
  value: string;
  onSelect: (profileId: string) => void;
  existingParticipants: string[];
}

export const ParticipantSearch = ({ value, onSelect, existingParticipants }: ParticipantSearchProps) => {
  const [open, setOpen] = useState(false);

  const { data: profiles } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*')
        .is('entreprise', null);

      // Only add the not.in filter if there are existing participants
      if (existingParticipants.length > 0) {
        query = query.not('id', 'in', existingParticipants);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
  });

  const handleSelect = (profileId: string) => {
    onSelect(profileId);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
            {profiles?.map((profile) => (
              <CommandItem
                key={profile.id}
                value={profile.id}
                onSelect={() => handleSelect(profile.id)}
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