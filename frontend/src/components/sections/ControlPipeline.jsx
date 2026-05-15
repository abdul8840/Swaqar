import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import GoldDivider from '../ui/GoldDivider'

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

export default function ControlPipeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeStage, setActiveStage] = useState(null)

  useEffect(() => {
    if (!isInView) return
    let i = 0
    const interval = setInterval(() => {
      setActiveStage(i)
      i++
      if (i >= STAGES.length) clearInterval(interval)
    }, 500)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section id="pipeline" className="py-28 lg:py-40 bg-[#141416]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12" ref={ref}>
        <SectionLabel label="Transaction Control Pipeline — SWQ.TCP.002" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-cinzel text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide mb-6 leading-tight">
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

        <GoldDivider className="mb-20" />

        {/* Pipeline visual */}
        <div className="relative">
          {/* Connecting rail (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[7%] right-[7%] h-px">
            <div className="w-full h-px bg-[#2E2E36]" />
            <motion.div
              className="absolute inset-0 h-px bg-[#C9A84C]"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0">
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 40 }}
                animate={activeStage !== null && i <= activeStage ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`relative lg:px-4 xl:px-6 group ${i > 0 ? 'lg:border-l border-[#2E2E36]' : ''}`}
              >
                {/* Node */}
                <div className="relative flex lg:justify-center mb-6 lg:mb-8">
                  <motion.div
                    className={`relative w-20 h-20 border flex flex-col items-center justify-center transition-all duration-500 ${
                      activeStage !== null && i <= activeStage
                        ? 'border-[#C9A84C] bg-[#C9A84C0A]'
                        : 'border-[#2E2E36] bg-[#0E0E0F]'
                    }`}
                  >
                    {activeStage !== null && i <= activeStage && (
                      <motion.div
                        className="absolute inset-0 border border-[#C9A84C]"
                        animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.15, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
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

                {/* Content */}
                <div>
                  <h3 className="font-cinzel text-sm text-[#E8E6E0] mb-3 tracking-wide leading-snug">
                    {stage.title}
                  </h3>
                  <p className="font-inter text-xs text-[#6B6760] leading-relaxed mb-4">
                    {stage.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {stage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[7px] text-[#6B6760] border border-[#2E2E36] px-2 py-0.5 tracking-wider uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                    <span className="font-mono text-[8px] text-[#C9A84C] tracking-wider">
                      {stage.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enforcement strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 border border-[#C9A84C22] bg-[#0E0E11] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
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