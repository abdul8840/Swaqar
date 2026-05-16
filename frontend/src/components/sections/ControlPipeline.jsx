import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import GoldDivider from '../ui/GoldDivider'
import { ArrowRight } from 'lucide-react'

const STAGES = [
  {
    id: 'identify',
    num: '01',
    label: 'IDENTIFY',
    title: 'Counterparty Identification',
    desc: 'All participants — suppliers, buyers, investors, and intermediaries — undergo institutional identity verification. Credentials are validated against regulatory databases, trade registries, and sovereign watchlists before any transaction can proceed.',
    tags: ['KYB Verification', 'Registry Cross-Check', 'Watchlist Screening'],
    duration: '24–72 hrs',
  },
  {
    id: 'validate',
    num: '02',
    label: 'VALIDATE',
    title: 'Document Validation',
    desc: 'Trade documentation — including commodity certificates, export permits, letters of credit, and customs declarations — is assessed for regulatory compliance, authenticity, and alignment with corridor-specific requirements.',
    tags: ['Document Authenticity', 'Regulatory Compliance', 'Commodity Checks'],
    duration: '48–96 hrs',
  },
  {
    id: 'coordinate',
    num: '03',
    label: 'COORDINATE',
    title: 'Coordination & Structuring',
    desc: 'SWAQAR coordinates payment structuring, delivery scheduling, and counterparty alignment. This does not constitute financial intermediation — it is governance-layer coordination between verified institutional parties.',
    tags: ['Payment Architecture', 'Delivery Coordination', 'Party Alignment'],
    duration: '72–120 hrs',
  },
  {
    id: 'execute',
    num: '04',
    label: 'EXECUTE',
    title: 'Execution Approval',
    desc: 'Following full validation, SWAQAR issues execution approval. The transaction proceeds through sovereign-aligned channels. SWAQAR does not touch funds — execution occurs directly between counterparties.',
    tags: ['Approval Issuance', 'Channel Routing', 'Sovereign Alignment'],
    duration: '12–48 hrs',
  },
  {
    id: 'govern',
    num: '05',
    label: 'GOVERN',
    title: 'Post-Trade Governance',
    desc: 'Post-execution, SWAQAR maintains a governance record of the transaction lifecycle, flags compliance anomalies, and provides institutional participants with audit-ready reporting consistent with OHADA and bilateral trade frameworks.',
    tags: ['Audit Records', 'Compliance Reporting', 'Post-Trade Monitoring'],
    duration: 'Ongoing',
  },
]

/**
 * ControlPipeline (more creative)
 * - Timeline rail is placed BELOW the numbers (nodes), like you requested.
 * - Adds: dotted background + cursor glow, animated flow particles on rail, hover spotlight per stage,
 *   animated "connector" from node to content, and a "progress" feel.
 * - Fully responsive:
 *   - Mobile/Tablet: stacked cards with a left rail + node row; timeline sits beneath node row
 *   - Desktop: 5 columns with node row on top, rail under it, content row beneath
 */
export default function ControlPipeline() {
  const wrapRef = useRef(null)
  const isInView = useInView(wrapRef, { once: true, amount: 0.25 })

  const [activeStage, setActiveStage] = useState(null)
  const [mouse, setMouse] = useState({ x: 50, y: 40, active: false })

  useEffect(() => {
    if (!isInView) return
    let i = 0
    const t = setInterval(() => {
      setActiveStage(i)
      i += 1
      if (i >= STAGES.length) clearInterval(t)
    }, 450)
    return () => clearInterval(t)
  }, [isInView])

  const dots = useMemo(() => {
    const cols = 30
    const rows = 12
    const out = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if ((r + c) % 3 === 0) continue
        out.push({
          id: `${r}-${c}`,
          left: `${(c / (cols - 1)) * 100}%`,
          top: `${(r / (rows - 1)) * 100}%`,
          size: (r * cols + c) % 11 === 0 ? 2 : 1.5,
          opacity: 0.08 + ((r * cols + c) % 9) * 0.01,
        })
      }
    }
    return out
  }, [])

  const onMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    })
  }

  const onLeave = () => setMouse((m) => ({ ...m, active: false }))

  return (
    <section
      id="pipeline"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative py-20 sm:py-24 lg:py-40 bg-[#141416] overflow-hidden"
    >
      {/* Background: dotted field + cursor glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.06]">
          {dots.map((d, i) => (
            <motion.span
              key={d.id}
              className="absolute rounded-full bg-[#B8B2A8]"
              style={{
                left: d.left,
                top: d.top,
                width: d.size,
                height: d.size,
                opacity: d.opacity,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ opacity: [d.opacity, d.opacity + 0.06, d.opacity] }}
              transition={{
                duration: 3 + (i % 7) * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (i % 12) * 0.06,
              }}
            />
          ))}
        </div>

        <motion.div
          className="absolute inset-0"
          animate={{ opacity: mouse.active ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_30%,transparent_35%,#141416_85%)]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12" ref={wrapRef}>
        <SectionLabel label="Transaction Control Pipeline — SWQ.TCP.002" />

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10 sm:mb-14"
        >
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide mb-4 sm:mb-6 leading-tight">
            The Control{' '}
            <em className="font-cormorant italic text-[#C9A84C] not-italic" style={{ fontStyle: 'italic' }}>
              Pipeline
            </em>
          </h2>
          <p className="font-inter text-sm lg:text-base text-[#6B6760] max-w-2xl leading-relaxed">
            Every transaction processed through SWAQAR infrastructure traverses a sequential,
            non-negotiable control pipeline. No stage may be bypassed, compressed, or delegated
            to an unauthorized counterparty.
          </p>
        </motion.div>

        <GoldDivider className="mb-12 sm:mb-16 lg:mb-20" />

        {/* ───────────────────────────────────────────────────────────── */}
        {/* Desktop pipeline: Node row → timeline rail (below node) → content row */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="hidden lg:block">
          {/* Node Row */}
          <div className="grid grid-cols-5 gap-0">
            {STAGES.map((stage, i) => (
              <StageNode
                key={stage.id}
                stage={stage}
                index={i}
                isActive={activeStage !== null && i <= activeStage}
              />
            ))}
          </div>

          {/* Rail BELOW the node row (requested) */}
          <div className="relative mt-2 mb-8">
            {/* Base rail */}
            <div className="mx-[7%] h-px bg-[#2E2E36]" />
            {/* Gold progress */}
            <motion.div
              className="absolute left-[7%] right-[7%] top-0 h-px bg-[#C9A84C]"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 2.6, ease: 'easeInOut', delay: 0.35 }}
              style={{
                transformOrigin: 'left',
                filter: 'drop-shadow(0 0 5px rgba(201,168,76,0.40))',
              }}
            />
            {/* Flow particles on rail */}
            <FlowParticles />
          </div>

          {/* Content Row */}
          <div className="grid grid-cols-5 gap-0">
            {STAGES.map((stage, i) => (
              <StageContent
                key={stage.id}
                stage={stage}
                index={i}
                isActive={activeStage !== null && i <= activeStage}
              />
            ))}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* Mobile/Tablet pipeline: stacked cards with left rail + node + rail below node */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="lg:hidden relative">
          {/* Left rail */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[#2E2E36]" />
          <motion.div
            className="absolute left-4 top-0 w-px bg-[#C9A84C]"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2.6, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 5px rgba(201,168,76,0.35))' }}
          />

          <div className="space-y-5 sm:space-y-6">
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="relative pl-10"
              >
                {/* Node */}
                <div className="absolute left-4 top-4 -translate-x-1/2">
                  <MobileNode num={stage.num} index={i} />
                </div>

                {/* Node row (num + label) */}
                <div className="border border-[#2E2E36] bg-[#0E0E11]/70 backdrop-blur-[2px]">
                  <div className="px-4 py-4 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[9px] text-[#C9A84C] tracking-widest mb-1">
                        {stage.num}
                      </div>
                      <div className="font-mono text-[8px] text-[#6B6760] tracking-widest uppercase">
                        {stage.label}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[8px] text-[#6B6760] tracking-wider">
                        {stage.duration}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#C9A84C66]" />
                    </div>
                  </div>

                  {/* Timeline segment BELOW the number (requested) */}
                  <div className="relative h-px bg-[#2E2E36]">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#C9A84C]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.15 + i * 0.08 }}
                      style={{ filter: 'drop-shadow(0 0 4px rgba(201,168,76,0.35))' }}
                    />
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
                      animate={{ left: ['0%', '96%'], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        ease: 'easeInOut',
                        delay: i * 0.25,
                      }}
                      style={{ boxShadow: '0 0 10px rgba(201,168,76,0.8)' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="px-4 py-5">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-mono text-[8px] text-[#C9A84C] tracking-widest border border-[#C9A84C33] px-2 py-0.5">
                        {stage.label}
                      </span>
                      <span className="font-mono text-[8px] text-[#6B6760] tracking-wider">
                        {stage.duration}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-sm sm:text-base text-[#E8E6E0] mb-3 tracking-wide leading-snug">
                      {stage.title}
                    </h3>
                    <p className="font-inter text-xs text-[#6B6760] leading-relaxed mb-4">
                      {stage.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {stage.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[7px] text-[#6B6760] border border-[#2E2E36] px-2 py-0.5 tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enforcement strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-12 sm:mt-14 lg:mt-16 border border-[#C9A84C22] bg-[#0E0E11]/70 backdrop-blur-[2px] p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-px h-10 bg-[#C9A84C]" />
            <div>
              <div className="font-mono text-[9px] text-[#C9A84C] tracking-widest uppercase mb-1">
                Pipeline Enforcement
              </div>
              <div className="font-inter text-sm text-[#A8A49C]">
                All five control stages are mandatory. Stage compression, parallel processing,
                or unauthorized bypass results in automatic transaction suspension.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#C9A84C]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono text-[9px] text-[#C9A84C] tracking-widest uppercase">
              Enforced
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Desktop pieces ── */

function StageNode({ stage, index, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 8 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`relative px-6 ${index > 0 ? 'border-l border-[#2E2E36]' : ''}`}
    >
      <div className="relative flex justify-center">
        {/* hover spotlight */}
        <div className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_140px_at_50%_50%,rgba(201,168,76,0.12),transparent_70%)]" />
        <motion.div
          whileHover={{ y: -3 }}
          className={`group relative w-20 h-20 border flex flex-col items-center justify-center transition-colors duration-500 ${
            isActive ? 'border-[#C9A84C] bg-[#C9A84C0A]' : 'border-[#2E2E36] bg-[#0E0E0F]'
          }`}
          style={{
            boxShadow: isActive ? '0 0 22px rgba(201,168,76,0.10)' : 'none',
          }}
        >
          {/* animated ripple */}
          {isActive && (
            <motion.div
              className="absolute inset-0 border border-[#C9A84C]"
              animate={{ opacity: [0.45, 0, 0.45], scale: [1, 1.16, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.15 }}
            />
          )}

          <span className="font-mono text-[9px] text-[#C9A84C] tracking-widest mb-1">
            {stage.num}
          </span>
          <span className="font-mono text-[8px] text-[#6B6760] tracking-widest uppercase">
            {stage.label}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

function StageContent({ stage, index, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 10 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative px-6 pb-2 ${index > 0 ? 'border-l border-[#2E2E36]' : ''}`}
    >
      {/* connector from node area down to content */}
      <div className="absolute top-[-18px] left-1/2 -translate-x-1/2 w-px h-5 bg-[#2E2E36]" />
      <motion.div
        className="absolute top-[-18px] left-1/2 -translate-x-1/2 w-px h-5 bg-[#C9A84C]"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isActive ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        style={{ transformOrigin: 'top', filter: 'drop-shadow(0 0 4px rgba(201,168,76,0.35))' }}
      />

      <motion.div
        whileHover={{ y: -3 }}
        className="group relative border border-[#2E2E36] bg-[#0E0E11]/60 backdrop-blur-[2px] p-5 overflow-hidden"
      >
        {/* hover scan line */}
        <motion.div
          className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C22] to-transparent opacity-0 group-hover:opacity-100"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: 'linear' }}
        />

        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="font-mono text-[8px] text-[#C9A84C] tracking-widest border border-[#C9A84C33] px-2 py-0.5">
            {stage.duration}
          </span>
          <ArrowRight className="w-4 h-4 text-[#C9A84C66] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <h3 className="font-cinzel text-sm text-[#E8E6E0] mb-3 tracking-wide leading-snug">
          {stage.title}
        </h3>
        <p className="font-inter text-xs text-[#6B6760] leading-relaxed mb-4">
          {stage.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {stage.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[7px] text-[#6B6760] border border-[#2E2E36] px-2 py-0.5 tracking-wider uppercase
                         group-hover:border-[#C9A84C22] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            className="w-1 h-1 rounded-full bg-[#C9A84C]"
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 }}
          />
          <span className="font-mono text-[8px] text-[#C9A84C] tracking-wider">
            Stage {stage.num} active rules
          </span>
        </div>

        {/* subtle hover glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(201,168,76,0.10),transparent_60%)]" />
      </motion.div>
    </motion.div>
  )
}

function FlowParticles() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
          initial={{ left: '7%', opacity: 0 }}
          animate={{ left: ['7%', '93%'], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            repeatDelay: 0.7,
            delay: i * 0.75,
            ease: 'easeInOut',
          }}
          style={{ boxShadow: '0 0 10px rgba(201,168,76,0.8)' }}
        />
      ))}
    </>
  )
}

/* ── Mobile node ── */
function MobileNode({ num, index }) {
  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 -m-2 rounded-full"
        animate={{ opacity: [0.12, 0.28, 0.12], scale: [1, 1.25, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.22), transparent 65%)' }}
      />
      <div className="w-10 h-10 border border-[#C9A84C] bg-[#141416] flex items-center justify-center">
        <span className="font-mono text-[9px] text-[#C9A84C] font-medium">{num}</span>
      </div>
    </div>
  )
}