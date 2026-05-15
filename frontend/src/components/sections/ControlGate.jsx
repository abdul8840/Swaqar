import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const APPROVED_CHECKS = [
  'KYB verification complete — Tier 1',
  'Commodity export permit validated',
  'Sanctions screening — CLEAR',
  'OHADA compliance confirmed',
  'Letter of Credit authenticated',
  'Regulatory corridor approval issued',
]

const REJECTED_CHECKS = [
  'Identity verification — INCOMPLETE',
  'Export documentation — MISSING',
  'Sanctions match detected — HOLD',
  'Compliance framework — NOT MET',
  'Financial instrument — UNVERIFIED',
  'Regulatory approval — NOT OBTAINED',
]

export default function ControlGate() {
  const [view, setView] = useState('both')

  return (
    <section className="py-28 lg:py-40 bg-[#0E0E0F]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel label="Control Gate Architecture — SWQ.CGA.003" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-cinzel text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide mb-6 leading-tight">
            The Control{' '}
            <em className="font-cormorant italic text-[#C9A84C] not-italic" style={{ fontStyle: 'italic' }}>
              Gate
            </em>
          </h2>
          <p className="font-inter text-sm lg:text-base text-[#6B6760] max-w-2xl leading-relaxed">
            SWAQAR's control gate architecture separates compliant transactions from
            non-compliant ones through a multi-layer enforcement system. Every transaction
            is assessed against sovereign-grade compliance criteria before gate approval is issued.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Approved Path */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative border border-[#2D5A2D] bg-[#0A140A] p-8 lg:p-10 group hover-lift"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4CAF50] to-transparent" />

            <div className="flex items-center gap-3 mb-8">
              <div className="border border-[#2D5A2D] bg-[#1A2D1A] px-3 py-1">
                <span className="font-mono text-[9px] text-[#4CAF50] tracking-[0.2em] uppercase">
                  Gate: Approved
                </span>
              </div>
              <motion.div
                className="w-2 h-2 rounded-full bg-[#4CAF50]"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            <h3 className="font-cinzel text-xl text-[#E8E6E0] mb-2 tracking-wide">
              Transaction Approved
            </h3>
            <p className="font-inter text-xs text-[#6B6760] mb-8 leading-relaxed">
              All validation criteria satisfied. Execution approval issued.
              Transaction proceeds through designated sovereign channels.
            </p>

            <div className="space-y-3 mb-8">
              {APPROVED_CHECKS.map((check, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-4 h-4 border border-[#2D5A2D] bg-[#1A2D1A] flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4L3 6L7 2" stroke="#4CAF50" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <span className="font-inter text-xs text-[#A8A49C]">{check}</span>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-[#1A3A1A] pt-6">
              <div className="font-mono text-[8px] text-[#4CAF50] tracking-widest uppercase">
                GATE CLEARANCE: ISSUED — EXECUTION AUTHORIZED
              </div>
            </div>
          </motion.div>

          {/* Rejected Path */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative border border-[#3D1A1A] bg-[#0F0808] p-8 lg:p-10 group"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6B2020] to-transparent" />

            <div className="flex items-center gap-3 mb-8">
              <div className="border border-[#3D1A1A] bg-[#1A0A0A] px-3 py-1">
                <span className="font-mono text-[9px] text-[#6B2020] tracking-[0.2em] uppercase">
                  Gate: Blocked
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#6B2020]" />
            </div>

            <h3 className="font-cinzel text-xl text-[#6B6760] mb-2 tracking-wide">
              Transaction Suspended
            </h3>
            <p className="font-inter text-xs text-[#4B4840] mb-8 leading-relaxed">
              One or more validation criteria not satisfied. Gate clearance
              denied. Transaction suspended pending remediation.
            </p>

            <div className="space-y-3 mb-8">
              {REJECTED_CHECKS.map((check, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-4 h-4 border border-[#3D1A1A] bg-[#1A0A0A] flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M2 2L6 6M6 2L2 6" stroke="#6B2020" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <span className="font-inter text-xs text-[#4B4840] line-through decoration-[#3D1A1A]">
                    {check}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-[#2D0A0A] pt-6">
              <div className="font-mono text-[8px] text-[#6B2020] tracking-widest uppercase">
                GATE CLEARANCE: DENIED — TRANSACTION SUSPENDED
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sanctions notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 border border-[#2E2E36] bg-[#141416] p-5 flex items-center gap-6"
        >
          <div className="w-px h-10 bg-[#6B6760] flex-shrink-0" />
          <div>
            <span className="font-mono text-[8px] text-[#6B6760] tracking-widest uppercase">
              Screening Reference:
            </span>
            <span className="font-inter text-xs text-[#4B4840] ml-2">
              SWAQAR cross-references OFAC, UN Consolidated, EU Consolidated, FATF,
              and bilateral African Union / GCC sanctions lists for every transaction counterparty.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}