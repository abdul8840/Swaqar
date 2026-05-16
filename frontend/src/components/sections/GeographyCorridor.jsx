// TradeCorridors.jsx

import { motion } from "framer-motion";
import {
  FiArrowRight,
} from "react-icons/fi";

// Import map images
import africaMapImage from "../../assets/africa.png"; // Add your Africa map image in assets folder
import middleEastMapImage from "../../assets/middleEast.png"; // Add your Middle East map image in assets folder

const africaCorridors = [
  {
    country: "CAMEROON",
    items: "Agriculture, Timber, Minerals, Energy",
  },
  {
    country: "NIGERIA",
    items:
      "Agriculture, Solid Minerals, Manufacturing",
  },
  {
    country: "GABON",
    items: "Timber, Manganese, Oil & Gas",
  },
  {
    country: "CÔTE D'IVOIRE",
    items: "Cocoa, Cashew, Agriculture",
  },
  {
    country: "DRC",
    items: "Cobalt, Copper, Coltan",
  },
];

const middleEastCorridors = [
  {
    country: "SAUDI ARABIA",
    items:
      "Food Security, Construction, Energy, Industrials",
  },
  {
    country: "UAE",
    items:
      "Re-exports, Logistics, Technology",
  },
  {
    country: "QATAR",
    items:
      "Energy, Infrastructure, Investments",
  },
  {
    country: "KUWAIT",
    items:
      "Infrastructure, Industrial Equipment",
  },
  {
    country: "OMAN",
    items:
      "Logistics, Ports, Minerals",
  },
];

export default function GeographyCorridors() {
  return (
    <section className="relative overflow-hidden bg-[#02060B] border-y border-[#2D2212]">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,169,107,0.08),transparent_70%)]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        {/* HEADER - Reduced size */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
          className="mb-10 lg:mb-12"
        >
          <p className="uppercase tracking-[0.25em] text-[#C6A96B] text-[10px] lg:text-xs mb-4">
            Trade Corridors
          </p>

          <h2
            className="text-2xl md:text-3xl lg:text-4xl text-white leading-tight"
            style={{
              fontFamily: "Cinzel, serif",
            }}
          >
            Africa ↔ SWAQAR ↔ Middle East
          </h2>

          <p className="mt-3 text-[#A1A1AA] leading-6 text-sm max-w-2xl">
            Structured corridors. Verified flows.
            Sustainable partnerships.
          </p>
        </motion.div>

        {/* MAIN GRID - Responsive layout */}
        <div className="relative flex flex-col lg:grid lg:grid-cols-[1fr_300px_1fr] gap-6 lg:gap-8 items-center">
          {/* LEFT MAP - AFRICA (Larger) */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="hidden xl:block absolute left-[-200px] top-1/2 -translate-y-1/2 opacity-40 w-[260px] h-[300px]"
          >
            <img 
              src={africaMapImage} 
              alt="Africa Map" 
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* AFRICA SUPPLY - Smaller content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
            }}
            whileHover={{
              borderColor: "#C6A96B",
            }}
            className="relative border border-[#3A2E18] bg-[#050A10]/80 backdrop-blur-xl overflow-hidden rounded-lg"
          >
            {/* GLOW */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,169,107,0.08),transparent_60%)]" />

            {/* HEADER - Smaller */}
            <div className="border-b border-[#2D2212] px-5 lg:px-6 py-4">
              <h3 className="text-[#C6A96B] text-lg lg:text-xl">
                AFRICA SUPPLY CORRIDORS
              </h3>
            </div>

            {/* CONTENT - Smaller text */}
            <div className="relative px-5 lg:px-6 py-6">
              {/* TIMELINE */}
              <div className="absolute left-[30px] top-6 bottom-6 w-px bg-gradient-to-b from-[#C6A96B] via-[#F3D18A] to-transparent" />

              <div className="space-y-6">
                {africaCorridors.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.12,
                    }}
                    className="relative flex gap-4"
                  >
                    {/* NODE - Smaller */}
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="relative z-10 mt-1.5"
                    >
                      <div className="absolute inset-0 bg-[#D9B56D]/30 blur-xl rounded-full" />

                      <div className="relative w-2.5 h-2.5 rounded-full bg-[#D9B56D]" />
                    </motion.div>

                    {/* TEXT - Smaller */}
                    <div>
                      <h4 className="text-[#D9B56D] text-sm lg:text-base font-medium">
                        {item.country}
                      </h4>

                      <p className="mt-1 text-[#B4B4B8] leading-5 text-xs">
                        {item.items}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CENTER - Smaller */}
          <div className="relative flex items-center justify-center order-first lg:order-none mb-6 lg:mb-0">
            {/* CONNECTION LINES - Hidden on mobile */}
            <div className="hidden lg:block">
              {[0, 1, 2].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: "100px",
                  }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.2,
                  }}
                  className={`absolute h-[1.5px] bg-gradient-to-r from-[#D9B56D] to-[#F3D18A] ${
                    index === 0
                      ? "top-[80px] left-[-100px]"
                      : index === 1
                      ? "top-[130px] left-[-100px]"
                      : "top-[180px] left-[-100px]"
                  }`}
                />
              ))}

              {[0, 1, 2].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: "100px",
                  }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.2,
                  }}
                  className={`absolute h-[1.5px] bg-gradient-to-r from-[#D9B56D] to-[#F3D18A] ${
                    index === 0
                      ? "top-[80px] right-[-100px]"
                      : index === 1
                      ? "top-[130px] right-[-100px]"
                      : "top-[180px] right-[-100px]"
                  }`}
                />
              ))}

              {/* ARROWS */}
              {[0, 1, 2].map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    x: [0, 6, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className={`absolute text-[#F3D18A] text-base ${
                    index === 0
                      ? "top-[68px] left-[-5px]"
                      : index === 1
                      ? "top-[118px] left-[-5px]"
                      : "top-[168px] left-[-5px]"
                  }`}
                >
                  <FiArrowRight />
                </motion.div>
              ))}

              {[0, 1, 2].map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    x: [0, 6, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className={`absolute text-[#F3D18A] text-base ${
                    index === 0
                      ? "top-[68px] right-[-5px]"
                      : index === 1
                      ? "top-[118px] right-[-5px]"
                      : "top-[168px] right-[-5px]"
                  }`}
                >
                  <FiArrowRight />
                </motion.div>
              ))}
            </div>

            {/* CENTER CARD - Smaller */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1,
              }}
              whileHover={{
                borderColor: "#D9B56D",
              }}
              className="relative w-full max-w-[280px] lg:max-w-[300px] border border-[#3A2E18] bg-[#050A10]/90 backdrop-blur-xl p-6 lg:p-8 text-center overflow-hidden rounded-lg"
            >
              {/* GLOW */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,169,107,0.1),transparent_70%)]" />

              {/* RINGS - Smaller */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-[200px] lg:w-[220px] h-[200px] lg:h-[220px] rounded-full border border-[#D9B56D]/10" />
              </motion.div>

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-[150px] lg:w-[160px] h-[150px] lg:h-[160px] rounded-full border border-[#D9B56D]/10" />
              </motion.div>

              <div className="relative z-10">
                <h3 className="text-[#D9B56D] text-2xl lg:text-3xl">
                  SWAQAR
                </h3>

                <p className="mt-2 text-[#D1D5DB] uppercase tracking-[0.15em] text-[10px]">
                  Coordination Infrastructure
                </p>

                {/* LOGO - Smaller */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="relative flex items-center justify-center mt-8 lg:mt-10"
                >
                  <div className="absolute w-28 h-28 lg:w-32 lg:h-32 bg-[#D9B56D]/10 blur-3xl rounded-full" />

                  <div className="relative text-[#D9B56D] text-6xl lg:text-7xl">
                    ✥
                  </div>
                </motion.div>

                {/* TAGS - Smaller */}
                <div className="mt-8 lg:mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[#D9B56D] text-[10px] lg:text-xs tracking-[0.12em]">
                  <span>VERIFY</span>
                  <span>•</span>
                  <span>STRUCTURE</span>
                  <span>•</span>
                  <span>COORDINATE</span>
                  <span>•</span>
                  <span>EXECUTE</span>
                  <span>•</span>
                  <span>GOVERN</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Smaller content */}
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
            }}
            whileHover={{
              borderColor: "#C6A96B",
            }}
            className="relative border border-[#3A2E18] bg-[#050A10]/80 backdrop-blur-xl overflow-hidden rounded-lg"
          >
            {/* GLOW */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,169,107,0.08),transparent_60%)]" />

            {/* HEADER - Smaller */}
            <div className="border-b border-[#2D2212] px-5 lg:px-6 py-4">
              <h3 className="text-[#C6A96B] text-lg lg:text-xl">
                MIDDLE EAST DEMAND CORRIDORS
              </h3>
            </div>

            {/* CONTENT - Smaller text */}
            <div className="relative px-5 lg:px-6 py-6">
              {/* TIMELINE */}
              <div className="absolute left-[30px] top-6 bottom-6 w-px bg-gradient-to-b from-[#C6A96B] via-[#F3D18A] to-transparent" />

              <div className="space-y-6">
                {middleEastCorridors.map(
                  (item, index) => (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.12,
                      }}
                      className="relative flex gap-4"
                    >
                      {/* NODE - Smaller */}
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="relative z-10 mt-1.5"
                      >
                        <div className="absolute inset-0 bg-[#D9B56D]/30 blur-xl rounded-full" />

                        <div className="relative w-2.5 h-2.5 rounded-full bg-[#D9B56D]" />
                      </motion.div>

                      {/* TEXT - Smaller */}
                      <div>
                        <h4 className="text-[#D9B56D] text-sm lg:text-base font-medium">
                          {item.country}
                        </h4>

                        <p className="mt-1 text-[#B4B4B8] leading-5 text-xs">
                          {item.items}
                        </p>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* RIGHT MAP - MIDDLE EAST (Larger) */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="hidden xl:block absolute right-[-200px] top-1/2 -translate-y-1/2 opacity-40 w-[260px] h-[300px]"
          >
            <img 
              src={middleEastMapImage} 
              alt="Middle East Map" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}