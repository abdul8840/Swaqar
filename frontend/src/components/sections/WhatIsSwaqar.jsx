import React from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import GoldDivider from '../ui/GoldDivider'

const IS_LIST = [
  'A live coordination infrastructure for verified institutional trade',
  'A governance framework for cross-border compliance enforcement',
  'A verification authority for suppliers, buyers, and counterparties',
  'A financial structuring coordinator — not a financial intermediary',
  'A documentation and execution approval system for trade cycles',
  'A regulated infrastructure operating under OHADA and sovereign frameworks',
]

const NOT_LIST = [
  'Not a marketplace or trading platform',
  'Not a broker, agent, or trade facilitator',
  'Not a logistics operator or freight coordinator',
  'Not a custodian or holder of participant funds',
  'Not a financial institution or payment provider',
  'Not an investment fund or asset manager',
]

export default function WhatIsSwaqar() {
  return (
    <section id="system" className="py-28 lg:py-40 bg-[#0E0E0F]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel label="System Definition — SWQ.DEF.001" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-cinzel text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide mb-6 leading-tight">
            What SWAQAR{' '}
            <em className="font-cormorant italic text-[#C9A84C] not-italic" style={{ fontStyle: 'italic' }}>
              Is
            </em>
            {' '}—{' '}
            <span className="text-[#4B4840]">and What It Is Not</span>
          </h2>
          <p className="font-inter text-sm lg:text-base text-[#6B6760] max-w-2xl leading-relaxed">
            SWAQAR's operational boundaries are defined with institutional precision.
            Understanding these boundaries is a prerequisite for engagement.
          </p>
        </motion.div>

        <GoldDivider className="mb-16" />

        <div className="grid lg:grid-cols-2 gap-0">
          {/* IS Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border border-[#C9A84C22] border-r-0 lg:border-r lg:border-[#C9A84C22] p-8 lg:p-12 bg-[#0E0E11]"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-5 h-5 border border-[#C9A84C] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#C9A84C]" />
              </div>
              <span className="font-mono text-[9px] text-[#C9A84C] tracking-[0.3em] uppercase">
                What SWAQAR Is
              </span>
            </div>

            <div className="space-y-5">
              {IS_LIST.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1 flex-shrink-0 w-4 h-4 border border-[#C9A84C33] bg-[#C9A84C11] flex items-center justify-center group-hover:border-[#C9A84C] transition-colors duration-300">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4L3 6L7 2" stroke="#C9A84C" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <span className="font-inter text-sm text-[#A8A49C] leading-snug group-hover:text-[#E8E6E0] transition-colors duration-300">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#C9A84C11]">
              <p className="font-mono text-[9px] text-[#6B6760] tracking-widest leading-relaxed uppercase">
                Operational authority governed by verified counterparty credentials,
                OHADA compliance frameworks, and sovereign trade protocols.
              </p>
            </div>
          </motion.div>

          {/* IS NOT Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border border-[#2E2E36] p-8 lg:p-12 bg-[#141416]"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-5 h-5 border border-[#3D3D3D] flex items-center justify-center">
                <div className="w-2 h-0.5 bg-[#6B6760]" />
              </div>
              <span className="font-mono text-[9px] text-[#6B6760] tracking-[0.3em] uppercase">
                What SWAQAR Is Not
              </span>
            </div>

            <div className="space-y-5">
              {NOT_LIST.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1 flex-shrink-0 w-4 h-4 border border-[#3D3D3D] bg-[#1A1A1A] flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M2 2L6 6M6 2L2 6" stroke="#6B6760" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <span className="font-inter text-sm text-[#4B4840] leading-snug line-through decoration-[#3D3D3D]">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#2E2E36]">
              <p className="font-mono text-[9px] text-[#4B4840] tracking-widest leading-relaxed uppercase">
                SWAQAR holds no custodial authority over participant assets,
                funds, cargo, or transactional instruments at any system layer.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}