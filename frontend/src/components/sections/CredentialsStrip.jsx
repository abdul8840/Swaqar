import React from 'react'
import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'

const METRICS = [
  {
    value: 6,
    suffix: '',
    label: 'Active Trade Corridors',
    sub: 'Africa ↔ Middle East',
  },
  {
    value: 12,
    suffix: '',
    label: 'Institutional Participant Categories',
    sub: 'Verified & Credentialed',
  },
  {
    value: 12,
    suffix: '',
    label: 'Sequential Validation Gates',
    sub: 'Per Transaction Cycle',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Non-Custodial Infrastructure',
    sub: 'Zero Fund Custody Model',
  },
]

export default function CredentialsStrip() {
  return (
    <section className="relative bg-[#0E0E0F] border-y border-[#C9A84C11]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`py-10 px-6 lg:px-10 relative group ${
                i < METRICS.length - 1 ? 'border-r border-[#2E2E36]' : ''
              } ${i < 2 ? 'border-b border-[#2E2E36] lg:border-b-0' : ''}`}
            >
              {/* Gold top accent on hover */}
              <div className="absolute top-0 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-500" />

              <div className="font-cinzel text-3xl lg:text-4xl mb-2 gold-text-glow">
                <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </div>
              <div className="font-inter text-xs text-[#E8E6E0] tracking-wide mb-1 leading-snug">
                {metric.label}
              </div>
              <div className="font-mono text-[9px] text-[#6B6760] tracking-widest uppercase">
                {metric.sub}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C22] group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}