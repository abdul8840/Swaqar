import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'System', href: '#system' },
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Participants', href: '#participants' },
  { label: 'Governance', href: '#governance' },
  { label: 'Corridors', href: '#corridors' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0E0E0F]/95 backdrop-blur-md border-b border-[#C9A84C22]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-8 h-8 border border-[#C9A84C] flex items-center justify-center">
                <div className="w-4 h-4 border border-[#C9A84C44] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#C9A84C]" />
                </div>
              </div>
              <motion.div
                className="absolute inset-0 border border-[#C9A84C]"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <div className="font-cinzel text-sm text-[#E8E6E0] tracking-[0.15em] uppercase">
                SWAQAR
              </div>
              <div className="font-mono text-[9px] text-[#C9A84C] tracking-[0.2em] uppercase">
                Trade Infrastructure
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-xs text-[#A8A49C] hover:text-[#C9A84C] tracking-[0.12em] uppercase transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="font-mono text-[9px] text-[#6B6760] tracking-widest uppercase">
                System Active
              </span>
            </div>
            <a
              href="#intake"
              className="border border-[#C9A84C] px-5 py-2 font-mono text-[10px] text-[#C9A84C] tracking-[0.15em] uppercase hover:bg-[#C9A84C11] transition-all duration-300 group"
            >
              Request Pilot
              <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#A8A49C] hover:text-[#C9A84C] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0E0E0F] border-b border-[#2E2E36] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-xs text-[#A8A49C] hover:text-[#C9A84C] tracking-[0.15em] uppercase transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#intake"
                onClick={() => setMenuOpen(false)}
                className="mt-2 border border-[#C9A84C] px-5 py-3 font-mono text-[10px] text-[#C9A84C] tracking-[0.15em] uppercase text-center"
              >
                Request Pilot
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}