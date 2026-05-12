import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  isLearning?: boolean;
  className?: string;
}

const SkillCard = ({ icon, title, isLearning, className }: SkillCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card p-8 flex flex-col items-center group relative overflow-hidden card-lift shadow-glow ${className || ''}`}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 transition-transform duration-500 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="font-bold text-sm uppercase tracking-widest text-foreground/80 mb-2">{title}</h3>
      {isLearning && (
        <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
          Learning
        </span>
      )}
    </motion.div>
  );
};

export default SkillCard;
