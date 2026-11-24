import React, { useMemo } from 'react';

/**
 * PencilStickman Component
 * Renders an articulated, hand-drawn sketch stickman character with natural biomechanics.
 * 
 * Supports:
 * - Entering completely from outside the screen (left: x = -160, right: x = 1160)
 * - Walking naturally towards center with coordinated arms, legs, and body bounce
 * - Smooth transition from walk to idle/stand facing each other
 * - Handshake arm reach, natural grip connection, and rhythmic multi-pump shake
 * - Smooth fade out after handshake to reveal Welcome scene
 * - Authentic hand-drawn graphite pencil aesthetics
 */
export default function PencilStickman({
  side = 'left', // 'left' or 'right'
  progress = 0,  // 0 to 1 overall animation progress
  shakeIntensity = 0, // 0 to 1 during handshake
}) {
  const isLeft = side === 'left';
  const facingDir = isLeft ? 1 : -1;

  // Scene Opacity:
  // Hidden during Logo Reveal (0 - 0.20)
  // Fades in smoothly as they enter from sides (0.20 - 0.26)
  // Fully visible during walk and handshake (0.26 - 0.80)
  // Fades out into the Welcome reveal (0.80 - 0.84)
  const opacity = useMemo(() => {
    if (progress < 0.20) return 0;
    if (progress < 0.26) return (progress - 0.20) / 0.06;
    if (progress <= 0.80) return 1;
    if (progress <= 0.84) return Math.max(0, 1 - (progress - 0.80) / 0.04);
    return 0;
  }, [progress]);

  // Compute position and joint kinematics based on animation progress
  const kinematics = useMemo(() => {
    // Stage coordinates
    // Stage viewBox: 0 0 1000 600
    // Ground level: y = 490
    const groundY = 490;
    const centerMeetingX = isLeft ? 430 : 570;
    // Start completely off-canvas so they walk in from the outside edges!
    const startX = isLeft ? -160 : 1160;

    // Timeline checkpoints strictly following the 5-phase schedule:
    // 0.20 - 0.54: Walk towards center
    // 0.54 - 0.60: Settle and face each other
    // 0.60 - 0.66: Reach hands out
    // 0.66 - 0.78: Handshake connection & pump
    // 0.78 - 0.80: Freeze handshake
    const walkStartP = 0.20;
    const walkEndP = 0.54;
    const settleEndP = 0.60;
    const reachEndP = 0.66;
    const shakeEndP = 0.78;

    let posX = startX;
    let isWalking = false;
    let walkPhase = 0;
    let walkFactor = 0;

    if (progress < walkStartP) {
      posX = startX;
    } else if (progress <= walkEndP) {
      // Walking naturally from outside into the center
      isWalking = true;
      const t = (progress - walkStartP) / (walkEndP - walkStartP);
      // Natural deceleration as they reach their mark
      const easeT = Math.sin(t * (Math.PI / 2));
      posX = startX + (centerMeetingX - startX) * easeT;
      // 4 walking cycles
      walkPhase = t * Math.PI * 8;
      walkFactor = Math.sin(t * Math.PI * 0.95 + 0.1);
    } else {
      // Reached destination in front of each other
      posX = centerMeetingX;
    }

    // Body dimensions
    const headRadius = 22;
    const spineLength = 110;
    const thighLength = 65;
    const shinLength = 65;
    const upperArmLength = 52;
    const forearmLength = 48;

    // Body Bounce & Lean
    let bounceY = 0;
    let bodyLean = 0;
    let headNod = 0;

    if (isWalking) {
      bounceY = -Math.abs(Math.sin(walkPhase)) * 8;
      bodyLean = 5 * facingDir; // leaning slightly forward into walk
      headNod = Math.sin(walkPhase * 2) * 2;
    } else if (progress < settleEndP) {
      // Settle into greeting posture facing each other
      const t = (progress - walkEndP) / (settleEndP - walkEndP);
      bounceY = 0;
      bodyLean = 5 * facingDir * (1 - t);
      headNod = Math.sin(t * Math.PI) * 4; // polite greeting nod
    } else if (progress < reachEndP) {
      // Leaning slightly forward to extend right hand
      const t = (progress - settleEndP) / (reachEndP - settleEndP);
      bodyLean = 4 * facingDir * t;
      headNod = 2;
    } else if (progress <= shakeEndP) {
      // Handshake pump reaction
      const t = (progress - reachEndP) / (shakeEndP - reachEndP);
      const shakeWave = Math.sin(t * Math.PI * 6); // 3 pumps
      bounceY = shakeWave * 3.5;
      bodyLean = 4 * facingDir + shakeWave * 1.5;
      headNod = shakeWave * 3;
    } else {
      // Post-shake pause
      bodyLean = 3 * facingDir;
      headNod = 0;
      bounceY = 0;
    }

    // Base Hip position
    const hipX = posX;
    const hipY = groundY - 130 + bounceY;

    // Spine and Shoulder position
    const shoulderAngleRad = (bodyLean * Math.PI) / 180;
    const shoulderX = hipX + Math.sin(shoulderAngleRad) * spineLength;
    const shoulderY = hipY - Math.cos(shoulderAngleRad) * spineLength;

    // Head position
    const headDist = 32;
    const headX = shoulderX + Math.sin(shoulderAngleRad) * headDist;
    const headY = shoulderY - Math.cos(shoulderAngleRad) * headDist;

    // --- LEGS KINEMATICS ---
    let leg1ThighAngle = 0;
    let leg1KneeAngle = 0;
    let leg2ThighAngle = 0;
    let leg2KneeAngle = 0;

    if (isWalking) {
      const legSwing = Math.sin(walkPhase) * 32 * walkFactor;
      leg1ThighAngle = legSwing;
      leg1KneeAngle = Math.max(0, -Math.sin(walkPhase)) * 45 * walkFactor;

      leg2ThighAngle = -legSwing;
      leg2KneeAngle = Math.max(0, Math.sin(walkPhase)) * 45 * walkFactor;
    } else {
      // Standing upright facing partner
      leg1ThighAngle = 6 * facingDir;
      leg1KneeAngle = 2;
      leg2ThighAngle = -6 * facingDir;
      leg2KneeAngle = 2;
    }

    // Leg 1 (Leading leg)
    const leg1HipAngleRad = (leg1ThighAngle * Math.PI) / 180;
    const knee1X = hipX + Math.sin(leg1HipAngleRad) * thighLength;
    const knee1Y = hipY + Math.cos(leg1HipAngleRad) * thighLength;
    const leg1ShinAngleRad = ((leg1ThighAngle - leg1KneeAngle) * Math.PI) / 180;
    const foot1X = knee1X + Math.sin(leg1ShinAngleRad) * shinLength;
    const foot1Y = knee1Y + Math.cos(leg1ShinAngleRad) * shinLength;

    // Leg 2 (Trailing leg)
    const leg2HipAngleRad = (leg2ThighAngle * Math.PI) / 180;
    const knee2X = hipX + Math.sin(leg2HipAngleRad) * thighLength;
    const knee2Y = hipY + Math.cos(leg2HipAngleRad) * thighLength;
    const leg2ShinAngleRad = ((leg2ThighAngle - leg2KneeAngle) * Math.PI) / 180;
    const foot2X = knee2X + Math.sin(leg2ShinAngleRad) * shinLength;
    const foot2Y = knee2Y + Math.cos(leg2ShinAngleRad) * shinLength;

    // --- ARMS KINEMATICS ---
    let backArmAngle = 0;
    let backElbowAngle = 0;

    if (isWalking) {
      backArmAngle = -Math.sin(walkPhase) * 26 * walkFactor;
      backElbowAngle = 18;
    } else {
      backArmAngle = -8 * facingDir;
      backElbowAngle = 12;
    }

    const backArmRad = (backArmAngle * Math.PI) / 180;
    const backElbowX = shoulderX + Math.sin(backArmRad) * upperArmLength;
    const backElbowY = shoulderY + Math.cos(backArmRad) * upperArmLength;
    const backForearmRad = ((backArmAngle + backElbowAngle * facingDir) * Math.PI) / 180;
    const backHandX = backElbowX + Math.sin(backForearmRad) * forearmLength;
    const backHandY = backElbowY + Math.cos(backForearmRad) * forearmLength;

    // --- HANDSHAKE ARM (Right arm extending to center) ---
    let shakeHandX = 0;
    let shakeHandY = 0;
    let shakeElbowX = 0;
    let shakeElbowY = 0;

    const handTargetCenterX = 500;
    const handTargetCenterY = 315;

    if (progress < walkEndP) {
      const walkArmAngle = Math.sin(walkPhase) * 26 * walkFactor;
      const walkArmRad = (walkArmAngle * Math.PI) / 180;
      shakeElbowX = shoulderX + Math.sin(walkArmRad) * upperArmLength;
      shakeElbowY = shoulderY + Math.cos(walkArmRad) * upperArmLength;
      const walkForearmRad = ((walkArmAngle - 15 * facingDir) * Math.PI) / 180;
      shakeHandX = shakeElbowX + Math.sin(walkForearmRad) * forearmLength;
      shakeHandY = shakeElbowY + Math.cos(walkForearmRad) * forearmLength;
    } else if (progress < reachEndP) {
      const t = (progress - walkEndP) / (reachEndP - walkEndP);
      const easeT = Math.sin(t * (Math.PI / 2));

      const restHandX = shoulderX + 15 * facingDir;
      const restHandY = shoulderY + 80;
      const targetReachX = isLeft ? handTargetCenterX - 5 : handTargetCenterX + 5;
      const currentHandX = restHandX + (targetReachX - restHandX) * easeT;
      const currentHandY = restHandY + (handTargetCenterY - restHandY) * easeT;

      const midX = (shoulderX + currentHandX) / 2;
      const midY = (shoulderY + currentHandY) / 2;
      const bendFactor = 22 * (1 - easeT * 0.4);

      shakeElbowX = midX - bendFactor * 0.3 * facingDir;
      shakeElbowY = midY + bendFactor;
      shakeHandX = currentHandX;
      shakeHandY = currentHandY;
    } else {
      // Handshake connected & pumping
      let pumpOffset = 0;
      if (progress <= shakeEndP) {
        const shakePhase = ((progress - reachEndP) / (shakeEndP - reachEndP)) * Math.PI * 6;
        pumpOffset = Math.sin(shakePhase) * 16;
      } else {
        pumpOffset = 0;
      }

      shakeHandX = isLeft ? handTargetCenterX - 4 : handTargetCenterX + 4;
      shakeHandY = handTargetCenterY + pumpOffset;

      shakeElbowX = isLeft ? shoulderX + 38 : shoulderX - 38;
      shakeElbowY = shoulderY + 45 + pumpOffset * 0.65;
    }

    return {
      hipX,
      hipY,
      shoulderX,
      shoulderY,
      headX,
      headY,
      headRadius,
      knee1X,
      knee1Y,
      foot1X,
      foot1Y,
      knee2X,
      knee2Y,
      foot2X,
      foot2Y,
      backElbowX,
      backElbowY,
      backHandX,
      backHandY,
      shakeElbowX,
      shakeElbowY,
      shakeHandX,
      shakeHandY,
      headNod,
      bodyLean,
      isWalking,
    };
  }, [progress, isLeft, facingDir]);

  if (opacity <= 0.001) return null;

  const sketchOffsets = [
    { dx: 0.8, dy: -0.6, opacity: 0.35, width: 2.2 },
    { dx: -0.7, dy: 0.8, opacity: 0.25, width: 1.8 },
  ];

  return (
    <g className="pencil-character select-none" opacity={opacity}>
      {/* Floor Shadow */}
      <ellipse
        cx={kinematics.hipX}
        cy={492}
        rx={34}
        ry={6}
        fill="#1c1917"
        opacity={0.12 * opacity}
      />
      <ellipse
        cx={kinematics.hipX + 2}
        cy={493}
        rx={24}
        ry={4}
        fill="#1c1917"
        opacity={0.08 * opacity}
      />

      {/* --- BACK ARM --- */}
      {sketchOffsets.map((s, i) => (
        <path
          key={`back-arm-sketch-${i}`}
          d={`M ${kinematics.shoulderX + s.dx} ${kinematics.shoulderY + s.dy} L ${kinematics.backElbowX + s.dx} ${kinematics.backElbowY + s.dy} L ${kinematics.backHandX + s.dx} ${kinematics.backHandY + s.dy}`}
          fill="none"
          stroke="#27272a"
          strokeWidth={s.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={s.opacity}
        />
      ))}
      <path
        d={`M ${kinematics.shoulderX} ${kinematics.shoulderY} L ${kinematics.backElbowX} ${kinematics.backElbowY} L ${kinematics.backHandX} ${kinematics.backHandY}`}
        fill="none"
        stroke="#18181b"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={kinematics.backHandX} cy={kinematics.backHandY} r="3.5" fill="#18181b" />

      {/* --- BACK LEG --- */}
      {sketchOffsets.map((s, i) => (
        <path
          key={`leg2-sketch-${i}`}
          d={`M ${kinematics.hipX + s.dx} ${kinematics.hipY + s.dy} L ${kinematics.knee2X + s.dx} ${kinematics.knee2Y + s.dy} L ${kinematics.foot2X + s.dx} ${kinematics.foot2Y + s.dy} L ${kinematics.foot2X + 12 * facingDir + s.dx} ${kinematics.foot2Y + s.dy}`}
          fill="none"
          stroke="#27272a"
          strokeWidth={s.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={s.opacity}
        />
      ))}
      <path
        d={`M ${kinematics.hipX} ${kinematics.hipY} L ${kinematics.knee2X} ${kinematics.knee2Y} L ${kinematics.foot2X} ${kinematics.foot2Y} L ${kinematics.foot2X + 12 * facingDir} ${kinematics.foot2Y}`}
        fill="none"
        stroke="#27272a"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* --- FRONT LEG --- */}
      {sketchOffsets.map((s, i) => (
        <path
          key={`leg1-sketch-${i}`}
          d={`M ${kinematics.hipX + s.dx} ${kinematics.hipY + s.dy} L ${kinematics.knee1X + s.dx} ${kinematics.knee1Y + s.dy} L ${kinematics.foot1X + s.dx} ${kinematics.foot1Y + s.dy} L ${kinematics.foot1X + 14 * facingDir + s.dx} ${kinematics.foot1Y + s.dy}`}
          fill="none"
          stroke="#18181b"
          strokeWidth={s.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={s.opacity}
        />
      ))}
      <path
        d={`M ${kinematics.hipX} ${kinematics.hipY} L ${kinematics.knee1X} ${kinematics.knee1Y} L ${kinematics.foot1X} ${kinematics.foot1Y} L ${kinematics.foot1X + 14 * facingDir} ${kinematics.foot1Y}`}
        fill="none"
        stroke="#18181b"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* --- SPINE / TORSO --- */}
      {sketchOffsets.map((s, i) => (
        <path
          key={`spine-sketch-${i}`}
          d={`M ${kinematics.hipX + s.dx} ${kinematics.hipY + s.dy} Q ${(kinematics.hipX + kinematics.shoulderX) / 2 + 3 * facingDir + s.dx} ${(kinematics.hipY + kinematics.shoulderY) / 2 + s.dy} ${kinematics.shoulderX + s.dx} ${kinematics.shoulderY + s.dy}`}
          fill="none"
          stroke="#18181b"
          strokeWidth={s.width}
          strokeLinecap="round"
          opacity={s.opacity}
        />
      ))}
      <path
        d={`M ${kinematics.hipX} ${kinematics.hipY} Q ${(kinematics.hipX + kinematics.shoulderX) / 2 + 2 * facingDir} ${(kinematics.hipY + kinematics.shoulderY) / 2} ${kinematics.shoulderX} ${kinematics.shoulderY}`}
        fill="none"
        stroke="#18181b"
        strokeWidth="4.2"
        strokeLinecap="round"
      />

      {/* --- NECK --- */}
      <line
        x1={kinematics.shoulderX}
        y1={kinematics.shoulderY}
        x2={kinematics.headX}
        y2={kinematics.headY + 16}
        stroke="#18181b"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* --- HEAD --- */}
      <circle
        cx={kinematics.headX + 1}
        cy={kinematics.headY - 1}
        r={kinematics.headRadius + 0.5}
        fill="none"
        stroke="#3f3f46"
        strokeWidth="1.6"
        strokeDasharray="4 2 8 3"
        opacity="0.4"
      />
      <ellipse
        cx={kinematics.headX}
        cy={kinematics.headY}
        rx={kinematics.headRadius}
        ry={kinematics.headRadius + 1}
        fill="#ffffff"
        stroke="#18181b"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <ellipse
        cx={kinematics.headX - 0.8 * facingDir}
        cy={kinematics.headY + 0.6}
        rx={kinematics.headRadius - 1.2}
        ry={kinematics.headRadius}
        fill="none"
        stroke="#27272a"
        strokeWidth="1.8"
        strokeDasharray="12 4 16 3"
        opacity="0.35"
      />

      {/* Eye & friendly smile */}
      <circle
        cx={kinematics.headX + 9 * facingDir}
        cy={kinematics.headY - 2}
        r="2.2"
        fill="#18181b"
      />
      <path
        d={`M ${kinematics.headX + 4 * facingDir} ${kinematics.headY + 7} Q ${kinematics.headX + 10 * facingDir} ${kinematics.headY + 11} ${kinematics.headX + 13 * facingDir} ${kinematics.headY + 7}`}
        fill="none"
        stroke="#18181b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* --- FRONT / HANDSHAKE ARM --- */}
      {sketchOffsets.map((s, i) => (
        <path
          key={`shake-arm-sketch-${i}`}
          d={`M ${kinematics.shoulderX + s.dx} ${kinematics.shoulderY + s.dy} L ${kinematics.shakeElbowX + s.dx} ${kinematics.shakeElbowY + s.dy} L ${kinematics.shakeHandX + s.dx} ${kinematics.shakeHandY + s.dy}`}
          fill="none"
          stroke="#18181b"
          strokeWidth={s.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={s.opacity}
        />
      ))}
      <path
        d={`M ${kinematics.shoulderX} ${kinematics.shoulderY} L ${kinematics.shakeElbowX} ${kinematics.shakeElbowY} L ${kinematics.shakeHandX} ${kinematics.shakeHandY}`}
        fill="none"
        stroke="#18181b"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={kinematics.shakeHandX}
        cy={kinematics.shakeHandY}
        r="4.2"
        fill="#18181b"
      />
      <path
        d={`M ${kinematics.shakeHandX} ${kinematics.shakeHandY - 2} L ${kinematics.shakeHandX + 5 * facingDir} ${kinematics.shakeHandY} L ${kinematics.shakeHandX} ${kinematics.shakeHandY + 3}`}
        fill="none"
        stroke="#18181b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </g>
  );
}
