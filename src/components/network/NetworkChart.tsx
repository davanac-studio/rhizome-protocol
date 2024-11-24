import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  avatar: string | null;
  value: number;
  expertise: string;
}

interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  source: NetworkNode | string;
  target: NetworkNode | string;
  projectId: string;
  projectTitle: string;
}

interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

interface NetworkChartProps {
  data: NetworkData;
}

export const NetworkChart = ({ data }: NetworkChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  // Fonction pour calculer la taille du nœud en fonction du nombre de projets
  const getNodeSize = (value: number) => {
    // Base size of 20px, increasing by 5px per project, with a max of 50px
    return Math.min(20 + (value * 5), 50);
  };

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Create the simulation
    const simulation = d3.forceSimulation<NetworkNode>(data.nodes)
      .force("link", d3.forceLink<NetworkNode, NetworkLink>(data.links)
        .id(d => d.id)
        .distance(150))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius((d: NetworkNode) => getNodeSize(d.value) + 10));

    // Create the links
    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    // Create the nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(d3.drag<SVGGElement, NetworkNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Add circles for nodes
    node.append("circle")
      .attr("r", d => getNodeSize(d.value))
      .attr("fill", "#4f46e5")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedNode(d);
      });

    // Add avatars if available
    node.append("clipPath")
      .attr("id", d => `clip-${d.id}`)
      .append("circle")
      .attr("r", d => getNodeSize(d.value));

    node.append("image")
      .attr("xlink:href", d => d.avatar || "")
      .attr("x", d => -getNodeSize(d.value))
      .attr("y", d => -getNodeSize(d.value))
      .attr("width", d => getNodeSize(d.value) * 2)
      .attr("height", d => getNodeSize(d.value) * 2)
      .attr("clip-path", d => `url(#clip-${d.id})`)
      .style("display", d => d.avatar ? null : "none")
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedNode(d);
      });

    // Add labels
    node.append("text")
      .text(d => d.name)
      .attr("x", d => getNodeSize(d.value) + 5)
      .attr("y", 5)
      .attr("font-size", "12px")
      .attr("fill", "#4b5563");

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => {
          const source = typeof d.source === 'string' ? data.nodes.find(n => n.id === d.source) : d.source as NetworkNode;
          return source?.x || 0;
        })
        .attr("y1", d => {
          const source = typeof d.source === 'string' ? data.nodes.find(n => n.id === d.source) : d.source as NetworkNode;
          return source?.y || 0;
        })
        .attr("x2", d => {
          const target = typeof d.target === 'string' ? data.nodes.find(n => n.id === d.target) : d.target as NetworkNode;
          return target?.x || 0;
        })
        .attr("y2", d => {
          const target = typeof d.target === 'string' ? data.nodes.find(n => n.id === d.target) : d.target as NetworkNode;
          return target?.y || 0;
        });

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <>
      <svg
        ref={svgRef}
        className="w-full h-full"
      />
      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={selectedNode?.avatar || undefined} />
                <AvatarFallback>{selectedNode?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>{selectedNode?.name}</span>
                <span className="text-sm text-muted-foreground">{selectedNode?.expertise}</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <p className="text-lg font-medium">
              {selectedNode?.value} projet{selectedNode?.value !== 1 ? 's' : ''}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};