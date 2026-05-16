import React from 'react';
import { Check, X, Lock, AlertTriangle, ArrowRight } from 'lucide-react';

const ControlGate = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black p-6 md:p-12 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-yellow-200 rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 animate-fadeInDown">
          <p className="text-yellow-500 text-xs md:text-sm font-semibold tracking-[0.3em] mb-3">
            CONTROL GATE
          </p>
          <h1 className="text-white text-3xl md:text-5xl font-serif tracking-wider mb-4">
            APPROVED OR REJECTED
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Every transaction must pass the gate.
          </p>
          <p className="text-gray-400 text-sm md:text-base">
            Risk determines the path.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-8">
          {/* Approved Path */}
          <div className="bg-gradient-to-br from-green-950/40 to-black/60 border border-green-800/40 rounded-2xl p-6 md:p-8 backdrop-blur-sm animate-slideInLeft hover:border-green-600/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center animate-pulse-slow">
                <Check className="w-5 h-5 text-green-500" strokeWidth={3} />
              </div>
              <h2 className="text-green-500 text-lg md:text-xl font-bold tracking-wider">
                APPROVED PATH
              </h2>
            </div>
            <p className="text-gray-400 text-sm mb-6 ml-11">
              Transaction proceeds when all conditions are met.
            </p>
            <ul className="space-y-3">
              {approvedItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-gray-300 text-sm md:text-base animate-slideInLeft opacity-0"
                  style={{
                    animationDelay: `${i * 150 + 300}ms`,
                    animationFillMode: 'forwards',
                  }}
                >
                  <div className="w-5 h-5 rounded-full border border-green-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-500" strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Lock with Connecting Lines */}
          <div className="flex justify-center items-center relative py-8 lg:py-0">
            {/* Connecting lines - left */}
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-full pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="none">
                {[60, 110, 150, 190, 240].map((y, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={y}
                    x2="200"
                    y2="150"
                    stroke="url(#greenGrad)"
                    strokeWidth="1"
                    className="animate-dash"
                    strokeDasharray="4 4"
                  />
                ))}
                <defs>
                  <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#eab308" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Connecting lines - right */}
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="none">
                {[60, 110, 150, 190, 240].map((y, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1="150"
                    x2="200"
                    y2={y}
                    stroke="url(#redGrad)"
                    strokeWidth="1"
                    className="animate-dash"
                    strokeDasharray="4 4"
                  />
                ))}
                <defs>
                  <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Lock with rings */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border-2 border-yellow-600/30 rounded-full animate-spin-slow"
                style={{ borderStyle: 'dashed' }}
              />
              {/* Middle ring */}
              <div className="absolute inset-4 border border-yellow-500/50 rounded-full animate-spin-reverse" />
              {/* Inner glow ring */}
              <div className="absolute inset-8 border-2 border-yellow-400/60 rounded-full animate-pulse-slow shadow-[0_0_40px_rgba(234,179,8,0.5)]" />
              
              {/* Lock icon */}
              <div className="relative z-10 animate-float">
                <div className="absolute inset-0 blur-2xl bg-yellow-500/50 rounded-full" />
                <Lock 
                  className="w-16 h-16 md:w-20 md:h-20 text-yellow-400 relative drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" 
                  strokeWidth={1.5}
                  fill="rgba(234,179,8,0.2)"
                />
              </div>

              {/* Orbiting particles */}
              {[0, 90, 180, 270].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(234,179,8,1)] animate-orbit"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    transform: `rotate(${deg}deg) translateX(100px)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Rejected Path */}
          <div className="bg-gradient-to-br from-red-950/40 to-black/60 border border-red-800/40 rounded-2xl p-6 md:p-8 backdrop-blur-sm animate-slideInRight hover:border-red-600/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center animate-pulse-slow">
                <X className="w-5 h-5 text-red-500" strokeWidth={3} />
              </div>
              <h2 className="text-red-500 text-lg md:text-xl font-bold tracking-wider">
                REJECTED PATH
              </h2>
            </div>
            <p className="text-gray-400 text-sm mb-6 ml-11">
              Transaction is blocked if any risk is triggered.
            </p>
            <ul className="space-y-3">
              {rejectedItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-gray-300 text-sm md:text-base animate-slideInRight opacity-0"
                  style={{
                    animationDelay: `${i * 150 + 300}ms`,
                    animationFillMode: 'forwards',
                  }}
                >
                  <div className="w-5 h-5 rounded-full border border-red-500 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-red-500" strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom warning box */}
        <div className="bg-gradient-to-r from-yellow-950/30 via-black/50 to-yellow-950/30 border border-yellow-700/40 rounded-2xl p-6 backdrop-blur-sm animate-fadeInUp hover:border-yellow-600/60 transition-all duration-500">
          <div className="flex items-center gap-4 justify-center flex-col md:flex-row text-center md:text-left">
            <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 flex-shrink-0 animate-pulse-slow drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]" />
            <div>
              <p className="text-gray-200 text-sm md:text-base">
                If rejected at any stage, the transaction does not proceed.
              </p>
              <p className="text-gray-400 text-sm md:text-base mt-1">
                Failure exits immediately. No exceptions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes dash {
          to { stroke-dashoffset: -16; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.8s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out 0.5s both; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-dash { animation: dash 1s linear infinite; }
        .animate-orbit { animation: orbit 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default ControlGate;