import React from 'react';
import { motion } from 'framer-motion';

const PremiumBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-background">
      {/* Dynamic Mesh Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          x: ['-10%', '10%', '-10%'],
          y: ['-10%', '5%', '-10%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[100%] h-[100%] bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.15)_0%,transparent_50%)] blur-[80px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.25, 0.1],
          x: ['10%', '-5%', '10%'],
          y: ['10%', '-5%', '10%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[100%] h-[100%] bg-[radial-gradient(circle_at_100%_100%,rgba(99,102,241,0.1)_0%,transparent_50%)] blur-[100px]"
      />

      {/* Grid Overlay with Radial Mask */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
        }} 
      />

      {/* Subtle Grain/Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
      
      {/* Global Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

export default PremiumBackground;
