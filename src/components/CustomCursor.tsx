import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor Component
 * Replaces the default cursor with a butterfly and adds a pink particle trail.
 */
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const particleId = useRef(0);

  const prevPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Calculate angle of movement
      const deltaX = e.clientX - prevPos.current.x;
      const deltaY = e.clientY - prevPos.current.y;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90; // +90 to align SVG top

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Move and Rotate the butterfly
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          rotation: distance > 1 ? angle : undefined, // Only rotate when moving
          scale: 1 + Math.min(distance / 500, 0.4), // Stretch slightly when fast
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      // Emit multiple sparkling particles
      if (distance > 2) {
        const colors = ['#ec4899', '#38bdf8', '#ffffff', '#a78bfa'];
        const burst = Math.floor(Math.random() * 2) + 1; // 1-2 particles per move

        const newParticles = Array.from({ length: burst }).map(() => ({
          id: particleId.current++,
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)]
        }));

        setParticles((prev) => [...prev.slice(-40), ...newParticles]);
      }

      prevPos.current = { x: e.clientX, y: e.clientY };
    };


    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      {/* Particles Trail */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {particles.map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
        ))}
      </div>

      {/* Butterfly Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 select-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Wings */}
          <path d="M50 50 L20 20 Q5 40 20 60 L50 50" fill="#ec4899" className="animate-butterfly-left" />
          <path d="M50 50 L80 20 Q95 40 80 60 L50 50" fill="#ec4899" className="animate-butterfly-right" />
          {/* Body */}
          <ellipse cx="50" cy="50" rx="3" ry="15" fill="#111" />
        </svg>
      </div>

      <style>{`
        .animate-butterfly-left {
          transform-origin: 50% 50%;
          animation: flapLeft 0.3s ease-in-out infinite alternate;
        }
        .animate-butterfly-right {
          transform-origin: 50% 50%;
          animation: flapRight 0.3s ease-in-out infinite alternate;
        }
        @keyframes flapLeft {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(-60deg); }
        }
        @keyframes flapRight {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(60deg); }
        }
      `}</style>
    </>
  );
};

const Particle = ({ x, y, color }: { x: number; y: number; color: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Falling Star Physics
      gsap.to(ref.current, {
        y: y + Math.random() * 100 + 50, // Fall down
        x: x + (Math.random() - 0.5) * 80, // Spread lateral
        opacity: 0,
        scale: 0,
        rotation: Math.random() * 360,
        duration: Math.random() * 1.2 + 0.6,
        ease: 'power1.in',
      });
    }
  }, []);

  return (
    <div
      ref={ref}
      className="absolute w-2 h-2 pointer-events-none"
      style={{
        left: x, top: y, background: color,
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        boxShadow: `0 0 10px ${color}`
      }}
    />
  );
};

export default CustomCursor;
