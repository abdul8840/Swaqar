import React, { useState, useEffect, useRef } from "react";
import MapImg from "../../assets/map.png";

// ============================================================
// CONSTANTS & DATA
// ============================================================

const MAP_IMAGE = MapImg;

// Node positions as percentages of map container (tweaked to match map geography)
const ORIGIN_NODES = [
  {
    id: "yaounde",
    label: "YAOUNDÉ",
    sub: "Cameroon",
    xPct: 38.5,
    yPct: 62.5,
  },
  {
    id: "douala",
    label: "DOUALA",
    sub: "Cameroon",
    xPct: 35.0,
    yPct: 61.0,
  },
  {
    id: "lagos",
    label: "LAGOS",
    sub: "Nigeria",
    xPct: 31.8,
    yPct: 55.5,
  },
];

const DEST_NODES = [
  {
    id: "riyadh",
    label: "RIYADH",
    sub: "Saudi Arabia",
    xPct: 74.5,
    yPct: 20.0,
  },
  {
    id: "dubai",
    label: "DUBAI",
    sub: "UAE",
    xPct: 84.5,
    yPct: 19.5,
  },
  {
    id: "jeddah",
    label: "JEDDAH",
    sub: "Saudi Arabia",
    xPct: 68.5,
    yPct: 30.5,
  },
];

const ACTIVE_CORRIDORS = [
  { from: "lagos", to: "riyadh", travelers: 3, duration: 4.5 },
  { from: "douala", to: "jeddah", travelers: 3, duration: 5.0 },
  { from: "yaounde", to: "dubai", travelers: 3, duration: 5.5 },
  { from: "yaounde", to: "riyadh", travelers: 2, duration: 4.8 },
  { from: "lagos", to: "jeddah", travelers: 2, duration: 4.2 },
];

const POTENTIAL_CORRIDORS = [
  { from: "douala", to: "riyadh" },
  { from: "yaounde", to: "jeddah" },
];

const FOOTER_ITEMS = [
  {
    icon: "shield",
    title: "VERIFIED",
    sub: "Multi-layer validation",
  },
  {
    icon: "hammer",
    title: "COORDINATED",
    sub: "Structured execution",
  },
  {
    icon: "lock",
    title: "GOVERNED",
    sub: "Rules. Compliance. Trust.",
  },
  {
    icon: "check",
    title: "NON-CUSTODIAL",
    sub: "We do not hold funds or goods",
  },
];

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function getNodeById(id) {
  return (
    ORIGIN_NODES.find((n) => n.id === id) ||
    DEST_NODES.find((n) => n.id === id)
  );
}

function pctToSvg(xPct, yPct, W, H) {
  return { x: (xPct / 100) * W, y: (yPct / 100) * H };
}

function buildCurvedPath(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx1 = x1 + dx * 0.3;
  const cy1 = y1 - Math.abs(dy) * 0.45;
  const cx2 = x1 + dx * 0.7;
  const cy2 = y2 - Math.abs(dy) * 0.2;
  return `M ${x1} ${y1} C ${cx1} ${cy1} ${cx2} ${cy2} ${x2} ${y2}`;
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

// ── Animated SVG Icons ──────────────────────────────────────

function IconShield() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#d4a017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L4 6v6c0 5.25 3.5 9.74 8 11 4.5-1.26 8-5.75 8-11V6l-8-4z" />
      <polyline points="9,12 11,14 15,10" />
    </svg>
  );
}

function IconHammer() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#d4a017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 12l-8.5 8.5a1.5 1.5 0 01-2-2L13 10" />
      <path d="M14 6l4 4" />
      <path d="M18 2l4 4-1.5 1.5-4-4L18 2z" />
      <path d="M10 4L8 6l2 2" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#d4a017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <circle cx="12" cy="16" r="1" fill="#d4a017" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#d4a017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="9,12 11,14 15,10" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#d4a017"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="2 4" />
    </svg>
  );
}

function getFooterIcon(icon) {
  switch (icon) {
    case "shield":
      return <IconShield />;
    case "hammer":
      return <IconHammer />;
    case "lock":
      return <IconLock />;
    case "check":
      return <IconCheckCircle />;
    default:
      return null;
  }
}

// ── Telemetry Bars ──────────────────────────────────────────

function TelemetryBars() {
  const heights = [8, 14, 10, 18, 12, 16, 9];
  return (
    <div className="flex items-end gap-[2px] h-5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[3px] bg-[#d4a017] rounded-sm origin-bottom"
          style={{
            height: `${h}px`,
            animation: `telemetryBar 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── Metric Row ──────────────────────────────────────────────

function MetricRow({ label, value, isLive, delay }) {
  return (
    <div
      className="flex justify-between items-center py-1.5 border-b border-white/5"
      style={{ animation: `fadeIn 0.5s ease-out ${delay}s both` }}
    >
      <span className="text-[8px] md:text-[9px] tracking-wider text-gray-400 uppercase">
        {label}
      </span>
      {isLive ? (
        <span
          className="text-[10px] font-bold text-green-400"
          style={{ animation: "blink 1.4s ease-in-out infinite" }}
        >
          LIVE
        </span>
      ) : (
        <span className="text-[10px] font-bold text-white tabular-nums">
          {value}
        </span>
      )}
    </div>
  );
}

// ── Legend Item ─────────────────────────────────────────────

function LegendItem({ type, label }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      {type === "solid" ? (
        <svg width="32" height="10" className="flex-shrink-0">
          <defs>
            <linearGradient id="legendGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#d4a017" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="5"
            x2="26"
            y2="5"
            stroke="url(#legendGrad)"
            strokeWidth="1.8"
          />
          <polygon points="24,2 32,5 24,8" fill="#d4a017" />
        </svg>
      ) : (
        <svg width="32" height="10" className="flex-shrink-0">
          <line
            x1="0"
            y1="5"
            x2="32"
            y2="5"
            stroke="#d4a01788"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        </svg>
      )}
      <span className="text-[8px] tracking-[0.12em] text-gray-400 uppercase">
        {label}
      </span>
    </div>
  );
}

// ── Footer Pillar ───────────────────────────────────────────

function FooterPillar({ item, delay }) {
  return (
    <div
      className="flex items-center gap-2 md:gap-3 group"
      style={{ animation: `slideInUp 0.6s ease-out ${delay}s both` }}
    >
      <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_#d4a017]">
        {getFooterIcon(item.icon)}
      </div>
      <div>
        <p className="text-[9px] md:text-[10px] font-bold tracking-[0.14em] text-white">
          {item.title}
        </p>
        <p className="text-[8px] md:text-[9px] text-gray-500 mt-0.5">
          {item.sub}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// MAP SVG OVERLAY
// ============================================================

function MapOverlay({ hoveredNode, setHoveredNode, mapSize }) {
  const W = mapSize.width || 800;
  const H = mapSize.height || 500;

  // Convert node percentages to SVG pixels
  const allNodes = [...ORIGIN_NODES, ...DEST_NODES].map((n) => ({
    ...n,
    ...pctToSvg(n.xPct, n.yPct, W, H),
  }));

  const originSvg = ORIGIN_NODES.map((n) => ({
    ...n,
    ...pctToSvg(n.xPct, n.yPct, W, H),
  }));
  const destSvg = DEST_NODES.map((n) => ({
    ...n,
    ...pctToSvg(n.xPct, n.yPct, W, H),
  }));

  function getNodeSvg(id) {
    return allNodes.find((n) => n.id === id);
  }

  const activePathData = ACTIVE_CORRIDORS.map((c, i) => {
    const from = getNodeSvg(c.from);
    const to = getNodeSvg(c.to);
    if (!from || !to) return null;
    return {
      ...c,
      id: `ac-${i}`,
      d: buildCurvedPath(from.x, from.y, to.x, to.y),
      from,
      to,
    };
  }).filter(Boolean);

  const potentialPathData = POTENTIAL_CORRIDORS.map((c, i) => {
    const from = getNodeSvg(c.from);
    const to = getNodeSvg(c.to);
    if (!from || !to) return null;
    return {
      ...c,
      id: `pc-${i}`,
      d: buildCurvedPath(from.x, from.y, to.x, to.y),
    };
  }).filter(Boolean);

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    >
      <defs>
        {/* Glow filters */}
        <filter id="glowGold" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowGoldStrong" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowGreen" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowGreenStrong" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Corridor gradient */}
        <linearGradient id="corrGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#d4a017" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d4a017" stopOpacity="0.9" />
        </linearGradient>

        {/* Origin node glow */}
        <radialGradient id="originAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="destAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4a017" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d4a017" stopOpacity="0" />
        </radialGradient>

        {/* Path defs for animateMotion */}
        {activePathData.map((p) => (
          <path key={`def-${p.id}`} id={`pathdef-${p.id}`} d={p.d} />
        ))}
      </defs>

      {/* ── Potential corridors ── */}
      {potentialPathData.map((p) => (
        <g key={p.id}>
          <path
            d={p.d}
            fill="none"
            stroke="#d4a017"
            strokeWidth="1.2"
            strokeDasharray="5 7"
            opacity="0.3"
            style={{ animation: "dashFlow 2s linear infinite" }}
          />
        </g>
      ))}

      {/* ── Active corridors ── */}
      {activePathData.map((p, i) => {
        const isHov =
          hoveredNode === p.from?.id || hoveredNode === p.to?.id;
        return (
          <g key={p.id}>
            {/* Wide glow */}
            <path
              d={p.d}
              fill="none"
              stroke="#d4a017"
              strokeWidth={isHov ? 10 : 7}
              opacity={isHov ? 0.15 : 0.08}
              filter="url(#glowGoldStrong)"
              style={{ transition: "all 0.4s" }}
            />
            {/* Medium glow */}
            <path
              d={p.d}
              fill="none"
              stroke="#d4a017"
              strokeWidth={isHov ? 4 : 3}
              opacity={isHov ? 0.35 : 0.2}
              filter="url(#glowGold)"
              style={{ transition: "all 0.4s" }}
            />
            {/* Core line */}
            <path
              id={`path-${p.id}`}
              d={p.d}
              fill="none"
              stroke="#d4a017"
              strokeWidth={isHov ? 2.2 : 1.6}
              opacity={isHov ? 1 : 0.75}
              style={{
                transition: "all 0.4s",
                animation: `corridorPulse 3s ease-in-out ${i * 0.4}s infinite`,
              }}
            />

            {/* Traveling bright particles */}
            {Array.from({ length: p.travelers || 2 }).map((_, j) => (
              <g key={j} filter="url(#glowGold)">
                <circle r="2.8" fill="#ffd700" opacity="0.9">
                  <animateMotion
                    dur={`${p.duration + j * 0.5}s`}
                    begin={`${j * (p.duration / (p.travelers || 2))}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1"
                  >
                    <mpath href={`#pathdef-${p.id}`} />
                  </animateMotion>
                </circle>
                <circle r="1.4" fill="#ffffff" opacity="0.8">
                  <animateMotion
                    dur={`${p.duration + j * 0.5}s`}
                    begin={`${j * (p.duration / (p.travelers || 2))}s`}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#pathdef-${p.id}`} />
                  </animateMotion>
                </circle>
              </g>
            ))}

            {/* Plane icon */}
            <PlaneOnPath pathId={`pathdef-${p.id}`} delay={i * 0.8} dur={p.duration * 1.6} />
          </g>
        );
      })}

      {/* ── Origin Nodes (Green) ── */}
      {originSvg.map((node, i) => {
        const isHov = hoveredNode === node.id;
        return (
          <g
            key={node.id}
            style={{ pointerEvents: "all", cursor: "pointer" }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Aura */}
            <circle
              cx={node.x}
              cy={node.y}
              r="35"
              fill="url(#originAura)"
              opacity={isHov ? 0.8 : 0.5}
              style={{ transition: "opacity 0.3s" }}
            />
            {/* Pulse ring 1 */}
            <circle
              cx={node.x}
              cy={node.y}
              r="11"
              fill="none"
              stroke="#22c55e"
              strokeWidth="1"
              opacity="0.6"
              style={{
                animation: `pulseRingNode 2.6s ease-out ${i * 0.45}s infinite`,
                transformOrigin: `${node.x}px ${node.y}px`,
              }}
            />
            {/* Pulse ring 2 */}
            <circle
              cx={node.x}
              cy={node.y}
              r="17"
              fill="none"
              stroke="#22c55e"
              strokeWidth="0.6"
              opacity="0.35"
              style={{
                animation: `pulseRingNode 2.6s ease-out ${i * 0.45 + 0.55}s infinite`,
                transformOrigin: `${node.x}px ${node.y}px`,
              }}
            />
            {/* Pulse ring 3 */}
            <circle
              cx={node.x}
              cy={node.y}
              r="24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="0.4"
              opacity="0.18"
              style={{
                animation: `pulseRingNode 2.6s ease-out ${i * 0.45 + 1.0}s infinite`,
                transformOrigin: `${node.x}px ${node.y}px`,
              }}
            />
            {/* Outer ring static */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isHov ? 9 : 7}
              fill="#22c55e"
              opacity="0.2"
              filter="url(#glowGreenStrong)"
              style={{ transition: "r 0.25s" }}
            />
            {/* Core dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isHov ? 6.5 : 5}
              fill="#22c55e"
              filter="url(#glowGreen)"
              style={{
                transition: "r 0.25s",
                animation: `nodeGlowGreen 2.5s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
            {/* Inner bright */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isHov ? 3 : 2.2}
              fill="#a7f3d0"
              style={{ transition: "r 0.25s" }}
            />

            {/* Label card */}
            <OriginLabel node={node} isHov={isHov} />
          </g>
        );
      })}

      {/* ── Destination Nodes (Gold) ── */}
      {destSvg.map((node, i) => {
        const isHov = hoveredNode === node.id;
        return (
          <g
            key={node.id}
            style={{ pointerEvents: "all", cursor: "pointer" }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Aura */}
            <circle
              cx={node.x}
              cy={node.y}
              r="38"
              fill="url(#destAura)"
              opacity={isHov ? 0.8 : 0.5}
              style={{ transition: "opacity 0.3s" }}
            />
            {/* Pulse rings */}
            {[12, 20, 28].map((r, ri) => (
              <circle
                key={ri}
                cx={node.x}
                cy={node.y}
                r={r}
                fill="none"
                stroke="#d4a017"
                strokeWidth={ri === 0 ? 1 : ri === 1 ? 0.7 : 0.4}
                opacity={ri === 0 ? 0.6 : ri === 1 ? 0.35 : 0.18}
                style={{
                  animation: `pulseRingNode 2.8s ease-out ${
                    i * 0.4 + ri * 0.55
                  }s infinite`,
                  transformOrigin: `${node.x}px ${node.y}px`,
                }}
              />
            ))}
            {/* Core */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isHov ? 8 : 6.5}
              fill="#d4a017"
              filter="url(#glowGold)"
              style={{
                transition: "r 0.25s",
                animation: `nodeGlowGold 2.5s ease-in-out ${i * 0.35}s infinite`,
              }}
            />
            {/* Inner bright */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isHov ? 4 : 3}
              fill="#fef3c7"
              style={{ transition: "r 0.25s" }}
            />

            {/* Label card */}
            <DestLabel node={node} isHov={isHov} />
          </g>
        );
      })}
    </svg>
  );
}

// ── Node Labels ─────────────────────────────────────────────

function OriginLabel({ node, isHov }) {
  const pad = 6;
  const lw = node.label.length > 6 ? 70 : 62;
  const lh = 30;
  const lx = node.x - lw - 14;
  const ly = node.y - lh / 2;

  return (
    <g style={{ animation: "floatLabel 5s ease-in-out infinite" }}>
      {/* Connector line */}
      <line
        x1={node.x - 7}
        y1={node.y}
        x2={lx + lw}
        y2={ly + lh / 2}
        stroke="#22c55e"
        strokeWidth="0.6"
        opacity="0.4"
      />
      {/* Card */}
      <rect
        x={lx}
        y={ly}
        width={lw}
        height={lh}
        rx="3"
        fill="#050d14"
        stroke="#22c55e"
        strokeWidth={isHov ? 1.2 : 0.7}
        opacity="0.95"
        style={{ transition: "stroke-width 0.3s" }}
      />
      {/* Top accent line */}
      <rect x={lx} y={ly} width={lw} height="2" rx="1" fill="#22c55e" opacity="0.6" />
      <text
        x={lx + pad}
        y={ly + 12}
        fill="#22c55e"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="0.8"
      >
        {node.label}
      </text>
      <text
        x={lx + pad}
        y={ly + 23}
        fill="#94a3b8"
        fontSize="6.5"
      >
        {node.sub}
      </text>
    </g>
  );
}

function DestLabel({ node, isHov }) {
  const pad = 6;
  const lw = node.label.length > 6 ? 75 : 65;
  const lh = 30;
  const lx = node.x + 14;
  const ly = node.y - lh / 2;

  return (
    <g style={{ animation: "floatLabel 5s ease-in-out infinite" }}>
      {/* Connector line */}
      <line
        x1={node.x + 7}
        y1={node.y}
        x2={lx}
        y2={ly + lh / 2}
        stroke="#d4a017"
        strokeWidth="0.6"
        opacity="0.4"
      />
      {/* Card */}
      <rect
        x={lx}
        y={ly}
        width={lw}
        height={lh}
        rx="3"
        fill="#050d14"
        stroke="#d4a017"
        strokeWidth={isHov ? 1.2 : 0.7}
        opacity="0.95"
        style={{ transition: "stroke-width 0.3s" }}
      />
      {/* Top accent */}
      <rect x={lx} y={ly} width={lw} height="2" rx="1" fill="#d4a017" opacity="0.6" />
      <text
        x={lx + pad}
        y={ly + 12}
        fill="#d4a017"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="0.8"
      >
        {node.label}
      </text>
      <text
        x={lx + pad}
        y={ly + 23}
        fill="#94a3b8"
        fontSize="6.5"
      >
        {node.sub}
      </text>
    </g>
  );
}

// ── Plane on Path ───────────────────────────────────────────

function PlaneOnPath({ pathId, delay, dur }) {
  return (
    <g filter="url(#glowGold)">
      <animateMotion
        dur={`${dur}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        rotate="auto"
        calcMode="spline"
        keySplines="0.4 0 0.6 1"
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
      {/* Plane body */}
      <polygon points="-7,0 3,-2.5 3,2.5" fill="#ffd700" opacity="0.95" />
      {/* Wings */}
      <polygon points="-3,0 -7,-5 -5,0 -7,5" fill="#ffd700" opacity="0.5" />
      {/* Tail */}
      <polygon points="-7,0 -10,-3 -9,0 -10,3" fill="#ffd700" opacity="0.4" />
    </g>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CorridorAtlas() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [counters, setCounters] = useState({
    corridors: 0,
    origins: 0,
    destinations: 0,
  });
  const [mounted, setMounted] = useState(false);
  const mapRef = useRef(null);

  // Observe map container size
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setMapSize({ width, height });
    });
    obs.observe(el);
    setMapSize({ width: el.offsetWidth, height: el.offsetHeight });
    return () => obs.disconnect();
  }, []);

  // Mount animation trigger
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Count-up animation
  useEffect(() => {
    if (!mounted) return;
    const targets = { corridors: 3, origins: 3, destinations: 3 };
    let frame = 0;
    const total = 80;
    const id = setInterval(() => {
      frame++;
      const ease = 1 - Math.pow(1 - frame / total, 3);
      setCounters({
        corridors: Math.round(targets.corridors * ease),
        origins: Math.round(targets.origins * ease),
        destinations: Math.round(targets.destinations * ease),
      });
      if (frame >= total) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [mounted]);

  return (
    <div
      className="min-h-screen bg-[#060a10] text-white overflow-hidden relative"
    >
      {/* ── Global Styles ── */}
      <style>{`
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes pulseRingNode {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.15; }
        }
        @keyframes nodeGlowGreen {
          0%, 100% { filter: drop-shadow(0 0 5px #22c55e) drop-shadow(0 0 10px #22c55e); }
          50%       { filter: drop-shadow(0 0 12px #4ade80) drop-shadow(0 0 24px #4ade80); }
        }
        @keyframes nodeGlowGold {
          0%, 100% { filter: drop-shadow(0 0 5px #d4a017) drop-shadow(0 0 10px #d4a017); }
          50%       { filter: drop-shadow(0 0 12px #ffd700) drop-shadow(0 0 24px #ffd700); }
        }
        @keyframes corridorPulse {
          0%, 100% { opacity: 0.75; stroke-width: 1.6; }
          50%       { opacity: 1;    stroke-width: 2.2; }
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -36; }
        }
        @keyframes floatLabel {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes telemetryBar {
          0%, 100% { transform: scaleY(0.35); opacity: 0.6; }
          50%       { transform: scaleY(1);    opacity: 1; }
        }
        @keyframes mapLoad {
          from { opacity: 0; transform: scale(0.985); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 0 0 #d4a01766; }
          50%       { box-shadow: 0 0 0 6px #d4a01700; }
        }
        @keyframes headerReveal {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes panelReveal {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes footerReveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .panel-glass {
          background: linear-gradient(135deg, rgba(5,12,22,0.94) 0%, rgba(8,16,28,0.90) 100%);
          border: 1px solid rgba(212,160,23,0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .panel-glass:hover {
          border-color: rgba(212,160,23,0.32);
        }

        .grid-bg {
          background-image:
            radial-gradient(circle at 20% 80%, rgba(34,197,94,0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(212,160,23,0.05) 0%, transparent 50%),
            linear-gradient(rgba(212,160,23,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,160,23,0.025) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 36px 36px, 36px 36px;
        }

        .scanline-el {
          position: fixed;
          left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, rgba(212,160,23,0.12) 30%, rgba(212,160,23,0.2) 50%, rgba(212,160,23,0.12) 70%, transparent 100%);
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 100;
        }

        .status-dot-live {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #d4a017;
          animation: blink 1.5s ease-in-out infinite, statusPulse 1.5s ease-in-out infinite;
          box-shadow: 0 0 8px #d4a017;
        }

        .telemetry-bar {
          display: inline-block;
          width: 3px;
          background: linear-gradient(to top, #d4a017, #ffd700);
          border-radius: 1.5px;
          transform-origin: bottom center;
        }

        .map-wrapper {
          animation: mapLoad 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s both;
        }

        .header-anim {
          animation: headerReveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .panel-anim {
          animation: panelReveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both;
        }
        .footer-anim {
          animation: footerReveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-track { background: #060a10; }
        ::-webkit-scrollbar-thumb { background: #d4a01744; border-radius: 4px; }
      `}</style>

      {/* Scanline */}
      <div className="scanline-el" />

      {/* Background grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Main layout */}
      <div className="relative flex flex-col min-h-screen z-10">

        {/* ══ HEADER ══════════════════════════════════════════════════════ */}
        <header className="header-anim flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4 flex-shrink-0">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <p className="text-[9px] sm:text-[10px] tracking-[0.28em] text-[#d4a017] mb-2 opacity-75 font-medium">
              SWAQAR LTD — CORRIDORS OF TRUST
            </p>
            {/* Main title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <span>Africa</span>
              <span
                className="text-[#d4a017] inline-block"
                style={{ animation: "nodeGlowGold 3s ease-in-out infinite" }}
              >
                ⇌
              </span>
              <span>Middle East Corridors</span>
            </h1>
            {/* Tagline */}
            <p className="text-[9px] sm:text-[11px] tracking-[0.22em] text-[#d4a017] mt-2 sm:mt-3 font-medium opacity-85">
              TRUSTED CONNECTIONS. VERIFIED TRADE. SHARED PROSPERITY.
            </p>
            
            {/* Status indicator - moved below tagline for centered layout */}
            <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
              <span className="text-[9px] sm:text-[10px] tracking-[0.16em] text-gray-300 font-medium">
                STATUS
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-300">·</span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.16em] text-[#d4a017] font-bold">
                LIVE
              </span>
              <div className="status-dot-live" />
            </div>
          </div>
        </header>

        {/* ══ BODY ════════════════════════════════════════════════════════ */}
        <div className="flex-1 flex flex-col items-center px-4 sm:px-6 py-4 min-h-0">
          
          {/* Map container with consistent dimensions */}
          <div className="w-full max-w-6xl mx-auto">
            <main className="relative w-full rounded-lg overflow-hidden shadow-2xl h-[280px] sm:h-[480px] md:h-[520px] lg:h-[600px]">
              <div
                ref={mapRef}
                className="map-wrapper absolute inset-0 rounded-lg overflow-hidden border border-[#d4a017]/20"
              >
                {/* Map image */}
                <img
                  src={MAP_IMAGE}
                  alt="Africa Middle East Map"
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.92 }}
                  onError={(e) => {
                    // Fallback dark background if image not found
                    e.target.style.display = "none";
                  }}
                />

                {/* Dark vignette overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 40%, rgba(4,8,14,0.6) 100%)",
                  }}
                />

                {/* Edge fade */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(6,10,16,0.55) 0%, transparent 12%, transparent 88%, rgba(6,10,16,0.55) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(6,10,16,0.4) 0%, transparent 8%, transparent 85%, rgba(6,10,16,0.7) 100%)",
                  }}
                />

                {/* SVG overlay for corridors and nodes */}
                {mapSize.width > 0 && (
                  <MapOverlay
                    hoveredNode={hoveredNode}
                    setHoveredNode={setHoveredNode}
                    mapSize={mapSize}
                  />
                )}
              </div>

              {/* ── Legend (bottom-right) ── */}
              <div
                className="absolute bottom-3 right-3 panel-glass rounded-lg p-2.5 sm:p-3 z-30"
                style={{ animation: "fadeIn 1.2s ease-out 1s both" }}
              >
                <LegendItem type="solid" label="Active Corridor" />
                <LegendItem type="dashed" label="Potential Corridor" />
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                  <span className="text-[7px] sm:text-[8px] tracking-[0.1em] text-gray-400 uppercase">
                    Data Telemetry
                  </span>
                  <TelemetryBars />
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
        <footer className="footer-anim flex-shrink-0 border-t border-[#d4a017]/15 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 mt-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {FOOTER_ITEMS.map((item, i) => (
                <FooterPillar
                  key={item.title}
                  item={item}
                  delay={0.7 + i * 0.08}
                />
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}