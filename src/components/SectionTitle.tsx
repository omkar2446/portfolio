import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  label?: string;
  className?: string;
  centered?: boolean;
}

const SectionTitle = ({ title, subtitle, label, className, centered = false }: SectionTitleProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-24 ${centered ? 'text-center' : ''} ${className || ''}`}
    >
      {label && (
        <div className={`text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 ${centered ? 'mx-auto' : ''}`}>
          // {label}
        </div>
      )}
      <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.95] text-balance">
        {title}
      </h2>

      {subtitle && (
        <p className={`text-xl md:text-2xl text-foreground/40 max-w-4xl leading-relaxed font-medium ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
