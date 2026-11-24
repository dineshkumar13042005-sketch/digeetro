import React, { useEffect, useRef } from 'react';

// Digeetro Brand Colors
const BRAND_COLORS = [
  '#5C24E5', // Deep Purple
  '#8B3EE8', // Electric Purple
  '#E02888', // Magenta Pink
  '#FF2E93', // Neon Pink
  '#FF6A3D', // Sunset Orange
  '#FF8C42', // Warm Orange
  '#00B4D8', // Cyan (from logo pixels)
];

/**
 * ParticleCanvas Component
 * High-performance 60 FPS HTML5 Canvas engine for:
 * - Scene 1: Floating ambient purple/pink/orange brand particles & light sweeps
 * - Scene 3: Handshake explosive particle burst, shockwaves, impact bloom, and spiral-to-center
 * - Scene 4: Wide particle distribution across white background
 */
export default function ParticleCanvas({
  progress = 0,
  onImpactTrigger,
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    burstParticles: [],
    shockwaves: [],
    impactFlash: 0,
    hasTriggeredHandshake: false,
    lastProgress: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize 60 ambient particles
    const ambientCount = 65;
    const particles = [];
    for (let i = 0; i < ambientCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.15,
        radius: Math.random() * 2.8 + 1.2,
        color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulse: Math.random() * Math.PI,
        // Some particles are cubes matching the logo's pixel design!
        isCube: Math.random() > 0.65,
        size: Math.random() * 5 + 3,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }
    stateRef.current.particles = particles;

    // Helper: Trigger the Handshake Explosion
    const triggerHandshakeExplosion = (originX, originY) => {
      // 1. Shockwaves
      stateRef.current.shockwaves = [
        { r: 8, maxR: Math.min(width, height) * 0.48, width: 4.5, color: '#E02888', alpha: 0.9, speed: 14 },
        { r: 4, maxR: Math.min(width, height) * 0.38, width: 3.5, color: '#5C24E5', alpha: 0.85, speed: 10 },
        { r: 2, maxR: Math.min(width, height) * 0.26, width: 2.5, color: '#FF6A3D', alpha: 0.8, speed: 7 },
      ];

      // 2. Impact flash bloom
      stateRef.current.impactFlash = 1.0;

      // 3. 160 explosive burst particles
      const burst = [];
      const burstCount = 160;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 14 + 3;
        const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
        burst.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3.5 + 1.5,
          color,
          alpha: 1.0,
          decay: Math.random() * 0.012 + 0.008,
          drag: 0.94,
          isCube: Math.random() > 0.6,
          size: Math.random() * 6 + 3,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.15,
          // Secondary behavior: after initial burst, spiral towards center
          life: 0,
        });
      }
      stateRef.current.burstParticles = burst;

      if (onImpactTrigger) {
        onImpactTrigger();
      }
    };

    let lastTime = performance.now();

    const render = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      const p = stateRef.current.lastProgress;
      // Handshake screen coordinates (Stage center ~ width/2, height * 0.53)
      const handshakeScreenX = width * 0.5;
      const handshakeScreenY = height * 0.53;

      // Detect handshake threshold crossing
      if (p >= 0.66 && p <= 0.78 && !stateRef.current.hasTriggeredHandshake) {
        stateRef.current.hasTriggeredHandshake = true;
        triggerHandshakeExplosion(handshakeScreenX, handshakeScreenY);
      } else if (p < 0.63) {
        stateRef.current.hasTriggeredHandshake = false;
      }

      // 1. Draw Impact Flash Bloom
      if (stateRef.current.impactFlash > 0.01) {
        const flash = stateRef.current.impactFlash;
        const glowGrad = ctx.createRadialGradient(
          handshakeScreenX,
          handshakeScreenY,
          0,
          handshakeScreenX,
          handshakeScreenY,
          180 * flash
        );
        glowGrad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * flash})`);
        glowGrad.addColorStop(0.3, `rgba(224, 40, 136, ${0.6 * flash})`);
        glowGrad.addColorStop(0.7, `rgba(92, 36, 229, ${0.3 * flash})`);
        glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(handshakeScreenX, handshakeScreenY, 180 * flash, 0, Math.PI * 2);
        ctx.fill();

        stateRef.current.impactFlash *= 0.88; // fast dissipate
      }

      // 2. Draw Expanding Circular Shockwaves
      if (stateRef.current.shockwaves.length > 0) {
        stateRef.current.shockwaves.forEach((sw) => {
          if (sw.alpha <= 0.01 || sw.r >= sw.maxR) return;

          ctx.save();
          ctx.beginPath();
          ctx.arc(handshakeScreenX, handshakeScreenY, sw.r, 0, Math.PI * 2);
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = sw.width * sw.alpha;
          ctx.globalAlpha = sw.alpha * 0.75;
          ctx.stroke();

          // Outer secondary thin ripple
          ctx.beginPath();
          ctx.arc(handshakeScreenX, handshakeScreenY, sw.r * 1.05, 0, Math.PI * 2);
          ctx.strokeStyle = '#FF6A3D';
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = sw.alpha * 0.4;
          ctx.stroke();

          ctx.restore();

          sw.r += sw.speed;
          sw.alpha *= 0.94;
        });
      }

      // 3. Draw Burst Particles (Handshake VFX)
      if (stateRef.current.burstParticles.length > 0) {
        const activeBurst = [];
        stateRef.current.burstParticles.forEach((bp) => {
          bp.life += 1;
          bp.x += bp.vx;
          bp.y += bp.vy;
          bp.vx *= bp.drag;
          bp.vy *= bp.drag;

          // Later in life, particles gently spiral or float toward center
          if (bp.life > 25) {
            const dx = handshakeScreenX - bp.x;
            const dy = handshakeScreenY - bp.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 10) {
              bp.vx += (dx / dist) * 0.15;
              bp.vy += (dy / dist) * 0.15;
            }
          }

          bp.rotation += bp.rotSpeed;
          bp.alpha -= bp.decay;

          if (bp.alpha > 0.02) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, bp.alpha);
            ctx.fillStyle = bp.color;

            if (bp.isCube) {
              // Digital cube square like Digeetro logo
              ctx.translate(bp.x, bp.y);
              ctx.rotate(bp.rotation);
              ctx.fillRect(-bp.size / 2, -bp.size / 2, bp.size, bp.size);
            } else {
              // Smooth circular glowing particle
              ctx.beginPath();
              ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
              ctx.fill();

              // Sparkle diamond glint
              if (bp.radius > 2.5) {
                ctx.strokeStyle = bp.color;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(bp.x - bp.radius * 2, bp.y);
                ctx.lineTo(bp.x + bp.radius * 2, bp.y);
                ctx.moveTo(bp.x, bp.y - bp.radius * 2);
                ctx.lineTo(bp.x, bp.y + bp.radius * 2);
                ctx.stroke();
              }
            }
            ctx.restore();
            activeBurst.push(bp);
          }
        });
        stateRef.current.burstParticles = activeBurst;
      }

      // 4. Draw Ambient Particles
      // Ambient density adjusts by scene:
      // In Logo (0-0.2): clustered around center
      // In Walk (0.2-0.6): spread softly
      // In Welcome (0.8-1.0): dense and celebratory
      const ambientVisibility = p < 0.22 ? 0.75 : p > 0.78 ? 0.95 : 0.4;

      stateRef.current.particles.forEach((pt) => {
        pt.pulse += pt.pulseSpeed;
        const currentAlpha =
          (pt.alpha + Math.sin(pt.pulse) * 0.2) * ambientVisibility;

        // Position update
        pt.x += pt.vx;
        pt.y += pt.vy;

        // Wrap around screen edges
        if (pt.x < -20) pt.x = width + 20;
        if (pt.x > width + 20) pt.x = -20;
        if (pt.y < -20) pt.y = height + 20;
        if (pt.y > height + 20) pt.y = -20;

        pt.rotation += pt.rotationSpeed;

        if (currentAlpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = Math.min(1, Math.max(0, currentAlpha));
          ctx.fillStyle = pt.color;

          if (pt.isCube) {
            ctx.translate(pt.x, pt.y);
            ctx.rotate(pt.rotation);
            ctx.fillRect(-pt.size / 2, -pt.size / 2, pt.size, pt.size);
          } else {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onImpactTrigger]);

  // Keep state updated with incoming progress
  useEffect(() => {
    stateRef.current.lastProgress = progress;
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
