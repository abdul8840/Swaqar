import React from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const PARTICIPANTS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="18" rx="1" stroke="#C9A84C" strokeWidth="1.2" />
        <path d="M10 8V6a6 6 0 0112 0v2" stroke="#C9A84C" strokeWidth="1.2" />
        <circle cx="16" cy="17" r="3" stroke="#C9A84C" strokeWidth="1" />
        <path d="M16 20v4" stroke="#C9A84C" strokeWidth="1" />
      </svg>
    ),
    code: 'PART.01',
    title: 'Verified Suppliers',
    region: 'Africa Supply Corridors',
    desc: 'Agricultural commodity exporters, natural resource extractors, and manufactured goods producers operating across OHADA-framework jurisdictions. All suppliers complete institutional KYB verification and commodity certification before eligibility.',
    criteria: ['OHADA-registered entities', 'Export permit holders', 'Commodity certification', 'Trade registry verified'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="6" width="26" height="20" rx="1" stroke="#C9A84C" strokeWidth="1.2" />
        <path d="M3 12h26" stroke="#C9A84C" strokeWidth="1" />
        <rect x="7" y="16" width="6" height="4" stroke="#C9A84C" strokeWidth="1" />
        <path d="M17 18h8M17 21h5" stroke="#C9A84C" strokeWidth="1" />
      </svg>
    ),
    code: 'PART.02',
    title: 'Qualified Buyers',
    region: 'Middle East Demand Markets',
    desc: 'State trading organizations, private sector importers, and institutional procurement offices operating in UAE, Saudi Arabia, Qatar, and Kuwait. Buyers are pre-qualified through bilateral trade credential verification and financial capacity assessment.',
    criteria: ['GCC-registered entities', 'Import license verified', 'Financial capacity screened', 'Credit reference confirmed'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <polygon points="16,4 28,10 28,22 16,28 4,22 4,10" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
        <circle cx="16" cy="16" r="5" stroke="#C9A84C" strokeWidth="1" />
        <path d="M16 11V7M16 21v4M11 16H7M21 16h4" stroke="#C9A84C" strokeWidth="0.8" />
      </svg>
    ),
    code: 'PART.03',
    title: 'Strategic Investors',
    region: 'Sovereign & Institutional Capital',
    desc: 'Sovereign wealth funds, development finance institutions, private equity structures, and family office capital engaging trade corridor investment opportunities. SWAQAR provides infrastructure intelligence, not investment advice.',
    criteria: ['Institutional accreditation', 'AML/KYC verified', 'Investment mandate aligned', 'Regulatory clearance'],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="10" height="10" rx="0.5" stroke="#C9A84C" strokeWidth="1.2" />
        <rect x="18" y="4" width="10" height="10" rx="0.5" stroke="#C9A84C" strokeWidth="1.2" />
        <rect x="4" y="18" width="10" height="10" rx="0.5" stroke="#C9A84C" strokeWidth="1.2" />
        <rect x="18" y="18" width="10" height="10" rx="0.5" stroke="#C9A84C" strokeWidth="1.2" />
        <path d="M14 9h4M14 23h4M9 14v4M23 14v4" stroke="#C9A84C" strokeWidth="0.8" />
      </svg>
    ),
    code: 'PART.04',
    title: 'Institutional Partners',
    region: 'Regulatory & Financial Infrastructure',
    desc: 'Central banks, trade finance institutions, bilateral trade agencies, and regulatory bodies coordinating cross-corridor compliance. Institutional partners integrate with SWAQAR governance layers to maintain regulatory alignment across jurisdictions.',
    criteria: ['Governmental authority', 'Regulatory mandate', 'Bilateral MOU alignment', 'System access approved'],
  },
]

export default function Participants() {
  return (
    <section id="participants" className="py-28 lg:py-40 bg-[#141416]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel label="Participant Architecture — SWQ.PAR.004" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-cinzel text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide mb-6 leading-tight">
            Who{' '}
            <em className="font-cormorant italic text-[#C9A84C] not-italic" style={{ fontStyle: 'italic' }}>
              Participates
            </em>
          </h2>
          <p className="font-inter text-sm lg:text-base text-[#6B6760] max-w-2xl leading-relaxed">
            SWAQAR infrastructure is accessible exclusively to credentialed institutional
            counterparties who have completed verification under the applicable governance tier.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PARTICIPANTS.map((p, i) => (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative border border-[#2E2E36] bg-[#0E0E11] p-8 hover:border-[#C9A84C22] transition-all duration-500 hover-lift"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-700" />

              <div className="mb-6">
                <div className="text-[#C9A84C] mb-6 group-hover:[filter:drop-shadow(0_0_8px_#C9A84C66)] transition-all duration-300">
                  {p.icon}
                </div>
                <div className="font-mono text-[8px] text-[#C9A84C] tracking-[0.3em] uppercase mb-2">
                  {p.code}
                </div>
                <h3 className="font-cinzel text-base text-[#E8E6E0] tracking-wide mb-1">
                  {p.title}
                </h3>
                <div className="font-mono text-[8px] text-[#6B6760] tracking-widest uppercase">
                  {p.region}
                </div>
              </div>

              <p className="font-inter text-xs text-[#6B6760] leading-relaxed mb-6">
                {p.desc}
              </p>

              <div className="border-t border-[#2E2E36] pt-5 space-y-2">
                {p.criteria.map((c, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#C9A84C] opacity-60" />
                    <span className="font-mono text-[8px] text-[#6B6760] tracking-wider">{c}</span>
                  </div>
                ))}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C22] group-hover:w-full transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}