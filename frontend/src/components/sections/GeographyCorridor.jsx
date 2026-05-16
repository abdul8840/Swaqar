import React from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const AFRICA_CORRIDORS = [
  { code: 'CMR', city: 'Yaoundé / Douala', country: 'Cameroon', goods: 'Cocoa, Timber, Coffee, Cotton', status: 'ACTIVE' },
  { code: 'NGA', city: 'Lagos / Abuja', country: 'Nigeria', goods: 'Crude, LNG, Agricultural', status: 'ACTIVE' },
  { code: 'GHA', city: 'Accra / Tema', country: 'Ghana', goods: 'Cocoa, Gold, Oil', status: 'ACTIVE' },
  { code: 'CIV', city: 'Abidjan', country: "Côte d'Ivoire", goods: 'Cocoa, Coffee, Rubber', status: 'ACTIVE' },
  { code: 'ETH', city: 'Addis Ababa', country: 'Ethiopia', goods: 'Coffee, Oilseeds, Flowers', status: 'MONITORING' },
  { code: 'KEN', city: 'Nairobi / Mombasa', country: 'Kenya', goods: 'Tea, Coffee, Horticulture', status: 'MONITORING' },
]

const ME_CORRIDORS = [
  { code: 'UAE', city: 'Dubai / Abu Dhabi', country: 'United Arab Emirates', type: 'Trade Hub & Re-export', status: 'ACTIVE' },
  { code: 'SAU', city: 'Riyadh / Jeddah', country: 'Saudi Arabia', type: 'Strategic Procurement', status: 'ACTIVE' },
  { code: 'QAT', city: 'Doha', country: 'Qatar', type: 'Sovereign Investment', status: 'ACTIVE' },
  { code: 'KWT', city: 'Kuwait City', country: 'Kuwait', type: 'Institutional Import', status: 'MONITORING' },
]

export default function GeographyCorridor() {
  return (
    <section id="corridors" className="py-28 lg:py-40 bg-[#0E0E0F]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel label="Geography & Corridor Map — SWQ.GEO.007" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-cinzel text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide mb-6 leading-tight">
            Active Trade{' '}
            <em className="font-cormorant italic text-[#C9A84C] not-italic" style={{ fontStyle: 'italic' }}>
              Corridors
            </em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-0 items-start">
          {/* Africa */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[9px] text-[#C9A84C] tracking-[0.25em] uppercase">
                Africa Supply Corridors
              </span>
              <div className="flex-1 h-px bg-[#2E2E36]" />
            </div>

            <div className="space-y-3">
              {AFRICA_CORRIDORS.map((corridor, i) => (
                <motion.div
                  key={corridor.code}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group border border-[#2E2E36] hover:border-[#C9A84C22] bg-[#0E0E11] p-4 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute right-0 top-0 bottom-0 w-0 group-hover:w-0.5 bg-[#C9A84C] transition-all duration-300" />

                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-[#C9A84C] font-medium tracking-wider">
                        {corridor.code}
                      </span>
                      <span className="font-inter text-xs text-[#E8E6E0]">
                        {corridor.city}
                      </span>
                    </div>
                    <span className={`font-mono text-[7px] tracking-widest uppercase px-1.5 py-0.5 border ${
                      corridor.status === 'ACTIVE'
                        ? 'text-[#4CAF50] border-[#2D5A2D] bg-[#0A140A]'
                        : 'text-[#6B6760] border-[#2E2E36]'
                    }`}>
                      {corridor.status}
                    </span>
                  </div>
                  <div className="font-mono text-[8px] text-[#6B6760] tracking-wider mb-1">
                    {corridor.country}
                  </div>
                  <div className="font-inter text-[10px] text-[#4B4840]">
                    {corridor.goods}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center SWAQAR hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center justify-center px-6 lg:px-12 py-8 lg:py-0 min-w-[180px]"
          >
            {/* Animated arrows Africa → SWAQAR */}
            <div className="hidden lg:flex flex-col items-center gap-1 mb-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="text-[#C9A84C] text-xs"
                  animate={{ x: [0, 4, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                >
                  →
                </motion.div>
              ))}
            </div>

            {/* SWAQAR node */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 border border-[#C9A84C] -m-3"
                animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="w-24 h-24 border border-[#C9A84C] bg-[#0E0E0F] flex flex-col items-center justify-center relative z-10">
                <span className="font-cinzel text-xs text-[#C9A84C] tracking-widest mb-1">
                  SWAQAR
                </span>
                <span className="font-mono text-[7px] text-[#6B6760] tracking-widest uppercase text-center leading-tight">
                  Governance
                  <br />
                  Hub
                </span>
              </div>
            </div>

            {/* Animated arrows SWAQAR → ME */}
            <div className="hidden lg:flex flex-col items-center gap-1 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="text-[#C9A84C] text-xs"
                  animate={{ x: [0, 4, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 + 0.5 }}
                >
                  →
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Middle East */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#2E2E36]" />
              <span className="font-mono text-[9px] text-[#C9A84C] tracking-[0.25em] uppercase">
                Middle East Demand Markets
              </span>
            </div>

            <div className="space-y-3">
              {ME_CORRIDORS.map((corridor, i) => (
                <motion.div
                  key={corridor.code}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group border border-[#2E2E36] hover:border-[#C9A84C22] bg-[#0E0E11] p-4 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-0.5 bg-[#C9A84C] transition-all duration-300" />

                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-[#C9A84C] font-medium tracking-wider">
                        {corridor.code}
                      </span>
                      <span className="font-inter text-xs text-[#E8E6E0]">
                        {corridor.city}
                      </span>
                    </div>
                    <span className={`font-mono text-[7px] tracking-widest uppercase px-1.5 py-0.5 border ${
                      corridor.status === 'ACTIVE'
                        ? 'text-[#4CAF50] border-[#2D5A2D] bg-[#0A140A]'
                        : 'text-[#6B6760] border-[#2E2E36]'
                    }`}>
                      {corridor.status}
                    </span>
                  </div>
                  <div className="font-mono text-[8px] text-[#6B6760] tracking-wider mb-1">
                    {corridor.country}
                  </div>
                  <div className="font-inter text-[10px] text-[#4B4840]">
                    {corridor.type}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}