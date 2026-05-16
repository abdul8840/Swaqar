import React from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const GOVERNANCE_LAYERS = [
  {
    code: 'GOV.L1',
    title: 'Verification Layer',
    badge: 'LAYER 01',
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
  },
  {
    code: 'GOV.L2',
    title: 'Financial Control Layer',
    badge: 'LAYER 02',
    desc: 'The intermediate governance tier governing financial instrument review, payment architecture coordination, and transaction structuring compliance. This layer ensures financial flows align with regulatory requirements without SWAQAR acting as intermediary.',
    controls: [
      'Letter of Credit review',
      'Documentary credit structuring',
      'Payment timeline compliance',
      'Currency control alignment',
      'Tax treaty coordination',
    ],
    authority: 'Financial Control Authority',
    level: 'Intermediate',
  },
  {
    code: 'GOV.L3',
    title: 'System Governance Layer',
    badge: 'LAYER 03',
    desc: 'The apex governance tier responsible for execution approval, post-trade audit, compliance reporting, and systemic risk assessment. Operates with direct reference to OHADA, bilateral trade agreements, and applicable sovereign frameworks.',
    controls: [
      'Execution approval authority',
      'Post-trade audit records',
      'OHADA compliance reporting',
      'Bilateral treaty alignment',
      'Systemic risk assessment',
    ],
    authority: 'Apex Governance Authority',
    level: 'Apex',
  },
]

export default function Governance() {
  return (
    <section id="governance" className="py-28 lg:py-40 bg-[#141416]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel label="Governance Architecture — SWQ.GOV.006" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-cinzel text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide mb-6 leading-tight">
            Governance{' '}
            <em className="font-cormorant italic text-[#C9A84C] not-italic" style={{ fontStyle: 'italic' }}>
              Architecture
            </em>
          </h2>
          <p className="font-inter text-sm lg:text-base text-[#6B6760] max-w-2xl leading-relaxed">
            SWAQAR operates a three-tier governance architecture. Each layer exercises
            distinct authority over specific transaction phases, with no layer permitted
            to override or circumvent the controls of another.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {GOVERNANCE_LAYERS.map((layer, i) => (
            <motion.div
              key={layer.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative border border-[#2E2E36] bg-[#0E0E11] overflow-hidden hover:border-[#C9A84C22] transition-all duration-500 hover-lift"
            >
              {/* Header strip */}
              <div className="border-b border-[#2E2E36] p-6 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[8px] text-[#C9A84C] tracking-[0.3em] uppercase">
                    {layer.badge}
                  </span>
                </div>
                <div className="border border-[#C9A84C33] px-3 py-1">
                  <span className="font-mono text-[7px] text-[#C9A84C] tracking-widest uppercase">
                    {layer.level}
                  </span>
                </div>
              </div>

              {/* Hierarchy visual */}
              <div className="px-6 py-4 border-b border-[#1A1A1A]">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div
                      key={j}
                      className={`h-1 flex-1 ${j <= i ? 'bg-[#C9A84C]' : 'bg-[#2E2E36]'}`}
                    />
                  ))}
                </div>
                <div className="font-mono text-[7px] text-[#6B6760] tracking-widest mt-1">
                  {i === 0 ? 'LAYER 01 / 03' : i === 1 ? 'LAYER 02 / 03' : 'LAYER 03 / 03'}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-cinzel text-lg text-[#E8E6E0] tracking-wide mb-4">
                  {layer.title}
                </h3>
                <p className="font-inter text-xs text-[#6B6760] leading-relaxed mb-6">
                  {layer.desc}
                </p>

                <div className="space-y-2.5 mb-6">
                  {layer.controls.map((control, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 border border-[#C9A84C] bg-[#C9A84C22] flex-shrink-0" />
                      <span className="font-mono text-[8px] text-[#A8A49C] tracking-wider">
                        {control}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#2E2E36] pt-5">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                    <span className="font-mono text-[8px] text-[#C9A84C] tracking-widest uppercase">
                      {layer.code} — {layer.authority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Gold top accent on hover */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#C9A84C] group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}