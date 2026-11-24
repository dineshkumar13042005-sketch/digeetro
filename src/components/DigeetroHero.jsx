import React, { useState } from 'react';
import { Play, ArrowUpRight, Sparkles, Volume2, Mic, Check } from 'lucide-react';

/**
 * DigeetroHero Component
 * Recreates the ultra-premium, world-class aesthetic from the user's reference design
 * customized for DIGEETRO DIGITAL SOLUTIONS using the original uploaded brand logo.
 */
export default function DigeetroHero({ onWatchOpeningStory }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-[#f4f4f7] py-8 sm:py-12 px-3 sm:px-6 md:px-10 flex items-center justify-center font-['Plus_Jakarta_Sans'] select-none">
      {/* Outer Floating Window Frame with subtle glowing ambient border */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-7xl bg-[#fafafa] rounded-[2rem] sm:rounded-[2.75rem] border border-neutral-200/80 shadow-[0_25px_70px_-15px_rgba(92,36,229,0.12),0_10px_30px_-5px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300"
      >
        {/* Top Floating Glow Border Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 opacity-60" />

        {/* --- NAVIGATION BAR --- */}
        <header className="relative z-30 pt-6 sm:pt-8 px-6 sm:px-12 flex items-center justify-between">
          {/* Brand Logo - Original DIGEETRO */}
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/digeetro-logo.jpg"
              alt="DIGEETRO"
              className="h-9 sm:h-10 w-auto object-contain rounded"
            />
          </div>

          {/* Center Frosted Glass Pill Menu */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-white/70 backdrop-blur-md border border-neutral-200/70 shadow-xs text-xs font-medium text-neutral-600">
            <button className="px-4 py-1.5 rounded-full hover:text-neutral-900 transition-colors cursor-pointer">
              Features
            </button>
            <button className="px-4 py-1.5 rounded-full hover:text-neutral-900 transition-colors cursor-pointer">
              How it works
            </button>
            <button className="px-4 py-1.5 rounded-full bg-white text-neutral-900 font-semibold shadow-xs border border-neutral-100 transition-colors cursor-pointer">
              Integrations
            </button>
            <button className="px-4 py-1.5 rounded-full hover:text-neutral-900 transition-colors cursor-pointer">
              Pricing
            </button>
          </nav>

          {/* Right Action Button */}
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer">
            <span>Get the app</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </header>

        {/* --- HERO CONTENT AREA --- */}
        <div className="relative z-20 pt-7 sm:pt-9 pb-6 sm:pb-8 px-4 sm:px-8 text-center flex flex-col items-center">
          {/* Top Headline */}
          <h1 className="max-w-4xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] tracking-tight text-neutral-900 leading-[1.08] font-['Instrument_Serif'] font-normal">
            <span className="block">A clearer mind</span>
            <span className="block italic text-neutral-900 font-normal">for a brighter you.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3.5 max-w-xl mx-auto text-neutral-500 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
            Digeetro helps you capture ideas, organize your thoughts, and stay focused — all in one beautiful space.
          </p>

          {/* CTA Buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <button className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-md shadow-neutral-900/10 cursor-pointer">
              <span>Get started free</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onWatchOpeningStory}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-white border border-neutral-200 text-neutral-800 text-xs sm:text-sm font-medium hover:border-neutral-300 hover:bg-neutral-50 transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer group"
            >
              <span className="w-5 h-5 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </span>
              <span>Watch opening animation</span>
            </button>
          </div>

          {/* --- CENTRAL VISUAL HERO WITH 3D GLASS CARDS & CONNECTORS --- */}
          <div className="relative w-full max-w-5xl mx-auto mt-4 sm:mt-6 min-h-[340px] sm:min-h-[400px] flex items-center justify-center">
            {/* SVG Connecting Bezier Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connector from Top-Left Card to 3D Orbit Ring */}
              <path
                d="M 230 180 C 230 250, 310 265, 370 265"
                fill="none"
                stroke="#d4d4d8"
                strokeWidth="1.1"
                strokeDasharray="1 0"
                opacity="0.85"
              />
              {/* Connector from 3D Orbit Ring to Top-Right Card */}
              <path
                d="M 640 280 C 700 280, 720 250, 770 240"
                fill="none"
                stroke="#d4d4d8"
                strokeWidth="1.1"
                strokeDasharray="1 0"
                opacity="0.85"
              />
            </svg>

            {/* Top-Left Floating Card */}
            <div
              className="absolute left-2 sm:left-6 md:left-12 top-6 sm:top-12 z-20 w-44 sm:w-52 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200/70 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.05)] text-left transition-transform duration-200 will-change-transform"
              style={{
                transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * -14}px, 0)`,
              }}
            >
              <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center mb-3 text-neutral-800">
                {/* Audio wave bars icon */}
                <div className="flex items-center gap-0.5 h-3.5">
                  <span className="w-0.5 h-2 bg-neutral-800 rounded-full animate-pulse" />
                  <span className="w-0.5 h-3.5 bg-neutral-800 rounded-full" />
                  <span className="w-0.5 h-1.5 bg-neutral-800 rounded-full" />
                  <span className="w-0.5 h-2.5 bg-neutral-800 rounded-full" />
                </div>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                Turn thoughts into progress.
              </h4>
              <p className="mt-1 text-[10px] sm:text-xs text-neutral-400 leading-tight">
                Capture, organise and do more.
              </p>
            </div>

            {/* Central Subject Portrait with 3D Orbit Cards */}
            <div
              className="relative z-10 w-full max-w-lg transition-transform duration-200 will-change-transform"
              style={{
                transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0) scale(1.02)`,
              }}
            >
              <img
                src="/assets/hero-portrait-final.png"
                alt="Mindly Clarity Portrait with 3D floating glass cards"
                className="w-full h-auto object-contain mx-auto mix-blend-multiply drop-shadow-sm select-none pointer-events-none"
              />
            </div>

            {/* Top-Right Floating Card */}
            <div
              className="absolute right-2 sm:right-6 md:right-12 top-14 sm:top-20 z-20 w-44 sm:w-52 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200/70 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.05)] text-left transition-transform duration-200 will-change-transform"
              style={{
                transform: `translate3d(${mousePos.x * 16}px, ${mousePos.y * 16}px, 0)`,
              }}
            >
              {/* Avatar stack */}
              <div className="flex items-center -space-x-1.5 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                  alt="User"
                  className="w-6 h-6 rounded-full border border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                  alt="User"
                  className="w-6 h-6 rounded-full border border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80"
                  alt="User"
                  className="w-6 h-6 rounded-full border border-white object-cover"
                />
                <div className="w-6 h-6 rounded-full bg-neutral-100 border border-white flex items-center justify-center text-[10px] font-bold text-neutral-700">
                  +
                </div>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                Ideas, anytime, anywhere.
              </h4>
              <p className="mt-1 text-[10px] sm:text-xs text-neutral-400 leading-tight">
                Sync across all your devices.
              </p>
            </div>

            {/* Top-Right Rotating Badge / Circular Stamp */}
            <div className="absolute right-6 sm:right-16 top-0 sm:top-2 z-20 pointer-events-none hidden sm:block">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg
                  className="w-full h-full animate-[spin_18s_linear_infinite]"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      id="stampCirclePath"
                      d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
                    />
                  </defs>
                  <text className="text-[9px] uppercase tracking-[2.5px] fill-neutral-800 font-semibold">
                    <textPath href="#stampCirclePath">
                      ★ MORE FOCUSED YOU • EVERYDAY •
                    </textPath>
                  </text>
                </svg>
                {/* Center four-point sparkle star */}
                <Sparkles className="absolute w-4 h-4 text-neutral-900" />
              </div>
            </div>

            {/* Bottom-Left Trust Metric */}
            <div className="absolute left-4 sm:left-12 bottom-2 sm:bottom-6 z-20 text-left">
              <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 block mb-2">
                Trusted by 50,000+ creators worldwide.
              </span>
              <div className="flex items-center -space-x-1.5">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
                  alt="Creator"
                  className="w-6 h-6 rounded-full border border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"
                  alt="Creator"
                  className="w-6 h-6 rounded-full border border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80"
                  alt="Creator"
                  className="w-6 h-6 rounded-full border border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80"
                  alt="Creator"
                  className="w-6 h-6 rounded-full border border-white object-cover"
                />
                <div className="w-6 h-6 rounded-full bg-neutral-100 border border-white flex items-center justify-center text-[10px] font-bold text-neutral-700">
                  +
                </div>
              </div>
            </div>

            {/* Bottom-Right Minimalist Motto */}
            <div className="absolute right-4 sm:right-12 bottom-3 sm:bottom-7 z-20 text-right flex flex-col items-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-[1px] bg-neutral-300" />
                <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
              </div>
              <span className="text-[11px] sm:text-xs text-neutral-400 font-medium">
                Less chaos.
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-600 font-semibold">
                More clarity.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
