import { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserProjectGallery } from "./UserProjectGallery";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { transformDatabaseProject } from "@/utils/projectTransformers";

interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  expertise?: string;
  group: string;
}

interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  value: number;
}

interface NetworkChartProps {
  data: {
    nodes: NetworkNode[];
    links: NetworkLink[];
  };
  width?: number;
  height?: number;
}

export const NetworkChart = ({ data, width = 800, height = 600 }: NetworkChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const linksRef = useRef<SVGGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);

  const { data: userProjects } = useQuery({
    queryKey: ['userProjects', hoveredNode?.id],
    queryFn: async () => {
      if (!hoveredNode?.id) return [];

      const { data: projects, error } = await supabase
        .from('projects')
        .select(`
          *,
          team_leader_profile:profiles!projects_team_leader_fkey (
            id, first_name, last_name, username, avatar_url, expertise
          ),
          project_participants (
            user:profiles!project_participants_user_id_fkey (
              id, first_name, last_name, username, avatar_url, expertise
            ),
            contribution,
            contribution_description,
            avatar
          )
        `)
        .or(`team_leader.eq.${hoveredNode.id},client.eq.${hoveredNode.id}`);

      if (error) {
        console.error('Error fetching user projects:', error);
        return [];
      }

      return projects?.map((project: any) => ({
        ...project,
        author: {
          ...project.team_leader_profile,
          role: "Team Leader",
          contribution: project.team_leader_contribution,
          contributionDescription: project.team_leader_contribution_description
        },
        participants: project.project_participants?.map((p: any) => ({
          name: `${p.user.first_name} ${p.user.last_name}`,
          username: p.user.username,
          avatar: p.avatar || p.user.avatar_url,
          expertise: p.user.expertise,
          role: "Member",
          contribution: p.contribution,
          contributionDescription: p.contribution_description
        })) || []
      })).map(transformDatabaseProject) || [];
    },
    enabled: !!hoveredNode?.id
  });

  const updateNetwork = useCallback(() => {
    if (!svgRef.current || !data.nodes.length) return;

    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
    const links = d3.select(linksRef.current);
    const nodes = d3.select(nodesRef.current);

    const simulation = d3.forceSimulation<NetworkNode>(data.nodes)
      .force("link", d3.forceLink<NetworkNode, NetworkLink>(data.links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = links
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6);

    const node = nodes
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", "#69b3a2")
      .on("mouseover", (event, d) => {
        setHoveredNode(d);
      })
      .on("mouseout", () => {
        setHoveredNode(null);
      });

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as NetworkNode).x!)
        .attr("y1", d => (d.source as NetworkNode).y!)
        .attr("x2", d => (d.target as NetworkNode).x!)
        .attr("y2", d => (d.target as NetworkNode).y!);

      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);
    });

    return () => {
      simulation.stop();
    };
  }, [data, width, height]);

  useEffect(() => {
    updateNetwork();
  }, [updateNetwork]);

  return (
    <div className="relative">
      <svg ref={svgRef} width={width} height={height}>
        <g ref={gRef}>
          <g ref={linksRef} />
          <g ref={nodesRef} />
        </g>
      </svg>
      {hoveredNode && (
        <HoverCard open={true}>
          <HoverCardTrigger asChild>
            <div style={{
              position: 'absolute',
              left: `${hoveredNode.x}px`,
              top: `${hoveredNode.y}px`,
              width: '1px',
              height: '1px'
            }} />
          </HoverCardTrigger>
          <HoverCardContent className="w-80" align="start">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={hoveredNode.avatar} />
                <AvatarFallback>{hoveredNode.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{hoveredNode.name}</h4>
                {hoveredNode.expertise && (
                  <Badge variant="secondary" className="text-xs">
                    {hoveredNode.expertise}
                  </Badge>
                )}
              </div>
            </div>
            <UserProjectGallery projects={userProjects || []} />
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
};