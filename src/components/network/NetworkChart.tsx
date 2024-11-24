import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserProjectGallery } from "./UserProjectGallery";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProjects } from "@/utils/projectQueries";

interface Node {
  id: string;
  name: string;
  expertise: string;
  value: number;
}

export const NetworkChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  // Add query for fetching projects when a node is selected
  const { data: projects = [] } = useQuery({
    queryKey: ['userProjects', selectedNode?.id],
    queryFn: () => fetchUserProjects(selectedNode?.id),
    enabled: !!selectedNode?.id
  });

  return (
    <div className="relative w-full h-screen bg-background">
      <svg ref={svgRef} className="w-full h-full" />
      
      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{selectedNode?.name}</h2>
                <p className="text-muted-foreground">{selectedNode?.expertise}</p>
              </div>
            </div>
            <p className="text-lg font-medium mb-4">
              {selectedNode?.value} projet{selectedNode?.value !== 1 ? 's' : ''}
            </p>
            {selectedNode && <UserProjectGallery projects={projects} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
