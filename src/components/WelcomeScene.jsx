import React, { useMemo } from 'react';
import { ArrowDown, RotateCcw, Sparkles } from 'lucide-react';

/**
 * WelcomeScene Component
 * Final Reveal Screen (starts at 72% scroll, fully prominent from 78% to 100%):
 * 
 * Displays the exact requested text:
 * WELCOME TO (Elegant black typography)
 * DIGEETRO (Original brand gradient colours)
 * DIGITAL SOLUTIONS (Clean professional typography)
 * 
 * Guaranteed high visibility so it is unmissable when scrolling down!
 */
export default function WelcomeScene({
  progress = 0,
  onReplay,
  onExploreServices,
}) {
  // Starts appearing immediately after handshake connection at progress >= 0.78
  const isVisible = progress >= 0.78;

  // Reveal factor smoothly goes from 0 to 1 between p = 0.78 and p = 0.86
  // Stays 100% fully visible from 0.86 all the way to 1.0
  const revealProgress = useMemo(() => {
    if (progress < 0.78) return 0;
    return Math.min(1, (progress - 0.78) / 0.08);
  }, [progress]);

  const wordWelcome = 'WELCOME TO'.split('');
  const wordDigeetro = 'DIGEETRO'.split('');
  const wordSolutions = 'DIGITAL SOLUTIONS'.split('');

  // Continuous light sweep shine across text
  const lightSweep = useMemo(() => {
    if (progress < 0.82) return -120;
    const t = Math.min(1, (progress - 0.82) / 0.15);
    return -120 + t * 260;
  }, [progress]);

  if (!isVisible || revealProgress <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-30 px-4 text-center select-none bg-white/95 backdrop-blur-xs transition-opacity duration-300"
      style={{
        opacity: Math.min(1, revealProgress * 1.3),
      }}
    >
      {/* Background ambient brand glow */}
      <div
        className="absolute w-[750px] h-[750px] rounded-full blur-[140px] pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(224,40,136,0.18) 0%, rgba(92,36,229,0.12) 50%, rgba(255,106,61,0.08) 80%, transparent 100%)',
          opacity: revealProgress,
          transform: `scale(${0.9 + revealProgress * 0.2})`,
        }}
      />

      {/* Original Brand Logo Badge - Preserved Unchanged */}
      <div
        className="mb-4 sm:mb-6 flex items-center justify-center will-change-transform transition-all duration-300"
        style={{
          opacity: Math.min(1, revealProgress * 1.5),
          transform: `translateY(${(1 - revealProgress) * 20}px) scale(${0.92 + revealProgress * 0.08})`,
        }}
      >
        <div className="p-2.5 sm:p-3 rounded-2xl bg-white shadow-xl shadow-purple-500/10 border border-neutral-200/80 flex items-center gap-3">
          <img
            src="/assets/digeetro-logo.jpg"
            alt="DIGEETRO Logo Icon"
            className="w-12 sm:w-16 h-auto object-contain rounded-lg"
          />
          <div className="text-left pr-2 sm:pr-4">
            <span className="block text-[10px] font-bold tracking-widest text-purple-600 uppercase">
              Brand Identity
            </span>
            <span className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight">
              DIGEETRO DIGITAL SOLUTIONS
            </span>
          </div>
        </div>
      </div>

      {/* Typography Container */}
      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        {/* LINE 1: WELCOME TO - Elegant black typography */}
        <div className="overflow-hidden py-1 mb-1">
          <h2 className="text-base sm:text-xl md:text-2xl font-bold tracking-[0.35em] text-neutral-900 uppercase flex flex-wrap justify-center items-center">
            {wordWelcome.map((char, idx) => {
              const charDelay = idx * 0.015;
              const charProgress = Math.max(0, Math.min(1, (revealProgress - charDelay) / 0.5));
              return (
                <span
                  key={`welcome-${idx}`}
                  className="inline-block transition-all duration-200 will-change-transform"
                  style={{
                    opacity: charProgress,
                    transform: `translate3d(0, ${(1 - charProgress) * 18}px, 0)`,
                    width: char === ' ' ? '0.6em' : 'auto',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h2>
        </div>

        {/* LINE 2: DIGEETRO - Original Brand Gradient Colors & Light Sweep */}
        <div className="relative overflow-hidden py-2 my-1">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none flex justify-center items-center font-['Outfit']">
            {wordDigeetro.map((char, idx) => {
              const charDelay = idx * 0.02;
              const charProgress = Math.max(0, Math.min(1, (revealProgress - 0.1 - charDelay) / 0.5));
              return (
                <span
                  key={`digeetro-${idx}`}
                  className="inline-block digeetro-gradient-text drop-shadow-sm transition-all duration-200 will-change-transform"
                  style={{
                    opacity: charProgress,
                    transform: `translate3d(0, ${(1 - charProgress) * 26}px, 0) scale(${0.92 + charProgress * 0.08})`,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h1>

          {/* Light Sweep Across DIGEETRO text */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.7) 48%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.7) 52%, transparent 80%)',
              transform: `translateX(${lightSweep}%) skewX(-25deg)`,
              mixBlendMode: 'overlay',
            }}
          />
        </div>

        {/* LINE 3: DIGITAL SOLUTIONS - Clean professional typography */}
        <div className="overflow-hidden py-1 mt-1 mb-5">
          <h3 className="text-xs sm:text-base md:text-xl font-semibold tracking-[0.45em] text-neutral-700 uppercase flex flex-wrap justify-center items-center">
            {wordSolutions.map((char, idx) => {
              const charDelay = idx * 0.015;
              const charProgress = Math.max(0, Math.min(1, (revealProgress - 0.2 - charDelay) / 0.5));
              return (
                <span
                  key={`solutions-${idx}`}
                  className="inline-block transition-all duration-200 will-change-transform"
                  style={{
                    opacity: charProgress,
                    transform: `translate3d(0, ${(1 - charProgress) * 16}px, 0)`,
                    width: char === ' ' ? '0.7em' : 'auto',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h3>
        </div>

        {/* Brand Value Statement */}
        <p
          className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-neutral-600 font-normal leading-relaxed mb-6 sm:mb-8 transition-all duration-300"
          style={{
            opacity: Math.max(0, (revealProgress - 0.3) * 1.5),
            transform: `translateY(${(1 - Math.max(0, (revealProgress - 0.3) * 1.5)) * 12}px)`,
          }}
        >
          Forged through partnership, trust, and creative excellence. We engineer premium digital solutions that accelerate business growth and captivate modern audiences.
        </p>

        {/* Action Buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 transition-all duration-300"
          style={{
            opacity: Math.max(0, (revealProgress - 0.4) * 1.7),
            transform: `translateY(${(1 - Math.max(0, (revealProgress - 0.4) * 1.7)) * 14}px)`,
          }}
        >
          <button
            onClick={onExploreServices}
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-neutral-900/15 hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore Our Capabilities</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-pink-400" />
          </button>

          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 px-5 py-3 sm:py-3.5 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-purple-600" />
            <span>Replay Animation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
