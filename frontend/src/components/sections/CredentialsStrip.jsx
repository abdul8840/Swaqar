// InfrastructureStats.jsx

import { motion } from "framer-motion";
import {
  FiGlobe,
  FiUsers,
  FiShield,
  FiLock,
} from "react-icons/fi";

const stats = [
  {
    id: 1,
    icon: <FiGlobe />,
    number: "2",
    title: "ACTIVE CORRIDORS",
    subtitle: "Africa ↔ Middle East",
  },
  {
    id: 2,
    icon: <FiUsers />,
    number: "4",
    title: "PARTICIPANT",
    subtitle: "CATEGORIES",
  },
  {
    id: 3,
    icon: <FiShield />,
    number: "5",
    title: "VALIDATION GATES",
    subtitle: "PER TRANSACTION",
  },
  {
    id: 4,
    icon: <FiLock />,
    number: "100%",
    title: "NON-CUSTODIAL",
    subtitle: "INFRASTRUCTURE",
  },
];

export default function CredentialsStrip() {
  return (
    <section className="relative overflow-hidden border-y border-[#2D2212] bg-[#02060B]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,169,107,0.08),transparent_70%)]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
          {stats.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative flex flex-col items-center text-center px-6 ${
                index !== stats.length - 1
                  ? "lg:border-r border-[#3A2E18]"
                  : ""
              }`}
            >
              {/* Hover Glow */}
              <motion.div
                whileHover={{
                  scale: 1.08,
                  y: -5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="relative"
              >
                {/* Glow */}
                <div className="absolute inset-0 blur-3xl bg-[#C6A96B]/20 rounded-full" />

                {/* Icon */}
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative text-[#C6A96B] text-[34px]"
                >
                  {item.icon}
                </motion.div>
              </motion.div>

              {/* Number */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.2,
                }}
                className="mt-6 text-[52px] md:text-[70px] leading-none font-light text-[#D4B06A]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                {item.number}
              </motion.h2>

              {/* Title */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.4 + index * 0.2,
                }}
                className="mt-5 text-sm md:text-base tracking-[0.18em] uppercase text-[#E5E5E5]"
              >
                {item.title}
              </motion.p>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.6 + index * 0.2,
                }}
                className="mt-2 text-sm md:text-base text-[#9CA3AF] leading-7"
              >
                {item.subtitle}
              </motion.p>

              {/* Animated Divider */}
              {index !== stats.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "60%" }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + index * 0.15,
                  }}
                  className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-transparent via-[#C6A96B]/40 to-transparent"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}