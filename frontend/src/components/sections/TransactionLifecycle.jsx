import React, { useRef, useState, useEffect, useMemo } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'

/* ── Interactive Particle Background ── */
const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0, radius: 150 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = 1.2
        this.density = (Math.random() * 30) + 1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
      update() {
        let dx = mouse.current.x - this.x
        let dy = mouse.current.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        let forceDirectionX = dx / distance
        let forceDirectionY = dy / distance
        let maxDistance = mouse.current.radius
        let force = (maxDistance - distance) / maxDistance
        let directionX = forceDirectionX * force * this.density
        let directionY = forceDirectionY * force * this.density

        if (distance < mouse.current.radius) {
          this.x -= directionX
          this.y -= directionY
          ctx.fillStyle = '#C9A84C' // Golden glow on hover
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX
            this.x -= dx / 10
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY
            this.y -= dy / 10
          }
          ctx.fillStyle = '#333333' // Muted gray base
        }
      }
    }

    const init = () => {
      particles = []
      // Adjust density based on screen size
      const gap = window.innerWidth < 768 ? 40 : 30
      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          particles.push(new Particle(x, y))
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw()
        particles[i].update()
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    })
    window.addEventListener('resize', resize)
    
    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-40" />
}

const LIFECYCLE_STEPS = [
    {
      num: '01',
      title: 'Supplier Verification',
      duration: '24–72 hours',
      desc: 'The originating supplier submits institutional credentials, commodity documentation, export permits, and trade registry records to SWAQAR for independent verification.',
      authority: 'Verification Layer',
    },
    {
      num: '02',
      title: 'Buyer Pre-Qualification',
      duration: '48–96 hours',
      desc: 'The receiving buyer submits import licenses, financial standing declarations, and counterparty accreditation documents. Cross-referenced against GCC and bilateral trade registries.',
      authority: 'Verification Layer',
    },
    {
      num: '03',
      title: 'Document Compliance Check',
      duration: '48–120 hours',
      desc: 'All trade documentation — including certificates of origin and quality assurance reports — is reviewed for authenticity and corridor alignment.',
      authority: 'Financial Control Layer',
    },
    {
      num: '04',
      title: 'Payment Structuring Coordination',
      duration: '72–120 hours',
      desc: 'SWAQAR coordinates the payment architecture between counterparties — advising on instrument selection and timing alignment.',
      authority: 'Financial Control Layer',
    },
    {
      num: '05',
      title: 'Execution Approval Issuance',
      duration: '12–48 hours',
      desc: 'Upon completion of validation gates, SWAQAR issues a formal Execution Approval document authorizing the transaction to proceed through designated channels.',
      authority: 'System Governance Layer',
    },
    {
      num: '06',
      title: 'Delivery & Settlement Confirmation',
      duration: 'Schedule-based',
      desc: 'Post-execution, SWAQAR receives delivery confirmation and settlement attestation. Records are archived for compliance reporting and audit readiness.',
      authority: 'System Governance Layer',
    },
]

const SUMMARY_CARDS = [
  { label: 'Typical Cycle Duration', value: '14–28', unit: 'Business Days' },
  { label: 'Transaction Type', value: 'B2B', unit: 'Institutional Only' },
  { label: 'Operational Model', value: '0%', unit: 'Fund Custody' },
]

export default function TransactionLifecycle() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section ref={containerRef} className="relative py-28 lg:py-40 bg-[#0A0A0B] overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-px bg-[#C9A84C]" />
               <span className="font-mono text-[10px] tracking-[0.3em] text-[#C9A84C] uppercase">SWQ.TLC.005</span>
            </div>
            <h2 className="font-cinzel text-4xl lg:text-6xl text-[#E8E6E0] tracking-wide mb-6 leading-tight">
              Transaction{' '}
              <span className="font-cormorant italic text-[#C9A84C]">Lifecycle</span>
            </h2>
            <p className="font-inter text-gray-500 max-w-xl leading-relaxed">
              Institutional trade lifecycle governance infrastructure protocols, ensuring
              regulatory alignment and transaction integrity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            {SUMMARY_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111113] border border-gray-800 p-6 group hover:border-[#C9A84C]/40 transition-colors"
              >
                <div className="font-mono text-[9px] text-gray-600 uppercase mb-2 group-hover:text-[#C9A84C] transition-colors">{card.label}</div>
                <div className="font-cinzel text-3xl text-[#C9A84C] mb-1">{card.value}</div>
                <div className="font-mono text-[9px] text-gray-500 uppercase">{card.unit}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative mt-32">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 -translate-x-1/2" />
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#C9A84C] -translate-x-1/2 shadow-[0_0_15px_#C9A84C]"
          />

          <div className="space-y-24 md:space-y-32">
            {LIFECYCLE_STEPS.map((step, i) => (
              <TimelineItem key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ step, index }) {
  const isEven = index % 2 === 0
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start gap-8 md:gap-0 ${isEven ? '' : 'md:flex-row-reverse'}`}
    >
      {/* Content Side */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={`flex flex-wrap gap-3 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="font-mono text-[10px] text-[#C9A84C] border border-[#C9A84C]/30 px-3 py-1 bg-[#C9A84C]/5">
              {step.authority}
            </span>
            <span className="font-mono text-[10px] text-gray-500 px-3 py-1 bg-gray-900 border border-gray-800">
              {step.duration}
            </span>
          </div>
          <h3 className="font-cinzel text-xl lg:text-2xl text-white tracking-wide mb-4">
            {step.title}
          </h3>
          <p className="font-inter text-sm text-gray-500 leading-relaxed max-w-lg ml-0 md:ml-auto">
            {step.desc}
          </p>
        </motion.div>
      </div>

      {/* Node (Center Circle) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={isInView ? { scale: 1, rotate: 45 } : {}}
          className="w-10 h-10 border border-[#C9A84C] bg-[#0A0A0B] flex items-center justify-center"
        >
          {/* Decorative pulsing rings */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border border-[#C9A84C]/50"
          />
          <span className="font-mono text-xs text-[#C9A84C] -rotate-45 font-bold">
            {step.num}
          </span>
        </motion.div>
      </div>

      {/* Spacer for desktop layout */}
      <div className="hidden md:block w-1/2" />
    </motion.div>
  )
}