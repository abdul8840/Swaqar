import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const PARTICIPANT_TYPES = [
  'Select Participant Category',
  'Verified Supplier — Africa',
  'Qualified Buyer — Middle East',
  'Strategic Investor',
  'Institutional Partner',
  'Regulatory Authority',
  'Development Finance Institution',
  'Trade Finance Bank',
  'Other — Specify in Message',
]

const COMMODITY_TYPES = [
  'Select Commodity / Trade Type',
  'Agricultural Commodities',
  'Natural Resources & Extractives',
  'Manufactured Goods',
  'Energy Products',
  'Financial Trade Instruments',
  'Multi-Commodity Portfolio',
  'Not Applicable',
]

const VOLUME_RANGES = [
  'Select Transaction Volume',
  'Below USD 1M',
  'USD 1M — 10M',
  'USD 10M — 50M',
  'USD 50M — 250M',
  'Above USD 250M',
  'Portfolio / Ongoing',
]

export default function IntakeForm() {
  const [form, setForm] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    country: '',
    participantType: '',
    commodityType: '',
    volume: '',
    message: '',
    honeypot: '', // anti-spam
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success

  const validate = () => {
    const e = {}
    if (!form.organizationName.trim()) e.organizationName = 'Required'
    if (!form.contactName.trim()) e.contactName = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.country.trim()) e.country = 'Required'
    if (!form.participantType || form.participantType === PARTICIPANT_TYPES[0]) e.participantType = 'Required'
    if (!form.volume || form.volume === VOLUME_RANGES[0]) e.volume = 'Required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.honeypot) return // anti-spam
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setStatus('loading')
    setTimeout(() => setStatus('success'), 2000)
  }

  return (
    <section id="intake" className="py-28 lg:py-40 bg-[#141416]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel label="Trade Opportunity Intake — SWQ.INT.010" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-cinzel text-3xl lg:text-4xl xl:text-5xl text-[#E8E6E0] tracking-wide mb-6 leading-tight">
            Request a{' '}
            <em className="font-cormorant italic text-[#C9A84C] not-italic" style={{ fontStyle: 'italic' }}>
              Pilot Discussion
            </em>
          </h2>
          <p className="font-inter text-sm lg:text-base text-[#6B6760] max-w-2xl leading-relaxed">
            Complete the institutional intake form to initiate a pilot discussion.
            All submissions are reviewed by SWAQAR's verification team within 5 business days.
            Only credentialed institutional counterparties will receive a response.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-12 xl:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-[#2D5A2D] bg-[#0A140A] p-12 flex flex-col items-center text-center gap-6"
                >
                  <div className="w-16 h-16 border border-[#2D5A2D] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12L9 17L20 7" stroke="#4CAF50" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-cinzel text-xl text-[#E8E6E0] mb-3">
                      Submission Received
                    </h3>
                    <p className="font-inter text-sm text-[#6B6760] max-w-md leading-relaxed">
                      Your institutional intake has been received. SWAQAR's verification
                      team will review your submission and respond within 5 business days
                      if your profile meets our engagement criteria.
                    </p>
                  </div>
                  <div className="font-mono text-[9px] text-[#4CAF50] tracking-[0.2em] uppercase">
                    Reference: SWQ-{Date.now().toString().slice(-8)}
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  {/* Honeypot */}
                  <input
                    name="honeypot"
                    value={form.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex="-1"
                    aria-hidden="true"
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Organization Name"
                      name="organizationName"
                      value={form.organizationName}
                      onChange={handleChange}
                      error={errors.organizationName}
                      placeholder="Legal entity name"
                    />
                    <FormField
                      label="Contact Name"
                      name="contactName"
                      value={form.contactName}
                      onChange={handleChange}
                      error={errors.contactName}
                      placeholder="Full name and title"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Institutional Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="Institutional email address"
                    />
                    <FormField
                      label="Country / Jurisdiction"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      error={errors.country}
                      placeholder="Country of incorporation"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormSelect
                      label="Participant Category"
                      name="participantType"
                      value={form.participantType}
                      onChange={handleChange}
                      error={errors.participantType}
                      options={PARTICIPANT_TYPES}
                    />
                    <FormSelect
                      label="Commodity / Trade Type"
                      name="commodityType"
                      value={form.commodityType}
                      onChange={handleChange}
                      options={COMMODITY_TYPES}
                    />
                    <FormSelect
                      label="Transaction Volume"
                      name="volume"
                      value={form.volume}
                      onChange={handleChange}
                      error={errors.volume}
                      options={VOLUME_RANGES}
                    />
                  </div>

                  <FormTextarea
                    label="Additional Context"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your trade corridor, counterparty profile, and engagement objectives. More detail accelerates assessment."
                  />

                  <div className="flex items-start gap-4 pt-2">
                    <div className="flex-1">
                      <p className="font-mono text-[8px] text-[#4B4840] tracking-wider leading-relaxed">
                        By submitting this form, you confirm that you are an authorized
                        representative of a credentialed institutional entity, and that
                        all information provided is accurate and complete. SWAQAR reserves
                        the right to decline engagement without disclosure of reason.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative w-full md:w-auto border border-[#C9A84C] px-10 py-4 font-mono text-[10px] text-[#C9A84C] tracking-[0.2em] uppercase inline-flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 hover:text-[#0E0E0F] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-[#C9A84C] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                    <span className="relative flex items-center gap-3">
                      {status === 'loading' ? (
                        <>
                          <LoadingDots />
                          Processing Submission
                        </>
                      ) : (
                        <>
                          Submit Institutional Intake
                          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </>
                      )}
                    </span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="border border-[#2E2E36] bg-[#0E0E11] p-6">
              <div className="font-mono text-[9px] text-[#C9A84C] tracking-[0.25em] uppercase mb-5">
                Engagement Criteria
              </div>
              <div className="space-y-4">
                {[
                  'Registered institutional entity',
                  'Verifiable trade credentials',
                  'Minimum transaction threshold: USD 1M',
                  'Authorized signatory submission',
                  'Non-sanctioned jurisdiction',
                  'Trade-aligned business mandate',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-3 h-3 border border-[#C9A84C33] flex items-center justify-center flex-shrink-0">
                      <div className="w-1 h-1 bg-[#C9A84C] rounded-full" />
                    </div>
                    <span className="font-inter text-xs text-[#6B6760] leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#2E2E36] bg-[#0E0E11] p-6">
              <div className="font-mono text-[9px] text-[#6B6760] tracking-[0.25em] uppercase mb-5">
                Response Timeline
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Initial Assessment', time: '1–2 days' },
                  { label: 'Credential Review', time: '2–3 days' },
                  { label: 'Response Issued', time: '5 business days' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-[#1A1A1A] pb-3">
                    <span className="font-inter text-xs text-[#6B6760]">{item.label}</span>
                    <span className="font-mono text-[9px] text-[#C9A84C]">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#2E2E36] p-6">
              <div className="font-mono text-[9px] text-[#6B6760] tracking-[0.25em] uppercase mb-3">
                Direct Contact
              </div>
              <a
                href="mailto:intake@swaqar.com"
                className="font-inter text-xs text-[#C9A84C] hover:text-[#E8C97A] transition-colors"
              >
                intake@swaqar.com
              </a>
              <div className="mt-2 font-mono text-[8px] text-[#4B4840] tracking-wider">
                Institutional inquiries only
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="relative group">
      <label className="block font-mono text-[8px] text-[#6B6760] tracking-[0.2em] uppercase mb-2">
        {label}
        {error && <span className="ml-2 text-[#6B2020]">— {error}</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full bg-[#0E0E11] border px-4 py-3 font-inter text-sm text-[#E8E6E0] placeholder-[#3D3835] outline-none transition-all duration-300 ${
          error
            ? 'border-[#6B2020] focus:border-[#9B3020]'
            : 'border-[#2E2E36] focus:border-[#C9A84C]'
        } focus:bg-[#0E0E13]`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
    </div>
  )
}

function FormSelect({ label, name, value, onChange, error, options }) {
  return (
    <div>
      <label className="block font-mono text-[8px] text-[#6B6760] tracking-[0.2em] uppercase mb-2">
        {label}
        {error && <span className="ml-2 text-[#6B2020]">— {error}</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-[#0E0E11] border px-4 py-3 font-inter text-sm text-[#E8E6E0] outline-none transition-all duration-300 appearance-none cursor-pointer ${
          error
            ? 'border-[#6B2020] focus:border-[#9B3020]'
            : 'border-[#2E2E36] focus:border-[#C9A84C]'
        }`}
      >
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            className="bg-[#1A1A1D] text-[#E8E6E0]"
          >
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

function FormTextarea({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block font-mono text-[8px] text-[#6B6760] tracking-[0.2em] uppercase mb-2">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        className="w-full bg-[#0E0E11] border border-[#2E2E36] focus:border-[#C9A84C] px-4 py-3 font-inter text-sm text-[#E8E6E0] placeholder-[#3D3835] outline-none transition-all duration-300 resize-none"
      />
    </div>
  )
}

function LoadingDots() {
  return (
    <span className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1 h-1 rounded-full bg-current"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  )
}