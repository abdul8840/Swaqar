import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Lock, Box, Globe, Users, 
  BarChart3, Scale, Landmark, Handshake, 
  Leaf, Tractor, Factory, Cpu, Layers, HardHat 
} from 'lucide-react';
import AfricaMapImg from '../../assets/africa2.png';
import MEMapImg from '../../assets/middleEast.png';
import AsiaMapImg from '../../assets/asia.png';

const SwaqarGroup = () => {
  // SVG Path Definitions for the connections
  const paths = {
    africaToCenter: "M 150 250 Q 250 250 350 400",
    middleEastToCenter: "M 500 200 Q 500 350 500 450",
    asiaToCenter: "M 850 250 Q 750 250 650 400",
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white font-sans overflow-x-hidden p-4 md:p-8">
      {/* --- HEADER --- */}
      <header className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif tracking-[0.2em] mb-2 uppercase"
        >
          Swaqar Group.
        </motion.h1>
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#C9A84C]" />
          <h2 className="text-[#C9A84C] tracking-[0.4em] text-xs font-semibold uppercase">Corridors of Trust</h2>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#C9A84C]" />
        </div>
        <p className="text-gray-400 text-sm md:text-base italic">
          Trusted Trade Coordination Layer for Africa ⇌ Middle East ⇌ Asia
        </p>
      </header>

      {/* --- MAIN MAP & CONNECTIONS AREA --- */}
      <div className="relative max-w-7xl mx-auto h-[600px] lg:h-[700px] mb-20">
        
        {/* SVG Connection Lines Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
          {/* Africa to Center */}
          <motion.path 
            d="M 280 430 C 350 430, 400 430, 480 550" 
            stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1 }}
          />
          {/* Asia to Center */}
          <motion.path 
            d="M 720 430 C 650 430, 600 430, 520 550" 
            stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1.5 }}
          />
          {/* Middle East to Center */}
          <motion.path 
            d="M 500 350 L 500 520" 
            stroke="#C9A84C" strokeWidth="2" fill="none" opacity="0.4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 2 }}
          />
          
          {/* Moving Flow Dots */}
          {[1, 2, 3].map((i) => (
            <motion.circle key={i} r="3" fill="#C9A84C">
              <animateMotion dur={`${3 + i}s`} repeatCount="indefinite" path="M 280 430 C 350 430, 400 430, 480 550" />
            </motion.circle>
          ))}
        </svg>

        {/* --- REGIONS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full relative z-20">
          
          {/* AFRICA SECTION */}
          <div className="flex flex-col items-center justify-start pt-10">
            <h3 className="text-[#22c55e] text-2xl font-serif tracking-widest mb-1">AFRICA</h3>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase mb-6">Verified Supply & Opportunity</p>
            <div className="relative group">
              <img src={AfricaMapImg} alt="Africa Map" className="w-64 md:w-80 opacity-60 group-hover:opacity-100 transition-opacity duration-700 filter drop-shadow-[0_0_20px_rgba(34,197,94,0.2)]" />
              {/* Region Icons Left */}
              <div className="absolute -left-12 top-0 space-y-8">
                <MapIcon Icon={Leaf} label="Natural Resources" />
                <MapIcon Icon={Tractor} label="Agriculture" />
                <MapIcon Icon={Box} label="Raw Materials" />
                <MapIcon Icon={Factory} label="Manufacturing" />
              </div>
            </div>
          </div>

          {/* MIDDLE EAST SECTION */}
          <div className="flex flex-col items-center justify-start pt-4">
            <h3 className="text-[#C9A84C] text-2xl font-serif tracking-widest mb-1">MIDDLE EAST</h3>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase mb-6 text-center">Institutional Trust<br/>& Capital</p>
            <div className="relative">
              <img src={MEMapImg} alt="ME Map" className="w-56 opacity-60 filter drop-shadow-[0_0_20px_rgba(201,168,76,0.2)]" />
              <div className="absolute -left-20 top-1/4 space-y-6">
                 <MEItem Icon={Landmark} label="Sovereign Capital" />
                 <MEItem Icon={ShieldCheck} label="Financial Institutions" />
                 <MEItem Icon={BarChart3} label="Trade Finance" />
              </div>
              <div className="absolute -right-20 top-1/4 space-y-6">
                 <MEItem Icon={Scale} label="Policies & Regs" side="right" />
                 <MEItem Icon={Handshake} label="Strategic Partnerships" side="right" />
                 <MEItem Icon={ShieldCheck} label="Risk Mitigation" side="right" />
              </div>
            </div>
          </div>

          {/* ASIA SECTION */}
          <div className="flex flex-col items-center justify-start pt-10">
            <h3 className="text-[#3b82f6] text-2xl font-serif tracking-widest mb-1">ASIA</h3>
            <p className="text-gray-400 text-[10px] tracking-widest uppercase mb-6">Industrial Scale & Manufacturing</p>
            <div className="relative group">
              <img src={AsiaMapImg} alt="Asia Map" className="w-72 md:w-96 opacity-60 group-hover:opacity-100 transition-opacity duration-700 filter drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]" />
              {/* Region Icons Right */}
              <div className="absolute -right-12 top-0 space-y-8">
                <MapIcon Icon={HardHat} label="Industrial Manufacturing" side="right" />
                <MapIcon Icon={Cpu} label="Technology & Innovation" side="right" />
                <MapIcon Icon={Layers} label="Large Scale Production" side="right" />
                <MapIcon Icon={Globe} label="Global Market Access" side="right" />
              </div>
            </div>
          </div>
        </div>

        {/* --- CENTER LOGO (HUB) --- */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center z-30">
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
             <div className="absolute inset-0 bg-[#C9A84C] opacity-10 blur-3xl rounded-full animate-pulse" />
             <div className="absolute inset-0 border border-[#C9A84C22] rounded-full animate-spin-slow" />
             <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#C9A84C] to-[#8A6D2D] rounded-xl flex items-center justify-center rotate-45 shadow-[0_0_30px_rgba(201,168,76,0.4)]">
                <motion.div animate={{ rotate: -45 }}>
                   <Box size={40} className="text-black" />
                </motion.div>
             </div>
          </div>
          <h4 className="text-white text-3xl font-serif tracking-widest mt-4">SWAQAR</h4>
          <p className="text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-bold">Coordination & Verification Layer</p>
        </div>
      </div>

      {/* --- LEGEND & INFO CARDS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16 px-4">
        {/* Legend */}
        <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-sm">
          <h5 className="text-[10px] tracking-widest uppercase text-gray-400 mb-4 border-b border-gray-800 pb-2">Legend</h5>
          <ul className="space-y-3">
            <LegendItem color="bg-green-500" label="Supply & Opportunity Flow" />
            <LegendItem color="bg-[#C9A84C]" label="Capital & Trust Flow" />
            <LegendItem color="bg-blue-500" label="Industrial & Market Flow" />
            <LegendItem color="bg-white" label="SWAQAR Coordination Flow" isLine />
          </ul>
        </div>

        {/* Feature Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          <FeatureCard Icon={ShieldCheck} title="Verification" desc="Counterparty Verification & Due Diligence" />
          <FeatureCard Icon={Landmark} title="Institutional Trust" desc="Governance, Compliance & Risk Controls" />
          <FeatureCard Icon={Handshake} title="Corridor Execution" desc="Transaction Coordination & Workflow Control" />
          <FeatureCard Icon={Users} title="Stakeholder Synchronization" desc="Aligned Ecosystem & Information Flow" />
        </div>

        {/* Trusted Statement */}
        <div className="bg-[#C9A84C11] border border-[#C9A84C33] p-6 flex flex-col items-center text-center rounded-sm">
          <ShieldCheck className="text-[#C9A84C] mb-3" size={32} />
          <p className="text-[11px] leading-relaxed text-gray-300">
            SWAQAR is the trusted Trade Coordination Layer that connects supply, capital, and industry through verification, trust, and execution.
          </p>
        </div>
      </div>

      {/* --- BOTTOM BAR FEATURES --- */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 pb-12">
        <div className="text-center mb-8">
           <span className="text-gray-500 text-[10px] tracking-[0.5em] uppercase">Corridor Features</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
          <BottomIcon Icon={ShieldCheck} title="Verification-First" sub="Trust built through verification" />
          <BottomIcon Icon={Lock} title="Non-Custodial" sub="No funds or assets are held" />
          <BottomIcon Icon={Box} title="Asset-Light" sub="Coordination without owning assets" />
          <BottomIcon Icon={Landmark} title="Governance-Led" sub="Institutional discipline and compliance" />
          <BottomIcon Icon={Scale} title="Corridor-First" sub="Focused on trade corridors, not ownership" />
          <BottomIcon Icon={Globe} title="Africa ⇌ ME ⇌ Asia" sub="One trusted trade ecosystem" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const MapIcon = ({ Icon, label, side = "left" }) => (
  <div className={`flex items-center gap-3 ${side === "right" ? "flex-row-reverse text-right" : ""}`}>
    <div className="w-10 h-10 rounded-full border border-gray-700 bg-gray-900/80 flex items-center justify-center group-hover:border-[#C9A84C] transition-colors">
      <Icon size={18} className="text-gray-400 group-hover:text-[#C9A84C]" />
    </div>
    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold max-w-[80px] leading-tight">{label}</span>
  </div>
);

const MEItem = ({ Icon, label, side = "left" }) => (
  <div className={`flex items-center gap-2 ${side === "right" ? "flex-row-reverse text-right" : ""}`}>
    <div className="p-1 border border-[#C9A84C44] rounded-sm">
      <Icon size={14} className="text-[#C9A84C]" />
    </div>
    <span className="text-[8px] uppercase tracking-tighter text-gray-400 font-semibold max-w-[60px]">{label}</span>
  </div>
);

const LegendItem = ({ color, label, isLine = false }) => (
  <li className="flex items-center gap-3">
    <div className={`${isLine ? 'h-[1px] w-4' : 'w-2 h-2 rounded-full'} ${color}`} />
    <span className="text-[9px] text-gray-500 tracking-wide uppercase">{label}</span>
  </li>
);

const FeatureCard = ({ Icon, title, desc }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="mb-3 p-3 bg-gray-900/50 rounded-full group-hover:bg-[#C9A84C22] transition-colors">
      <Icon size={20} className="text-[#C9A84C]" />
    </div>
    <h6 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">{title}</h6>
    <p className="text-[9px] text-gray-500 leading-tight px-2">{desc}</p>
  </div>
);

const BottomIcon = ({ Icon, title, sub }) => (
  <div className="flex flex-col items-center text-center">
    <Icon size={24} className="text-[#C9A84C] mb-2 opacity-80" />
    <h6 className="text-[10px] font-bold text-white uppercase tracking-widest">{title}</h6>
    <p className="text-[8px] text-gray-600 mt-1">{sub}</p>
  </div>
);

export default SwaqarGroup;