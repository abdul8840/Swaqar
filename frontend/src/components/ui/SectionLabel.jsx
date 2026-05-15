import React from 'react'
import { motion } from 'framer-motion'

export default function SectionLabel({ label, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-3 mb-6 ${className}`}
    >
      <div className="w-6 h-px bg-[#C9A84C]" />
      <span className="font-mono text-[10px] text-[#C9A84C] tracking-[0.3em] uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-[#2E2E36]" />
    </motion.div>
  )
}