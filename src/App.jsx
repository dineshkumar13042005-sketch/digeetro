import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import LogoScene from './components/LogoScene';
import HandshakeScene from './components/HandshakeScene';
import WelcomeScene from './components/WelcomeScene';
import ParticleCanvas from './components/ParticleCanvas';
import DigeetroHero from './components/DigeetroHero';
import AgencyShowcase from './components/AgencyShowcase';
import { soundManager } from './utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const lenisRef = useRef(null);

  // Animation progress (0 to 1) controlled purely by scrolling
  const [progress, setProgress] = useState(0);
  const [cameraShake, setCameraShake] = useState({ x: 0, y: 0 });

  // Sound trigger flags
  const soundFlagsRef = useRef({
    logo: false,
    handshake: false,
    welcome: false,
  });

  // Handle Handshake Impact Camera Shake
  const triggerCameraShake = useCallback(() => {
    let startTime = performance.now();
    const duration = 650;
    const initialAmp = 8;

    soundManager.playHandshakeImpact();

    const shakeLoop = (currentTime) => {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const decay = Math.exp(-elapsed / 160);
        const amp = initialAmp * decay;
        const x = (Math.random() - 0.5) * 2 * amp;
        const y = (Math.random() - 0.5) * 2 * amp;
        setCameraShake({ x, y });
        requestAnimationFrame(shakeLoop);
      } else {
        setCameraShake({ x: 0, y: 0 });
      }
    };
    requestAnimationFrame(shakeLoop);
  }, []);

  // Initialize Lenis Smooth Scroll & GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const track = trackRef.current;
    if (!track) return;

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        if (p > 0.04 && p < 0.18 && !soundFlagsRef.current.logo) {
          soundFlagsRef.current.logo = true;
          soundManager.playWhoosh(1.2);
        } else if (p < 0.03) {
          soundFlagsRef.current.logo = false;
        }

        if (p >= 0.66 && p <= 0.78 && !soundFlagsRef.current.handshake) {
          soundFlagsRef.current.handshake = true;
          triggerCameraShake();
        } else if (p < 0.63) {
          soundFlagsRef.current.handshake = false;
        }

        if (p >= 0.84 && !soundFlagsRef.current.welcome) {
          soundFlagsRef.current.welcome = true;
          soundManager.playWelcomeChord();
        } else if (p < 0.80) {
          soundFlagsRef.current.welcome = false;
        }
      },
    });

    return () => {
      st.kill();
      lenis.destroy();
    };
  }, [triggerCameraShake]);

  // Replay Handler: scrolls smoothly back to top
  const handleReplay = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setProgress(0);
  };

  // Scroll to Mindly-style landing page hero
  const handleExploreServices = () => {
    const heroEl = document.getElementById('hero-landing-page');
    if (heroEl) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(heroEl);
      } else {
        heroEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative bg-white text-neutral-900 select-none">
      {/* 
        Scroll Track: 650vh for the pure, uninhibited cinematic opening animation:
        0-20%: Logo Reveal on pure white screen
        20-40%: Stickmen Entrance
        40-60%: Walk Approach & Settle
        60-80%: Cinematic Handshake & VFX
        80-100%: Welcome to DIGEETRO Final Reveal
      */}
      <div ref={trackRef} data-scroll-track="true" className="relative w-full h-[650vh]">
        <div
          ref={containerRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-white flex items-center justify-center"
        >
          {/* Layer 1: HTML5 Canvas for Brand Particles, Shockwaves, and Impact Sparks */}
          <ParticleCanvas
            progress={progress}
            onImpactTrigger={triggerCameraShake}
          />

          {/* Layer 2: Scene 1 - Original DIGEETRO Logo Reveal (0% - 25%) */}
          <LogoScene progress={progress} />

          {/* Layer 3: Scene 2 & 3 - Hand-drawn Pencil Stickmen & Handshake (20% - 85%) */}
          <HandshakeScene progress={progress} cameraShake={cameraShake} />

          {/* Layer 4: Scene 4 - Welcome to DIGEETRO Final Reveal (78% - 100%) */}
          <WelcomeScene
            progress={progress}
            onReplay={handleReplay}
            onExploreServices={handleExploreServices}
          />
        </div>
      </div>

      {/* Mindly-style Ultra-Premium Landing Page Hero Section */}
      <div id="hero-landing-page">
        <DigeetroHero onWatchOpeningStory={handleReplay} />
      </div>

      {/* Agency Services & Digital Capabilities Showcase */}
      <AgencyShowcase id="services-section" />
    </div>
  );
}
