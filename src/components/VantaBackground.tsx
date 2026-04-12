import React, { useEffect, useRef } from 'react';
import { usePerformanceMode } from '../hooks/usePerformanceMode';

/**
 * VantaBackground Component
 * Renders the Vanta.js Birds animation using CDN scripts to ensure
 * compatibility with the specific version of Three.js it requires.
 */
const VantaBackground: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const isLowPerf = usePerformanceMode();

  useEffect(() => {
    if (isLowPerf) return;

    const loadScripts = async () => {
      // Check if scripts already exist to avoid duplication
      if (!(window as any).THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.id = 'three-js-cdn';
        document.body.appendChild(threeScript);
        await new Promise(resolve => threeScript.onload = resolve);
      }

      if (!(window as any).VANTA || !(window as any).VANTA.BIRDS) {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';
        vantaScript.id = 'vanta-birds-cdn';
        document.body.appendChild(vantaScript);
        await new Promise(resolve => vantaScript.onload = resolve);
      }

      if (vantaRef.current && (window as any).VANTA && !vantaEffect.current) {
        vantaEffect.current = (window as any).VANTA.BIRDS({
          el: vantaRef.current,
          THREE: (window as any).THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x07070a,
          color1: 0xff0080,
          color2: 0x00ffcc,
          colorMode: "variance",
          birdSize: 2.0,
          wingSpan: 40.0,
          speedLimit: 6.0,   // Increased speed
          separation: 40.0,
          alignment: 40.0,
          cohesion: 40.0,
          quantity: 5.0,     // Max quantity
        });
      }
    };

    loadScripts();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [isLowPerf]);


  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 -z-30 pointer-events-none opacity-40 transition-opacity duration-1000"
      style={{ background: '#0a0a0f' }}
    />
  );
};

export default VantaBackground;
