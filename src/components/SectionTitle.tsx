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
        <div className={`text-[12px] font-sans font-semibold uppercase tracking-[0.15em] text-primary mb-6 ${centered ? 'mx-auto' : ''}`}>
          {label}
        </div>
      )}
      <h2 className="text-[2.5rem] md:text-[5rem] font-heading font-bold mb-8 tracking-[-0.03em] leading-[1.1] text-foreground text-balance">
        {title}
      </h2>

      {subtitle && (
        <p className={`text-[1.05rem] font-sans font-normal leading-[1.8] text-foreground/60 max-w-4xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
