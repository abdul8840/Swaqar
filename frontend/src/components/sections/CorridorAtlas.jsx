// CorridorAtlas.jsx
// Production-grade React + Tailwind + Framer Motion component
// Install:
// npm install framer-motion react-simple-maps

import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const africanNodes = [
  {
    name: "Yaoundé",
    country: "Cameroon",
    coordinates: [11.5167, 3.8667],
  },
  {
    name: "Douala",
    country: "Cameroon",
    coordinates: [9.7043, 4.0511],
  },
  {
    name: "Lagos",
    country: "Nigeria",
    coordinates: [3.3792, 6.5244],
  },
];

const middleEastNodes = [
  {
    name: "Riyadh",
    country: "Saudi Arabia",
    coordinates: [46.6753, 24.7136],
  },
  {
    name: "Dubai",
    country: "UAE",
    coordinates: [55.2708, 25.2048],
  },
  {
    name: "Jeddah",
    country: "Saudi Arabia",
    coordinates: [39.1925, 21.4858],
  },
];

const connections = [
  ["Yaoundé", "Riyadh"],
  ["Yaoundé", "Dubai"],
  ["Yaoundé", "Jeddah"],
  ["Douala", "Riyadh"],
  ["Douala", "Dubai"],
  ["Lagos", "Riyadh"],
];

const getNode = (name) => {
  return [...africanNodes, ...middleEastNodes].find(
    (n) => n.name === name
  );
};

export default function CorridorAtlas() {
  return (
    <section className="relative overflow-hidden bg-[#02060C] min-h-screen text-white border-y border-[#3A2E18]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,169,107,0.08),transparent_60%)]" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-12 py-20">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="uppercase tracking-[0.3em] text-[#C6A96B] text-xs mb-5"
            >
              SWAQAR LTD — Corridors of Trust
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl leading-tight font-light tracking-wide"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Africa ↔ Middle East
              <br />
              <span
                className="italic text-[#C6A96B]"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Corridor Atlas
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 max-w-2xl text-[#B5B5B5] text-lg leading-8"
            >
              Verified cross-border trade corridors connecting Africa
              to institutional demand networks in the Middle East.
            </motion.p>
          </div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-[#3A2E18] px-6 py-4 bg-[#050B12]/80 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-[#C6A96B]" />
                <div className="absolute inset-0 rounded-full bg-[#C6A96B] animate-ping" />
              </div>

              <div>
                <p className="text-[10px] tracking-[0.3em] text-[#777] uppercase">
                  System Status
                </p>
                <p className="text-[#C6A96B] tracking-[0.2em] uppercase text-sm">
                  Live Corridor
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[320px_1fr_320px] gap-8 items-start">
          {/* LEFT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="border border-[#3A2E18] bg-[#071018]/60 backdrop-blur-xl p-6">
              <h3 className="text-[#C6A96B] uppercase tracking-[0.2em] text-xs mb-6">
                Origin Nodes
              </h3>

              <div className="space-y-5">
                {africanNodes.map((node, index) => (
                  <motion.div
                    key={node.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-[#4ADE80]" />
                      <div className="absolute inset-0 rounded-full bg-[#4ADE80] animate-ping opacity-40" />
                    </div>

                    <div>
                      <p className="text-lg">{node.name}</p>
                      <p className="text-sm text-[#888]">
                        {node.country}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border border-[#3A2E18] bg-[#071018]/60 backdrop-blur-xl p-6">
              <h3 className="text-[#C6A96B] uppercase tracking-[0.2em] text-xs mb-6">
                Destination Nodes
              </h3>

              <div className="space-y-5">
                {middleEastNodes.map((node, index) => (
                  <motion.div
                    key={node.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-[#C6A96B]" />
                      <div className="absolute inset-0 rounded-full bg-[#C6A96B] animate-ping opacity-40" />
                    </div>

                    <div>
                      <p className="text-lg">{node.name}</p>
                      <p className="text-sm text-[#888]">
                        {node.country}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* MAP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative border border-[#3A2E18] bg-[#071018]/50 backdrop-blur-xl overflow-hidden"
          >
            <div className="absolute top-4 left-4 z-20 text-[10px] tracking-[0.3em] uppercase text-[#777]">
              FIG · 02 · Corridor Atlas
            </div>

            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 180,
                center: [25, 12],
              }}
              className="w-full h-full"
              style={{
                width: "100%",
                height: "850px",
              }}
            >
              <defs>
                <linearGradient id="corridorGradient">
                  <stop offset="0%" stopColor="#4ADE80" />
                  <stop offset="100%" stopColor="#C6A96B" />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Map */}
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#0A121B"
                      stroke="#26313D"
                      strokeWidth={0.5}
                      style={{
                        default: {
                          outline: "none",
                        },
                        hover: {
                          fill: "#111C28",
                          outline: "none",
                        },
                        pressed: {
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Connections */}
              {connections.map((connection, index) => {
                const from = getNode(connection[0]);
                const to = getNode(connection[1]);

                return (
                  <g key={index}>
                    {/* Glow */}
                    <Line
                      from={from.coordinates}
                      to={to.coordinates}
                      stroke="rgba(198,169,107,0.15)"
                      strokeWidth={8}
                      strokeLinecap="round"
                      filter="url(#glow)"
                    />

                    {/* Main Line */}
                    <Line
                      from={from.coordinates}
                      to={to.coordinates}
                      stroke="url(#corridorGradient)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeDasharray="8 10"
                      style={{
                        animation:
                          "dashFlow 8s linear infinite",
                      }}
                    />
                  </g>
                );
              })}

              {/* African Nodes */}
              {africanNodes.map((node, index) => (
                <Marker
                  key={index}
                  coordinates={node.coordinates}
                >
                  <g>
                    <circle
                      r={18}
                      fill="rgba(74,222,128,0.15)"
                    >
                      <animate
                        attributeName="r"
                        values="14;20;14"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    <circle
                      r={6}
                      fill="#4ADE80"
                    />

                    <text
                      textAnchor="middle"
                      y={-24}
                      style={{
                        fill: "#fff",
                        fontSize: "13px",
                        fontFamily: "Inter",
                      }}
                    >
                      {node.name}
                    </text>
                  </g>
                </Marker>
              ))}

              {/* Middle East Nodes */}
              {middleEastNodes.map((node, index) => (
                <Marker
                  key={index}
                  coordinates={node.coordinates}
                >
                  <g>
                    <circle
                      r={20}
                      fill="rgba(198,169,107,0.15)"
                    >
                      <animate
                        attributeName="r"
                        values="16;24;16"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    <circle
                      r={7}
                      fill="#C6A96B"
                    />

                    <text
                      textAnchor="middle"
                      y={-26}
                      style={{
                        fill: "#fff",
                        fontSize: "13px",
                        fontFamily: "Inter",
                      }}
                    >
                      {node.name}
                    </text>
                  </g>
                </Marker>
              ))}
            </ComposableMap>

            {/* Overlay Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,169,107,0.08),transparent_70%)] pointer-events-none" />
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="border border-[#3A2E18] bg-[#071018]/60 backdrop-blur-xl p-6">
              <h3 className="text-[#C6A96B] uppercase tracking-[0.2em] text-xs mb-6">
                Corridor Metrics
              </h3>

              <div className="space-y-5">
                {[
                  ["Active Corridors", "6"],
                  ["Origin Nodes", "3"],
                  ["Destination Nodes", "3"],
                  ["Validation", "Live"],
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-[#1B2631] pb-4"
                  >
                    <p className="text-[#9CA3AF]">
                      {item[0]}
                    </p>

                    <p className="text-[#C6A96B] uppercase tracking-[0.15em]">
                      {item[1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#3A2E18] bg-[#071018]/60 backdrop-blur-xl p-6">
              <h3 className="text-[#C6A96B] uppercase tracking-[0.2em] text-xs mb-6">
                Infrastructure Rules
              </h3>

              <div className="space-y-4">
                {[
                  "Verified counterparties only",
                  "No compliance, no execution",
                  "Structured settlement enforced",
                  "Non-custodial infrastructure",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex gap-3 items-start"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#C6A96B] mt-2" />

                    <p className="text-[#CFCFCF] leading-7">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-4 gap-6 mt-16"
        >
          {[
            ["Verified", "Multi-layer validation"],
            ["Coordinated", "Structured execution"],
            ["Governed", "Rules & compliance"],
            ["Non-Custodial", "No goods or funds held"],
          ].map((item, index) => (
            <div
              key={index}
              className="border border-[#3A2E18] bg-[#071018]/60 backdrop-blur-xl p-6"
            >
              <h4
                className="text-[#C6A96B] text-xl mb-3"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                {item[0]}
              </h4>

              <p className="text-[#9CA3AF]">
                {item[1]}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes dashFlow {
          to {
            stroke-dashoffset: -200;
          }
        }
      `}</style>
    </section>
  );
}