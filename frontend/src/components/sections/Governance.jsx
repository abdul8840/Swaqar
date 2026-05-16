import React, { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

const GOVERNANCE_LAYERS = [
  {
    code: 'GOV.L1',
    title: 'Verification Layer',
    badge: 'LAYER 01',
    number: '01',
    desc: 'The foundational governance tier responsible for identity verification, credential validation, and counterparty authentication. All entities must pass Verification Layer protocols before ascending to subsequent transaction stages.',
    controls: [
      'KYB / KYC institutional protocols',
      'Trade registry cross-verification',
      'OFAC & UN sanctions screening',
      'Commodity certification review',
      'Export authority validation',
    ],
    authority: 'Verification Authority',
    level: 'Foundation',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="18" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="2 2" />
        <path d="M20 8 L20 32 M8 20 L32 20" stroke="#C9A84C" strokeWidth="0.3" opacity="0.4" />
        <path d="M14 14 L20 8 L26 14 L26 22 C26 26 20 30 20 30 C20 30 14 26 14 22 Z"
          stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        <path d="M17 20 L19 22 L23 18" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: 'from-[#C9A84C08] via-transparent to-transparent',
    accentPos: 'top-left',
  },
  {
    code: 'GOV.L2',
    title: 'Financial Control Layer',
    badge: 'LAYER 02',
    number: '02',
    desc: 'The intermediate governance tier governing financial instrument review, payment architecture coordination, and transaction structuring compliance. Ensures financial flows align with regulatory requirements.',
    controls: [
      'Letter of Credit review',
      'Documentary credit structuring',
      'Payment timeline compliance',
      'Currency control alignment',
      'Tax treaty coordination',
    ],
    authority: 'Financial Control Authority',
    level: 'Intermediate',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="18" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="2 2" />
        <rect x="10" y="13" width="20" height="14" rx="1" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
        <path d="M10 18 L30 18" stroke="#C9A84C" strokeWidth="1.2" />
        <circle cx="20" cy="24" r="2" stroke="#C9A84C" strokeWidth="1" fill="none" />
        <path d="M14 22 L16 22 M24 22 L26 22" stroke="#C9A84C" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    ),
    gradient: 'from-transparent via-[#C9A84C05] to-transparent',
    accentPos: 'center',
  },
  {
    code: 'GOV.L3',
    title: 'System Governance Layer',
    badge: 'LAYER 03',
    number: '03',
    desc: 'The apex governance tier responsible for execution approval, post-trade audit, compliance reporting, and systemic risk assessment. Operates with direct reference to OHADA and bilateral trade agreements.',
    controls: [
      'Execution approval authority',
      'Post-trade audit records',
      'OHADA compliance reporting',
      'Bilateral treaty alignment',
      'Systemic risk assessment',
    ],
    authority: 'Apex Governance Authority',
    level: 'Apex',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="18" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="2 2" />
        <polygon points="20,9 23,17 32,17 25,22 27,31 20,26 13,31 15,22 8,17 17,17"
          stroke="#C9A84C" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      </svg>
    ),
    gradient: 'from-transparent via-transparent to-[#C9A84C08]',
    accentPos: 'bottom-right',
  },
]

/* ── tiny helpers ── */
const SectionLabel = ({ label }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 mb-10"
  >
    <div className="w-6 h-px bg-[#C9A84C]" />
    <span className="font-mono text-[9px] tracking-[0.35em] text-[#C9A84C] uppercase">{label}</span>
    <div className="flex-1 h-px bg-gradient-to-r from-[#C9A84C33] to-transparent" />
  </motion.div>
)

/* ── animated counter ── */
function Counter({ value, duration = 1.5 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, v => String(Math.round(v)).padStart(2, '0'))

  React.useEffect(() => {
    if (inView) animate(count, parseInt(value), { duration })
  }, [inView])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

/* ── floating particle ── */
const Particle = ({ style }) => (
  <motion.div
    className="absolute w-px h-px bg-[#C9A84C] rounded-full"
    animate={{ y: [0, -60, 0], opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3, ease: 'easeInOut' }}
    style={style}
  />
)

/* ── card component ── */
function LayerCard({ layer, index }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const particles = Array.from({ length: 6 }, (_, i) => ({
    left: `${10 + i * 15}%`,
    bottom: `${5 + (i % 3) * 5}%`,
  }))

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className="relative group cursor-default"
    >
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-px rounded-none pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #C9A84C22 0%, transparent 60%)`,
        }}
      />

      {/* Main card */}
      <motion.div
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative bg-[#0C0C0F] border border-[#1E1E26] overflow-hidden h-full flex flex-col"
        style={{
          boxShadow: hovered
            ? '0 20px 60px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.15), inset 0 1px 0 rgba(201,168,76,0.08)'
            : '0 4px 20px -4px rgba(0,0,0,0.6)',
        }}
      >
        {/* Gradient bg */}
        <div className={`absolute inset-0 bg-gradient-to-br ${layer.gradient} pointer-events-none`} />

        {/* Mouse-follow spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          style={{
            background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, rgba(201,168,76,0.04) 0%, transparent 70%)`,
          }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', transformOrigin: 'center' }}
        />

        {/* Scan line animation */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C15] to-transparent pointer-events-none"
          animate={{ top: hovered ? ['0%', '100%'] : '0%', opacity: hovered ? [0, 1, 1, 0] : 0 }}
          transition={{ duration: 2, ease: 'linear', repeat: hovered ? Infinity : 0, repeatDelay: 0.5 }}
        />

        {/* Floating particles */}
        {hovered && particles.map((style, i) => <Particle key={i} style={style} />)}

        {/* ── HEADER ── */}
        <div className="relative flex items-center justify-between px-6 pt-6 pb-5 border-b border-[#1A1A22]">
          {/* Number */}
          <div className="relative">
            <motion.span
              className="font-mono text-[56px] font-bold leading-none select-none"
              animate={{ color: hovered ? '#C9A84C' : '#1E1E26' }}
              transition={{ duration: 0.4 }}
            >
              <Counter value={layer.number} duration={1 + index * 0.3} />
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 h-px bg-[#C9A84C]"
              animate={{ width: hovered ? '100%' : '0%' }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Icon + Badge */}
          <div className="flex flex-col items-end gap-2">
            <motion.div
              className="w-10 h-10"
              animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
              transition={{ duration: 0.4, ease: 'backOut' }}
            >
              {layer.icon}
            </motion.div>
            <div className="flex items-center gap-1.5">
              <motion.div
                className="w-1 h-1 rounded-full bg-[#C9A84C]"
                animate={{ scale: hovered ? [1, 1.5, 1] : 1 }}
                transition={{ duration: 1, repeat: hovered ? Infinity : 0 }}
              />
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#C9A84C] uppercase">
                {layer.badge}
              </span>
            </div>
          </div>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div className="px-6 py-3 border-b border-[#1A1A22] bg-[#08080A]">
          <div className="flex items-center gap-1.5 mb-1.5">
            {[0, 1, 2].map(j => (
              <div key={j} className="relative flex-1 h-0.5 bg-[#1E1E26] overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#C9A84C]"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: j <= index ? '100%' : '0%' } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 + j * 0.15 + 0.4 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-[7px] text-[#3E3E4A] tracking-widest uppercase">
              {layer.badge} / 03
            </span>
            <motion.span
              className="font-mono text-[7px] tracking-widest uppercase"
              animate={{ color: hovered ? '#C9A84C' : '#3E3E4A' }}
            >
              {layer.level}
            </motion.span>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 flex flex-col p-6">
          {/* Title */}
          <motion.h3
            className="font-cinzel text-base lg:text-lg text-[#E8E6E0] tracking-wide mb-3 leading-snug"
            animate={{ color: hovered ? '#F0ECD8' : '#E8E6E0' }}
          >
            {layer.title}
          </motion.h3>

          {/* Description */}
          <p className="font-inter text-[11px] text-[#5A5750] leading-relaxed mb-6">
            {layer.desc}
          </p>

          {/* Controls list */}
          <div className="flex-1 space-y-2.5 mb-6">
            {layer.controls.map((ctrl, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + j * 0.08 + 0.6 }}
                className="flex items-center gap-3 group/item"
              >
                {/* Diamond bullet */}
                <motion.div
                  className="relative flex-shrink-0 w-3 h-3 flex items-center justify-center"
                  animate={{ scale: hovered ? 1.2 : 1 }}
                  transition={{ duration: 0.3, delay: j * 0.03 }}
                >
                  <div
                    className="w-1.5 h-1.5 rotate-45 border border-[#C9A84C55] bg-[#C9A84C11]"
                    style={{ transition: 'all 0.3s' }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ opacity: hovered ? 1 : 0 }}
                  >
                    <div className="w-1 h-1 rotate-45 bg-[#C9A84C]" />
                  </motion.div>
                </motion.div>

                <span className="font-mono text-[9px] text-[#7A7670] tracking-wider group-hover/item:text-[#B8B4AC] transition-colors duration-200">
                  {ctrl}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-[#1E1E26] pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1 h-1 rounded-full bg-[#C9A84C]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="font-mono text-[7px] text-[#C9A84C] tracking-[0.25em] uppercase">
                  {layer.code}
                </span>
              </div>
              <motion.div
                className="font-mono text-[7px] text-[#3E3E4A] tracking-widest uppercase px-2 py-0.5 border border-[#2E2E36]"
                animate={{
                  borderColor: hovered ? 'rgba(201,168,76,0.3)' : 'rgba(46,46,54,1)',
                  color: hovered ? '#C9A84C99' : '#3E3E4A',
                }}
                transition={{ duration: 0.3 }}
              >
                {layer.authority}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        {[
          'top-0 left-0 border-t border-l',
          'top-0 right-0 border-t border-r',
          'bottom-0 left-0 border-b border-l',
          'bottom-0 right-0 border-b border-r',
        ].map((cls, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 ${cls} border-[#C9A84C]`}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ── Main Section ── */
export default function Governance() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="governance"
      ref={sectionRef}
      className="relative py-28 lg:py-40 bg-[#0A0A0D] overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_40%,#0A0A0D_100%)]" />
        {/* Ambient gold orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)', filter: 'blur(50px)' }}
        />

        {/* Diagonal lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" preserveAspectRatio="none">
          {[...Array(6)].map((_, i) => (
            <line key={i} x1={`${i * 20}%`} y1="0%" x2={`${i * 20 + 15}%`} y2="100%"
              stroke="#C9A84C" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel label="Governance Architecture — SWQ.GOV.006" />

        {/* ── Title block ── */}
        <div className="mb-16 lg:mb-20 grid lg:grid-cols-2 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-[#C9A84C]"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  />
                ))}
              </div>
              <span className="font-mono text-[9px] tracking-[0.35em] text-[#C9A84C55] uppercase">
                Three-Tier Architecture
              </span>
            </motion.div>

            <h2 className="font-cinzel text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide leading-tight">
              {'Governance'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.03 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <br />
              <em className="font-cormorant italic text-[#C9A84C] not-italic" style={{ fontStyle: 'italic' }}>
                {'Architecture'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.03 }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:pl-8 lg:border-l border-[#1E1E26]"
          >
            <p className="font-inter text-sm text-[#5A5750] leading-relaxed mb-6">
              SWAQAR operates a three-tier governance architecture. Each layer exercises
              distinct authority over specific transaction phases, with no layer permitted
              to override or circumvent the controls of another.
            </p>
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '03', label: 'Authority Layers' },
                { value: '15', label: 'Control Points' },
                { value: '∞', label: 'Audit Trail' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="border border-[#1E1E26] p-3 bg-[#0C0C0F] relative group hover:border-[#C9A84C33] transition-colors duration-300"
                >
                  <div className="font-mono text-xl text-[#C9A84C] mb-1">{stat.value}</div>
                  <div className="font-mono text-[7px] text-[#3E3E4A] tracking-widest uppercase">{stat.label}</div>
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-[#C9A84C]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {GOVERNANCE_LAYERS.map((layer, i) => (
            <LayerCard key={layer.code} layer={layer} index={i} />
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 border border-[#1A1A22] bg-[#08080A] p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-[8px] text-[#3E3E4A] tracking-[0.25em] uppercase">
              Governance Framework Active
            </span>
            <span className="font-mono text-[8px] text-[#C9A84C55] tracking-widest">
              SWQ.GOV.006 — LIVE
            </span>
          </div>
          <div className="flex items-center gap-6">
            {['Foundation', 'Intermediate', 'Apex'].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-4 h-px bg-[#C9A84C]" style={{ opacity: 0.3 + i * 0.35 }} />
                <span className="font-mono text-[7px] text-[#3E3E4A] tracking-widest uppercase">{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}