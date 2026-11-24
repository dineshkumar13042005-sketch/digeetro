import React, { useMemo } from 'react';
import PencilStickman from './PencilStickman';

/**
 * HandshakeScene Component
 * Contains the two pencil-drawn stickmen, the ground plane, hand-drawn pencil speed/energy lines,
 * camera micro-shake, and the handshake connection clasp.
 * 
 * Only visible between progress 0.20 and 0.84.
 */
export default function HandshakeScene({ progress = 0, cameraShake = { x: 0, y: 0 } }) {
  // Handshake phase checkpoints (60% to 80%)
  const reachEndP = 0.66;
  const shakeEndP = 0.78;
  const isHandshakeActive = progress >= reachEndP && progress <= 0.80;

  // Scene overall fade in & fade out
  const stageOpacity = useMemo(() => {
    if (progress < 0.20) return 0;
    if (progress < 0.26) return (progress - 0.20) / 0.06;
    if (progress <= 0.80) return 1;
    if (progress <= 0.84) return Math.max(0, 1 - (progress - 0.80) / 0.04);
    return 0;
  }, [progress]);

  // Calculate dynamic handshake intensity (0 to 1)
  const shakeIntensity = useMemo(() => {
    if (progress < reachEndP || progress > 0.80) return 0;
    if (progress <= shakeEndP) {
      const t = (progress - reachEndP) / (shakeEndP - reachEndP);
      return Math.sin(t * Math.PI);
    }
    return Math.max(0, 1 - (progress - shakeEndP) / 0.02);
  }, [progress, reachEndP, shakeEndP]);

  // Handshake vertical displacement for clasped hands
  const pumpOffset = useMemo(() => {
    if (progress >= reachEndP && progress <= shakeEndP) {
      const shakePhase = ((progress - reachEndP) / (shakeEndP - reachEndP)) * Math.PI * 6;
      return Math.sin(shakePhase) * 16;
    }
    return 0;
  }, [progress, reachEndP, shakeEndP]);

  // Sketchy energy lines around the handshake
  const energyRays = useMemo(() => {
    if (!isHandshakeActive) return [];
    const count = 14;
    const rays = [];
    const centerX = 500;
    const centerY = 315 + pumpOffset;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (progress * 6);
      const innerR = 30 + Math.sin(i * 3 + progress * 20) * 8;
      const length = 24 + Math.cos(i * 2) * 12 + shakeIntensity * 18;
      const x1 = centerX + Math.cos(angle) * innerR;
      const y1 = centerY + Math.sin(angle) * innerR;
      const x2 = centerX + Math.cos(angle) * (innerR + length);
      const y2 = centerY + Math.sin(angle) * (innerR + length);
      rays.push({ x1, y1, x2, y2, opacity: 0.35 + Math.sin(i + progress * 30) * 0.4 });
    }
    return rays;
  }, [isHandshakeActive, progress, pumpOffset, shakeIntensity]);

  // Unconditional hook execution complete; now safe to return null if out of view
  if (progress < 0.18 || progress > 0.86 || stageOpacity <= 0.001) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-75 select-none"
      style={{
        transform: `translate3d(${cameraShake.x}px, ${cameraShake.y}px, 0)`,
        opacity: stageOpacity,
      }}
    >
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full max-w-6xl max-h-[85vh] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="pencil-texture" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* Minimalist hand-drawn sketchy ground line */}
        <g opacity={stageOpacity * 0.85}>
          <path
            d="M 40 490 Q 250 491 500 489.5 T 960 490"
            fill="none"
            stroke="#1c1917"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.25"
          />
          <path
            d="M 120 492 L 280 492 M 420 491.5 L 580 491.5 M 720 492 L 880 492"
            fill="none"
            stroke="#1c1917"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.12"
          />
        </g>

        {/* The Two Pencil Stickmen */}
        <g filter="url(#pencil-texture)">
          <PencilStickman
            side="left"
            progress={progress}
            shakeIntensity={shakeIntensity}
          />
          <PencilStickman
            side="right"
            progress={progress}
            shakeIntensity={shakeIntensity}
          />
        </g>

        {/* Hand Clasp Joint */}
        {progress >= reachEndP && progress <= 0.84 && (
          <g
            transform={`translate(500, ${315 + pumpOffset})`}
            opacity={progress <= 0.80 ? 1 : Math.max(0, 1 - (progress - 0.80) / 0.04)}
          >
            <ellipse cx="0" cy="0" rx="9" ry="7" fill="#18181b" />
            <path
              d="M -6 -5 Q 0 -8 6 -4 M -7 0 Q 0 -3 7 1 M -6 4 Q 0 1 6 5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M -8 -3 Q -4 6 5 4"
              fill="none"
              stroke="#18181b"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Sketchy pencil-stroke energy lines around characters during handshake */}
        {isHandshakeActive && (
          <g>
            {energyRays.map((r, i) => (
              <line
                key={`energy-ray-${i}`}
                x1={r.x1}
                y1={r.y1}
                x2={r.x2}
                y2={r.y2}
                stroke="#18181b"
                strokeWidth={1.8 + (i % 2) * 0.8}
                strokeLinecap="round"
                opacity={r.opacity * shakeIntensity}
              />
            ))}
            <path
              d={`M 470 ${315 + pumpOffset - 25} A 35 35 0 0 1 530 ${315 + pumpOffset - 25}`}
              fill="none"
              stroke="#18181b"
              strokeWidth="1.6"
              strokeDasharray="4 4"
              opacity={0.4 * shakeIntensity}
            />
            <path
              d={`M 465 ${315 + pumpOffset + 28} A 40 40 0 0 0 535 ${315 + pumpOffset + 28}`}
              fill="none"
              stroke="#18181b"
              strokeWidth="1.6"
              strokeDasharray="5 3"
              opacity={0.35 * shakeIntensity}
            />
          </g>
        )}
      </svg>
    </div>
  );
}
