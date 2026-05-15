import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const NODES = [
  { id: 'yaounde', label: 'YAOUNDÉ', x: 480, y: 390, region: 'africa' },
  { id: 'douala', label: 'DOUALA', x: 465, y: 415, region: 'africa' },
  { id: 'lagos', label: 'LAGOS', x: 455, y: 370, region: 'africa' },
  { id: 'riyadh', label: 'RIYADH', x: 620, y: 300, region: 'me' },
  { id: 'dubai', label: 'DUBAI', x: 650, y: 318, region: 'me' },
  { id: 'jeddah', label: 'JEDDAH', x: 605, y: 325, region: 'me' },
]

const CORRIDOR_PATH = "M 480 390 C 520 300 580 280 640 308"

export default function WorldMapSVG() {
  const pathRef = useRef(null)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full"
        style={{ opacity: 0.18 }}
        aria-hidden="true"
      >
        {/* Simplified World Map Paths */}
        <g fill="#A8A49C" stroke="none">
          {/* North America */}
          <path d="M 80 120 L 120 100 L 180 110 L 220 130 L 240 160 L 230 200 L 200 220 L 170 240 L 150 260 L 130 250 L 110 230 L 90 200 L 70 170 Z" />
          {/* South America */}
          <path d="M 170 270 L 200 260 L 230 280 L 240 320 L 235 370 L 220 420 L 200 450 L 180 440 L 165 400 L 155 350 L 160 310 Z" />
          {/* Europe */}
          <path d="M 420 90 L 460 80 L 500 85 L 520 100 L 510 130 L 490 145 L 460 150 L 430 140 L 415 120 Z" />
          {/* Africa */}
          <path d="M 420 170 L 470 155 L 520 160 L 550 185 L 560 220 L 555 270 L 545 320 L 530 370 L 510 410 L 490 440 L 470 460 L 450 450 L 430 420 L 415 380 L 405 340 L 400 290 L 400 240 L 405 200 Z" />
          {/* Middle East */}
          <path d="M 560 180 L 600 170 L 640 175 L 670 190 L 680 220 L 665 245 L 640 255 L 610 250 L 580 240 L 560 220 Z" />
          {/* Asia */}
          <path d="M 680 80 L 750 70 L 820 75 L 880 90 L 920 110 L 930 150 L 910 185 L 870 200 L 830 195 L 790 185 L 750 180 L 710 170 L 680 155 L 665 130 Z" />
          {/* South/Southeast Asia */}
          <path d="M 720 210 L 780 200 L 830 210 L 850 240 L 840 270 L 810 280 L 770 275 L 740 260 L 720 240 Z" />
          {/* Australia */}
          <path d="M 800 370 L 860 355 L 910 365 L 930 395 L 920 430 L 890 450 L 850 455 L 815 440 L 795 415 L 790 390 Z" />
        </g>
      </svg>

      {/* Overlay SVG with animations at full opacity */}
      <svg
        viewBox="0 0 1000 600"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* Corridor glow effect */}
        <defs>
          <filter id="gold-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="corridorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#E8C97A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.3" />
          </linearGradient>
          <path id="corridorPath" d={CORRIDOR_PATH} />
        </defs>

        {/* Background corridor (wider, dimmer) */}
        <motion.path
          d={CORRIDOR_PATH}
          fill="none"
          stroke="#C9A84C"
          strokeWidth="12"
          strokeOpacity="0.06"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Main corridor arc */}
        <motion.path
          d={CORRIDOR_PATH}
          fill="none"
          stroke="url(#corridorGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          filter="url(#gold-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Animated packets flowing along corridor */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            r="3"
            fill="#E8C97A"
            filter="url(#gold-glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.75,
              ease: "linear",
            }}
          >
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              begin={`${i * 0.75}s`}
            >
              <mpath href="#corridorPath" />
            </animateMotion>
          </motion.circle>
        ))}

        {/* Reverse packets */}
        {[0, 1].map((i) => (
          <motion.circle
            key={`rev-${i}`}
            r="2"
            fill="#C9A84C"
            opacity="0.5"
            filter="url(#gold-glow)"
          >
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              begin={`${i * 2}s`}
              keyPoints="1;0"
              keyTimes="0;1"
              calcMode="linear"
            >
              <mpath href="#corridorPath" />
            </animateMotion>
          </motion.circle>
        ))}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <g key={node.id}>
            {/* Outer pulse ring */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="12"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              animate={{ r: [10, 18, 10], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            />
            {/* Inner node */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill={node.region === 'africa' ? '#C9A84C' : '#E8C97A'}
              filter="url(#node-glow)"
              animate={{ r: [3.5, 5, 3.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            {/* Node center dot */}
            <circle cx={node.x} cy={node.y} r="1.5" fill="#FFF" opacity="0.9" />

            {/* Label */}
            <text
              x={node.x + (node.region === 'me' ? 10 : -10)}
              y={node.y - 8}
              fontSize="6"
              fontFamily="JetBrains Mono, monospace"
              fill="#C9A84C"
              textAnchor={node.region === 'me' ? 'start' : 'end'}
              opacity="0.9"
              letterSpacing="0.05em"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Corridor label */}
        <motion.text
          x="560"
          y="315"
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
          fill="#C9A84C"
          textAnchor="middle"
          opacity="0"
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2.5, duration: 1 }}
          letterSpacing="0.1em"
        >
          SWAQAR CORRIDOR — ACTIVE
        </motion.text>

        {/* Radar element - Africa side */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '470px 390px' }}
        >
          <path
            d="M 470 390 L 470 365"
            stroke="#C9A84C"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        </motion.g>
        <circle cx="470" cy="390" r="18" fill="none" stroke="#C9A84C" strokeWidth="0.3" strokeOpacity="0.15" />
        <circle cx="470" cy="390" r="12" fill="none" stroke="#C9A84C" strokeWidth="0.3" strokeOpacity="0.1" />

        {/* Radar element - ME side */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '635px 310px' }}
        >
          <path
            d="M 635 310 L 635 288"
            stroke="#C9A84C"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        </motion.g>
        <circle cx="635" cy="310" r="18" fill="none" stroke="#C9A84C" strokeWidth="0.3" strokeOpacity="0.15" />
        <circle cx="635" cy="310" r="12" fill="none" stroke="#C9A84C" strokeWidth="0.3" strokeOpacity="0.1" />

        {/* Telemetry lines */}
        <line x1="50" y1="30" x2="200" y2="30" stroke="#2E2E36" strokeWidth="0.5" />
        <line x1="50" y1="40" x2="150" y2="40" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="50" y1="50" x2="170" y2="50" stroke="#2E2E36" strokeWidth="0.5" />

        <line x1="800" y1="30" x2="950" y2="30" stroke="#2E2E36" strokeWidth="0.5" />
        <line x1="850" y1="40" x2="950" y2="40" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="820" y1="50" x2="950" y2="50" stroke="#2E2E36" strokeWidth="0.5" />
      </svg>
    </div>
  )
}