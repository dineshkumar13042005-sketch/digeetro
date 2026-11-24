import React, { useMemo, useState, useEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

/**
 * LogoScene Component
 * First Screen (0% - 20%):
 * - Displays the EXACT original uploaded DIGEETRO logo directly without redesign
 * - Pure white background
 * - On page load: starts completely white, logo slowly fades in with subtle scale-up
 * - As user scrolls: smooth light sweep across logo, subtle scale up
 * - Transitions smoothly into stickmen entrance between 0.20 and 0.28
 * - Bottom scroll indicator
 */
export default function LogoScene({ progress = 0 }) {
  // Mount state for initial automatic reveal from pure white
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Timeline:
  // Initial: fade in from white
  // p: 0.00 -> 0.18: Logo prominent, scales from 0.94 -> 1.0, light sweep traverses
  // p: 0.20 -> 0.28: Smooth fade out (1 -> 0) as stickmen enter from opposite sides
  const { scrollOpacity, scale, lightSweepOffset, scrollPromptOpacity } = useMemo(() => {
    let op = 1;
    let sc = 0.94;
    let sweep = -120;
    let promptOp = 1;

    if (progress <= 0.20) {
      const t = progress / 0.20;
      op = 1;
      sc = 0.94 + t * 0.06;
      sweep = -120 + t * 240;
      promptOp = Math.max(0, 1 - progress * 7);
    } else if (progress <= 0.28) {
      const t = (progress - 0.20) / 0.08;
      op = Math.max(0, 1 - t);
      sc = 1.0 + t * 0.05;
      sweep = 120;
      promptOp = 0;
    } else {
      op = 0;
      sc = 1.05;
      sweep = 120;
      promptOp = 0;
    }

    return {
      scrollOpacity: op,
      scale: sc,
      lightSweepOffset: sweep,
      scrollPromptOpacity: promptOp,
    };
  }, [progress]);

  // Combined opacity: initial mount transition + scroll fade
  const combinedOpacity = isLoaded ? scrollOpacity : 0;

  // Unconditional hook execution complete; now safe to return null if out of view
  if (progress > 0.30 || combinedOpacity <= 0.001) return null;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 select-none bg-transparent transition-opacity duration-700 ease-out"
      style={{
        opacity: combinedOpacity,
      }}
    >
      {/* Centered Original Logo Container */}
      <div
        className="relative flex flex-col items-center justify-center max-w-lg w-full px-6 transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `scale(${isLoaded ? scale : 0.88})`,
        }}
      >
        {/* Soft Ambient Brand Glow Behind Logo */}
        <div className="absolute inset-0 -m-16 bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* The Exact Original DIGEETRO Logo */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-3 sm:p-4 shadow-sm shadow-purple-500/5">
          <img
            src="/assets/digeetro-logo.jpg"
            alt="DIGEETRO DIGITAL SOLUTIONS"
            className="w-68 sm:w-84 md:w-96 max-w-[85vw] h-auto object-contain"
          />

          {/* Smooth Light Sweep Across Logo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.7) 48%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.7) 52%, transparent 80%)',
              transform: `translateX(${lightSweepOffset}%) skewX(-20deg)`,
              mixBlendMode: 'overlay',
            }}
          />
        </div>

        {/* Tagline */}
        <div
          className="mt-6 flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.28em] text-neutral-500 font-semibold transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
          <span>Transforming Ideas into Digital Reality</span>
          <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
        </div>
      </div>

      {/* Floating Scroll Indicator at bottom */}
      <div
        className="absolute bottom-8 sm:bottom-10 flex flex-col items-center gap-2 transition-opacity duration-300 pointer-events-auto"
        style={{ opacity: scrollPromptOpacity }}
      >
        <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center p-1.5 shadow-sm">
          <div className="w-1.5 h-2.5 bg-neutral-800 rounded-full animate-bounce" />
        </div>
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-neutral-500 uppercase">
          Scroll Down to Begin
        </span>
        <ChevronDown className="w-4 h-4 text-neutral-400 animate-pulse" />
      </div>
    </div>
  );
}
