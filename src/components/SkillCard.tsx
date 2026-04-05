import { ReactNode } from 'react';

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  isLearning?: boolean;
  className?: string;
}

const SkillCard = ({ icon, title, isLearning, className }: SkillCardProps) => {
  return (
    <div className={`glass-card p-6 hover-lift cursor-pointer group relative overflow-hidden ${className || ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
          {icon}
        </div>
        <h3 className="font-semibold text-white drop-shadow-md">{title}</h3>
        {isLearning && (
          <span className="text-xs px-3 py-1 rounded-full bg-white/20 text-white font-medium backdrop-blur-sm border border-white/20 shadow-lg">
            Learning
          </span>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
