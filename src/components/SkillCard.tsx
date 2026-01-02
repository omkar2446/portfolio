import { ReactNode } from 'react';

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  isLearning?: boolean;
}

const SkillCard = ({ icon, title, isLearning }: SkillCardProps) => {
  return (
    <div className="glass-card p-6 hover-lift cursor-pointer group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="text-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        {isLearning && (
          <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
            Learning
          </span>
        )}
      </div>
    </div>
  );
};

export default SkillCard;
