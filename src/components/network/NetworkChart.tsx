import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  avatar: string | null;
  value: number;
}

interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  source: string;
  target: string;
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
    const simulation = d3.forceSimulation(data.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(data.links)
        .id((d: any) => d.id)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));

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
      .attr("r", d => Math.sqrt(d.value) * 10)
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
      .attr("r", d => Math.sqrt(d.value) * 10);

    node.append("image")
      .attr("xlink:href", d => d.avatar || "")
      .attr("x", d => -Math.sqrt(d.value) * 10)
      .attr("y", d => -Math.sqrt(d.value) * 10)
      .attr("width", d => Math.sqrt(d.value) * 20)
      .attr("height", d => Math.sqrt(d.value) * 20)
      .attr("clip-path", d => `url(#clip-${d.id})`)
      .style("display", d => d.avatar ? null : "none")
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedNode(d);
      });

    // Add labels
    node.append("text")
      .text(d => d.name)
      .attr("x", d => Math.sqrt(d.value) * 12)
      .attr("y", 5)
      .attr("font-size", "12px")
      .attr("fill", "#4b5563");

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as NetworkNode).x!)
        .attr("y1", d => (d.source as NetworkNode).y!)
        .attr("x2", d => (d.target as NetworkNode).x!)
        .attr("y2", d => (d.target as NetworkNode).y!);

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
              <span>{selectedNode?.name}</span>
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