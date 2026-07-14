'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight 3D parallax layer for the hero background.
 *
 * Deliberately built with plain CSS 3D transforms (perspective + rotateX/Y +
 * translateZ) instead of a WebGL/Three.js scene:
 *   - Zero added JS bundle weight (the project's performance budget caps
 *     landing-page JS at ~150kb gzipped — Three.js alone blows past that)
 *   - Only ever animates `transform`, which stays on the compositor thread
 *   - Trivial to disable for `prefers-reduced-motion` (see effect below)
 *
 * Renders a small cluster of translucent brand-colored shapes that tilt
 * toward the pointer, giving the hero a sense of depth without competing
 * with the headline or slideshow.
 */
const HeroBackground3D = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    // Touch devices don't have a meaningful pointer position — skip the
    // tilt interaction there rather than binding pointer listeners for
    // nothing.
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return undefined;

    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (event.clientX / innerWidth - 0.5) * 2; // -1 → 1
      const offsetY = (event.clientY / innerHeight - 0.5) * 2; // -1 → 1

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        scene.style.setProperty('--tilt-x', (-offsetY * 8).toFixed(2));
        scene.style.setProperty('--tilt-y', (offsetX * 8).toFixed(2));
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      aria-hidden="true"
      className="hero-3d-scene pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <div className="hero-3d-rig">
        <div className="hero-3d-shape hero-3d-shape--hex" />
        <div className="hero-3d-shape hero-3d-shape--circle" />
        <div className="hero-3d-shape hero-3d-shape--diamond" />
        <div className="hero-3d-shape hero-3d-shape--ring" />
      </div>
    </div>
  );
};

export default HeroBackground3D;
