import React from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const LIFECYCLE_STEPS = [
  {
    num: '01',
    title: 'Supplier Verification',
    duration: '24–72 hours',
    desc: 'The originating supplier submits institutional credentials, commodity documentation, export permits, and trade registry records to SWAQAR for independent verification against applicable databases and regulatory frameworks.',
    authority: 'Verification Layer',
  },
  {
    num: '02',
    title: 'Buyer Pre-Qualification',
    duration: '48–96 hours',
    desc: 'The receiving buyer submits import licenses, financial standing declarations, regulatory clearances, and counterparty accreditation documents. Cross-referenced against GCC and bilateral trade registries.',
    authority: 'Verification Layer',
  },
  {
    num: '03',
    title: 'Document Compliance Check',
    duration: '48–120 hours',
    desc: 'All trade documentation — including certificates of origin, phytosanitary certificates, quality assurance reports, and customs pre-declarations — is reviewed for authenticity, regulatory compliance, and corridor alignment.',
    authority: 'Financial Control Layer',
  },
  {
    num: '04',
    title: 'Payment Structuring Coordination',
    duration: '72–120 hours',
    desc: 'SWAQAR coordinates the payment architecture between counterparties — advising on instrument selection, timing alignment, and regulatory compliance — without acting as payment intermediary or fund custodian at any stage.',
    authority: 'Financial Control Layer',
  },
  {
    num: '05',
    title: 'Execution Approval Issuance',
    duration: '12–48 hours',
    desc: 'Upon completion of all validation gates, SWAQAR issues a formal Execution Approval document authorizing the transaction to proceed through designated channels. This document constitutes the formal governance clearance.',
    authority: 'System Governance Layer',
  },
  {
    num: '06',
    title: 'Delivery & Settlement Confirmation',
    duration: 'Per agreed schedule',
    desc: 'Post-execution, SWAQAR receives delivery confirmation and settlement attestation from both counterparties. Records are archived in the governance database for compliance reporting and audit readiness.',
    authority: 'System Governance Layer',
  },
]

const SUMMARY_CARDS = [
  { label: 'Typical Cycle Duration', value: '14–28', unit: 'Business Days' },
  { label: 'Transaction Type', value: 'B2B', unit: 'Institutional Only' },
  { label: 'Operational Model', value: '0%', unit: 'Fund Custody' },
]

export default function TransactionLifecycle() {
  return (
    <section className="py-28 lg:py-40 bg-[#0E0E0F]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel label="Transaction Lifecycle — SWQ.TLC.005" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-cinzel text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide mb-6 leading-tight">
            Transaction{' '}
            <em className="font-cormorant italic text-[#C9A84C] not-italic" style={{ fontStyle: 'italic' }}>
              Lifecycle
            </em>
          </h2>
          <p className="font-inter text-sm lg:text-base text-[#6B6760] max-w-2xl leading-relaxed">
            The complete institutional trade lifecycle from supplier engagement to
            delivery settlement, as governed by SWAQAR infrastructure protocols.
          </p>
        </motion.div>

        {/* Summary metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {SUMMARY_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-[#C9A84C22] bg-[#0E0E11] p-6 flex items-center gap-5"
            >
              <div className="w-px h-12 bg-[#C9A84C]" />
              <div>
                <div className="font-mono text-[8px] text-[#6B6760] tracking-widest uppercase mb-1">
                  {card.label}
                </div>
                <div className="font-cinzel text-2xl text-[#C9A84C] gold-text-glow">
                  {card.value}
                </div>
                <div className="font-mono text-[8px] text-[#A8A49C] tracking-wider mt-0.5">
                  {card.unit}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical rail */}
          <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px bg-[#2E2E36] -translate-x-1/2" />
          <motion.div
            className="absolute left-[22px] md:left-1/2 top-0 w-px bg-[#C9A84C] -translate-x-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "easeInOut" }}
            style={{ filter: 'drop-shadow(0 0 4px #C9A84C66)' }}
          />

          <div className="space-y-12">
            {LIFECYCLE_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Content - alternating sides */}
                <div className={`flex-1 pl-12 md:pl-0 ${
                  i % 2 === 0
                    ? 'md:pr-12 xl:pr-20 md:text-right'
                    : 'md:pl-12 xl:pl-20 md:text-left'
                }`}>
                  <div className={`flex items-center gap-3 mb-3 ${
                    i % 2 === 0
                      ? 'md:justify-end'
                      : 'md:justify-start'
                  }`}>
                    <span className="font-mono text-[8px] text-[#C9A84C] tracking-widest border border-[#C9A84C33] px-2 py-0.5">
                      {step.authority}
                    </span>
                    <span className="font-mono text-[8px] text-[#6B6760] tracking-wider">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="font-cinzel text-base lg:text-lg text-[#E8E6E0] tracking-wide mb-3">
                    {step.title}
                  </h3>
                  <p className="font-inter text-xs text-[#6B6760] leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>

                {/* Timeline node */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    className="relative w-11 h-11 border border-[#C9A84C] bg-[#0E0E0F] flex items-center justify-center"
                    whileInView={{ borderColor: '#C9A84C' }}
                  >
                    <motion.div
                      className="absolute inset-0 border border-[#C9A84C]"
                      animate={{ opacity: [0.3, 0, 0.3], scale: [1, 1.3, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    />
                    <span className="font-mono text-[9px] text-[#C9A84C] font-medium">
                      {step.num}
                    </span>
                  </motion.div>
                </div>

                {/* Empty side for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}