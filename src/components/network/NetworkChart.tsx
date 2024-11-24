import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserProjectGallery } from './UserProjectGallery';

interface NetworkNode {
  id: string;
  name: string;
  avatar: string | null;
  value: number;
  expertise: string;
}

interface NetworkLink {
  source: string;
  target: string;
  projectId: string;
  projectTitle: string;
}

interface NetworkChartProps {
  data: {
    nodes: NetworkNode[];
    links: NetworkLink[];
  };
}

export const NetworkChart = ({ data }: NetworkChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Create a simulation for positioning nodes
    const simulation = d3.forceSimulation(data.nodes as any)
      .force("link", d3.forceLink(data.links)
        .id((d: any) => d.id)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));

    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1);

    // Create nodes container
    const node = svg.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Add circles to nodes
    node.append("circle")
      .attr("r", (d: NetworkNode) => Math.sqrt(d.value) * 10)
      .attr("fill", "#4f46e5")
      .attr("stroke", "#312e81")
      .attr("stroke-width", 1.5);

    // Add avatars to nodes
    node.append("clipPath")
      .attr("id", (d: NetworkNode) => `clip-${d.id}`)
      .append("circle")
      .attr("r", (d: NetworkNode) => Math.sqrt(d.value) * 10);

    node.append("image")
      .attr("xlink:href", (d: NetworkNode) => d.avatar || '')
      .attr("x", (d: NetworkNode) => -Math.sqrt(d.value) * 10)
      .attr("y", (d: NetworkNode) => -Math.sqrt(d.value) * 10)
      .attr("width", (d: NetworkNode) => Math.sqrt(d.value) * 20)
      .attr("height", (d: NetworkNode) => Math.sqrt(d.value) * 20)
      .attr("clip-path", (d: NetworkNode) => `url(#clip-${d.id})`);

    // Add name labels
    node.append("text")
      .text((d: NetworkNode) => d.name)
      .attr("x", 0)
      .attr("y", (d: NetworkNode) => Math.sqrt(d.value) * 10 + 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#4b5563")
      .style("font-size", "12px");

    // Add click event to nodes
    node.on("click", (event: MouseEvent, d: NetworkNode) => {
      setSelectedNode(d);
      setIsDialogOpen(true);
    });

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
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
        style={{ width: '100%', height: '100%' }}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedNode?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedNode && (
            <UserProjectGallery userId={selectedNode.id} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};