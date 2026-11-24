import React from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles, Film } from 'lucide-react';

/**
 * NavigationControls Component
 * Provides:
 * - Direct view switcher: [🎬 Opening Animation] <-> [✨ Hero Landing Page]
 * - Animation scrub bar & milestone markers
 * - Audio mute / unmute toggle
 * - Autoplay / pause button
 */
export default function NavigationControls({
  progress = 0,
  isPlaying = false,
  isMuted = true,
  viewMode = 'animation',
  onTogglePlay,
  onToggleMute,
  onSeek,
  onReplay,
  onSwitchView,
}) {
  const percent = Math.round(progress * 100);

  let currentSceneName = 'Logo Reveal';
  if (progress >= 0.20 && progress < 0.40) {
    currentSceneName = 'Stickmen Entrance';
  } else if (progress >= 0.40 && progress < 0.60) {
    currentSceneName = 'Walking & Approach';
  } else if (progress >= 0.60 && progress < 0.80) {
    currentSceneName = 'Handshake & Cinematic VFX';
  } else if (progress >= 0.80) {
    currentSceneName = 'Welcome to Digeetro';
  }

  const milestones = [
    { p: 0.05, label: 'Logo' },
    { p: 0.30, label: 'Entrance' },
    { p: 0.50, label: 'Approach' },
    { p: 0.70, label: 'Handshake' },
    { p: 0.95, label: 'Welcome' },
  ];

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl pointer-events-auto">
      <div className="bg-white/90 backdrop-blur-md border border-neutral-200/90 rounded-2xl p-2 sm:p-2.5 shadow-xl shadow-neutral-900/5 transition-all">
        {/* Top Row: View Switcher + Scene Indicator + Controls */}
        <div className="flex items-center justify-between gap-2">
          {/* Left: View Mode Switcher Pill */}
          <div className="flex items-center p-0.5 rounded-xl bg-neutral-100 border border-neutral-200/60 text-xs font-semibold">
            <button
              onClick={() => onSwitchView('animation')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'animation'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden sm:inline">Opening Story</span>
            </button>

            <button
              onClick={() => onSwitchView('landing')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'landing'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span className="hidden sm:inline">Hero Design</span>
            </button>
          </div>

          {/* Center: Status / Scene Badge (only shown in animation mode) */}
          {viewMode === 'animation' && (
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/60 shrink-0">
                {percent}%
              </span>
              <span className="text-xs font-semibold text-neutral-800 truncate hidden md:inline">
                {currentSceneName}
              </span>
            </div>
          )}

          {/* Right: Audio Toggle, Play, Replay */}
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleMute}
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              className={`p-1.5 rounded-lg border transition-all text-xs flex items-center gap-1 cursor-pointer ${
                isMuted
                  ? 'border-neutral-200 text-neutral-500 hover:text-neutral-900 bg-neutral-50'
                  : 'border-purple-300 text-purple-700 bg-purple-50 shadow-sm'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {viewMode === 'animation' ? (
              <>
                <button
                  onClick={onTogglePlay}
                  title={isPlaying ? 'Pause' : 'Cinematic Autoplay'}
                  className="p-1.5 px-2.5 rounded-lg bg-neutral-950 text-white hover:bg-neutral-800 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current text-pink-400" />
                      <span className="hidden sm:inline">Play</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onReplay}
                  title="Reset Animation to Beginning"
                  className="p-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <button
                onClick={onReplay}
                className="p-1.5 px-3 rounded-lg bg-neutral-950 text-white hover:bg-neutral-800 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Film className="w-3.5 h-3.5 text-pink-400" />
                <span>Play Animation</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Row: Scrub Bar & Milestones (only in animation mode) */}
        {viewMode === 'animation' && (
          <div className="relative pt-1.5 pb-0.5 mt-1 border-t border-neutral-100">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
                onSeek(newProgress);
              }}
              className="group relative h-2 bg-neutral-100 rounded-full cursor-pointer overflow-hidden border border-neutral-200/60"
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full transition-all duration-75"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="flex justify-between items-center mt-1 px-1">
              {milestones.map((m, idx) => (
                <button
                  key={`milestone-${idx}`}
                  onClick={() => onSeek(m.p)}
                  className="text-[10px] font-medium text-neutral-400 hover:text-neutral-900 transition-colors flex items-center gap-0.5 cursor-pointer"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      progress >= m.p ? 'bg-purple-600' : 'bg-neutral-300'
                    }`}
                  />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
