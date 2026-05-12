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
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card p-10 flex flex-col items-center group relative overflow-hidden card-lift shimmer ${className || ''}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary/10 shadow-soft">
        {icon}
      </div>
      <h3 className="font-black text-xs uppercase tracking-[0.3em] text-foreground/40 group-hover:text-foreground transition-colors duration-500 text-center">{title}</h3>
      
      {isLearning && (
        <div className="absolute top-4 right-4">
          <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-glow animate-pulse">
            Developing
          </span>
        </div>
      )}
      
      {/* Decorative inner glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};

export default SkillCard;
