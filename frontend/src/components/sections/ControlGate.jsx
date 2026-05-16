import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Lock, ShieldAlert, ShieldCheck, Activity, Zap, AlertCircle, ArrowRight } from 'lucide-react';

const ControlGate = () => {
  const [hoverSide, setHoverSide] = useState(null); // 'approved' | 'rejected' | null

  const approvedItems = [
    'Identity verification completed',
    'Compliance & sanctions screening passed',
    'Documents authenticated and valid',
    'Payment structure approved',
    'Counterparty risk acceptable',
  ];

  const rejectedItems = [
    'Identity verification failed',
    'Sanctions or watchlist match',
    'Documents invalid or inconsistent',
    'Payment structure not acceptable',
    'Counterparty risk too high',
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12 relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND LAYER: Neural Grid & Ambient Fog --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full transition-opacity duration-1000 ${hoverSide === 'approved' ? 'opacity-100' : 'opacity-20'}`} />
        <div className={`absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full transition-opacity duration-1000 ${hoverSide === 'rejected' ? 'opacity-100' : 'opacity-20'}`} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER: Tactical Aesthetic --- */}
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-yellow-500 font-mono text-xs tracking-[0.4em]">
              <Activity className="w-4 h-4 animate-pulse" />
              SYSTEM_PROTOCOL: CONTROL_GATE_V2
            </div>
            <h1 className="text-4xl md:text-6xl font-serif tracking-tight">
              Approved <span className="text-gray-500 italic">or</span> <span className="text-red-600/80">Rejected</span>
            </h1>
            <p className="text-gray-500 font-mono text-sm max-w-md uppercase tracking-tighter">
              Deterministic risk assessment infrastructure. No unauthorized bypass permitted.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden lg:flex gap-8 text-[10px] font-mono text-gray-500"
          >
            <div className="flex flex-col border-l border-gray-800 pl-4">
              <span>LATENCY</span>
              <span className="text-green-500">0.002ms</span>
            </div>
            <div className="flex flex-col border-l border-gray-800 pl-4">
              <span>ENCRYPTION</span>
              <span className="text-yellow-500">AES_256_RSA</span>
            </div>
          </motion.div>
        </header>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* APPROVED PANEL */}
          <motion.div 
            className="lg:col-span-4 relative group"
            onMouseEnter={() => setHoverSide('approved')}
            onMouseLeave={() => setHoverSide(null)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="h-full bg-gradient-to-b from-[#0a100a] to-black border border-green-900/30 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group-hover:border-green-500/50 transition-all duration-500">
              {/* Scanline Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20 shadow-[0_0_15px_#22c55e] animate-scan-y pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                  </div>
                  <h2 className="text-green-500 font-bold tracking-[0.2em] text-sm uppercase">Approved Path</h2>
                </div>

                <ul className="space-y-6">
                  {approvedItems.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 text-sm text-gray-300 group/item"
                    >
                      <div className="w-5 h-5 rounded border border-green-500/30 flex items-center justify-center group-hover/item:border-green-500 transition-colors">
                        <Check className="w-3 h-3 text-green-500" />
                      </div>
                      <span className="group-hover/item:text-white transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CENTER LOCK HUB */}
          <div className="lg:col-span-4 flex flex-col justify-center items-center py-12 lg:py-0 relative">
            {/* LASER LINES (Desktop) */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
                <svg className="w-full h-full">
                    {/* Left Arrows */}
                    <motion.path 
                        d="M 0 100 Q 100 100 200 180" 
                        stroke="#22c55e" strokeWidth="1" fill="none" opacity="0.2" 
                        strokeDasharray="5,5" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    />
                    <motion.path 
                        d="M 0 300 Q 100 300 200 220" 
                        stroke="#22c55e" strokeWidth="1" fill="none" opacity="0.2"
                        strokeDasharray="5,5" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    />
                    {/* Right Arrows */}
                    <motion.path 
                        d="M 200 180 Q 300 100 400 100" 
                        stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.2"
                        strokeDasharray="5,5" animate={{ strokeDashoffset: [0, 20] }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    />
                </svg>
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Rotating Tech Rings */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 border-[1px] border-dashed border-yellow-500/20 rounded-full" 
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-4 border-[1px] border-yellow-500/10 rounded-full shadow-[inset_0_0_20px_rgba(234,179,8,0.05)]" 
                />
                
                {/* Core Lock Hub */}
                <div className="relative z-10 w-24 h-24 bg-yellow-500/10 border border-yellow-500/40 rounded-full flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                  <Lock className="w-8 h-8 text-yellow-500 drop-shadow-[0_0_8px_#eab308]" />
                  {/* Orbiting Bit */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-2"
                  >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_#eab308]" />
                  </motion.div>
                </div>

                {/* Status Tags */}
                <div className="absolute -bottom-4 bg-black border border-gray-800 px-3 py-1 rounded-full text-[8px] font-mono tracking-widest text-gray-500">
                    GATE_STATUS: <span className="text-green-500">SECURE</span>
                </div>
            </div>
          </div>

          {/* REJECTED PANEL */}
          <motion.div 
            className="lg:col-span-4 relative group"
            onMouseEnter={() => setHoverSide('rejected')}
            onMouseLeave={() => setHoverSide(null)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="h-full bg-gradient-to-b from-[#100a0a] to-black border border-red-900/30 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group-hover:border-red-500/50 transition-all duration-500">
               <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20 shadow-[0_0_15px_#ef4444] animate-scan-y pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                  </div>
                  <h2 className="text-red-500 font-bold tracking-[0.2em] text-sm uppercase">Rejected Path</h2>
                </div>

                <ul className="space-y-6">
                  {rejectedItems.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 text-sm text-gray-300 group/item justify-end lg:justify-start"
                    >
                      <span className="group-hover/item:text-white transition-colors order-2 lg:order-2">{item}</span>
                      <div className="w-5 h-5 rounded border border-red-500/30 flex items-center justify-center group-hover/item:border-red-500 transition-colors order-1 lg:order-1">
                        <X className="w-3 h-3 text-red-500" />
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- FOOTER: WARNING --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 p-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent rounded-2xl"
        >
          <div className="bg-[#0a0a0a] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border border-gray-900 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-yellow-500/5 flex items-center justify-center border border-yellow-500/20">
              <AlertCircle className="w-8 h-8 text-yellow-500 animate-pulse" />
            </div>
            <div className="flex-1 space-y-1 text-center md:text-left">
                <h3 className="font-mono text-xs text-yellow-500 font-bold tracking-[0.2em] uppercase">Security Disclaimer</h3>
                <p className="text-gray-400 text-sm max-w-2xl">
                    Any failed security parameter results in an <span className="text-red-500 font-bold uppercase">Immediate Exit Event</span>. Log records are maintained for audit trail alignment. No exceptions are granted by the protocol.
                </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-xs font-mono hover:bg-white/10 transition-colors uppercase tracking-widest">
                Review Policy <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes scan-y {
          0% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-y {
          animation: scan-y 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ControlGate;