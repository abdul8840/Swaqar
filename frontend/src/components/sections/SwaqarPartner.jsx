import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Landmark, ShieldCheck, Truck, Users, Scale,
  Building2, Factory, CheckCircle2, Star, Network
} from 'lucide-react';
import AfricaMapImg from "../../assets/africa2.png";
import MEMapImg from "../../assets/middleEast.png";
import AsiaMapImg from "../../assets/asia.png";

const customStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes glowPulse {
    0% { box-shadow: 0 0 20px rgba(203,163,101,0.2), inset 0 0 20px rgba(203,163,101,0.05); }
    100% { box-shadow: 0 0 70px rgba(203,163,101,0.55), inset 0 0 40px rgba(203,163,101,0.15); }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes spinCW {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spinCCW {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes pulseRing {
    0% { transform: scale(0.92); opacity: 0.8; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes drawLine {
    from { stroke-dashoffset: 2000; opacity: 0; }
    to { stroke-dashoffset: 0; opacity: 1; }
  }
  @keyframes shimmerText {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes dotBlink {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  .card-anim-left { animation: fadeInLeft 0.75s ease-out both; }
  .card-anim-right { animation: fadeInRight 0.75s ease-out both; }
  .card-anim-up { animation: fadeInUp 0.75s ease-out both; }
  .hub-float { animation: floatY 5s ease-in-out infinite; }
  .ring-cw { animation: spinCW 22s linear infinite; }
  .ring-ccw { animation: spinCCW 16s linear infinite; }
  .hub-glow { animation: glowPulse 3s ease-in-out infinite alternate; }
  .pr1 { animation: pulseRing 2.6s ease-out infinite 0s; }
  .pr2 { animation: pulseRing 2.6s ease-out infinite 0.87s; }
  .pr3 { animation: pulseRing 2.6s ease-out infinite 1.74s; }
  .dot-blink { animation: dotBlink 2.2s ease-in-out infinite; }
  .swq-card {
    background: rgba(8,8,8,0.93);
    border: 1px solid rgba(203,163,101,0.22);
    border-radius: 12px;
    padding: 16px;
    position: relative;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
  }
  .swq-card::before {
    content: '';
    position: absolute; top: 0; right: 0;
    width: 28px; height: 28px;
    border-top: 1px solid rgba(203,163,101,0.4);
    border-right: 1px solid rgba(203,163,101,0.4);
    border-radius: 0 12px 0 0;
    pointer-events: none;
  }
  .swq-card::after {
    content: '';
    position: absolute; bottom: 0; left: 0;
    width: 28px; height: 28px;
    border-bottom: 1px solid rgba(203,163,101,0.4);
    border-left: 1px solid rgba(203,163,101,0.4);
    border-radius: 0 0 0 12px;
    pointer-events: none;
  }
  .swq-card:hover {
    transform: translateY(-4px);
    border-color: rgba(203,163,101,0.55);
    box-shadow: 0 12px 40px rgba(203,163,101,0.18);
  }
`;

// ─────────────────────────────────────────────────────────────
// CARD COMPONENT
// ─────────────────────────────────────────────────────────────
const Card = React.forwardRef(({ title, icon: Icon, items, footer, delay, side }, ref) => {
  const animClass = side === 'left' ? 'card-anim-left' : side === 'right' ? 'card-anim-right' : 'card-anim-up';
  return (
    <div
      ref={ref}
      className={`swq-card ${animClass}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{
          padding: '7px', borderRadius: '8px',
          background: 'rgba(203,163,101,0.1)',
          border: '1px solid rgba(203,163,101,0.25)',
          color: '#cba365', flexShrink: 0,
        }}>
          <Icon size={14} strokeWidth={1.5} />
        </div>
        <h3 style={{
          fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#e8c894', lineHeight: 1.35, margin: 0,
        }}>
          {title}
        </h3>
      </div>
      <ul style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '7px', padding: 0, listStyle: 'none', margin: '0 0 12px' }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '10px' }}>
            <div className="dot-blink" style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: 'rgba(203,163,101,0.55)', flexShrink: 0,
              animationDelay: `${i * 200}ms`
            }} />
            {item}
          </li>
        ))}
      </ul>
      <div style={{
        fontSize: '8px', textTransform: 'uppercase',
        letterSpacing: '0.12em', color: 'rgba(203,163,101,0.55)',
        borderTop: '1px solid rgba(203,163,101,0.15)',
        paddingTop: '10px', fontWeight: 600,
      }}>
        {footer}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// CENTER HUB - with a ref that points to the circle element
// ─────────────────────────────────────────────────────────────
const CenterHub = React.forwardRef((_, ref) => {
  const circleRef = useRef(null);
  
  // Forward both the outer ref and also expose circleRef
  React.useImperativeHandle(ref, () => ({
    getBoundingClientRect: () => circleRef.current?.getBoundingClientRect(),
    getElement: () => circleRef.current
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        className="card-anim-up hub-float"
        style={{
          animationDelay: '300ms',
          fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#cba365', border: '1px solid rgba(203,163,101,0.3)',
          borderRadius: '20px', padding: '5px 14px',
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          marginBottom: '16px', whiteSpace: 'nowrap',
        }}
      >
        CONNECTED BY CORRIDORS OF TRUST
      </div>

      <div
        ref={circleRef}
        className="hub-glow card-anim-up"
        style={{
          animationDelay: '150ms',
          position: 'relative',
          width: '210px', height: '210px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #1c1c1c 0%, #060606 100%)',
          border: '1.5px solid rgba(203,163,101,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div className="ring-cw" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed rgba(203,163,101,0.28)' }} />
        <div className="ring-ccw" style={{ position: 'absolute', inset: '12px', borderRadius: '50%', border: '1px dashed rgba(203,163,101,0.16)' }} />
        <div className="pr1" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(203,163,101,0.5)' }} />
        <div className="pr2" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(203,163,101,0.3)' }} />
        <div className="pr3" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(203,163,101,0.15)' }} />

        <div className="hub-float" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, position: 'relative' }}>
          <div style={{ width: '58px', height: '58px', marginBottom: '10px' }}>
            <svg viewBox="0 0 80 80" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 14px rgba(203,163,101,0.7))' }}>
              <polygon points="40,2 76,21 76,59 40,78 4,59 4,21" fill="none" stroke="#cba365" strokeWidth="2" />
              <polygon points="40,12 66,26 66,54 40,68 14,54 14,26" fill="rgba(203,163,101,0.07)" stroke="#cba365" strokeWidth="0.8" opacity="0.55" />
              <path d="M 27 34 L 40 50 L 53 28" fill="none" stroke="#cba365" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 27 50 L 40 62 L 53 44" fill="none" stroke="#cba365" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            </svg>
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '20px', letterSpacing: '0.2em', color: '#fff', marginBottom: '5px' }}>SWAQAR</div>
          <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to right, transparent, #cba365, transparent)', marginBottom: '5px' }} />
          <div style={{ fontSize: '7px', color: '#cba365', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Trade Coordination Layer</div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            {['Verify', 'Connect', 'Execute'].map((t) => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ padding: '5px', borderRadius: '6px', border: '1px solid rgba(203,163,101,0.28)', background: 'rgba(203,163,101,0.07)' }}>
                  <CheckCircle2 size={10} color="#cba365" />
                </div>
                <span style={{ fontSize: '6px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// MINI MAP
// ─────────────────────────────────────────────────────────────
const MiniMapCard = ({ name, mapSrc, color, delay }) => {
  const cfg = {
    emerald: { border: 'rgba(52,211,153,0.38)', text: '#34d399', glow: 'rgba(52,211,153,0.2)' },
    amber:   { border: 'rgba(203,163,101,0.42)', text: '#cba365', glow: 'rgba(203,163,101,0.2)' },
    sky:     { border: 'rgba(56,189,248,0.38)',  text: '#38bdf8', glow: 'rgba(56,189,248,0.2)' },
  }[color];
  return (
    <div className="card-anim-up" style={{ animationDelay: `${delay}ms`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: '88px', height: '88px', borderRadius: '50%',
        border: `1.5px solid ${cfg.border}`,
        background: 'rgba(0,0,0,0.55)',
        boxShadow: `0 0 22px ${cfg.glow}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', position: 'relative',
      }}>
        <img src={mapSrc} alt={name} style={{ width: '78%', height: '78%', objectFit: 'contain', opacity: 0.85, position: 'relative', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', borderRadius: '50%' }} />
      </div>
      <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: cfg.text }}>{name}</span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function SwaqarPartner() {
  const [mounted, setMounted] = useState(false);
  const [svgPaths, setSvgPaths] = useState([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  const wrapperRef = useRef(null);
  const hubRef = useRef(null);
  const hubCircleRef = useRef(null);

  const lRef0 = useRef(null); const lRef1 = useRef(null); const lRef2 = useRef(null);
  const rRef0 = useRef(null); const rRef1 = useRef(null); const rRef2 = useRef(null);
  const bRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  // ── compute paths that ALL meet exactly at the center of the SWAQAR circle ──
  const computePaths = useCallback(() => {
    if (!wrapperRef.current || !hubRef.current) return;

    const wrap = wrapperRef.current;
    const wRect = wrap.getBoundingClientRect();
    
    // Get the actual circle element's center
    const hubElement = hubRef.current.getElement ? hubRef.current.getElement() : hubRef.current;
    if (!hubElement) return;
    
    const hRect = hubElement.getBoundingClientRect();
    
    // Hub center relative to wrapper (center of the circle)
    const hx = hRect.left - wRect.left + hRect.width / 2;
    const hy = hRect.top - wRect.top + hRect.height / 2;

    setSvgSize({ w: wRect.width, h: wRect.height });

    const allRefs = [
      { ref: lRef0, side: 'left', id: 'l0', delay: 0 },
      { ref: lRef1, side: 'left', id: 'l1', delay: 120 },
      { ref: lRef2, side: 'left', id: 'l2', delay: 240 },
      { ref: rRef0, side: 'right', id: 'r0', delay: 60 },
      { ref: rRef1, side: 'right', id: 'r1', delay: 180 },
      { ref: rRef2, side: 'right', id: 'r2', delay: 300 },
      { ref: bRef, side: 'bottom', id: 'b0', delay: 400 },
    ];

    const paths = [];
    allRefs.forEach(({ ref, side, id, delay }) => {
      if (!ref?.current) return;
      const cRect = ref.current.getBoundingClientRect();

      // card coords relative to wrapper
      const cl = cRect.left - wRect.left;
      const ct = cRect.top - wRect.top;
      const cw = cRect.width;
      const ch = cRect.height;

      let sx, sy, c1x, c1y, c2x, c2y;

      if (side === 'left') {
        // connect from right edge of card, vertical center
        sx = cl + cw;
        sy = ct + ch / 2;
        // Smooth bezier curve that bends toward the center
        c1x = sx + (hx - sx) * 0.4;
        c1y = sy;
        c2x = hx - (hx - sx) * 0.1;
        c2y = hy;
      } else if (side === 'right') {
        // connect from left edge of card, vertical center
        sx = cl;
        sy = ct + ch / 2;
        c1x = sx - (sx - hx) * 0.4;
        c1y = sy;
        c2x = hx + (sx - hx) * 0.1;
        c2y = hy;
      } else {
        // bottom card — connect from top edge, horizontal center
        sx = cl + cw / 2;
        sy = ct;
        c1x = sx;
        c1y = sy - (sy - hy) * 0.35;
        c2x = hx;
        c2y = hy + (sy - hy) * 0.15;
      }

      paths.push({
        id,
        d: `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${hx} ${hy}`,
        sx, sy,
        dotDur: 2.5 + Math.random() * 0.8,
        delay,
      });
    });

    setSvgPaths(paths);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Run multiple times to ensure layout is settled
    const t1 = setTimeout(computePaths, 50);
    const t2 = setTimeout(computePaths, 200);
    const t3 = setTimeout(computePaths, 500);
    const t4 = setTimeout(computePaths, 1000);
    const t5 = setTimeout(computePaths, 1500);

    const ro = new ResizeObserver(computePaths);
    if (wrapperRef.current) ro.observe(wrapperRef.current);

    window.addEventListener('resize', computePaths);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
      ro.disconnect();
      window.removeEventListener('resize', computePaths);
    };
  }, [mounted, computePaths]);

  if (!mounted) return null;

  const leftCards = [
    { title: "Banks &\nFinancial Institutions", icon: Landmark, items: ['Trade Finance', 'Working Capital', 'LC Issuance', 'Risk Mitigation'], footer: "Provide Capital & Financial Trust", delay: 300 },
    { title: "Exporters &\nSuppliers", icon: Users, items: ['Verified Supply', 'Quality Assurance', 'Capacity Building', 'Market Access'], footer: "Supply Verified Goods & Capacity", delay: 450 },
    { title: "Logistics &\nTransport Partners", icon: Truck, items: ['Freight & Shipping', 'Inland Transport', 'Warehousing', 'Last-Mile Delivery'], footer: "Move Goods Efficiently & Safely", delay: 600 },
  ];
  
  const rightCards = [
    { title: "Governments &\nRegulatory Bodies", icon: Building2, items: ['Policy Alignment', 'Customs Facilitation', 'Licensing', 'Corridor Support'], footer: "Enable Trade & Regulatory Clarity", delay: 350 },
    { title: "Buyers &\nOff-Takers", icon: Scale, items: ['Demand Access', 'Quality Assurance', 'Contract Confidence', 'Reliable Delivery'], footer: "Demand Confidence & Reliable Supply", delay: 500 },
    { title: "Verification &\nCertification Firms", icon: ShieldCheck, items: ['Inspection Services', 'Certification', 'Document Auth', 'Compliance Validation'], footer: "Ensure Verification & Quality Integrity", delay: 650 },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#fff', overflowX: 'hidden', fontFamily: 'system-ui,sans-serif' }}>
      <style>{customStyles}</style>

      {/* BG */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 45% at 50% 18%, rgba(203,163,101,0.08), transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.022, backgroundImage: 'radial-gradient(circle, rgba(203,163,101,0.6) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      {/* HEADER */}
      <div style={{ textAlign: 'center', padding: '40px 16px 28px', position: 'relative', zIndex: 10 }}>
        <h1 className="card-anim-up" style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(26px, 4.5vw, 52px)',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #fff 0%, #e8c894 50%, #fff 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '10px',
          animation: 'fadeInUp 0.8s ease-out both, shimmerText 5s linear 0.8s infinite',
        }}>
          SWAQAR GROUP
        </h1>
        <div className="card-anim-up" style={{ animationDelay: '120ms', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '10px' }}>
          <div style={{ height: '1px', width: '55px', background: 'linear-gradient(to right, transparent, #cba365)' }} />
          <span style={{ color: '#cba365', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', fontWeight: 700 }}>PARTNER ECOSYSTEM</span>
          <div style={{ height: '1px', width: '55px', background: 'linear-gradient(to left, transparent, #cba365)' }} />
        </div>
        <p className="card-anim-up" style={{ animationDelay: '220ms', color: '#6b7280', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0 }}>
          One Ecosystem · One Corridor · One Trust Layer
        </p>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:block" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px 24px', position: 'relative', zIndex: 10 }}>
        <div ref={wrapperRef} style={{ position: 'relative' }}>
          
          {/* SVG LINES - absolutely positioned to match card positions */}
          {svgPaths.length > 0 && (
            <svg
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: svgSize.w,
                height: svgSize.h,
                pointerEvents: 'none',
                zIndex: 5,
                overflow: 'visible',
              }}
            >
              <defs>
                <filter id="fg" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="fs" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="1.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {svgPaths.map(({ id, d, sx, sy, dotDur, delay }, idx) => (
                <g key={id}>
                  {/* Glow shadow */}
                  <path d={d} fill="none" stroke="#cba365" strokeWidth="6" opacity="0.07" strokeLinecap="round" />

                  {/* Animated dashed line */}
                  <path
                    d={d}
                    fill="none"
                    stroke="#cba365"
                    strokeWidth="1.6"
                    strokeDasharray="7 5"
                    strokeLinecap="round"
                    style={{
                      strokeDashoffset: 2000,
                      opacity: 0,
                      animation: `drawLine 1.4s ease-out ${delay + 600}ms both`,
                    }}
                  />

                  {/* Moving dot 1 */}
                  <circle r="4" fill="#cba365" filter="url(#fg)" opacity="0">
                    <animateMotion dur={`${dotDur}s`} repeatCount="indefinite" begin={`${delay / 1000 + 1.8}s`} path={d} />
                    <animate attributeName="opacity" values="0;1;1;0" dur={`${dotDur}s`} repeatCount="indefinite" begin={`${delay / 1000 + 1.8}s`} />
                  </circle>

                  {/* Moving dot 2 */}
                  <circle r="2.5" fill="#e8c894" filter="url(#fs)" opacity="0">
                    <animateMotion dur={`${dotDur}s`} repeatCount="indefinite" begin={`${delay / 1000 + 1.8 + dotDur / 2}s`} path={d} />
                    <animate attributeName="opacity" values="0;0.75;0.75;0" dur={`${dotDur}s`} repeatCount="indefinite" begin={`${delay / 1000 + 1.8 + dotDur / 2}s`} />
                  </circle>

                  {/* Origin pulse dot at card */}
                  <circle cx={sx} cy={sy} r="5" fill="none" stroke="#cba365" strokeWidth="1.5" opacity="0.6">
                    <animate attributeName="r" values="4;7;4" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.15}s`} />
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.15}s`} />
                  </circle>
                  <circle cx={sx} cy={sy} r="3" fill="#cba365" filter="url(#fs)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" begin={`${idx * 0.15}s`} />
                  </circle>
                </g>
              ))}
            </svg>
          )}

          {/* 3-COLUMN GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '265px 1fr 265px',
            gap: '0 20px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10,
          }}>
            {/* LEFT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '16px 0' }}>
              <Card ref={lRef0} {...leftCards[0]} side="left" />
              <Card ref={lRef1} {...leftCards[1]} side="left" />
              <Card ref={lRef2} {...leftCards[2]} side="left" />
            </div>

            {/* CENTER */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px' }}>
              <CenterHub ref={hubRef} />
              <Card
                ref={bRef}
                title="Industry & Strategic Partners"
                icon={Factory}
                items={['Industrial Offtake', 'Processing & Value Addition', 'Technology Partners', 'Market Development']}
                footer="Create Value & Expand Ecosystem"
                delay={720}
                side="bottom"
              />
            </div>

            {/* RIGHT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '16px 0' }}>
              <Card ref={rRef0} {...rightCards[0]} side="right" />
              <Card ref={rRef1} {...rightCards[1]} side="right" />
              <Card ref={rRef2} {...rightCards[2]} side="right" />
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden" style={{ padding: '0 14px 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <CenterHub />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            ...leftCards,
            ...rightCards,
            { title: "Industry & Strategic Partners", icon: Factory, items: ['Industrial Offtake', 'Processing & Value Addition', 'Technology Partners', 'Market Development'], footer: "Create Value & Expand Ecosystem", delay: 750 },
          ].map((c, i) => (
            <Card key={i} title={c.title} icon={c.icon} items={c.items} footer={c.footer} delay={c.delay + i * 60} side="left" />
          ))}
        </div>
      </div>

      {/* MAPS */}
      <div style={{ borderTop: '1px solid rgba(203,163,101,0.12)', marginTop: '8px', paddingTop: '28px', paddingBottom: '8px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(24px, 6vw, 90px)', flexWrap: 'wrap', padding: '0 16px' }}>
          <MiniMapCard name="AFRICA" mapSrc={AfricaMapImg} color="emerald" delay={900} />
          <MiniMapCard name="MIDDLE EAST" mapSrc={MEMapImg} color="amber" delay={1000} />
          <MiniMapCard name="ASIA" mapSrc={AsiaMapImg} color="sky" delay={1100} />
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth: '1300px', margin: '24px auto 0', padding: '0 16px 40px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div className="swq-card card-anim-up" style={{ animationDelay: '1100ms' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Network size={13} color="#cba365" />
              <span style={{ color: '#cba365', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>Legend</span>
            </div>
            {[{ sym: '→', label: 'Direct Partnership' }, { sym: '↔', label: 'Two-Way Collaboration' }, { sym: '···', label: 'Ecosystem Support Flow' }].map(({ sym, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ color: '#cba365', fontSize: '15px', width: '18px', textAlign: 'center' }}>{sym}</span>
                <span style={{ color: '#6b7280', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
              </div>
            ))}
          </div>

          <div className="card-anim-up" style={{
            animationDelay: '1200ms',
            background: 'rgba(203,163,101,0.05)', border: '1px solid rgba(203,163,101,0.22)',
            borderRadius: '12px', padding: '18px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          }}>
            <ShieldCheck size={22} color="#cba365" style={{ marginBottom: '10px', filter: 'drop-shadow(0 0 8px rgba(203,163,101,0.45))' }} />
            <p style={{ color: '#d1d5db', fontSize: '10px', lineHeight: 1.85, margin: '0 0 10px' }}>
              SWAQAR connects institutions, verifies trust, and enables seamless trade across Africa, the Middle East, and Asia.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={8} fill="#cba365" color="#cba365" />
              <span style={{ color: '#cba365', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>Trade with Trust</span>
              <Star size={8} fill="#cba365" color="#cba365" />
            </div>
          </div>

          <div className="swq-card card-anim-up" style={{ animationDelay: '1300ms' }}>
            <div style={{ color: '#cba365', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '14px' }}>CORRIDOR REACH</div>
            {[
              { label: '3 Regions', sub: 'Africa · Middle East · Asia' },
              { label: '7+ Partner Types', sub: 'Institutional Ecosystem' },
              { label: '1 Trust Layer', sub: 'SWAQAR Coordination' },
            ].map(({ label, sub }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                <div className="dot-blink" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cba365', marginTop: '3px', flexShrink: 0, boxShadow: '0 0 6px rgba(203,163,101,0.5)' }} />
                <div>
                  <div style={{ color: '#e8c894', fontSize: '10px', fontWeight: 600 }}>{label}</div>
                  <div style={{ color: '#4b5563', fontSize: '9px' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}