import React from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const DOES = [
  { title: 'Governs Verification', desc: 'Maintains institutional identity and credential verification standards for all counterparties.' },
  { title: 'Coordinates Compliance', desc: 'Ensures all transactions meet regulatory, sanctions, and documentary compliance requirements.' },
  { title: 'Issues Execution Approval', desc: 'Formally approves or suspends transactions based on compliance gate assessments.' },
  { title: 'Maintains Governance Records', desc: 'Archives complete institutional audit records for every transaction cycle.' },
  { title: 'Coordinates Trade Structure', desc: 'Aligns counterparties on payment timing, delivery logistics, and documentation format.' },
  { title: 'Reports to Authorities', desc: 'Provides compliance-ready reporting to applicable regulatory authorities and institutional partners.' },
]

const DOES_NOT = [
  { title: 'Hold Participant Funds', desc: 'SWAQAR has zero custodial authority over any participant assets, currencies, or instruments.' },
  { title: 'Act as Trade Agent', desc: 'SWAQAR does not represent any buyer, seller, or counterparty in a transactional capacity.' },
  { title: 'Operate Logistics', desc: 'Freight, shipping, customs brokerage, and delivery are entirely outside SWAQAR infrastructure.' },
  { title: 'Provide Investment Advice', desc: 'No investment recommendations, asset management, or advisory services are provided.' },
  { title: 'Execute Payments', desc: 'Payment execution occurs directly between counterparties — not through SWAQAR systems.' },
  { title: 'Guarantee Outcomes', desc: 'SWAQAR governs process — it does not guarantee commercial outcomes or counterparty performance.' },
]

export default function DoesDoesNot() {
  return (
    <section className="py-28 lg:py-40 bg-[#0E0E0F]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel label="Operational Boundaries — SWQ.OPB.009" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-cinzel text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide mb-6 leading-tight">
            SWAQAR{' '}
            <em className="font-cormorant italic text-[#C9A84C] not-italic" style={{ fontStyle: 'italic' }}>
              Does
            </em>
            {' '}—{' '}
            <span className="text-[#4B4840]">Does Not</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* DOES */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border border-[#C9A84C22] p-8 lg:p-12 bg-[#0A0D0A]"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-6 bg-[#C9A84C]" />
              <span className="font-mono text-[9px] text-[#C9A84C] tracking-[0.3em] uppercase">
                SWAQAR Does
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {DOES.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group border-l border-[#C9A84C33] pl-5 hover:border-[#C9A84C] transition-colors duration-300"
                >
                  <h4 className="font-cinzel text-sm text-[#E8E6E0] mb-1.5 tracking-wide group-hover:text-[#C9A84C] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="font-inter text-xs text-[#6B6760] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* DOES NOT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="border border-[#2E2E36] p-8 lg:p-12 bg-[#0F0E0D]"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-6 bg-[#3D3D3D]" />
              <span className="font-mono text-[9px] text-[#4B4840] tracking-[0.3em] uppercase">
                SWAQAR Does Not
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {DOES_NOT.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                  className="border-l border-[#2E2E36] pl-5"
                >
                  <h4 className="font-cinzel text-sm text-[#4B4840] mb-1.5 tracking-wide line-through decoration-[#3D3D3D]">
                    {item.title}
                  </h4>
                  <p className="font-inter text-xs text-[#3D3A35] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}