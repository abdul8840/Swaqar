import React, { useMemo } from "react";
import {
    Leaf,
    Tractor,
    Box,
    Factory,
    Landmark,
    ShieldCheck,
    BadgeDollarSign,
    FileText,
    Handshake,
    Shield,
    Cog,
    Globe,
    Package,
    Layers,
    Lock,
    CheckCircle2,
    Users,
    Workflow,
    Radar,
    Route,
} from "lucide-react";

import AfricaMapImg from "../../assets/africa2.png";
import MEMapImg from "../../assets/middleEast.png";
import AsiaMapImg from "../../assets/asia.png";

const MAPS = {
    africa: AfricaMapImg,
    middleEast: MEMapImg,
    asia: AsiaMapImg,
};

/**
 * Master coordinate system (matches Connections viewBox)
 * Use these anchors to align endpoints EXACTLY with your maps.
 * If something is a few px off in your build, adjust here only.
 */
const CANVAS = { w: 1200, h: 680 };
const ANCHORS = {
    // circles centers and radius
    africa: { cx: 250, cy: 320, r: 165 },
    middle: { cx: 600, cy: 260, r: 165 },
    asia: { cx: 950, cy: 320, r: 165 },

    // line endpoints (nodes) — align to where the corridor touches each circle
    leftNode: { x: 350, y: 350 }, // on Africa circle edge (right side)
    rightNode: { x: 850, y: 350 }, // on Asia circle edge (left side)
    midNode: { x: 600, y: 300 }, // under Middle East circle
    coinNode: { x: 600, y: 525 }, // top of SWAQAR coin/arc area
};

const TitleSerif = ({ children, className = "" }) => (
    <div className={["font-serif tracking-wide", className].join(" ")}>{children}</div>
);

function DotNode({ tone = "gold", size = 18, className = "" }) {
    const toneMap = {
        green: {
            ring: "rgba(16,185,129,0.55)",
            core: "rgba(16,185,129,0.95)",
            halo: "rgba(16,185,129,0.16)",
            shadow: "rgba(16,185,129,0.7)",
        },
        gold: {
            ring: "rgba(245,158,11,0.65)",
            core: "rgba(245,158,11,0.95)",
            halo: "rgba(245,158,11,0.16)",
            shadow: "rgba(245,158,11,0.75)",
        },
        blue: {
            ring: "rgba(56,189,248,0.65)",
            core: "rgba(56,189,248,0.95)",
            halo: "rgba(56,189,248,0.16)",
            shadow: "rgba(56,189,248,0.75)",
        },
        white: {
            ring: "rgba(255,255,255,0.65)",
            core: "rgba(255,255,255,0.95)",
            halo: "rgba(255,255,255,0.12)",
            shadow: "rgba(255,255,255,0.7)",
        },
    };
    const t = toneMap[tone] || toneMap.gold;

    return (
        <div className={["relative grid place-items-center", className].join(" ")} style={{ width: size, height: size }}>
            <div
                className="absolute inset-0 rounded-full animate-pulseRing"
                style={{ border: `1px solid ${t.ring}`, boxShadow: `0 0 18px ${t.shadow}` }}
            />
            <div
                className="absolute inset-[-12px] rounded-full"
                style={{ background: `radial-gradient(circle, ${t.halo} 0%, transparent 70%)` }}
            />
            <div
                className="rounded-full"
                style={{
                    width: Math.max(5, Math.floor(size * 0.35)),
                    height: Math.max(5, Math.floor(size * 0.35)),
                    background: t.core,
                    boxShadow: `0 0 14px ${t.shadow}`,
                }}
            />
        </div>
    );
}

function IconStackItem({ icon: Icon, label, tone = "gold" }) {
    const toneMap = {
        green: {
            border: "border-emerald-400/25",
            icon: "text-emerald-200",
            glow: "shadow-[0_0_22px_rgba(16,185,129,0.12)]",
        },
        gold: {
            border: "border-amber-300/25",
            icon: "text-amber-200",
            glow: "shadow-[0_0_22px_rgba(245,158,11,0.10)]",
        },
        blue: {
            border: "border-sky-300/25",
            icon: "text-sky-200",
            glow: "shadow-[0_0_22px_rgba(56,189,248,0.10)]",
        },
    };
    const t = toneMap[tone];

    return (
        <div className="flex flex-col items-center gap-2 text-center">
            <div className={["w-12 h-12 rounded-full grid place-items-center bg-black/35 border", t.border, t.glow].join(" ")}>
                <Icon className={["w-5 h-5", t.icon].join(" ")} strokeWidth={1.5} />
            </div>
            <div className="text-[11px] text-zinc-200/85 whitespace-pre-line leading-tight">
                {label}
            </div>
        </div>
    );
}

/** Desktop circle (absolute on canvas) */
function RegionAbs({ name, subtitle, tone, mapSrc, cx, cy, r }) {
    const toneMap = {
        green: { ring: "border-emerald-300/18", dash: "border-emerald-300/12", title: "text-emerald-200" },
        gold: { ring: "border-amber-300/18", dash: "border-amber-300/12", title: "text-amber-200" },
        blue: { ring: "border-sky-300/18", dash: "border-sky-300/12", title: "text-sky-200" },
    };
    const t = toneMap[tone];

    // convert canvas coords -> percent
    const left = `${(cx / CANVAS.w) * 100}%`;
    const top = `${(cy / CANVAS.h) * 100}%`;
    const size = `${((r * 2) / CANVAS.w) * 100}%`; // width in % based on canvas width
    // keep circles visually circular with aspect-ratio
    return (
        <div className="absolute" style={{ left, top, transform: "translate(-50%, -50%)", width: size }}>
            {/* headings */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[120%] text-center">
                <TitleSerif className={["text-2xl md:text-3xl", t.title].join(" ")}>
                    {name}
                </TitleSerif>
                <div className="mt-1 text-[14px] md:text-[15px] text-zinc-100/90 whitespace-pre-line leading-tight">
                    {subtitle}
                </div>
            </div>

            <div className="relative aspect-square">
                <div className={["absolute inset-0 rounded-full border opacity-80", t.dash].join(" ")} style={{ borderStyle: "dashed" }} />
                <div className={["absolute inset-0 rounded-full border overflow-hidden bg-black/25", t.ring].join(" ")}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.08),transparent_64%)]" />
                    <img src={mapSrc} alt={name} className="absolute inset-0 w-full h-full object-contain opacity-95" draggable={false} />
                    {/* spark nodes */}
                    <div className="absolute inset-0">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <span
                                key={i}
                                className="absolute rounded-full animate-twinkle"
                                style={{
                                    width: 3,
                                    height: 3,
                                    left: `${(i * 11 + 16) % 84}%`,
                                    top: `${(i * 15 + 18) % 78}%`,
                                    background:
                                        tone === "green"
                                            ? "rgba(16,185,129,0.9)"
                                            : tone === "blue"
                                                ? "rgba(56,189,248,0.9)"
                                                : "rgba(245,158,11,0.9)",
                                    boxShadow:
                                        tone === "green"
                                            ? "0 0 14px rgba(16,185,129,0.8)"
                                            : tone === "blue"
                                                ? "0 0 14px rgba(56,189,248,0.75)"
                                                : "0 0 14px rgba(245,158,11,0.75)",
                                    opacity: 0.65,
                                    animationDelay: `${(i % 6) * 0.35}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/** SVG Connections (gold+white) using anchors */
function Connections() {
    const L = ANCHORS.leftNode;
    const R = ANCHORS.rightNode;
    const M = ANCHORS.midNode;
    const C = ANCHORS.coinNode;

    // Curves tuned to match image (gentle down to coin)
    const leftCurve = `M ${L.x} ${L.y} C ${L.x + 160} ${L.y}, ${C.x - 160} ${C.y}, ${C.x} ${C.y}`;
    const rightCurve = `M ${R.x} ${R.y} C ${R.x - 160} ${R.y}, ${C.x + 160} ${C.y}, ${C.x} ${C.y}`;
    const midLine = `M ${M.x} ${M.y} L ${C.x} ${C.y}`;

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 680" preserveAspectRatio="none">
            <defs>
                <filter id="glowW" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="3.4" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="glowG" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="2.4" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <linearGradient id="whiteLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.05" />
                    <stop offset="50%" stopColor="#fff" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0.05" />
                </linearGradient>

                <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.08" />
                    <stop offset="55%" stopColor="#fbbf24" stopOpacity="0.72" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.12" />
                </linearGradient>
            </defs>

            {/* LEFT */}
            <path d={leftCurve} fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="18" strokeLinecap="round" />
            <path d={leftCurve} fill="none" stroke="url(#whiteLine)" strokeWidth="6" strokeLinecap="round" filter="url(#glowW)" />
            <path d={leftCurve} fill="none" stroke="url(#goldLine)" strokeWidth="2" strokeLinecap="round" filter="url(#glowG)" />

            {/* RIGHT */}
            <path d={rightCurve} fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="18" strokeLinecap="round" />
            <path d={rightCurve} fill="none" stroke="url(#whiteLine)" strokeWidth="6" strokeLinecap="round" filter="url(#glowW)" />
            <path d={rightCurve} fill="none" stroke="url(#goldLine)" strokeWidth="2" strokeLinecap="round" filter="url(#glowG)" />

            {/* MIDDLE */}
            <path d={midLine} fill="none" stroke="#fbbf24" strokeOpacity="0.08" strokeWidth="14" strokeLinecap="round" />
            <path d={midLine} fill="none" stroke="#fbbf24" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" filter="url(#glowG)" />

            {/* traveling dots */}
            <circle r="4.5" fill="#fff" filter="url(#glowW)">
                <animateMotion dur="2.2s" repeatCount="indefinite" path={leftCurve} />
                <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" />
            </circle>

            <circle r="4.5" fill="#fff" filter="url(#glowW)">
                <animateMotion dur="2.2s" begin="0.75s" repeatCount="indefinite" path={rightCurve} />
                <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" />
            </circle>

            <circle r="4" fill="#fbbf24" filter="url(#glowG)">
                <animateMotion dur="1.9s" repeatCount="indefinite" path={midLine} />
                <animate attributeName="opacity" values="0;1;1;0" dur="1.9s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

function CenterSwaqar() {
    return (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: `${(510 / CANVAS.h) * 100}%` }}>
            {/* big arc */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-20 w-[880px] h-[380px] rounded-t-full border border-white/10 bg-[radial-gradient(ellipse_80%_55%_at_50%_90%,rgba(255,255,255,0.10),transparent_60%)]" />

            <div className="relative flex flex-col items-center">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full blur-2xl bg-amber-400/20" />
                    <div className="relative w-28 h-28 rounded-full border border-amber-300/35 bg-black/60 grid place-items-center shadow-[0_0_50px_rgba(245,158,11,0.18)]">
                        <div className="absolute inset-2 rounded-full border border-amber-300/20" style={{ borderStyle: "dashed" }} />
                        <div className="absolute inset-0 rounded-full border border-amber-300/20 animate-spin-slow" style={{ borderStyle: "dashed" }} />
                        <svg viewBox="0 0 64 64" className="w-14 h-14">
                            <path d="M14 24 L32 14 L50 24 L44 28 L32 22 L20 28 Z" fill="rgba(245,158,11,0.95)" />
                            <path d="M14 40 L32 50 L50 40 L44 36 L32 42 L20 36 Z" fill="rgba(245,158,11,0.95)" />
                            <path d="M20 30 L32 24 L44 30 L32 36 Z" fill="rgba(245,158,11,0.65)" />
                        </svg>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <div className="font-serif text-4xl tracking-wide">SWAQAR</div>
                    <div className="text-[12px] tracking-[0.25em] uppercase text-amber-200/85">
                        COORDINATION &amp; VERIFICATION LAYER
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Bottom blocks - FIXED STATS with proper layout */
function Legend() {
    return (
        <div className="w-[300px] border border-white/10 bg-black/35 rounded-xl p-5 backdrop-blur-sm">
            <div className="text-[12px] tracking-[0.25em] text-amber-200/90 font-semibold uppercase mb-4">
                LEGEND
            </div>
            <div className="space-y-3 text-[12px] text-zinc-200/85">
                <div className="flex items-center gap-3"><span className="w-10 h-[2px] bg-emerald-400/80 rounded-full" /><span>Supply &amp; Opportunity Flow</span></div>
                <div className="flex items-center gap-3"><span className="w-10 h-[2px] bg-amber-300/85 rounded-full" /><span>Capital &amp; Trust Flow</span></div>
                <div className="flex items-center gap-3"><span className="w-10 h-[2px] bg-sky-300/85 rounded-full" /><span>Industrial &amp; Market Flow</span></div>
                <div className="flex items-center gap-3"><span className="w-10 h-[2px] bg-white/85 rounded-full" /><span>SWAQAR Coordination Flow</span></div>
            </div>
        </div>
    );
}

// FIXED STATS COMPONENT - better layout, consistent spacing
function Stats() {
    const statsData = [
        { 
            icon: ShieldCheck, 
            title: "Verification", 
            description: "Counterparty Verification\n& Due Diligence" 
        },
        { 
            icon: Radar, 
            title: "Institutional Trust", 
            description: "Governance, Compliance\n& Risk Controls" 
        },
        { 
            icon: Workflow, 
            title: "Corridor Execution", 
            description: "Transaction Coordination\n& Workflow Control" 
        },
        { 
            icon: Users, 
            title: "Stakeholder\nSynchronization", 
            description: "Aligned Ecosystem\n& Information Flow" 
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-3 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm hover:border-amber-300/20 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-full border border-amber-300/25 bg-black/35 grid place-items-center mb-3 group-hover:shadow-[0_0_22px_rgba(245,158,11,0.15)] transition-all duration-300">
                        <stat.icon className="w-6 h-6 text-amber-200/80 group-hover:text-amber-200 transition-colors" strokeWidth={1.5} />
                    </div>
                    <div className="text-[13px] font-medium text-zinc-100 mb-1">{stat.title}</div>
                    <div className="text-[11px] text-zinc-200/65 whitespace-pre-line leading-snug max-w-[140px]">
                        {stat.description}
                    </div>
                </div>
            ))}
        </div>
    );
}

function InfoCard() {
    return (
        <div className="w-[300px] border border-white/10 bg-black/35 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-amber-300/25 bg-black/35 grid place-items-center shadow-[0_0_22px_rgba(245,158,11,0.12)] flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-amber-200" strokeWidth={1.5} />
                </div>
                <div className="text-[13px] leading-relaxed text-zinc-200/85">
                    <span className="text-zinc-100 font-medium">SWAQAR is the trusted</span> Trade Coordination Layer
                    that connects supply, capital, and industry through verification, trust, and execution.
                </div>
            </div>
        </div>
    );
}

function CorridorFeatures() {
    const items = [
        { icon: CheckCircle2, title: "Verification-First", desc: "Trust built through structured verification" },
        { icon: Lock, title: "Non-Custodial", desc: "No funds or assets are held" },
        { icon: Layers, title: "Asset-Light", desc: "Coordination without owning assets" },
        { icon: Landmark, title: "Governance-Led", desc: "Institutional discipline and compliance" },
        { icon: Route, title: "Corridor-First", desc: "Focused on trade corridors, not ownership" },
        { icon: Globe, title: "Africa ⇌ Middle East ⇌ Asia", desc: "One trusted trade ecosystem across three regions" },
    ];

    return (
        <div className="border border-white/10 bg-black/35 rounded-xl p-6 backdrop-blur-sm">
            <div className="text-center mb-6">
                <div className="text-[12px] tracking-[0.25em] text-amber-200/90 font-semibold uppercase">
                    CORRIDOR FEATURES
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                {items.map((it, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                        <div className="p-2 rounded-full border border-white/10 bg-black/35 grid place-items-center flex-shrink-0 group-hover:border-amber-300/30 transition-colors">
                            <it.icon className="w-8 h-8 text-amber-200/80 group-hover:text-zinc-200/75 transition-colors" strokeWidth={1.5} />
                        </div>
                        <div>
                            <div className="text-[12px] text-zinc-100 font-medium">{it.title}</div>
                            <div className="text-[11px] text-zinc-200/65 leading-snug mt-1">{it.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/** Mobile version (enhanced with better spacing and stats) */
function MobileLayout() {
    const leftStack = [
        { icon: Leaf, label: "Natural\nResources", tone: "green" },
        { icon: Tractor, label: "Agriculture", tone: "green" },
        { icon: Box, label: "Raw Materials", tone: "green" },
        { icon: Factory, label: "Manufacturing\n& Production", tone: "green" },
    ];

    const midLeftStack = [
        { icon: Landmark, label: "Sovereign\nCapital", tone: "gold" },
        { icon: ShieldCheck, label: "Financial\nInstitutions", tone: "gold" },
        { icon: BadgeDollarSign, label: "Trade Finance &\nInvestment", tone: "gold" },
    ];

    const midRightStack = [
        { icon: FileText, label: "Policies &\nRegulations", tone: "gold" },
        { icon: Handshake, label: "Strategic\nPartnerships", tone: "gold" },
        { icon: Shield, label: "Risk Mitigation &\nGuarantees", tone: "gold" },
    ];

    const rightStack = [
        { icon: Factory, label: "Industrial\nManufacturing", tone: "blue" },
        { icon: Cog, label: "Technology &\nInnovation", tone: "blue" },
        { icon: Package, label: "Large Scale\nProduction", tone: "blue" },
        { icon: Globe, label: "Global Market\nAccess", tone: "blue" },
    ];

    const statsData = [
        { icon: ShieldCheck, title: "Verification", description: "Counterparty Verification\n& Due Diligence" },
        { icon: Radar, title: "Institutional Trust", description: "Governance, Compliance\n& Risk Controls" },
        { icon: Workflow, title: "Corridor Execution", description: "Transaction Coordination\n& Workflow Control" },
        { icon: Users, title: "Stakeholder\nSynchronization", description: "Aligned Ecosystem\n& Information Flow" },
    ];

    return (
        <div className="space-y-6">
            {/* Africa */}
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
                <div className="text-center mb-4">
                    <TitleSerif className="text-3xl text-emerald-200">AFRICA</TitleSerif>
                    <div className="text-zinc-100/85 whitespace-pre-line text-sm">Verified Supply & Opportunity</div>
                </div>
                <div className="mx-auto w-[240px] max-w-full aspect-square rounded-full border border-emerald-300/18 bg-black/25 overflow-hidden relative">
                    <img src={MAPS.africa} alt="Africa" className="absolute inset-0 w-full h-full object-contain opacity-95" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                    {leftStack.map((it, i) => (
                        <IconStackItem key={i} icon={it.icon} label={it.label} tone={it.tone} />
                    ))}
                </div>
            </div>

            {/* Middle East */}
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
                <div className="text-center mb-4">
                    <TitleSerif className="text-3xl text-amber-200">MIDDLE EAST</TitleSerif>
                    <div className="text-zinc-100/85 whitespace-pre-line text-sm">Institutional Trust & Capital</div>
                </div>
                <div className="mx-auto w-[240px] max-w-full aspect-square rounded-full border border-amber-300/18 bg-black/25 overflow-hidden relative">
                    <img src={MAPS.middleEast} alt="Middle East" className="absolute inset-0 w-full h-full object-contain opacity-95" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                    {midLeftStack.map((it, i) => (
                        <IconStackItem key={i} icon={it.icon} label={it.label} tone={it.tone} />
                    ))}
                    {midRightStack.map((it, i) => (
                        <IconStackItem key={i} icon={it.icon} label={it.label} tone={it.tone} />
                    ))}
                </div>
            </div>

            {/* Asia */}
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
                <div className="text-center mb-4">
                    <TitleSerif className="text-3xl text-sky-200">ASIA</TitleSerif>
                    <div className="text-zinc-100/85 whitespace-pre-line text-sm">Industrial Scale & Manufacturing</div>
                </div>
                <div className="mx-auto w-[240px] max-w-full aspect-square rounded-full border border-sky-300/18 bg-black/25 overflow-hidden relative">
                    <img src={MAPS.asia} alt="Asia" className="absolute inset-0 w-full h-full object-contain opacity-95" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                    {rightStack.map((it, i) => (
                        <IconStackItem key={i} icon={it.icon} label={it.label} tone={it.tone} />
                    ))}
                </div>
            </div>

            {/* SWAQAR block */}
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 rounded-full border border-amber-300/35 bg-black/60 grid place-items-center shadow-[0_0_40px_rgba(245,158,11,0.16)]">
                        <div className="absolute w-24 h-24 rounded-full border border-amber-300/20 animate-spin-slow" style={{ borderStyle: "dashed" }} />
                        <svg viewBox="0 0 64 64" className="w-12 h-12">
                            <path d="M14 24 L32 14 L50 24 L44 28 L32 22 L20 28 Z" fill="rgba(245,158,11,0.95)" />
                            <path d="M14 40 L32 50 L50 40 L44 36 L32 42 L20 36 Z" fill="rgba(245,158,11,0.95)" />
                            <path d="M20 30 L32 24 L44 30 L32 36 Z" fill="rgba(245,158,11,0.65)" />
                        </svg>
                    </div>
                    <div className="mt-4 font-serif text-3xl">SWAQAR</div>
                    <div className="text-[11px] tracking-[0.25em] uppercase text-amber-200/85 mt-1">
                        COORDINATION & VERIFICATION LAYER
                    </div>
                </div>

                {/* Mobile Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                    {statsData.map((stat, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-black/20">
                            <div className="w-10 h-10 rounded-full border border-amber-300/25 bg-black/35 grid place-items-center flex-shrink-0">
                                <stat.icon className="w-5 h-5 text-amber-200/80" strokeWidth={1.5} />
                            </div>
                            <div>
                                <div className="text-[12px] text-zinc-100 font-medium">{stat.title}</div>
                                <div className="text-[10px] text-zinc-200/65 leading-snug mt-1">{stat.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom sections */}
            <Legend />
            <InfoCard />
            <CorridorFeatures />
        </div>
    );
}

export default function SwaqarCorridorsOfTrust() {
    const leftStack = useMemo(
        () => [
            { icon: Leaf, label: "Natural\nResources" },
            { icon: Tractor, label: "Agriculture" },
            { icon: Box, label: "Raw Materials" },
            { icon: Factory, label: "Manufacturing\n& Production" },
        ],
        []
    );

    const midLeftStack = useMemo(
        () => [
            { icon: Landmark, label: "Sovereign\nCapital" },
            { icon: ShieldCheck, label: "Financial\nInstitutions" },
            { icon: BadgeDollarSign, label: "Trade Finance &\nInvestment" },
        ],
        []
    );

    const midRightStack = useMemo(
        () => [
            { icon: FileText, label: "Policies &\nRegulations" },
            { icon: Handshake, label: "Strategic\nPartnerships" },
            { icon: Shield, label: "Risk Mitigation &\nGuarantees" },
        ],
        []
    );

    const rightStack = useMemo(
        () => [
            { icon: Factory, label: "Industrial\nManufacturing" },
            { icon: Cog, label: "Technology &\nInnovation" },
            { icon: Package, label: "Large Scale\nProduction" },
            { icon: Globe, label: "Global Market\nAccess" },
        ],
        []
    );

    return (
        <section className="relative bg-[#06070A] text-white overflow-hidden">
            {/* Enhanced background with more depth */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_18%,rgba(255,255,255,0.07),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_80%_at_50%_30%,transparent_40%,#06070A_85%)]" />
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(245,158,11,0.55) 1px, transparent 1px)",
                        backgroundSize: "36px 36px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
                {/* Header - Enhanced */}
                <div className="text-center mb-8 lg:mb-12">
                    <div className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-wide bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                        SWAQAR GROUP.
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />
                        <div className="text-[13px] tracking-[0.3em] text-amber-200/90 uppercase font-medium">
                            CORRIDORS OF TRUST
                        </div>
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />
                    </div>

                    <div className="mt-4 text-[14px] sm:text-[15px] text-zinc-200/80 max-w-2xl mx-auto">
                        Trusted Trade Coordination Layer for Africa ⇌ Middle East ⇌ Asia
                    </div>
                </div>

                {/* MOBILE */}
                <div className="lg:hidden">
                    <MobileLayout />
                </div>

                {/* DESKTOP “CANVAS” */}
                <div className="hidden lg:block">
                    {/* The fixed aspect ratio canvas keeps everything aligned like the image */}
                    <div className="relative rounded-2xl border border-white/10 bg-black/20 backdrop-blur-[2px] overflow-hidden shadow-2xl">
                        <div className="relative w-full aspect-[1200/680]">
                            {/* SVG connections */}
                            <Connections />

                            {/* Endpoints (pulsing) exactly on anchors */}
                            <div
                                className="absolute"
                                style={{
                                    left: `${(ANCHORS.leftNode.x / CANVAS.w) * 100}%`,
                                    top: `${(ANCHORS.leftNode.y / CANVAS.h) * 100}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <DotNode tone="green" size={20} />
                            </div>

                            <div
                                className="absolute"
                                style={{
                                    left: `${(ANCHORS.rightNode.x / CANVAS.w) * 100}%`,
                                    top: `${(ANCHORS.rightNode.y / CANVAS.h) * 100}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <DotNode tone="blue" size={20} />
                            </div>

                            <div
                                className="absolute"
                                style={{
                                    left: `${(ANCHORS.midNode.x / CANVAS.w) * 100}%`,
                                    top: `${(ANCHORS.midNode.y / CANVAS.h) * 100}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <DotNode tone="gold" size={20} />
                            </div>

                            <div
                                className="absolute"
                                style={{
                                    left: `${(ANCHORS.coinNode.x / CANVAS.w) * 100}%`,
                                    top: `${(ANCHORS.coinNode.y / CANVAS.h) * 100}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <DotNode tone="gold" size={18} />
                            </div>

                            {/* Regions */}
                            <RegionAbs
                                name="AFRICA"
                                subtitle={"Verified Supply\n& Opportunity"}
                                tone="green"
                                mapSrc={MAPS.africa}
                                {...ANCHORS.africa}
                            />
                            <RegionAbs
                                name="MIDDLE EAST"
                                subtitle={"Institutional Trust\n& Capital"}
                                tone="gold"
                                mapSrc={MAPS.middleEast}
                                {...ANCHORS.middle}
                            />
                            <RegionAbs
                                name="ASIA"
                                subtitle={"Industrial Scale\n& Manufacturing"}
                                tone="blue"
                                mapSrc={MAPS.asia}
                                {...ANCHORS.asia}
                            />

                            {/* Side icon stacks — pinned like image */}
                            <div className="absolute left-[26px] top-[165px] flex flex-col gap-6">
                                {leftStack.map((it, idx) => (
                                    <IconStackItem key={idx} icon={it.icon} label={it.label} tone="green" />
                                ))}
                            </div>

                            <div className="absolute left-[410px] top-[170px] flex flex-col gap-6">
                                {midLeftStack.map((it, idx) => (
                                    <IconStackItem key={idx} icon={it.icon} label={it.label} tone="gold" />
                                ))}
                            </div>

                            <div className="absolute right-[410px] top-[170px] flex flex-col gap-6">
                                {midRightStack.map((it, idx) => (
                                    <IconStackItem key={idx} icon={it.icon} label={it.label} tone="gold" />
                                ))}
                            </div>

                            <div className="absolute right-[26px] top-[165px] flex flex-col gap-6">
                                {rightStack.map((it, idx) => (
                                    <IconStackItem key={idx} icon={it.icon} label={it.label} tone="blue" />
                                ))}
                            </div>

                            {/* SWAQAR center + arc */}
                            <CenterSwaqar />
                        </div>

                        {/* Bottom row inside panel (legend + stats + info) - FIXED LAYOUT */}
                        <div className="px-6 py-6 flex gap-6 border-t border-white/5">
                            <Legend />
                            <Stats />
                            <InfoCard />
                        </div>
                    </div>

                    {/* Bottom corridor features */}
                    <div className="mt-8">
                        <CorridorFeatures />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes twinkle {
                    0%,
                    100% {
                        opacity: 0.25;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.25);
                    }
                }
                .animate-twinkle {
                    animation: twinkle 3.2s ease-in-out infinite;
                }

                @keyframes spinSlow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spinSlow 18s linear infinite;
                }

                @keyframes pulseRing {
                    0% {
                        transform: scale(0.9);
                        opacity: 0.25;
                    }
                    50% {
                        transform: scale(1.25);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(0.9);
                        opacity: 0.25;
                    }
                }
                .animate-pulseRing {
                    animation: pulseRing 1.8s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}