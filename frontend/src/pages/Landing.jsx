import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, BrainCircuit, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex flex-col items-center animate-fade-in-up flex-1 justify-center w-full mt-[-40px]">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#98C3ED]/15 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-[#95C8CE]/10 rounded-full blur-[90px] pointer-events-none -z-10"></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
      
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl w-full px-4 mt-24 md:mt-32 mb-20 md:mb-28 gap-12 lg:gap-8">
        
        {/* Text Content (Left on Desktop, Top on Mobile) */}
        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-8">
            Understand your mind before stress controls it.
          </h1>
          
          <p className="text-xl md:text-2xl text-[#CBD5E1] font-medium mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Akeso is your AI mental health copilot that analyzes patterns in sleep, mood, stress, and energy to detect burnout risks early and generate psychiatrist-ready insights.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 lg:gap-8 mb-10">
            <Link to="/login" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-3 group shadow-lg shadow-[#98C3ED]/20 w-full sm:w-auto h-16 whitespace-nowrap">
              Start Free Mental Check-in
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#how-it-works" className="px-8 py-4 rounded-[18px] font-bold text-white bg-[#334155] border border-[#475569] hover:bg-[#475569] shadow-sm transition-all w-full sm:w-auto flex items-center justify-center h-16 whitespace-nowrap">
              See How It Works
            </a>
          </div>

          {/* TRUST TEXT */}
          <div className="flex flex-col items-center lg:items-start text-[#94A3B8] font-medium text-sm mt-4 animate-fade-in-up delay-200">
            <div className="flex items-center gap-2 mb-1">
              <Lock size={14} className="text-[#95C8CE]" />
              <span className="text-white font-bold">Private and secure.</span>
            </div>
            <p>Your emotional data is encrypted and shared only with your permission.</p>
          </div>
        </div>

        {/* Geometric Illustration & Orbital System (Right on Desktop, Bottom on Mobile) */}
        <div className="flex-1 flex justify-center lg:justify-end relative w-full opacity-90 lg:mt-0 mt-10 min-h-[350px]">
          
          {/* ORBITAL SOLAR SYSTEM BACKGROUND */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] pointer-events-none -z-20">
            <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
              <defs>
                <radialGradient id="centerGlow">
                  <stop offset="0%" stopColor="rgba(152,195,237,0.12)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <g transform="translate(250, 250)">
                {/* Core Radial Glow */}
                <circle cx="0" cy="0" r="140" fill="url(#centerGlow)" />
                
                {/* Orbit Path 1 */}
                <circle cx="0" cy="0" r="100" stroke="rgba(152,195,237,0.25)" strokeWidth="1" fill="none" />
                <g className="origin-center animate-[spin_12s_linear_infinite]">
                  <circle cx="100" cy="0" r="4" fill="#98C3ED" style={{ filter: 'blur(1px)' }} />
                  <circle cx="100" cy="0" r="2" fill="#FFFFFF" />
                </g>

                {/* Orbit Path 2 */}
                <circle cx="0" cy="0" r="160" stroke="rgba(152,195,237,0.25)" strokeWidth="1.5" strokeDasharray="4 8" fill="none" className="hidden sm:block" />
                <g className="origin-center animate-[spin_20s_linear_infinite_reverse] hidden sm:block">
                  <circle cx="-160" cy="0" r="5" fill="#95C8CE" style={{ filter: 'blur(1.5px)' }} />
                  <circle cx="-160" cy="0" r="2.5" fill="#FFFFFF" />
                </g>

                {/* Orbit Path 3 */}
                <circle cx="0" cy="0" r="220" stroke="rgba(152,195,237,0.15)" strokeWidth="1" fill="none" className="hidden lg:block" />
                <g className="origin-center animate-[spin_30s_linear_infinite] hidden lg:block">
                  <circle cx="0" cy="-220" r="3" fill="#98C3ED" style={{ filter: 'blur(1px)' }} />
                  <circle cx="0" cy="-220" r="1.5" fill="#FFFFFF" />
                </g>

                {/* Ambient Floating Particles */}
                <g className="animate-float" style={{ animationDuration: '9s' }}>
                  <circle cx="-70" cy="-130" r="2" fill="#95C8CE" opacity="0.6" />
                  <circle cx="140" cy="160" r="2.5" fill="#98C3ED" opacity="0.4" />
                  <circle cx="-180" cy="90" r="1.5" fill="#98C3ED" opacity="0.5" className="hidden sm:block" />
                  <circle cx="160" cy="-110" r="2" fill="#95C8CE" opacity="0.5" className="hidden md:block"/>
                </g>
              </g>
            </svg>
          </div>



        </div>
        
      </div>

      {/* Feature Highlight Cards */}
      <div id="how-it-works" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-12 mb-32 px-4">
        
        <div className="card text-center hover:-translate-y-2 transition-all p-10 flex flex-col items-center group shadow-md border border-[#475569] bg-[#334155]/60 backdrop-blur-sm">
          <div className="w-20 h-20 bg-[#98C3ED]/10 text-[#98C3ED] rounded-[24px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <BrainCircuit size={40} />
          </div>
          <h3 className="font-extrabold text-2xl text-white mb-4">AI Pattern Analysis</h3>
          <p className="text-[#CBD5E1] font-medium leading-relaxed text-lg">
            Detect hidden stress triggers before they become serious.
          </p>
        </div>

        <div className="card text-center hover:-translate-y-2 transition-all p-10 flex flex-col items-center group shadow-md border border-[#475569] bg-[#334155]/60 backdrop-blur-sm">
          <div className="w-20 h-20 bg-[#FCECA4]/30 text-[#D6A848] rounded-[24px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Activity size={40} />
          </div>
          <h3 className="font-extrabold text-2xl text-white mb-4">Daily Tracking</h3>
          <p className="text-[#CBD5E1] font-medium leading-relaxed text-lg">
            Track mood, sleep, focus, and energy in less than 30 seconds.
          </p>
        </div>

        <div className="card text-center hover:-translate-y-2 transition-all p-10 flex flex-col items-center group shadow-md border border-[#475569] bg-[#334155]/60 backdrop-blur-sm">
          <div className="w-20 h-20 bg-[#95C8CE]/20 text-[#95C8CE] rounded-[24px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <ShieldCheck size={40} />
          </div>
          <h3 className="font-extrabold text-2xl text-white mb-4">Clinical Reports</h3>
          <p className="text-[#CBD5E1] font-medium leading-relaxed text-lg">
            Generate structured insights ready for psychiatrists.
          </p>
        </div>

      </div>

    </div>
  );
}
