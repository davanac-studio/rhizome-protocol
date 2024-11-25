import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: string;
}

interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  source: string;
  target: string;
}

export const ParticipantNetwork = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const { data: networkData } = useQuery({
    queryKey: ['participantNetwork'],
    queryFn: async () => {
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          team_leader,
          project_participants (
            user_id
          )
        `);

      if (projectsError) throw projectsError;

      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      // Create nodes for all profiles
      const nodes: NetworkNode[] = profiles.map((profile) => ({
        id: profile.id,
        name: profile.account_type === 'collectif' 
          ? profile['collectif-name'] 
          : `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
        type: profile.account_type || 'individuel'
      }));

      // Create links between participants
      const links: NetworkLink[] = [];
      
      projects?.forEach(project => {
        if (project.team_leader) {
          project.project_participants?.forEach(participant => {
            if (participant.user_id) {
              links.push({
                source: project.team_leader,
                target: participant.user_id
              });
            }
          });
        }
      });

      return { nodes, links };
    }
  });

  useEffect(() => {
    if (!networkData || !svgRef.current) return;

    const width = 800;
    const height = 600;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const simulation = d3.forceSimulation<NetworkNode>(networkData.nodes)
      .force("link", d3.forceLink<NetworkNode, NetworkLink>(networkData.links)
        .id(d => d.id)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const links = svg.append("g")
      .selectAll("line")
      .data(networkData.links)
      .join("line")
      .style("stroke", "#999")
      .style("stroke-opacity", 0.6)
      .style("stroke-width", 2);

    const nodes = svg.append("g")
      .selectAll("g")
      .data(networkData.nodes)
      .join("g")
      .call(d3.drag<SVGGElement, NetworkNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    nodes.append("circle")
      .attr("r", d => d.type === 'collectif' ? 10 : 7)
      .style("fill", d => d.type === 'collectif' ? "#2a9d8f" : "#e76f51");

    nodes.append("text")
      .text(d => d.name || "Sans nom")
      .attr("x", 12)
      .attr("y", 4)
      .style("font-size", "12px");

    simulation.on("tick", () => {
      links
        .attr("x1", d => (d.source as NetworkNode).x!)
        .attr("y1", d => (d.source as NetworkNode).y!)
        .attr("x2", d => (d.target as NetworkNode).x!)
        .attr("y2", d => (d.target as NetworkNode).y!);

      nodes.attr("transform", d => `translate(${d.x},${d.y})`);
    });

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

  }, [networkData]);

  return (
    <div className="w-full flex justify-center">
      <svg ref={svgRef} className="border rounded-lg"></svg>
    </div>
  );
};