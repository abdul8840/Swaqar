import { useEffect, useRef, useState } from "react";

/* ─── Inline SVG Icons ─── */
const ShieldCheck = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" stroke="#C9A84C" strokeWidth="2">
    <path d="M32 6 L54 14 L54 32 C54 45 43 55 32 58 C21 55 10 45 10 32 L10 14 Z" strokeLinejoin="round"/>
    <polyline points="22,32 29,39 42,26" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DocCheck = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" stroke="#C9A84C" strokeWidth="2">
    <rect x="12" y="6" width="32" height="42" rx="3"/>
    <line x1="20" y1="18" x2="36" y2="18"/>
    <line x1="20" y1="26" x2="36" y2="26"/>
    <line x1="20" y1="34" x2="28" y2="34"/>
    <circle cx="46" cy="46" r="10" fill="#0d0d0d" stroke="#C9A84C" strokeWidth="2"/>
    <polyline points="41,46 44,49 51,42" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Network = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" stroke="#C9A84C" strokeWidth="2">
    <circle cx="32" cy="32" r="5"/>
    <circle cx="32" cy="10" r="4"/>
    <circle cx="32" cy="54" r="4"/>
    <circle cx="10" cy="32" r="4"/>
    <circle cx="54" cy="32" r="4"/>
    <circle cx="14" cy="14" r="4"/>
    <circle cx="50" cy="50" r="4"/>
    <line x1="32" y1="27" x2="32" y2="14"/>
    <line x1="32" y1="37" x2="32" y2="50"/>
    <line x1="27" y1="32" x2="14" y2="32"/>
    <line x1="37" y1="32" x2="50" y2="32"/>
    <line x1="28" y1="28" x2="17" y2="17"/>
    <line x1="36" y1="36" x2="47" y2="47"/>
  </svg>
);

const Institution = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full" stroke="#C9A84C" strokeWidth="2">
    <path d="M8 56 L56 56"/>
    <path d="M32 8 L56 22 L8 22 Z"/>
    <rect x="14" y="28" width="8" height="20"/>
    <rect x="28" y="28" width="8" height="20"/>
    <rect x="42" y="28" width="8" height="20"/>
    <path d="M6 22 L58 22"/>
    <path d="M6 56 L58 56"/>
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" stroke="#C9A84C" strokeWidth="1.5">
    <circle cx="12" cy="10" r="4"/>
    <path d="M4 26 C4 20 8 17 12 17 C16 17 20 20 20 26"/>
    <circle cx="22" cy="10" r="3"/>
    <path d="M20 17 C22 17 28 19 28 26"/>
  </svg>
);

const LockDoc = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" stroke="#C9A84C" strokeWidth="1.5">
    <rect x="4" y="4" width="18" height="24" rx="2"/>
    <line x1="8" y1="10" x2="18" y2="10"/>
    <line x1="8" y1="15" x2="14" y2="15"/>
    <rect x="18" y="18" width="10" height="9" rx="2"/>
    <path d="M20 18 L20 16 C20 14 28 14 28 16 L28 18"/>
  </svg>
);

const TeamAlign = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" stroke="#C9A84C" strokeWidth="1.5">
    <circle cx="16" cy="10" r="4"/>
    <path d="M8 26 C8 20 11 18 16 18 C21 18 24 20 24 26"/>
    <circle cx="6" cy="12" r="2.5"/>
    <path d="M2 24 C2 20 4 19 6 19"/>
    <circle cx="26" cy="12" r="2.5"/>
    <path d="M30 24 C30 20 28 19 26 19"/>
  </svg>
);

const TrendUp = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" stroke="#C9A84C" strokeWidth="1.5">
    <polyline points="2,22 10,14 16,18 26,8" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="20,8 26,8 26,14" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="2" y1="26" x2="30" y2="26"/>
    <line x1="2" y1="26" x2="2" y2="6"/>
  </svg>
);

/* ─── Small icons for footer ─── */
const SmShield = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="#C9A84C" strokeWidth="1.8">
    <path d="M16 3 L27 7 L27 16 C27 22.5 21.5 27.5 16 29 C10.5 27.5 5 22.5 5 16 L5 7 Z"/>
    <polyline points="11,16 14,19 21,13" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SmDoc = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="#C9A84C" strokeWidth="1.8">
    <rect x="5" y="3" width="16" height="21" rx="2"/>
    <line x1="9" y1="9" x2="17" y2="9"/>
    <line x1="9" y1="13" x2="17" y2="13"/>
    <line x1="9" y1="17" x2="13" y2="17"/>
    <rect x="17" y="18" width="9" height="8" rx="1.5"/>
    <path d="M19 18 L19 17 C19 15 25 15 25 17 L25 18"/>
  </svg>
);

const SmNet = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="#C9A84C" strokeWidth="1.8">
    <circle cx="16" cy="16" r="3"/>
    <circle cx="16" cy="5" r="2.5"/>
    <circle cx="16" cy="27" r="2.5"/>
    <circle cx="5" cy="16" r="2.5"/>
    <circle cx="27" cy="16" r="2.5"/>
    <line x1="16" y1="13" x2="16" y2="7.5"/>
    <line x1="16" y1="19" x2="16" y2="24.5"/>
    <line x1="13" y1="16" x2="7.5" y2="16"/>
    <line x1="19" y1="16" x2="24.5" y2="16"/>
  </svg>
);

const SmInst = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" stroke="#C9A84C" strokeWidth="1.8">
    <path d="M4 28 L28 28"/>
    <path d="M16 4 L28 11 L4 11 Z"/>
    <rect x="7" y="14" width="4" height="10"/>
    <rect x="14" y="14" width="4" height="10"/>
    <rect x="21" y="14" width="4" height="10"/>
  </svg>
);

const SwaqarS = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <rect x="3" y="3" width="74" height="74" rx="10" stroke="#C9A84C" strokeWidth="2"/>
    <path d="M20 25 Q27 18 34 25 Q41 32 48 25 Q55 18 62 25" stroke="#C9A84C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M20 40 Q27 33 34 40 Q41 47 48 40 Q55 33 62 40" stroke="#C9A84C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M20 55 Q27 48 34 55 Q41 62 48 55 Q55 48 62 55" stroke="#C9A84C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </svg>
);

/* ─── Data ─── */
const gates = [
  {
    num: "01",
    label: "GATE 1",
    title: "VERIFICATION",
    Icon: ShieldCheck,
    desc: "All counterparties, documents, and assets are verified through institutional and independent channels.",
    FooterIcon: PeopleIcon,
    footerText: "Trust is established before movement.",
  },
  {
    num: "02",
    label: "GATE 2",
    title: "DOCUMENTATION",
    Icon: DocCheck,
    desc: "All documentation is validated, standardized, and secured according to regulatory and corridor requirements.",
    FooterIcon: LockDoc,
    footerText: "Compliance and clarity enable confidence.",
  },
  {
    num: "03",
    label: "GATE 3",
    title: "COORDINATION",
    Icon: Network,
    desc: "SWAQAR synchronizes all stakeholders, aligns execution steps, and manages corridor movement in real time.",
    FooterIcon: TeamAlign,
    footerText: "Alignment creates seamless execution.",
  },
  {
    num: "04",
    label: "GATE 4",
    title: "ESCALATION & OVERSIGHT",
    Icon: Institution,
    desc: "Continuous monitoring, risk management, and escalation protocols ensure accountability and resolution.",
    FooterIcon: TrendUp,
    footerText: "Oversight protects the corridor.",
  },
];

const footerFeatures = [
  { Icon: SmShield, bold: "VERIFIED", sub: "Counterparties" },
  { Icon: SmDoc, bold: "SECURE", sub: "Documentation" },
  { Icon: SmNet, bold: "SYNCHRONIZED", sub: "Execution" },
  { Icon: SmInst, bold: "GOVERNED", sub: "Outcomes" },
];

/* ─── useInView hook ─── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Main Component ─── */
export default function SwaqarGate() {
  const [headerRef, headerVis] = useInView(0.2);
  const [cardsRef, cardsVis] = useInView(0.05);
  const [footerRef, footerVis] = useInView(0.1);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center py-10 px-3 sm:px-6"
    >
      <div className="w-full max-w-[1200px]">

        {/* ══ HEADER ══ */}
        <div
          ref={headerRef}
          className="text-center mb-10"
          style={{
            opacity: headerVis ? 1 : 0,
            transform: headerVis ? "translateY(0)" : "translateY(-24px)",
            transition: "opacity .9s ease, transform .9s ease",
          }}
        >
          <p
            className="text-[#C9A84C] tracking-[.5em] text-sm sm:text-base mb-1 font-light"
            style={{ textShadow: "0 0 20px #c9a84c88" }}
          >
            S W A Q A R
          </p>
          <h1
            className="text-white font-bold tracking-widest text-3xl sm:text-5xl lg:text-6xl leading-tight mb-4"
            style={{ textShadow: "0 2px 40px #c9a84c33" }}
          >
            4-GATE CORRIDOR MODEL
          </h1>

          {/* divider with logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex-1 max-w-[100px] h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <div className="w-8 h-8">
              <SwaqarS />
            </div>
            <div className="flex-1 max-w-[100px] h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>

          <p className="text-[#8a8070] tracking-[.18em] text-[10px] sm:text-xs uppercase">
            A Controlled Pathway For Verified, Coordinated, And Trusted Trade Execution
          </p>
        </div>

        {/* ══ TIMELINE ROW (numbers + connecting line) ══ */}
        <div ref={cardsRef} className="w-full">

          {/* Desktop timeline */}
          <div className="hidden lg:block relative mb-0">
            {/* golden line */}
            <div className="absolute top-[27px] left-[6.25%] right-[6.25%] h-[2px] overflow-hidden">
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #8B6914, #F0D060, #C9A84C, #F0D060, #8B6914)",
                  boxShadow: "0 0 8px #C9A84C",
                  width: cardsVis ? "100%" : "0%",
                  transition: "width 1.4s ease .3s",
                }}
              />
            </div>

            {/* Number bubbles */}
            <div className="flex justify-around relative z-10">
              {gates.map((g, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center"
                  style={{
                    opacity: cardsVis ? 1 : 0,
                    transform: cardsVis ? "scale(1)" : "scale(0.4)",
                    transition: `opacity .5s ease ${i * 180 + 600}ms, transform .5s ease ${i * 180 + 600}ms`,
                  }}
                >
                  <div
                    className="w-[54px] h-[54px] rounded-full border-2 border-[#C9A84C] flex items-center justify-center"
                    style={{
                      background: "#0d0d0d",
                      boxShadow: "0 0 18px #C9A84C88, inset 0 0 10px #1a1200",
                    }}
                  >
                    <span className="text-[#C9A84C] font-bold text-sm tracking-widest">{g.num}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow heads on line */}
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="absolute top-[20px]"
                style={{
                  left: `calc(${(i + 1) * 25}% - 8px)`,
                  opacity: cardsVis ? 1 : 0,
                  transition: `opacity .4s ease ${i * 200 + 1200}ms`,
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    borderLeft: "12px solid #C9A84C",
                    filter: "drop-shadow(0 0 4px #C9A84C)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* ══ CARDS ══ */}
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-[10px] mt-3 lg:mt-3">
            {gates.map((g, i) => (
              <div
                key={i}
                className="flex-1"
                style={{
                  opacity: cardsVis ? 1 : 0,
                  transform: cardsVis ? "translateY(0)" : "translateY(50px)",
                  transition: `opacity .7s ease ${i * 160 + 300}ms, transform .7s ease ${i * 160 + 300}ms`,
                }}
              >
                {/* Mobile number */}
                <div className="flex lg:hidden items-center gap-2 mb-2">
                  <div
                    className="w-9 h-9 rounded-full border border-[#C9A84C] flex items-center justify-center text-[#C9A84C] text-xs font-bold"

                  >
                    {g.num}
                  </div>
                  {i < 3 && <div className="flex-1 h-px bg-gradient-to-r from-[#C9A84C] to-transparent" />}
                </div>

                {/* Card */}
                <div
                  className="rounded-2xl flex flex-col overflow-hidden h-full"
                  style={{
                    border: "1px solid #3a2e10",
                    boxShadow: "0 4px 40px #0008, inset 0 1px 0 #3a2e10",
                  }}
                >
                  {/* top golden bar */}
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

                  <div className="flex flex-col items-center px-5 py-6 gap-4 flex-1">
                    {/* Icon circle */}
                    <div
                      className="w-[90px] h-[90px] rounded-full flex items-center justify-center p-5"
                      style={{
                        background: "radial-gradient(circle, #2a1e04 0%, #111100 60%, #0a0a0a 100%)",
                        border: "1.5px solid #4a3810",
                        boxShadow: "0 0 20px #C9A84C22",
                      }}
                    >
                      <g.Icon />
                    </div>

                    {/* Gate label + title */}
                    <div className="text-center">
                      <p className="text-[#C9A84C] text-[10px] tracking-[.3em] font-semibold mb-1">{g.label}</p>
                      <h2 className="text-white font-bold text-base sm:text-lg tracking-widest leading-tight">
                        {g.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-[#7a7060] text-[11px] sm:text-xs text-center leading-relaxed flex-1">
                      {g.desc}
                    </p>

                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3a2e10] to-transparent" />

                    {/* Footer row */}
                    <div className="flex items-start gap-3 w-full">
                      <span className="flex-shrink-0 mt-0.5">
                        <g.FooterIcon />
                      </span>
                      <p className="text-[#7a7060] text-[11px] sm:text-xs leading-snug">{g.footerText}</p>
                    </div>
                  </div>

                  {/* bottom golden bar */}
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#3a2e10] to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ BOTTOM BANNER ══ */}
        <div
          ref={footerRef}
          className="mt-5 rounded-2xl overflow-hidden"
          style={{
            border: "1px solid #3a2e10",
            boxShadow: "0 4px 40px #0008",
            opacity: footerVis ? 1 : 0,
            transform: footerVis ? "translateY(0)" : "translateY(30px)",
            transition: "opacity .8s ease .2s, transform .8s ease .2s",
          }}
        >
          <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-0 px-6 py-5">

            {/* Left: logo + tagline */}
            <div className="flex items-center gap-4 sm:pr-6 sm:border-r sm:border-[#3a2e10] flex-shrink-0">
              <div
                className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden"
                style={{
                  border: "1.5px solid #4a3810",
                }}
              >
                <SwaqarS />
              </div>
              <div className="leading-tight">
                <p className="text-white font-bold tracking-[.2em] text-sm sm:text-[15px]">ONE CORRIDOR.</p>
                <p className="text-white font-bold tracking-[.2em] text-sm sm:text-[15px]">FOUR GATES.</p>
                <p className="text-[#C9A84C] font-bold tracking-[.2em] text-sm sm:text-[15px]">COMPLETE TRUST.</p>
              </div>
            </div>

            {/* Right: features */}
            <div className="flex flex-wrap justify-center sm:justify-around gap-5 flex-1 sm:pl-4">
              {footerFeatures.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2"
                  style={{
                    opacity: footerVis ? 1 : 0,
                    transform: footerVis ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity .6s ease ${i * 130 + 500}ms, transform .6s ease ${i * 130 + 500}ms`,
                  }}
                >
                  <f.Icon />
                  <div>
                    <p className="text-white font-bold text-[11px] tracking-widest leading-none">{f.bold}</p>
                    <p className="text-[#7a7060] text-[11px] leading-snug mt-0.5">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#3a2e10] to-transparent" />
        </div>

      </div>
    </div>
  );
}