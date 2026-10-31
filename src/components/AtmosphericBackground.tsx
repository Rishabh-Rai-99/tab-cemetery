import React from 'react';

export const AtmosphericBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none max-w-full">
      {/* Deep atmospheric dark vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#141c29_0%,#080a0e_75%)] opacity-95" />

      {/* Subtle Moon in the night sky - visible from sm: (640px+) to avoid any collision on narrow mobile screens */}
      <div 
        aria-hidden="true" 
        className="hidden sm:block absolute top-4 left-6 sm:left-10 md:left-16 lg:left-24 pointer-events-none opacity-40 sm:opacity-70"
      >
        <div className="relative w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#94a3b8] via-[#cbd5e1] to-[#f8fafc] shadow-[0_0_50px_rgba(203,213,225,0.22)] flex items-center justify-center">
          {/* Subtle craters */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#64748b]/40 absolute top-2.5 left-3 sm:top-3 sm:left-4"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-[#64748b]/30 absolute bottom-3 right-3 sm:bottom-4 sm:right-4"></div>
          <div className="w-2 h-2 rounded-full bg-[#64748b]/30 absolute top-6 right-2 sm:top-7 sm:right-3"></div>
          {/* Moon aura */}
          <div className="absolute -inset-6 rounded-full bg-slate-300/10 blur-xl"></div>
        </div>
      </div>

      {/* Subtle glow from top */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-cyan-950/20 blur-[100px] pointer-events-none" />

      {/* Layer 1: Drifting cemetery fog / mist */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-80 opacity-25 animate-mist pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(148, 163, 184, 0.15) 0%, rgba(15, 23, 42, 0.08) 50%, transparent 80%)'
        }}
      />

      {/* Layer 2: Counter-drifting ground mist */}
      <div 
        className="absolute bottom-8 left-0 right-0 h-64 opacity-20 animate-mist-slow pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 100%, rgba(94, 234, 212, 0.06) 0%, rgba(15, 23, 42, 0.04) 60%, transparent 80%)'
        }}
      />

      {/* Distant eerie tree silhouette / willow hint at corners (SVG) */}
      <div className="absolute bottom-0 left-0 w-56 h-64 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-current text-slate-800">
          <path d="M20 200 C30 140, 20 100, 50 70 C70 50, 90 60, 110 30 C90 60, 120 70, 100 110 C80 150, 70 170, 80 200 Z" />
          <path d="M45 105 C30 90, 10 95, 0 85 C15 80, 35 85, 45 95 Z" />
          <path d="M70 80 C80 60, 70 40, 60 20 C75 35, 85 55, 75 75 Z" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-72 opacity-10 pointer-events-none scale-x-[-1]">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-current text-slate-800">
          <path d="M30 200 C40 130, 30 90, 60 60 C80 40, 100 50, 120 20 C100 50, 130 60, 110 100 C90 140, 80 160, 90 200 Z" />
          <path d="M55 95 C40 80, 20 85, 10 75 C25 70, 45 75, 55 85 Z" />
        </svg>
      </div>
    </div>
  );
};
