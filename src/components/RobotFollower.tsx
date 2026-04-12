import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * RobotFollower - High Fidelity Edition
 * A "Real" 3D look using advanced CSS lighting, gradients, and perspective.
 */
const RobotFollower: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);

  const armRef = useRef<HTMLDivElement>(null);
  const forearmRef = useRef<HTMLDivElement>(null);
  const prevDist = useRef(0);
  const [expression, setExpression] = useState<'normal' | 'happy'>('normal');


  const lidTopRef = useRef<(HTMLDivElement | null)[]>([]);
  const lidBotRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // --- Wave Animation ---
    const waveTl = gsap.timeline({ delay: 1.2 });
    waveTl.fromTo(armRef.current, { rotate: 15 }, { rotate: -80, duration: 0.7 });
    waveTl.to(forearmRef.current, { rotate: -40, duration: 0.2, repeat: 6, yoyo: true }, "-=0.2");
    waveTl.to([armRef.current, forearmRef.current], { rotate: 0, duration: 0.8, stagger: 0.1 });

    // --- Auto-Blink Loop ---
    const blink = () => {
      gsap.to(lidTopRef.current, { height: '100%', duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' });
      gsap.to(lidBotRef.current, { height: '100%', duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' });
      setTimeout(blink, Math.random() * 4000 + 2000);
    };
    blink();

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !robotRef.current || !headRef.current || !eyesRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const mouseX = (e.clientX - centerX) / (window.innerWidth / 2);
      const mouseY = (e.clientY - centerY) / (window.innerHeight / 2);

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const currentDist = Math.sqrt(dx * dx + dy * dy);

      if (currentDist < prevDist.current - 2 && currentDist < 400) setExpression('happy');
      else if (currentDist > prevDist.current + 2 || currentDist > 450) setExpression('normal');
      prevDist.current = currentDist;

      gsap.to(robotRef.current, { rotateY: mouseX * 15, rotateX: mouseY * -10, x: mouseX * 20, y: mouseY * 15, duration: 0.8 });
      gsap.to(headRef.current, { rotateY: mouseX * 45, rotateX: mouseY * -40, z: 20, duration: 0.5 });

      // Eye Gaze Physics
      gsap.to(eyesRef.current, { x: mouseX * 15, y: mouseY * 10, duration: 0.3 });

      // Lid Tracking Physics: Squint slightly when looking down/up
      gsap.to(lidTopRef.current, { height: mouseY > 0 ? `${mouseY * 40}%` : '0%', duration: 0.4 });
      gsap.to(lidBotRef.current, { height: mouseY < 0 ? `${Math.abs(mouseY) * 40}%` : '0%', duration: 0.4 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[500px] h-[400px] md:h-[600px] flex items-center justify-center perspective-2000 pointer-events-none select-none">

      <div ref={robotRef} className="relative flex flex-col items-center preserve-3d scale-[0.6] md:scale-100 transition-transform duration-500">

        {/* --- 3D INDUSTRIAL VOLUMETRIC HEAD --- */}
        <div ref={headRef} className="relative w-64 h-40 preserve-3d z-50 transition-transform duration-300"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Main Head "Box" faces */}
          
          {/* Front Face (Bolted Faceplate) */}
          <div className="absolute inset-0 bg-[#222] rounded-[1.5rem] border-2 border-white/10 shadow-2xl z-30 flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #333, #111)', transform: 'translateZ(30px)' }}>
            
            {/* Corner Bolts */}
            <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-white/10 border border-white/5" />
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white/10 border border-white/5" />
            <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-white/10 border border-white/5" />
            <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-white/10 border border-white/5" />

            {/* Inset Screen Display */}
            <div className="absolute inset-x-8 inset-y-6 bg-[#080808] rounded-[1rem] shadow-[inset_0_0_25px_rgba(0,0,0,1)] border border-white/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '6px 6px' }} />
                
                {/* Glowing Eyes */}
                <div ref={eyesRef} className="flex gap-14 transition-all duration-500 relative h-full items-center justify-center">
                   {[0, 1].map((i) => (
                     <div key={i} className="relative w-10 h-10 rounded-full bg-[#1a1a1a] shadow-[0_0_20px_rgba(0,0,0,0.8)] overflow-hidden">
                        <div className="absolute inset-0 bg-pink-500/10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#ec4899] shadow-[0_0_15px_#ec4899]" />
                        <div className="absolute top-1.5 left-2 w-2 h-2 bg-white/60 rounded-full blur-[0.5px]" />
                        <div ref={el => lidTopRef.current[i] = el} className="absolute top-0 left-0 w-full h-0 bg-[#000] z-20" />
                        <div ref={el => lidBotRef.current[i] = el} className="absolute bottom-0 left-0 w-full h-0 bg-[#000] z-20" />
                     </div>
                   ))}
                </div>
            </div>
            
            {/* Top Shine */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/5 to-transparent rounded-t-[1.5rem]" />
          </div>

          {/* Left Side (With Purple Interior Glow) */}
          <div className="absolute top-0 bottom-0 left-0 w-[60px] origin-left rounded-l-[1.5rem]"
               style={{ background: 'linear-gradient(to right, #0a0a0a, #1a1a1a)', transform: 'translateX(-30px) translateZ(0px) rotateY(-90deg)' }}>
            <div className="absolute inset-y-4 right-0 w-1 bg-purple-500/40 blur-[4px]" />
          </div>
          
          {/* Right Side (With Purple Interior Glow) */}
          <div className="absolute top-0 bottom-0 right-0 w-[60px] origin-right rounded-r-[1.5rem]"
               style={{ background: 'linear-gradient(to left, #0a0a0a, #1a1a1a)', transform: 'translateX(30px) translateZ(0px) rotateY(90deg)' }}>
            <div className="absolute inset-y-4 left-0 w-1 bg-purple-500/40 blur-[4px]" />
          </div>

          {/* Top Face */}
          <div className="absolute top-0 left-0 right-0 h-[60px] origin-top rounded-t-[1.5rem]"
               style={{ background: 'linear-gradient(to bottom, #333, #222)', transform: 'translateY(-30px) translateZ(0px) rotateX(90deg)' }} />

          {/* Back Face */}
          <div className="absolute inset-0 bg-[#000] rounded-[1.5rem]"
               style={{ transform: 'translateZ(-30px)' }} />
        </div>


        {/* --- TRIPOD PURPLE CORE NECK --- */}
        <div className="relative w-20 h-24 -mt-8 flex items-end justify-center perspective-1000">
           {/* Left/Right Supports */}
           <div className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-t from-[#333] to-[#111] skew-x-[-15deg] border-l border-white/10" />
           <div className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-t from-[#333] to-[#111] skew-x-[15deg] border-r border-white/10" />
           {/* Center Glowing Core */}
           <div className="w-8 h-16 bg-[#000] rounded-lg border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.4)] relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-600/20" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-500 to-transparent animate-pulse opacity-60" />
           </div>
        </div>

        {/* --- 3D VOLUMETRIC TORSO --- */}
        <div className="relative w-80 h-56 preserve-3d -mt-2 z-30" style={{ transformStyle: 'preserve-3d' }}>
           {/* Front Chest */}
           <div className="absolute inset-0 bg-[#151515] rounded-[4rem] border border-white/5 shadow-2xl"
                style={{ background: 'linear-gradient(165deg, #222, #050505)', transform: 'translateZ(35px)' }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-500/5 blur-3xl animate-pulse" />
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-40 h-1.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
           </div>
           
           {/* Symmetrical Arms */}
           <div ref={armRef} className="absolute -right-14 top-14 origin-top preserve-3d z-10">
            <div className="w-16 h-24 bg-[#1a1a1a] rounded-full border border-white/10 shadow-xl" />
            <div ref={forearmRef} className="origin-top -mt-6 preserve-3d">
               <div className="w-14 h-36 bg-[#111] rounded-2xl border border-white/5 shadow-2xl flex flex-col items-center pt-2">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-full border border-purple-500/20 flex items-center justify-center">
                     <div className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                  </div>
                  <div className="mt-auto w-20 h-16 bg-[#090909] rounded-t-3xl border-t border-white/10" />
               </div>
            </div>
          </div>

          <div className="absolute -left-14 top-14 origin-top preserve-3d z-10">
            <div className="w-16 h-24 bg-[#1a1a1a] rounded-full border border-white/10 shadow-xl" />
            <div className="origin-top -mt-6 preserve-3d rotate-[20deg]">
               <div className="w-14 h-36 bg-[#111] rounded-2xl border border-white/5 shadow-2xl flex flex-col items-center pt-2">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-full border border-purple-500/20 flex items-center justify-center">
                     <div className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                  </div>
                  <div className="mt-auto w-20 h-16 bg-[#090909] rounded-t-3xl border-t border-white/10" />
               </div>
            </div>
          </div>
        </div>

        {/* --- INDUSTRIAL BASE UNIT --- */}
        <div className="relative mt-2 flex flex-col items-center preserve-3d z-10">
          <div className="w-[450px] h-20 bg-[#111] rounded-[3rem] preserve-3d shadow-2xl" 
               style={{ background: 'linear-gradient(180deg, #1a1a1a, #050505)' }} />
          <div className="w-80 h-16 bg-[#0d0d0d] rounded-2xl -mt-16 translate-z-[15px]" style={{ transform: 'translateZ(15px)' }} />
          <div className="w-64 h-12 bg-[#222] rounded-xl -mt-14 translate-z-[30px] border border-white/5 shadow-2xl" style={{ transform: 'translateZ(30px)' }} />
        </div>

        <div className="absolute bottom-[-40px] w-[150%] h-40 bg-black/80 blur-[6rem] rounded-full transform scale-x-150" />
      </div>


    </div>
  );
};



export default RobotFollower;
