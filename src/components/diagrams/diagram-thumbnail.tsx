import type { CaseStudy } from "@/data/case-studies";

type Variant = CaseStudy["diagram"];

const nodePositions: Record<Variant, { x: number; y: number }[]> = {
  vision: [
    { x: 40, y: 90 },
    { x: 130, y: 50 },
    { x: 130, y: 130 },
    { x: 220, y: 90 },
    { x: 300, y: 50 },
    { x: 300, y: 130 },
  ],
  robotics: [
    { x: 30, y: 90 },
    { x: 110, y: 50 },
    { x: 110, y: 130 },
    { x: 200, y: 90 },
    { x: 280, y: 60 },
    { x: 280, y: 120 },
  ],
  pipeline: [
    { x: 30, y: 60 },
    { x: 30, y: 120 },
    { x: 130, y: 90 },
    { x: 220, y: 90 },
    { x: 300, y: 50 },
    { x: 300, y: 130 },
  ],
  ml: [
    { x: 30, y: 90 },
    { x: 110, y: 90 },
    { x: 190, y: 50 },
    { x: 190, y: 130 },
    { x: 270, y: 90 },
    { x: 300, y: 40 },
  ],
};

const edges: Record<Variant, [number, number][]> = {
  vision: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]],
  robotics: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]],
  pipeline: [[0, 2], [1, 2], [2, 3], [3, 4], [3, 5]],
  ml: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [4, 5]],
};

export function DiagramThumbnail({ variant }: { variant: Variant }) {
  const nodes = nodePositions[variant];
  const links = edges[variant];

  return (
    <svg
      viewBox="0 0 320 180"
      className="absolute inset-0 h-full w-full opacity-90 transition-transform duration-500 group-hover:scale-105"
      aria-hidden
    >
      <defs>
        <radialGradient id={`glow-${variant}`} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill={`url(#glow-${variant})`} />
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1.25}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={i === Math.floor(nodes.length / 2) ? 7 : 5} fill="rgba(9,9,11,0.9)" stroke="rgba(59,130,246,0.8)" strokeWidth={1.5} />
          <circle cx={n.x} cy={n.y} r={2} fill="#3b82f6" />
        </g>
      ))}
    </svg>
  );
}
