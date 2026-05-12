import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PremiumBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none select-none">
      {/* Dynamic Ambient Glows - Indigo & Cyan Fusion */}
      <motion.div
        animate={{
          x: mousePos.x * 0.05,
          y: mousePos.y * 0.05,
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[150px] opacity-40"
      />
      <motion.div
        animate={{
          x: -mousePos.x * 0.03,
          y: -mousePos.y * 0.03,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/5 blur-[130px] opacity-30"
      />
      <motion.div
        animate={{
          x: mousePos.x * 0.02,
          y: -mousePos.y * 0.02,
        }}
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-violet-500/5 blur-[120px] opacity-20"
      />
      
      {/* Subdued Technical Grid */}
      <div 
        className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}
      />

      {/* Animated Neural Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0],
            scale: [0.8, 1.2, 0.8],
            x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
            y: [Math.random() * 100 + '%', Math.random() * 100 + '%']
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px]"
        />
      ))}

      {/* Surface Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
};

export default PremiumBackground;
