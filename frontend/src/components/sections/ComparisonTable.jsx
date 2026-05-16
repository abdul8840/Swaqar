import React from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const COMPARISON_ROWS = [
  {
    category: 'Identity Verification',
    traditional: 'Minimal or self-declared',
    swaqar: 'Multi-layer KYB / institutional verification',
    swaqarGood: true,
  },
  {
    category: 'Document Validation',
    traditional: 'Buyer-dependent, inconsistent',
    swaqar: 'Independent compliance review — all documents',
    swaqarGood: true,
  },
  {
    category: 'Sanctions Screening',
    traditional: 'Optional or outsourced',
    swaqar: 'Mandatory OFAC / UN / EU / AU cross-reference',
    swaqarGood: true,
  },
  {
    category: 'Fund Custody',
    traditional: 'Intermediaries hold funds',
    swaqar: 'Zero custody — non-custodial architecture',
    swaqarGood: true,
  },
  {
    category: 'Regulatory Framework',
    traditional: 'Jurisdiction-variable, often unclear',
    swaqar: 'OHADA-aligned, bilateral treaty referenced',
    swaqarGood: true,
  },
  {
    category: 'Execution Approval',
    traditional: 'No formal governance approval',
    swaqar: 'Formal execution approval document issued',
    swaqarGood: true,
  },
  {
    category: 'Audit Trail',
    traditional: 'Fragmented or absent',
    swaqar: 'Complete institutional audit record',
    swaqarGood: true,
  },
  {
    category: 'Post-Trade Reporting',
    traditional: 'No structured reporting obligation',
    swaqar: 'Compliance-ready institutional reporting',
    swaqarGood: true,
  },
]

export default function ComparisonTable() {
  return (
    <section className="py-28 lg:py-40 bg-[#141416]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel label="System Comparison — SWQ.CMP.008" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-cinzel text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide mb-6 leading-tight">
            Traditional Trade{' '}
            <em className="font-cormorant italic text-[#C9A84C] not-italic" style={{ fontStyle: 'italic' }}>
              vs.
            </em>{' '}
            SWAQAR
          </h2>
          <p className="font-inter text-sm lg:text-base text-[#6B6760] max-w-2xl leading-relaxed">
            The distinction between conventional cross-border trade arrangements
            and SWAQAR-governed institutional trade infrastructure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#2E2E36]">
                <th className="text-left px-6 py-4 font-mono text-[9px] text-[#6B6760] tracking-[0.2em] uppercase w-[28%]">
                  Category
                </th>
                <th className="text-left px-6 py-4 font-mono text-[9px] text-[#6B6760] tracking-[0.2em] uppercase w-[36%]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#3D1A1A]" />
                    Traditional Trade
                  </div>
                </th>
                <th className="text-left px-6 py-4 font-mono text-[9px] text-[#C9A84C] tracking-[0.2em] uppercase w-[36%]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#C9A84C]" />
                    SWAQAR System
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="border-b border-[#1A1A1A] group hover:bg-[#0E0E11] transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <span className="font-inter text-xs text-[#A8A49C] group-hover:text-[#E8E6E0] transition-colors">
                      {row.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#6B2020] flex-shrink-0" />
                      <span className="font-inter text-xs text-[#4B4840]">
                        {row.traditional}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#C9A84C] flex-shrink-0" />
                      <span className="font-inter text-xs text-[#A8A49C] group-hover:text-[#E8E6E0] transition-colors">
                        {row.swaqar}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 border-l-2 border-[#C9A84C] pl-6 py-2"
        >
          <p className="font-cormorant italic text-lg text-[#C9A84C]" style={{ fontStyle: 'italic' }}>
            "SWAQAR does not replicate existing trade systems — it provides the institutional
            governance infrastructure that existing trade systems lack."
          </p>
        </motion.div>
      </div>
    </section>
  )
}