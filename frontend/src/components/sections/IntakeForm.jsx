import React, { useMemo, useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react'

// Import background image
import backgroundImage from '../../assets/lightWorldMap.png' // Replace with your image path

/**
 * Trade Opportunity Intake - Optimized for Performance
 * - Removed heavy animations that cause lag
 * - Simplified motion effects
 * - Optimized re-renders with useCallback
 * - Reduced backdrop-blur for better performance
 */

export default function IntakeForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px', triggerOnce: true })

  const [form, setForm] = useState({
    fullName: '',
    org: '',
    email: '',
    participation: '',
    phone: '',
    description: '',
    website: '',
  })

  const benefits = useMemo(
    () => [
      'Secure & Confidential',
      'Reviewed by Institutional Specialists',
      'Pilot Engagement Available',
      'Response within 2–3 Business Days',
    ],
    []
  )

  const onChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }, [])

  const onReset = useCallback(() => {
    setForm({
      fullName: '',
      org: '',
      email: '',
      participation: '',
      phone: '',
      description: '',
      website: '',
    })
  }, [])

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (form.website) return
    alert('Submitted (demo).')
  }, [form.website])

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden will-change-transform"
    >
      {/* Background Image - No animations */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Static grid overlay - No animations */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.35) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-10 md:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 lg:gap-8 xl:gap-10 items-start">
          {/* LEFT INFO - Minimal animation */}
          <div
            className="relative bg-black/70 rounded-xl p-6 border border-white/10 transition-all duration-300 hover:border-white/20"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-18px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <div className="text-[10px] sm:text-[11px] tracking-[0.35em] text-[#C9A84C] font-semibold uppercase mb-3">
              TRADE OPPORTUNITY INTAKE
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide leading-tight mb-4">
              Submit a Trade Opportunity
            </h2>

            <div className="h-px w-14 bg-gradient-to-r from-[#C9A84C] to-transparent mb-5" />

            <p className="text-[12px] sm:text-[13px] text-gray-300 leading-relaxed max-w-sm mb-6">
              Tell us about your opportunity. Our team will review and respond
              within 2–3 business days.
            </p>

            <div className="space-y-3">
              {benefits.map((b, i) => (
                <div
                  key={b}
                  className="flex items-center gap-3 transition-all duration-300"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(10px)',
                    transition: `opacity 0.3s ease-out ${0.15 + i * 0.05}s, transform 0.3s ease-out ${0.15 + i * 0.05}s`,
                  }}
                >
                  <div className="w-5 h-5 rounded-full border border-[#C9A84C66] bg-[#C9A84C10] grid place-items-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A84C]" />
                  </div>
                  <div className="text-[11px] sm:text-[12px] text-gray-200">
                    {b}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: FORM + SECURITY - Minimal glass effect */}
          <div
            className="relative bg-black/70 rounded-xl overflow-hidden border border-white/20 transition-all duration-300 hover:border-white/30"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s',
            }}
          >
            {/* Static accent line - No animation */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px]">
              {/* FORM */}
              <form onSubmit={onSubmit} className="p-5 sm:p-6 lg:p-7">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Full Name" required>
                    <Input
                      name="fullName"
                      value={form.fullName}
                      onChange={onChange}
                      placeholder="Enter your full name"
                    />
                  </Field>

                  <Field label="Organization / Company" required>
                    <Input
                      name="org"
                      value={form.org}
                      onChange={onChange}
                      placeholder="Enter your organization"
                    />
                  </Field>

                  <Field label="Email Address" required>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="name@company.com"
                    />
                  </Field>

                  <Field label="Participation Type" required>
                    <Select
                      name="participation"
                      value={form.participation}
                      onChange={onChange}
                      options={[
                        { value: '', label: 'Select participation type' },
                        { value: 'supplier', label: 'Supplier / Exporter' },
                        { value: 'buyer', label: 'Buyer / Importer' },
                        { value: 'financing', label: 'Financing Partner' },
                        { value: 'other', label: 'Other' },
                      ]}
                    />
                  </Field>

                  <Field label="Phone Number">
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="Enter phone number (optional)"
                    />
                  </Field>

                  <div className="hidden md:block" />
                </div>

                <Field label="Trade Opportunity Description" required className="mt-4">
                  <Textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    placeholder="Describe the products, volumes, counterparties, destination, and any other relevant details..."
                  />
                </Field>

                {/* Honeypot */}
                <div className="hidden">
                  <Input
                    name="website"
                    value={form.website}
                    onChange={onChange}
                    placeholder="Website"
                    autoComplete="off"
                  />
                </div>

                <div className="mt-5 flex flex-col sm:flex-row items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onReset}
                    className="h-9 px-4 border border-white/20 text-gray-300 text-[11px] font-medium bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200 w-full sm:w-auto rounded cursor-pointer"
                  >
                    Reset
                  </button>

                  <SubmitButton />
                </div>
              </form>

              {/* SECURITY PANEL */}
              <div className="border-t xl:border-t-0 xl:border-l border-white/10 p-6 flex flex-col items-center justify-center bg-black/10">
                <SecurityLock />

                <div className="mt-4 text-center">
                  <div className="text-[#C9A84C] text-[10px] tracking-[0.2em] font-semibold mb-2">
                    Your information is secure
                  </div>
                  <p className="text-gray-300 text-[10px] leading-relaxed max-w-[220px]">
                    All submissions are encrypted and handled with strict
                    confidentiality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Simple Field component - No animations */
function Field({ label, required, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] text-gray-200">{label}</span>
        {required && <span className="text-[10px] text-[#C9A84C]">*</span>}
      </div>
      {children}
    </label>
  )
}

function baseFieldClass() {
  return `
    w-full rounded
    bg-white/10
    border border-white/20
    text-white
    placeholder:text-gray-400
    outline-none
    transition-all duration-200
    focus:border-[#C9A84C]
    focus:shadow-[0_0_0_2px_rgba(201,168,76,0.2)]
    text-[11px] sm:text-[12px]
  `
}

function Input(props) {
  return (
    <input
      {...props}
      className={`${baseFieldClass()} h-10 px-3`}
    />
  )
}

function Select({ options, ...props }) {
  return (
    <select
      {...props}
      className={`${baseFieldClass()} h-10 px-3 appearance-none cursor-pointer bg-white/10`}
      style={{
        backgroundImage:
          "linear-gradient(45deg, transparent 50%, rgba(201,168,76,0.7) 50%), linear-gradient(135deg, rgba(201,168,76,0.7) 50%, transparent 50%)",
        backgroundPosition: 'calc(100% - 14px) calc(1em + 2px), calc(100% - 9px) calc(1em + 2px)',
        backgroundSize: '5px 5px, 5px 5px',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[#1a1a2e]">
          {o.label}
        </option>
      ))}
    </select>
  )
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      rows={5}
      className={`${baseFieldClass()} px-3 py-3 resize-none`}
    />
  )
}

/* Optimized Submit Button - CSS animations instead of JS */
function SubmitButton() {
  return (
    <button
      type="submit"
      className="relative h-9 px-4 pr-3 border border-[#C9A84C] bg-gradient-to-r from-[#C9A84C]/10 to-transparent overflow-hidden group w-full sm:w-auto rounded cursor-pointer transition-all duration-200 hover:from-[#C9A84C] hover:to-[#B78F2D] hover:border-transparent"
    >
      <span className="relative z-10 flex items-center justify-center gap-2 text-[11px] font-semibold text-[#C9A84C] group-hover:text-white transition-colors duration-200">
        Submit Opportunity
        <ArrowRight className="w-4 h-4" />
      </span>
    </button>
  )
}

/* Static Security Lock - CSS animations for performance */
function SecurityLock() {
  return (
    <div className="relative w-24 h-24 grid place-items-center">
      {/* Static rings - CSS animations for better performance */}
      <div className="absolute inset-0 rounded-full border border-[#C9A84C33] border-dashed animate-[spin_20s_linear_infinite]" />
      <div className="absolute inset-[10px] rounded-full border border-[#C9A84C55] animate-[spin_14s_linear_infinite_reverse]" />
      <div className="absolute inset-[18px] rounded-full border border-[#C9A84C66] animate-pulse" />

      {/* lock */}
      <div className="relative z-10 grid place-items-center">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.22),transparent_70%)] blur-xl" />
        <Lock className="w-7 h-7 text-[#C9A84C]" />
      </div>

      {/* orbit dot */}
      <div className="absolute w-2 h-2 rounded-full bg-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.9)] animate-[spin_6s_linear_infinite]">
        <div className="absolute w-2 h-2 rounded-full left-10" />
      </div>
    </div>
  )
}

// Add these keyframe animations to your global CSS or tailwind.config.js
// You can add this to your index.css or App.css:
/*
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-spin-slow {
  animation: spin 20s linear infinite;
}

.animate-spin-slower {
  animation: spin 14s linear infinite reverse;
}
*/