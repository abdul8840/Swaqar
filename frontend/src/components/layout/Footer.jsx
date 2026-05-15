import React from 'react'
import { motion } from 'framer-motion'

const GOVERNANCE_LINKS = [
  'Governance Framework',
  'Verification Protocol',
  'Compliance Standards',
  'System Architecture',
  'OHADA Reference',
  'Audit Standards',
]

const PARTICIPANT_LINKS = [
  'Supplier Verification',
  'Buyer Qualification',
  'Investor Access',
  'Institutional Partners',
  'Regulatory Authorities',
  'Development Finance',
]

const CORRIDOR_LINKS = [
  'CMR — UAE Corridor',
  'NGA — SAU Corridor',
  'GHA — QAT Corridor',
  'CIV — KWT Corridor',
  'ETH — UAE Corridor',
  'KEN — UAE Corridor',
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0B] border-t border-[#C9A84C11]">
      {/* Main footer content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 border border-[#C9A84C44] flex items-center justify-center">
                <div className="w-4 h-4 border border-[#C9A84C22] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#C9A84C]" />
                </div>
              </div>
              <div>
                <div className="font-cinzel text-sm text-[#E8E6E0] tracking-[0.15em]">SWAQAR LTD</div>
                <div className="font-mono text-[8px] text-[#6B6760] tracking-widest">CORRIDORS OF TRUST</div>
              </div>
            </div>

            <p className="font-inter text-xs text-[#4B4840] leading-relaxed mb-6">
              Institutional trade infrastructure governing verified cross-border trade
              between African supply corridors and Middle Eastern demand markets.
            </p>

            <div className="space-y-2">
              <div className="font-mono text-[8px] text-[#6B6760] tracking-widest uppercase">
                Primary Contact
              </div>
              <a href="mailto:operations@swaqar.com" className="font-inter text-xs text-[#C9A84C] hover:text-[#E8C97A] transition-colors">
                operations@swaqar.com
              </a>
            </div>

            <div className="mt-4 space-y-1">
              <a href="mailto:compliance@swaqar.com" className="block font-mono text-[8px] text-[#4B4840] hover:text-[#6B6760] transition-colors">
                compliance@swaqar.com
              </a>
              <a href="mailto:intake@swaqar.com" className="block font-mono text-[8px] text-[#4B4840] hover:text-[#6B6760] transition-colors">
                intake@swaqar.com
              </a>
            </div>
          </div>

          {/* Governance */}
          <div>
            <div className="font-mono text-[8px] text-[#C9A84C] tracking-[0.3em] uppercase mb-6">
              Governance
            </div>
            <ul className="space-y-3">
              {GOVERNANCE_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-inter text-xs text-[#4B4840] hover:text-[#A8A49C] transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Participants */}
          <div>
            <div className="font-mono text-[8px] text-[#C9A84C] tracking-[0.3em] uppercase mb-6">
              Participants
            </div>
            <ul className="space-y-3">
              {PARTICIPANT_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-inter text-xs text-[#4B4840] hover:text-[#A8A49C] transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Corridors */}
          <div>
            <div className="font-mono text-[8px] text-[#C9A84C] tracking-[0.3em] uppercase mb-6">
              Trade Corridors
            </div>
            <ul className="space-y-3">
              {CORRIDOR_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-inter text-xs text-[#4B4840] hover:text-[#A8A49C] transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Legal strip */}
      <div className="border-t border-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 lg:gap-8">
              {[
                'Privacy Policy',
                'Legal Notice',
                'Terms of Engagement',
                'Compliance Declaration',
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-mono text-[7px] text-[#3D3835] hover:text-[#6B6760] tracking-widest uppercase transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="font-mono text-[7px] text-[#2E2B28] tracking-widest uppercase text-right">
              © {new Date().getFullYear()} SWAQAR LTD — All Rights Reserved
            </div>
          </div>
        </div>
      </div>

      {/* Compliance metadata bar */}
      <div className="border-t border-[#111111] bg-[#080809]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <div className="font-mono text-[7px] text-[#1E1C1A] tracking-widest leading-relaxed max-w-3xl">
              SWAQAR LTD is incorporated and operates under the OHADA (Organisation pour l'Harmonisation en Afrique du Droit des Affaires) legal framework.
              SWAQAR does not provide financial advice, hold client funds, operate as a payment service provider, or function as a regulated financial institution.
              Cross-border trade coordination services are provided to institutional counterparties only. Engagement is subject to verification.
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-1 h-1 rounded-full bg-[#1E1C1A]" />
              <span className="font-mono text-[7px] text-[#1E1C1A] tracking-widest">OHADA REF: SWQ-2025</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}