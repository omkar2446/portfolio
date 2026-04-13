import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor - Ultimate High-Fidelity Edition
 * A "Living" 3D butterfly that hovers, flaps faster with speed, 
 * and leaves a magical multi-colored trail.
 */
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; scale: number }[]>([]);
  
  const particleId = useRef(0);
  const prevPos = useRef({ x: 0, y: 0 });
  const flapSpeed = useRef(0.25);
  const isMoving = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - prevPos.current.x;
      const deltaY = e.clientY - prevPos.current.y;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

      isMoving.current = true;
      
      // Dynamic Flap Speed based on distance moved
      const newFlapSpeed = Math.max(0.08, 0.3 - Math.min(dist / 100, 0.22));
      flapSpeed.current = newFlapSpeed;

      if (containerRef.current) {
        gsap.to(containerRef.current, {
          x: e.clientX,
          y: e.clientY,
          rotation: dist > 1 ? angle : undefined,
          scale: 1 + Math.min(dist / 350, 0.35),
          duration: 0.35,
          ease: 'power2.out',
        });
      }

      // Trail emission
      if (dist > 3) {
        const colors = ['#c084fc', '#f472b6', '#38bdf8', '#818cf8', '#ffffff', '#fb7185', '#6366f1'];
        const pCount = Math.floor(Math.random() * 2) + 1;
        
        const newParticles = Array.from({ length: pCount }).map(() => ({
          id: particleId.current++,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          scale: Math.random() * 0.8 + 0.4
        }));

        setParticles((prev) => [...prev.slice(-50), ...newParticles]);
      }

      prevPos.current = { x: e.clientX, y: e.clientY };
      
      // Reset move flag after a short delay
      clearTimeout((window as any).moveTimeout);
      (window as any).moveTimeout = setTimeout(() => {
        isMoving.current = false;
        flapSpeed.current = 0.4; // Slower idle flap
      }, 100);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      {/* Particle Trail */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {particles.map((p) => (
          <MagicDust key={p.id} x={p.x} y={p.y} color={p.color} scale={p.scale} />
        ))}
      </div>

      {/* Living Butterfly Container */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 select-none"
        style={{ width: '50px', height: '50px', perspective: '1200px' }}
      >
        <div 
          ref={cursorRef}
          className="relative w-full h-full animate-butterfly-hover transform-gpu"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(167,139,250,0.7)]">
            <defs>
              <linearGradient id="wingGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d8b4fe" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Left Wing Segments */}
            <g className="animate-wing-left origin-[50px_50px]">
              <path d="M50 50 C20 5 5 35 25 60 C35 72 50 60 50 50Z" fill="url(#wingGradMain)" filter="url(#glow)" />
              <path d="M50 50 C15 65 20 90 35 85 C45 82 50 60 50 50Z" fill="#a78bfa" opacity="0.8" />
            </g>

            {/* Right Wing Segments */}
            <g className="animate-wing-right origin-[50px_50px]">
              <path d="M50 50 C80 5 95 35 75 60 C65 72 50 60 50 50Z" fill="url(#wingGradMain)" filter="url(#glow)" />
              <path d="M50 50 C85 65 80 90 65 85 C55 82 50 60 50 50Z" fill="#a78bfa" opacity="0.8" />
            </g>

            {/* Detailed Body & Head */}
            <path d="M48 32 Q45 20 38 18" fill="none" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" className="animate-antennae" />
            <path d="M52 32 Q55 20 62 18" fill="none" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round" className="animate-antennae" />
            
            <ellipse cx="50" cy="50" rx="3.5" ry="16" fill="#0f172a" />
            <circle cx="50" cy="35" r="4.5" fill="#1e293b" />
          </svg>
        </div>
      </div>

      <style>{`
        .animate-butterfly-hover {
          animation: hoverIdle 3s ease-in-out infinite;
        }
        .animate-wing-left { 
          animation: flapLeftFinal 0.22s ease-in-out infinite alternate; 
        }
        .animate-wing-right { 
          animation: flapRightFinal 0.22s ease-in-out infinite alternate; 
        }
        .animate-antennae {
          animation: twitch 2s ease-in-out infinite;
        }

        @keyframes hoverIdle {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes flapLeftFinal {
          from { transform: rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateY(-80deg) rotateZ(-10deg); }
        }
        @keyframes flapRightFinal {
          from { transform: rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateY(80deg) rotateZ(10deg); }
        }
        @keyframes twitch {
          0%, 100% { stroke-dashoffset: 0; transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
      `}</style>
    </>
  );
};

const MagicDust = ({ x, y, color, scale }: { x: number; y: number; color: string; scale: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const spreadX = (Math.random() - 0.5) * 100;
      const spreadY = (Math.random() - 0.5) * 100;
      
      gsap.to(ref.current, {
        y: y + spreadY - 30,
        x: x + spreadX,
        opacity: 0,
        scale: 0,
        rotation: Math.random() * 360,
        duration: 1.2 + Math.random() * 0.6,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <div
      ref={ref}
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        left: x, top: y, background: color,
        boxShadow: `0 0 8px ${color}`,
        transform: `scale(${scale})`,
        filter: 'blur(0.5px)'
      }}
    />
  );
};

export default CustomCursor;
