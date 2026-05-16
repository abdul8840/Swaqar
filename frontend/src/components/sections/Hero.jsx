import React, { useState, useEffect, useRef } from "react";
import WorldMapImg from "../../assets/worldMap.png";

// ============================================================
// DATA
// ============================================================

const CITY_NODES = [
  {
    id: "yaounde",
    label: "Yaoundé",
    xPct: 36.5,
    yPct: 72,
    active: true,
    size: "lg",
    origin: true,
  },
  {
    id: "douala",
    label: "Douala",
    xPct: 34.5,
    yPct: 65,
    active: false,
    size: "sm",
    origin: true,
  },
  {
    id: "lagos",
    label: "Lagos",
    xPct: 31.5,
    yPct: 57,
    active: false,
    size: "sm",
    origin: true,
  },
  {
    id: "riyadh",
    label: "Riyadh",
    xPct: 74,
    yPct: 38,
    active: false,
    size: "sm",
    origin: false,
  },
  {
    id: "dubai",
    label: "Dubai",
    xPct: 82,
    yPct: 46,
    active: true,
    size: "lg",
    origin: false,
  },
  {
    id: "jeddah",
    label: "Jeddah",
    xPct: 70,
    yPct: 48,
    active: false,
    size: "sm",
    origin: false,
  },
];

const TICKER_1 = [
  { dot: true, text: "Corridor active" },
  { dot: false, text: "3 origin nodes" },
  { dot: false, text: "3 destination nodes" },
  { dot: false, text: "Validated transactions only" },
];

const TICKER_2 = [
  { dot: true, text: "Pre-pilot" },
  { dot: false, text: "2026" },
  { dot: false, text: "Yaoundé" },
  { dot: false, text: "Riyadh" },
  { dot: false, text: "Abuja" },
  { dot: false, text: "Dubai" },
  { dot: false, text: "OHADA-aligned" },
];

// ============================================================
// MAP SVG OVERLAY (No animated connection line)
// ============================================================
function MapOverlay({ W, H }) {
  if (!W || !H) return null;

  function sx(pct) {
    return (pct / 100) * W;
  }
  function sy(pct) {
    return (pct / 100) * H;
  }

  const cities = CITY_NODES.map((c) => ({
    ...c,
    cx: sx(c.xPct),
    cy: sy(c.yPct),
  }));

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="absolute inset-0"
      style={{ zIndex: 4, pointerEvents: "none" }}
    >
      <defs>
        <filter id="gGold" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gGoldBig" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="12" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gGoldSoft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

// ============================================================
// TICKER ROW
// ============================================================
function TickerRow({ items, delay }) {
  return (
    <div
      className="flex items-center gap-0 border border-[#d4a017]/18 rounded-sm overflow-hidden"
      style={{
        background: "rgba(12,9,2,0.6)",
        backdropFilter: "blur(10px)",
        animation: `fadeUp 0.7s ease-out ${delay}s both`,
      }}
    >
      <div className="flex items-center flex-wrap px-3 sm:px-4 py-2 sm:py-2.5 gap-x-3 gap-y-1">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <span className="text-[#d4a017]/50 text-[9px] select-none">
                •
              </span>
            )}
            <span className="flex items-center gap-1.5">
              {item.dot && (
                <span
                  className="w-[6px] h-[6px] rounded-full bg-[#d4a017] flex-shrink-0"
                  style={{
                    animation: "blink 1.6s ease-in-out infinite",
                    boxShadow: "0 0 6px #d4a017aa",
                  }}
                />
              )}
              <span
                className="text-[10px] sm:text-[11px] text-[#b89848] tracking-wide whitespace-nowrap"
                style={{ fontFamily: "'Inter',sans-serif" }}
              >
                {item.text}
              </span>
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Hero() {
  const mapRef = useRef(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!mapRef.current) return;
    const ro = new ResizeObserver(([e]) => {
      setMapSize({
        width: Math.round(e.contentRect.width),
        height: Math.round(e.contentRect.height),
      });
    });
    ro.observe(mapRef.current);
    setMapSize({
      width: mapRef.current.offsetWidth,
      height: mapRef.current.offsetHeight,
    });
    return () => ro.disconnect();
  }, []);

  return (
    <section
      className="relative w-full min-h-screen bg-[#080602] overflow-hidden"
      style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
    >
      {/* ── Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,500;0,700;0,800;1,500;1,700;1,800&family=Inter:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity:0; transform:translateX(-20px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes titleIn {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes lineExpand {
          from { transform:scaleX(0); transform-origin:left; }
          to   { transform:scaleX(1); transform-origin:left; }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50%     { opacity:0.1; }
        }
        @keyframes nodeGlow {
          0%,100% { filter:drop-shadow(0 0 6px #d4a017) drop-shadow(0 0 12px #d4a01766); }
          50%     { filter:drop-shadow(0 0 14px #ffd700) drop-shadow(0 0 28px #ffd70066); }
        }
        @keyframes cityRing {
          0%   { transform:scale(1);   opacity:0.65; }
          100% { transform:scale(3.8); opacity:0;    }
        }
        @keyframes mapReveal {
          from { opacity:0; transform:scale(1.03); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes dividerGrow {
          from { width:0; opacity:0; }
          to   { width:2.5rem; opacity:1; }
        }

        .garamond { font-family:'EB Garamond','Georgia',serif; }
        .inter    { font-family:'Inter',sans-serif; }

        .btn-gold {
          background: linear-gradient(135deg,#b8860b 0%,#d4a017 45%,#e8b820 100%);
          color: #1c0e00;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.35s ease, transform 0.25s ease;
        }
        .btn-gold::after {
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.22) 50%,transparent 100%);
          transform:translateX(-110%);
          transition:transform 0.55s ease;
        }
        .btn-gold:hover::after  { transform:translateX(110%); }
        .btn-gold:hover {
          box-shadow:0 0 28px #d4a01766, 0 6px 24px #d4a01744;
          transform:translateY(-2px);
        }
        .btn-outline {
          border:1px solid rgba(212,160,23,0.38);
          color:#c8a84a;
          background:transparent;
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          border-color:rgba(212,160,23,0.85);
          background:rgba(212,160,23,0.07);
          box-shadow:0 0 20px #d4a01733;
          transform:translateY(-2px);
        }
      `}</style>

      {/* ════════════════════════════════════════════════════
          LAYOUT: Two columns - Responsive
      ════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row min-h-screen mt-12">

        {/* ══ LEFT COLUMN — Content ══ */}
        <div
          className="relative z-10 flex flex-col justify-center
            w-full lg:w-[48%] xl:w-[44%]
            px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16
            py-12 sm:py-16 lg:py-20
            min-h-[60vh] lg:min-h-0"
        >
          {/* Left column dark bg - responsive */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(6,4,1,1) 0%, rgba(6,4,1,0.97) 60%, rgba(6,4,1,0.75) 85%, rgba(6,4,1,0) 100%)",
            }}
          />

          <div className="relative z-10 max-w-lg mx-auto lg:mx-0">
            {/* Eyebrow */}
            <p
              className="inter text-[10px] sm:text-[11px] tracking-[0.24em] text-[#d4a017] font-medium uppercase mb-4 sm:mb-5"
              style={{ animation: "fadeUp 0.65s ease-out 0.1s both" }}
            >
              Trade Coordination Infrastructure
            </p>

            {/* Title block - smaller text */}
            <div className="mb-4 sm:mb-5 garamond">
              <h1 className="leading-[1.2] font-bold">
                <span
                  className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white"
                  style={{
                    animation: "titleIn 0.85s ease-out 0.22s both",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Corridors
                </span>
                <span
                  className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl italic font-bold"
                  style={{
                    color: "#d4a017",
                    letterSpacing: "-0.01em",
                    textShadow: "0 0 48px #d4a01755, 0 0 90px #d4a01722",
                    animation: "titleIn 0.85s ease-out 0.32s both",
                  }}
                >
                  of Trust
                </span>
                <span
                  className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white"
                  style={{
                    letterSpacing: "-0.01em",
                    animation: "titleIn 0.85s ease-out 0.42s both",
                  }}
                >
                  Between Africa
                </span>
                <span
                  className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white"
                  style={{
                    letterSpacing: "-0.01em",
                    animation: "titleIn 0.85s ease-out 0.52s both",
                  }}
                >
                  and the Middle East.
                </span>
              </h1>
            </div>

            {/* Gold divider line - shorter */}
            <div
              className="h-[1.5px] mb-5 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, #d4a017 0%, rgba(212,160,23,0.1) 100%)",
                animation: "dividerGrow 0.9s ease-out 0.7s both",
              }}
            />

            {/* Description - smaller text */}
            <p
              className="inter text-[13px] sm:text-[14px] text-[#8a7a52] leading-[1.7] mb-8 font-light max-w-md"
              style={{ animation: "fadeUp 0.75s ease-out 0.78s both" }}
            >
              A live coordination layer governing cross-border trade —{" "}
              verified, structured, and executed through a{" "}
              controlled infrastructure system.
            </p>

            {/* CTA Buttons - smaller */}
            <div
              className="flex flex-col sm:flex-row gap-3 mb-8"
              style={{ animation: "fadeUp 0.7s ease-out 0.9s both" }}
            >
              <button
                className="btn-gold inter text-[12px] sm:text-[13px] font-semibold
                  tracking-wide px-5 sm:px-6 py-3 rounded-[3px]
                  flex items-center justify-center gap-2 cursor-pointer"
              >
                Request a Pilot Discussion
                <span className="text-[16px] font-normal">→</span>
              </button>
              <button
                className="btn-outline inter text-[12px] sm:text-[13px] font-medium
                  tracking-wide px-5 sm:px-6 py-3 rounded-[3px]
                  flex items-center justify-center gap-2 cursor-pointer"
              >
                Read the System
                <span className="text-[16px] font-normal">↓</span>
              </button>
            </div>

            {/* Ticker strips - smaller */}
            <div
              className="flex flex-col gap-2"
              style={{ animation: "fadeUp 0.7s ease-out 1.05s both" }}
            >
              <TickerRow items={TICKER_1} delay={1.05} />
              <TickerRow items={TICKER_2} delay={1.15} />
            </div>
          </div>
        </div>

        {/* ══ RIGHT COLUMN — Map ══ */}
        <div
          className="relative flex-1 min-h-[50vh] lg:min-h-screen overflow-hidden"
          style={{ animation: "mapReveal 1.2s cubic-bezier(.16,1,.3,1) 0.2s both" }}
        >
          {/* Map image */}
          <div ref={mapRef} className="absolute inset-0">
            <img
              src={WorldMapImg}
              alt="Africa Middle East Map"
              className="w-full h-full object-contain object-center"
              style={{ opacity: 0.88 }}
              loading="eager"
            />

            {/* Left edge fade - blends into content column */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(6,4,1,1) 0%, rgba(6,4,1,0.6) 8%, rgba(6,4,1,0) 22%)",
              }}
            />

            {/* Top fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(6,4,1,0.55) 0%, rgba(6,4,1,0) 14%)",
              }}
            />

            {/* Bottom fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(6,4,1,0.7) 0%, rgba(6,4,1,0) 16%)",
              }}
            />

            {/* Right fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, rgba(6,4,1,0.45) 0%, rgba(6,4,1,0) 18%)",
              }}
            />

            {/* Subtle dark overlay for depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 70% at 60% 50%, transparent 30%, rgba(4,3,0,0.45) 100%)",
              }}
            />

            {/* SVG corridor + nodes overlay (no animated line) */}
            {mapSize.width > 0 && mapSize.height > 0 && (
              <MapOverlay W={mapSize.width} H={mapSize.height} />
            )}
          </div>
        </div>
      </div>

      {/* ── Very subtle bottom bar ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,160,23,0.2), transparent)",
          zIndex: 20,
        }}
      />
    </section>
  );
}