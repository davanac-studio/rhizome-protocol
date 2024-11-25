import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { NetworkChart } from "./NetworkChart";
import { Card } from "@/components/ui/card";
import { useNetworkData } from "./hooks/useNetworkData";

export const ParticipantNetwork = () => {
  const { data: networkData, isLoading } = useNetworkData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Chargement du réseau...</p>
      </div>
    );
  }

  if (!networkData) return null;

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">Réseau des collaborations</h2>
      <div className="h-[600px] w-full">
        <NetworkChart data={networkData} />
      </div>
    </Card>
  );
};