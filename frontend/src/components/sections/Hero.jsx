import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import WorldMapSVG from '../ui/WorldMapSVG'

const TELEMETRY = [
  { label: 'CORRIDOR STATUS', value: 'ACTIVE', status: 'ok' },
  { label: 'VALIDATION GATES', value: '12 / 12', status: 'ok' },
  { label: 'SYNC INTERVAL', value: '00:04:32', status: 'ok' },
  { label: 'SYSTEM BUILD', value: 'SWQ-2025.03', status: 'ok' },
]

function TelemetryTicker() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="font-mono text-[9px] text-[#6B6760] tracking-widest">
      {time.toUTCString().replace('GMT', 'UTC')}
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0E0E0F]"
    >
      {/* World Map Background */}
      <WorldMapSVG />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,168,76,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,168,76,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top metadata bar */}
      <div className="absolute top-20 left-0 right-0 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between border-b border-[#C9A84C11] pb-3">
            <TelemetryTicker />
            <div className="hidden md:flex items-center gap-6">
              {TELEMETRY.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <motion.div
                    className="w-1 h-1 rounded-full bg-[#C9A84C]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() }}
                  />
                  <span className="font-mono text-[8px] text-[#6B6760] tracking-widest uppercase">
                    {item.label}:
                  </span>
                  <span className="font-mono text-[8px] text-[#C9A84C] tracking-widest">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        <div className="max-w-4xl">
          {/* System badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="border border-[#C9A84C33] px-4 py-1.5 flex items-center gap-3">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-mono text-[9px] text-[#C9A84C] tracking-[0.25em] uppercase">
                Live Infrastructure System — Verified Cross-Border Trade
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#E8E6E0] leading-[1.1] tracking-wide mb-8"
          >
            Corridors{' '}
            <em
              className="font-cormorant not-italic italic font-light"
              style={{ color: '#C9A84C', fontStyle: 'italic' }}
            >
              of Trust
            </em>
            <br />
            <span className="text-[#A8A49C]">between Africa</span>
            <br />
            and the Middle East
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-inter text-base lg:text-lg text-[#6B6760] leading-relaxed max-w-2xl mb-12"
          >
            SWAQAR LTD operates as a live coordination infrastructure governing verified
            cross-border trade between African supply corridors and Middle Eastern demand
            markets — coordinating verification, financial structuring, compliance enforcement,
            and execution approval across institutional counterparties.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#intake"
              className="group relative border border-[#C9A84C] px-8 py-4 font-mono text-[10px] text-[#C9A84C] tracking-[0.2em] uppercase inline-flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 hover:text-[#0E0E0F]"
            >
              <span className="absolute inset-0 bg-[#C9A84C] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative">Request a Pilot Discussion</span>
              <motion.span
                className="relative"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
            <a
              href="#system"
              className="group border border-[#2E2E36] hover:border-[#C9A84C33] px-8 py-4 font-mono text-[10px] text-[#6B6760] hover:text-[#A8A49C] tracking-[0.2em] uppercase inline-flex items-center justify-center gap-3 transition-all duration-300"
            >
              Read the System
              <span className="group-hover:translate-x-1 transition-transform duration-300">↓</span>
            </a>
          </motion.div>

          {/* Status indicators row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap items-center gap-6"
          >
            {[
              { label: 'Africa Supply Corridors', count: '6' },
              { label: 'ME Demand Markets', count: '4' },
              { label: 'Validation Gates', count: '12' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-px h-6 bg-[#2E2E36]" />
                <div>
                  <div className="font-mono text-[9px] text-[#6B6760] tracking-widest uppercase mb-0.5">
                    {item.label}
                  </div>
                  <div className="font-cinzel text-sm text-[#C9A84C]">{item.count}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right side telemetry panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3"
      >
        {[
          { label: 'SWAQAR.SYS', val: 'OPERATIONAL' },
          { label: 'CORRIDOR.01', val: 'CMR → UAE' },
          { label: 'CORRIDOR.02', val: 'NGA → SAU' },
          { label: 'GATE.STATUS', val: 'ALL CLEAR' },
          { label: 'TX.QUEUE', val: '003 PENDING' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.1 }}
            className="border-l border-[#C9A84C22] pl-3 group cursor-default"
          >
            <div className="font-mono text-[8px] text-[#4B4840] tracking-widest uppercase mb-0.5 group-hover:text-[#6B6760] transition-colors">
              {item.label}
            </div>
            <div className="font-mono text-[9px] text-[#C9A84C] tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
              {item.val}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom system line */}
      <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[8px] text-[#3A3835] tracking-widest uppercase">
              SWAQAR LTD — Incorporated under OHADA Framework — Trade Governance Infrastructure
            </div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-mono text-[8px] text-[#C9A84C] tracking-widest"
            >
              ▮ LIVE
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0E0E0F] to-transparent pointer-events-none" />
    </section>
  )
}