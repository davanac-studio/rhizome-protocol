import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUnclaimedProfile } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

interface ParticipantSearchProps {
  value: string;
  onSelect: (profileId: string) => void;
  existingParticipants: string[];
  teamLeaderId?: string;
}

export const ParticipantSearch = ({ value, onSelect, existingParticipants, teamLeaderId }: ParticipantSearchProps) => {
  const [open, setOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { toast } = useToast();
  const [newParticipant, setNewParticipant] = useState({
    firstName: "",
    lastName: "",
    email: "",
    expertise: "",
  });

  const { data: profiles, refetch } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('account_type', 'individuel')
        .is('collectif-name', null);

      // Filter out team leader and existing participants
      const excludedProfiles = [...existingParticipants];
      if (teamLeaderId) {
        excludedProfiles.push(teamLeaderId);
      }

      if (excludedProfiles.length > 0) {
        query = query.not('id', 'in', `(${excludedProfiles.map(id => `'${id}'`).join(',')})`);
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

  const handleAddNewParticipant = async () => {
    try {
      if (!newParticipant.firstName || !newParticipant.lastName || !newParticipant.email) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs obligatoires",
          variant: "destructive",
        });
        return;
      }

      const profile = await createUnclaimedProfile(newParticipant);
      
      if (profile) {
        toast({
          title: "Participant ajouté",
          description: "Le participant a été ajouté avec succès",
        });
        setIsAddingNew(false);
        refetch();
        handleSelect(profile.id);
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
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
            <CommandEmpty>
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Aucun participant trouvé
                </p>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      setIsAddingNew(true);
                    }}
                  >
                    Ajouter un nouveau participant
                  </Button>
                </DialogTrigger>
              </div>
            </CommandEmpty>
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau participant</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={newParticipant.firstName}
                onChange={(e) => setNewParticipant(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={newParticipant.lastName}
                onChange={(e) => setNewParticipant(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newParticipant.email}
              onChange={(e) => setNewParticipant(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expertise">Expertise</Label>
            <Input
              id="expertise"
              value={newParticipant.expertise}
              onChange={(e) => setNewParticipant(prev => ({ ...prev, expertise: e.target.value }))}
            />
          </div>
          <Button onClick={handleAddNewParticipant} className="w-full">
            Ajouter le participant
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};