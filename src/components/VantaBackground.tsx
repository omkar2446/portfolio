import React, { useEffect, useRef } from 'react';
import { usePerformanceMode } from '../hooks/usePerformanceMode';

/**
 * VantaBackground Component
 * Renders a sophisticated 3D NET (Network) effect in violet.
 * This provides a modern, technical aesthetic.
 */
const VantaBackground: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const isLowPerf = usePerformanceMode();

  useEffect(() => {
    if (isLowPerf) return;

    const loadScripts = async () => {
      // Load Three.js
      if (!(window as any).THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.id = 'three-js-cdn';
        document.body.appendChild(threeScript);
        await new Promise(resolve => threeScript.onload = resolve);
      }

      // Load Net Vanta
      if (!(window as any).VANTA || !(window as any).VANTA.NET) {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
        vantaScript.id = 'vanta-net-cdn';
        document.body.appendChild(vantaScript);
        await new Promise(resolve => vantaScript.onload = resolve);
      }

      // Initialize NET effect
      if (vantaRef.current && (window as any).VANTA && !vantaEffect.current) {
        vantaEffect.current = (window as any).VANTA.NET({
          el: vantaRef.current,
          THREE: (window as any).THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x1a0505, // Deep Red Highlight
          backgroundColor: 0x000000, 
          points: 12.0,
          maxDistance: 22.0,
          spacing: 16.0,
          showDots: true
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
      className="fixed inset-0 -z-30 pointer-events-none transition-opacity duration-1000"
    />
  );
};

export default VantaBackground;
