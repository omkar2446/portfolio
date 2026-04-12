import { ReactNode, useState, useRef } from 'react';
import { usePerformanceMode } from '../hooks/usePerformanceMode';

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  isLearning?: boolean;
  className?: string;
}

const SkillCard = ({ icon, title, isLearning, className }: SkillCardProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isLowPerf = usePerformanceMode();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLowPerf || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const tiltStyle = !isLowPerf && isHovered ? {
    transform: `perspective(1000px) rotateX(${(mousePos.y / (cardRef.current?.clientHeight || 1) - 0.5) * -15}deg) rotateY(${(mousePos.x / (cardRef.current?.clientWidth || 1) - 0.5) * 15}deg) scale3d(1.05, 1.05, 1.05)`,
    transition: 'transform 0.1s ease-out',
  } : {
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s ease-out',
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass-card p-6 cursor-pointer group relative overflow-hidden shadow-2xl ${className || ''}`}
      style={tiltStyle}
    >
      {/* 3D Depth Elements */}
      <div className="absolute inset-0 border border-white/10 rounded-inherit pointer-events-none" />
      
      {/* Dynamic Spotlight Effect */}
      {!isLowPerf && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(167, 139, 250, 0.2), transparent 80%)`
          }}
        />
      )}


      {/* Static Hover Gradient Fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="text-white group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 drop-shadow-xl">
          {icon}
        </div>
        <h3 className="font-semibold text-white drop-shadow-md text-center">{title}</h3>
        {isLearning && (
          <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 font-bold backdrop-blur-sm border border-indigo-400/20 shadow-lg animate-pulse">
            Learning
          </span>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
