"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { skillCategories } from "@/data/skills";

const COLORS: Record<string, string> = {
  Frontend: "#7c3aed",
  Backend: "#06b6d4",
  Database: "#10b981",
  Tools: "#f59e0b",
};

type NodeDatum = d3.SimulationNodeDatum & {
  id: string;
  label: string;
  type: "category" | "skill";
  category: string;
  r: number;
};

type LinkDatum = {
  source: string | NodeDatum;
  target: string | NodeDatum;
  category: string;
};

export default function ForceGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Build graph data from skills
    const nodes: NodeDatum[] = [];
    const links: LinkDatum[] = [];

    const catPositions: Record<string, { x: number; y: number }> = {
      Frontend:  { x: width * 0.28, y: height * 0.32 },
      Backend:   { x: width * 0.72, y: height * 0.32 },
      Database:  { x: width * 0.28, y: height * 0.70 },
      Tools:     { x: width * 0.72, y: height * 0.70 },
    };

    skillCategories.forEach((cat) => {
      const catPos = catPositions[cat.category] ?? { x: width / 2, y: height / 2 };
      nodes.push({
        id: cat.category,
        label: cat.category,
        type: "category",
        category: cat.category,
        r: 44,
        x: catPos.x,
        y: catPos.y,
      });

      cat.skills.forEach((skill) => {
        const id = `${cat.category}::${skill.name}`;
        nodes.push({
          id,
          label: skill.name,
          type: "skill",
          category: cat.category,
          r: 26,
          x: catPos.x + (Math.random() - 0.5) * 80,
          y: catPos.y + (Math.random() - 0.5) * 80,
        });
        links.push({ source: cat.category, target: id, category: cat.category });
      });
    });

    // SVG setup
    const svg = d3.select(svgEl).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    // Defs: gradients + glow filter
    const defs = svg.append("defs");

    Object.entries(COLORS).forEach(([cat, color]) => {
      const grad = defs
        .append("radialGradient")
        .attr("id", `grad-${cat}`)
        .attr("cx", "35%")
        .attr("cy", "35%");
      grad.append("stop").attr("offset", "0%").attr("stop-color", color).attr("stop-opacity", 1);
      grad.append("stop").attr("offset", "100%").attr("stop-color", color).attr("stop-opacity", 0.45);
    });

    const glow = defs.append("filter").attr("id", "glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    glow.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", "6").attr("result", "blur");
    const feMerge = glow.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "blur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g");

    // Simulation
    const simulation = d3
      .forceSimulation<NodeDatum>(nodes)
      .force(
        "link",
        d3
          .forceLink<NodeDatum, LinkDatum>(links)
          .id((d) => d.id)
          .distance((l) => {
            const s = l.source as NodeDatum;
            const t = l.target as NodeDatum;
            return s.r + t.r + 50;
          })
          .strength(0.7)
      )
      .force("charge", d3.forceManyBody().strength(-180))
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.05))
      .force(
        "collide",
        d3.forceCollide<NodeDatum>().radius((d) => d.r + 12).strength(0.85)
      );

    // Links
    const link = g
      .append("g")
      .selectAll<SVGLineElement, LinkDatum>("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", (d) => COLORS[d.category] ?? "#fff")
      .attr("stroke-opacity", 0.22)
      .attr("stroke-width", 1.5);

    // Node groups
    const node = g
      .append("g")
      .selectAll<SVGGElement, NodeDatum>("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("cursor", "grab");

    // Circles
    node
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (d) => `url(#grad-${d.category})`)
      .attr("stroke", (d) => COLORS[d.category] ?? "#fff")
      .attr("stroke-width", (d) => (d.type === "category" ? 2 : 1))
      .attr("stroke-opacity", 0.55);

    // Labels
    node
      .append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "white")
      .attr("font-size", (d) => (d.type === "category" ? "13px" : "10px"))
      .attr("font-weight", (d) => (d.type === "category" ? "700" : "400"))
      .attr("font-family", "sans-serif")
      .attr("pointer-events", "none");

    // Hover highlight
    node
      .on("mouseover", (_event, d) => {
        node.attr("opacity", (n) => {
          if (n.id === d.id) return 1;
          const connected = links.some((l) => {
            const s = (l.source as NodeDatum).id;
            const t = (l.target as NodeDatum).id;
            return (s === d.id && t === n.id) || (t === d.id && s === n.id);
          });
          return connected ? 1 : 0.18;
        });
        node
          .select("circle")
          .attr("filter", (n) => (n.id === d.id ? "url(#glow)" : null));
        link.attr("stroke-opacity", (l) => {
          const s = (l.source as NodeDatum).id;
          const t = (l.target as NodeDatum).id;
          return s === d.id || t === d.id ? 0.85 : 0.04;
        });
        link.attr("stroke-width", (l) => {
          const s = (l.source as NodeDatum).id;
          const t = (l.target as NodeDatum).id;
          return s === d.id || t === d.id ? 2.5 : 1.5;
        });
      })
      .on("mouseout", () => {
        node.attr("opacity", 1);
        node.select("circle").attr("filter", null);
        link.attr("stroke-opacity", 0.22).attr("stroke-width", 1.5);
      });

    // Drag
    const drag = d3
      .drag<SVGGElement, NodeDatum>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    // Zoom + pan
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform.toString());
      });
    svg.call(zoom);

    // Tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as NodeDatum).x ?? 0)
        .attr("y1", (d) => (d.source as NodeDatum).y ?? 0)
        .attr("x2", (d) => (d.target as NodeDatum).x ?? 0)
        .attr("y2", (d) => (d.target as NodeDatum).y ?? 0);

      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
