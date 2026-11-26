/**
 * Digeetro Interactive Text Click & Auto Shake Effects
 * - Automatic Left-to-Right Shake (without mouse required)
 * - Click & Hover particle bursts and spring responses
 */
(function () {
  // 1. Inject Styles
  const existing = document.getElementById('digeetro-text-click-styles');
  if (existing) existing.remove();

  const style = document.createElement('style');
  style.id = 'digeetro-text-click-styles';
  style.textContent = `
    /* Automatic Left-to-Right Shake Animation (No mouse needed) */
    @keyframes autoShakeLeftRight {
      0% { transform: translateX(0) rotate(0deg); }
      7% { transform: translateX(-12px) rotate(-1.5deg); }
      14% { transform: translateX(12px) rotate(1.5deg); }
      21% { transform: translateX(-10px) rotate(-1deg); }
      28% { transform: translateX(10px) rotate(1deg); }
      35% { transform: translateX(-7px) rotate(-0.6deg); }
      42% { transform: translateX(7px) rotate(0.6deg); }
      49% { transform: translateX(-4px) rotate(-0.3deg); }
      56% { transform: translateX(4px) rotate(0.3deg); }
      63% { transform: translateX(-2px); }
      70% { transform: translateX(2px); }
      75% { transform: translateX(0) rotate(0deg); }
      100% { transform: translateX(0) rotate(0deg); }
    }

    @keyframes autoWelcomeShake {
      0% { transform: translateX(0); }
      8% { transform: translateX(8px); }
      16% { transform: translateX(-8px); }
      24% { transform: translateX(7px); }
      32% { transform: translateX(-7px); }
      40% { transform: translateX(5px); }
      48% { transform: translateX(-5px); }
      56% { transform: translateX(3px); }
      64% { transform: translateX(0); }
      100% { transform: translateX(0); }
    }

    .auto-shake-left-right {
      display: inline-block !important;
      animation: autoShakeLeftRight 1.9s ease-in-out infinite !important;
      transform-origin: center center;
      will-change: transform;
    }

    .auto-shake-welcome {
      display: inline-block !important;
      animation: autoWelcomeShake 1.9s ease-in-out infinite !important;
      transform-origin: center center;
      will-change: transform;
    }

    /* Make headings and interactive text feel clickable */
    h1, h2, h3, h4, .interactive-click-text {
      cursor: pointer;
      user-select: text;
      transition: transform 0.15s ease, filter 0.15s ease;
    }

    h1:hover, h2:hover {
      filter: drop-shadow(0 4px 12px rgba(92, 36, 229, 0.08));
    }

    /* Hover Shake */
    @keyframes heroHoverShake {
      0% { transform: translate(0, 0) rotate(0deg); }
      20% { transform: translate(-5px, -1.5px) rotate(-2.5deg); }
      40% { transform: translate(5px, 1.5px) rotate(2.5deg); }
      60% { transform: translate(-3px, 1px) rotate(-1.5deg); }
      80% { transform: translate(3px, -1px) rotate(1.5deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }

    /* Powerful Click Shake */
    @keyframes heroClickShake {
      0% { transform: translate(0, 0) scale(1) rotate(0deg); }
      15% { transform: translate(-8px, -2px) scale(1.08) rotate(-3.5deg); }
      30% { transform: translate(8px, 2px) scale(1.08) rotate(3.5deg); }
      45% { transform: translate(-6px, 1.5px) scale(1.04) rotate(-2deg); }
      60% { transform: translate(6px, -1px) scale(1.02) rotate(2deg); }
      75% { transform: translate(-3px, 0) scale(1.01) rotate(-1deg); }
      90% { transform: translate(1px, 0) scale(1) rotate(0.5deg); }
      100% { transform: translate(0, 0) scale(1) rotate(0deg); }
    }

    .hero-shake-active {
      display: inline-block !important;
      animation: heroClickShake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both !important;
    }

    .hero-hover-wiggle {
      display: inline-block;
      cursor: pointer;
      transition: transform 0.2s ease;
      will-change: transform;
    }
    .hero-hover-wiggle:hover {
      animation: heroHoverShake 0.45s ease-in-out forwards;
    }

    /* Floating Click Particle */
    .digeetro-click-particle {
      position: fixed;
      pointer-events: none;
      z-index: 999999;
      user-select: none;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 900;
      line-height: 1;
      will-change: transform, opacity;
      animation: digeetroParticleFly 0.8s cubic-bezier(0.12, 0.85, 0.28, 1) forwards;
    }

    @keyframes digeetroParticleFly {
      0% {
        opacity: 1;
        transform: translate(-50%, -50%) translate(0, 0) scale(1.3) rotate(0deg);
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0.2) rotate(var(--rot));
      }
    }

    /* Expanding Radial Ripple */
    .digeetro-click-ripple {
      position: fixed;
      pointer-events: none;
      z-index: 999998;
      border-radius: 50%;
      will-change: transform, opacity;
      animation: digeetroRippleExpand 0.6s cubic-bezier(0.1, 0.8, 0.25, 1) forwards;
    }

    @keyframes digeetroRippleExpand {
      0% {
        opacity: 0.85;
        transform: translate(-50%, -50%) scale(0.15);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(3.5);
      }
    }
  `;
  document.head.appendChild(style);

  // 2. Digeetro Brand Colors & Sparkle Glyphs
  const brandColors = [
    '#5C24E5', // Electric Violet
    '#B829A0', // Purple Magenta
    '#E02888', // Magenta Pink
    '#FF6A3D', // Coral Orange
    '#00B4D8', // Bright Cyan
    '#8B5CF6', // Soft Violet
    '#F59E0B'  // Gold Spark
  ];

  const symbols = ['✦', '✨', '★', '⚡', '◆', '✸', '✦'];

  // 3. Particle Burst Engine
  function spawnClickBurst(x, y, count = 10, extraSpread = 1) {
    if (!x || !y) return;

    // Glowing soft radial pulse
    const ripple = document.createElement('div');
    ripple.className = 'digeetro-click-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '52px';
    ripple.style.height = '52px';
    ripple.style.background = 'radial-gradient(circle, rgba(224, 40, 136, 0.5) 0%, rgba(92, 36, 229, 0.35) 45%, rgba(255, 106, 61, 0) 75%)';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);

    // Particles
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'digeetro-click-particle';
      p.style.left = x + 'px';
      p.style.top = y + 'px';

      const color = brandColors[Math.floor(Math.random() * brandColors.length)];
      const isSymbol = Math.random() > 0.25;

      if (isSymbol) {
        p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        p.style.color = color;
        p.style.fontSize = (13 + Math.random() * 14) + 'px';
        p.style.textShadow = `0 0 12px ${color}, 0 0 4px #ffffff`;
      } else {
        const size = (6 + Math.random() * 8);
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.borderRadius = '50%';
        p.style.backgroundColor = color;
        p.style.boxShadow = `0 0 12px ${color}, 0 0 4px #ffffff`;
      }

      const angle = (Math.PI * 2 * i / count) + (Math.random() * 0.5 - 0.25);
      const dist = (45 + Math.random() * 55) * extraSpread;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 22;
      const rot = (Math.random() * 360 - 180) + 'deg';

      p.style.setProperty('--tx', `${tx}px`);
      p.style.setProperty('--ty', `${ty}px`);
      p.style.setProperty('--rot', rot);

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 850);
    }
  }

  // 4. Global Click Listener for all text with Shake Effect
  document.addEventListener('click', function (e) {
    const target = e.target;
    if (!target) return;

    const textTarget = target.closest('h1, h2, h3, h4, h5, h6, p, span, a, button, li, label, strong, em, b, [data-interactive-text]');
    if (!textTarget) return;

    spawnClickBurst(e.clientX, e.clientY, 14, 1.2);
    textTarget.classList.remove('hero-shake-active');
    void textTarget.offsetWidth;
    textTarget.classList.add('hero-shake-active');
    setTimeout(() => textTarget.classList.remove('hero-shake-active'), 600);
  }, { passive: true });

  console.log('✦ Digeetro text auto-shake (left-to-right) loaded.');
})();
